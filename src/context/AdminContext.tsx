import React, { createContext, useContext, useState, useEffect } from 'react'
import {
  AdminArticle,
  AdminCategory,
  AdminAuthor,
  AdminMediaItem,
  AdminCommentItem,
  AdminUser,
  AdminSubscriber,
  AdminActivity,
  AdminNotification,
  AdminTab
} from '../types/admin'
import {
  INITIAL_ADMIN_ARTICLES,
  INITIAL_CATEGORIES,
  INITIAL_AUTHORS,
  INITIAL_MEDIA,
  INITIAL_COMMENTS,
  INITIAL_ACTIVITIES,
  INITIAL_USERS,
  INITIAL_NOTIFICATIONS
} from '../data/mockAdminData'

interface AdminContextType {
  currentTab: AdminTab
  setCurrentTab: (tab: AdminTab) => void
  articles: AdminArticle[]
  addArticle: (article: Omit<AdminArticle, 'id' | 'views' | 'publishedDate'>) => void
  updateArticle: (id: string, updated: Partial<AdminArticle>) => void
  deleteArticle: (id: string) => void
  toggleArticleStatus: (id: string) => void
  editingArticle: AdminArticle | null
  setEditingArticle: (art: AdminArticle | null) => void
  isEditArticleOpen: boolean
  setIsEditArticleOpen: (open: boolean) => void
  categories: AdminCategory[]
  addCategory: (cat: Omit<AdminCategory, 'id' | 'articleCount'>) => void
  deleteCategory: (id: string) => void
  authors: AdminAuthor[]
  addAuthor: (author: Omit<AdminAuthor, 'id' | 'articlesCount' | 'joinedDate'>) => void
  deleteAuthor: (id: string) => void
  mediaList: AdminMediaItem[]
  addMedia: (item: Omit<AdminMediaItem, 'id' | 'uploadedDate'>) => void
  deleteMedia: (id: string) => void
  comments: AdminCommentItem[]
  updateCommentStatus: (id: string, status: 'Approved' | 'Pending' | 'Spam') => void
  deleteComment: (id: string) => void
  users: AdminUser[]
  addUser: (user: Omit<AdminUser, 'id' | 'joinedDate' | 'articlesCount'>) => void
  deleteUser: (id: string) => void
  subscribers: AdminSubscriber[]
  deleteSubscriber: (id: string) => void
  activities: AdminActivity[]
  notifications: AdminNotification[]
  markNotificationAsRead: (id: string) => void
  clearAllNotifications: () => void
  isCreateArticleOpen: boolean
  setIsCreateArticleOpen: (open: boolean) => void
  isAddCategoryOpen: boolean
  setIsAddCategoryOpen: (open: boolean) => void
  isCommandPaletteOpen: boolean
  setIsCommandPaletteOpen: (open: boolean) => void
  searchQuery: string
  setSearchQuery: (q: string) => void
  sidebarCollapsed: boolean
  setSidebarCollapsed: (v: boolean | ((prev: boolean) => boolean)) => void
  toastMessage: string | null
  showToast: (msg: string) => void
}

const AdminContext = createContext<AdminContextType | undefined>(undefined)

const SHARED_STORAGE_KEY = 'hellodesh_articles'

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentTab, setCurrentTab] = useState<AdminTab>('dashboard')
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  // Modals
  const [isCreateArticleOpen, setIsCreateArticleOpen] = useState(false)
  const [isAddCategoryOpen, setIsAddCategoryOpen] = useState(false)
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false)
  const [isEditArticleOpen, setIsEditArticleOpen] = useState(false)
  const [editingArticle, setEditingArticle] = useState<AdminArticle | null>(null)

  // Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null)
  const showToast = (msg: string) => {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(null), 3000)
  }

  // Articles state
  const [articles, setArticles] = useState<AdminArticle[]>(() => {
    try {
      const saved = localStorage.getItem(SHARED_STORAGE_KEY)
      if (saved) {
        const parsed = JSON.parse(saved)
        if (Array.isArray(parsed) && parsed.length > 0) return parsed
      }
    } catch {
      // ignore
    }
    return INITIAL_ADMIN_ARTICLES
  })

  // Save helper
  const persistArticles = (newArticles: AdminArticle[]) => {
    setArticles(newArticles)
    try {
      localStorage.setItem(SHARED_STORAGE_KEY, JSON.stringify(newArticles))
      localStorage.setItem('hellodesh_admin_articles', JSON.stringify(newArticles))
    } catch {
      // ignore
    }
  }

  // Categories
  const [categories, setCategories] = useState<AdminCategory[]>(INITIAL_CATEGORIES)
  const deleteCategory = (id: string) => {
    setCategories(prev => prev.filter(c => c.id !== id))
    showToast('Category deleted!')
  }

  // Authors
  const [authors, setAuthors] = useState<AdminAuthor[]>(INITIAL_AUTHORS)
  const addAuthor = (authData: Omit<AdminAuthor, 'id' | 'articlesCount' | 'joinedDate'>) => {
    const newAuthor: AdminAuthor = {
      ...authData,
      id: `auth-${Date.now()}`,
      articlesCount: 0,
      joinedDate: 'Oct 2026'
    }
    setAuthors([newAuthor, ...authors])
    showToast('Author added successfully!')
  }
  const deleteAuthor = (id: string) => {
    setAuthors(prev => prev.filter(a => a.id !== id))
    showToast('Author removed!')
  }

  // Media
  const [mediaList, setMediaList] = useState<AdminMediaItem[]>(INITIAL_MEDIA)
  const addMedia = (item: Omit<AdminMediaItem, 'id' | 'uploadedDate'>) => {
    const newMedia: AdminMediaItem = {
      ...item,
      id: `m-${Date.now()}`,
      uploadedDate: 'Oct 14, 2026'
    }
    setMediaList([newMedia, ...mediaList])
    showToast('Media file added to library!')
  }
  const deleteMedia = (id: string) => {
    setMediaList(prev => prev.filter(m => m.id !== id))
    showToast('Media file deleted!')
  }

  // Comments
  const [comments, setComments] = useState<AdminCommentItem[]>(INITIAL_COMMENTS)
  const updateCommentStatus = (id: string, status: 'Approved' | 'Pending' | 'Spam') => {
    setComments(prev => prev.map(c => c.id === id ? { ...c, status } : c))
    showToast(`Comment marked as ${status}!`)
  }
  const deleteComment = (id: string) => {
    setComments(prev => prev.filter(c => c.id !== id))
    showToast('Comment deleted!')
  }

  // Users
  const [users, setUsers] = useState<AdminUser[]>(INITIAL_USERS)
  const addUser = (userData: Omit<AdminUser, 'id' | 'joinedDate' | 'articlesCount'>) => {
    const newUser: AdminUser = {
      ...userData,
      id: `u-${Date.now()}`,
      joinedDate: 'Oct 14, 2026',
      articlesCount: 0
    }
    setUsers([...users, newUser])
    showToast('User created successfully!')
  }
  const deleteUser = (id: string) => {
    setUsers(prev => prev.filter(u => u.id !== id))
    showToast('User deleted!')
  }

  // Subscribers
  const [subscribers, setSubscribers] = useState<AdminSubscriber[]>([
    { id: 's1', email: 'rakesh@example.com', subscribedDate: 'Oct 14, 2026', status: 'Active' },
    { id: 's2', email: 'tanvir.dev@gmail.com', subscribedDate: 'Oct 13, 2026', status: 'Active' },
    { id: 's3', email: 'media.bangla@yahoo.com', subscribedDate: 'Oct 12, 2026', status: 'Active' },
    { id: 's4', email: 'arif_dhaka@outlook.com', subscribedDate: 'Oct 11, 2026', status: 'Active' },
  ])
  const deleteSubscriber = (id: string) => {
    setSubscribers(prev => prev.filter(s => s.id !== id))
    showToast('Subscriber removed!')
  }

  // Activities
  const [activities, setActivities] = useState<AdminActivity[]>(INITIAL_ACTIVITIES)

  // Notifications
  const [notifications, setNotifications] = useState<AdminNotification[]>(INITIAL_NOTIFICATIONS)
  const markNotificationAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n))
  }
  const clearAllNotifications = () => {
    setNotifications([])
    showToast('All notifications cleared!')
  }

  // Add Article
  const addArticle = (data: Omit<AdminArticle, 'id' | 'views' | 'publishedDate'>) => {
    const newArticle: AdminArticle = {
      ...data,
      id: `art-${Date.now()}`,
      views: 0,
      publishedDate: 'Oct 14, 2026'
    }
    const updated = [newArticle, ...articles]
    persistArticles(updated)

    // Add activity
    const newAct: AdminActivity = {
      id: `act-${Date.now()}`,
      type: 'publish',
      title: 'New article published',
      detail: newArticle.title,
      timeAgo: 'Just now',
      timestamp: Date.now()
    }
    setActivities([newAct, ...activities])
    showToast('Article created and published!')
  }

  // Update Article
  const updateArticle = (id: string, updated: Partial<AdminArticle>) => {
    const nextList = articles.map((a) => (a.id === id ? { ...a, ...updated } : a))
    persistArticles(nextList)

    const newAct: AdminActivity = {
      id: `act-${Date.now()}`,
      type: 'update',
      title: 'Article updated',
      detail: updated.title || 'Article details modified',
      timeAgo: 'Just now',
      timestamp: Date.now()
    }
    setActivities([newAct, ...activities])
    showToast('Article updated successfully!')
  }

  // Delete Article
  const deleteArticle = (id: string) => {
    const nextList = articles.filter((a) => a.id !== id)
    persistArticles(nextList)
    showToast('Article removed!')
  }

  // Toggle Status
  const toggleArticleStatus = (id: string) => {
    const nextList = articles.map((a) => {
      if (a.id === id) {
        const newStatus = a.status === 'Published' ? ('Draft' as const) : ('Published' as const)
        return { ...a, status: newStatus }
      }
      return a
    })
    persistArticles(nextList)
    showToast('Article publication status toggled!')
  }

  // Add Category
  const addCategory = (cat: Omit<AdminCategory, 'id' | 'articleCount'>) => {
    const newCat: AdminCategory = {
      ...cat,
      id: `cat-${Date.now()}`,
      articleCount: 0
    }
    setCategories([...categories, newCat])
    showToast('Category added successfully!')
  }

  return (
    <AdminContext.Provider
      value={{
        currentTab,
        setCurrentTab,
        articles,
        addArticle,
        updateArticle,
        deleteArticle,
        toggleArticleStatus,
        editingArticle,
        setEditingArticle,
        isEditArticleOpen,
        setIsEditArticleOpen,
        categories,
        addCategory,
        deleteCategory,
        authors,
        addAuthor,
        deleteAuthor,
        mediaList,
        addMedia,
        deleteMedia,
        comments,
        updateCommentStatus,
        deleteComment,
        users,
        addUser,
        deleteUser,
        subscribers,
        deleteSubscriber,
        activities,
        notifications,
        markNotificationAsRead,
        clearAllNotifications,
        isCreateArticleOpen,
        setIsCreateArticleOpen,
        isAddCategoryOpen,
        setIsAddCategoryOpen,
        isCommandPaletteOpen,
        setIsCommandPaletteOpen,
        searchQuery,
        setSearchQuery,
        sidebarCollapsed,
        setSidebarCollapsed,
        toastMessage,
        showToast
      }}
    >
      {children}
    </AdminContext.Provider>
  )
}

export const useAdmin = () => {
  const context = useContext(AdminContext)
  if (!context) {
    throw new Error('useAdmin must be used within AdminProvider')
  }
  return context
}
