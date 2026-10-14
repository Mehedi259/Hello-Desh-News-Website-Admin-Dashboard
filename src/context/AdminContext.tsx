import React, { createContext, useContext, useState, useEffect } from 'react'
import {
  AdminArticle,
  AdminCategory,
  AdminUser,
  AdminSubscriber,
  AdminActivity,
  AdminNotification,
  AdminTab
} from '../types/admin'
import {
  INITIAL_ADMIN_ARTICLES,
  INITIAL_CATEGORIES,
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
  categories: AdminCategory[]
  addCategory: (cat: Omit<AdminCategory, 'id' | 'articleCount'>) => void
  users: AdminUser[]
  addUser: (user: Omit<AdminUser, 'id' | 'joinedDate' | 'articlesCount'>) => void
  subscribers: AdminSubscriber[]
  activities: AdminActivity[]
  notifications: AdminNotification[]
  markNotificationAsRead: (id: string) => void
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

const STORAGE_KEY_ARTICLES = 'hellodesh_articles'

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentTab, setCurrentTab] = useState<AdminTab>('dashboard')
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  // Modals
  const [isCreateArticleOpen, setIsCreateArticleOpen] = useState(false)
  const [isAddCategoryOpen, setIsAddCategoryOpen] = useState(false)
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false)

  // Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null)
  const showToast = (msg: string) => {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(null), 3000)
  }

  // Articles state
  const [articles, setArticles] = useState<AdminArticle[]>(() => {
    try {
      const saved = localStorage.getItem('hellodesh_admin_articles')
      if (saved) {
        const parsed = JSON.parse(saved)
        if (Array.isArray(parsed) && parsed.length > 0) return parsed
      }
    } catch {
      // ignore
    }
    return INITIAL_ADMIN_ARTICLES
  })

  // Categories
  const [categories, setCategories] = useState<AdminCategory[]>(INITIAL_CATEGORIES)

  // Users
  const [users, setUsers] = useState<AdminUser[]>(INITIAL_USERS)

  // Subscribers
  const [subscribers, setSubscribers] = useState<AdminSubscriber[]>([
    { id: 's1', email: 'rakesh@example.com', subscribedDate: 'Oct 14, 2026', status: 'Active' },
    { id: 's2', email: 'tanvir.dev@gmail.com', subscribedDate: 'Oct 13, 2026', status: 'Active' },
    { id: 's3', email: 'media.bangla@yahoo.com', subscribedDate: 'Oct 12, 2026', status: 'Active' },
    { id: 's4', email: 'arif_dhaka@outlook.com', subscribedDate: 'Oct 11, 2026', status: 'Active' },
  ])

  // Activities
  const [activities, setActivities] = useState<AdminActivity[]>(INITIAL_ACTIVITIES)

  // Notifications
  const [notifications, setNotifications] = useState<AdminNotification[]>(INITIAL_NOTIFICATIONS)

  // Add Article
  const addArticle = (data: Omit<AdminArticle, 'id' | 'views' | 'publishedDate'>) => {
    const newArticle: AdminArticle = {
      ...data,
      id: `art-${Date.now()}`,
      views: 0,
      publishedDate: 'Oct 14, 2026'
    }
    const updated = [newArticle, ...articles]
    setArticles(updated)
    localStorage.setItem('hellodesh_admin_articles', JSON.stringify(updated))

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
    showToast('Article created successfully!')
  }

  // Update Article
  const updateArticle = (id: string, updated: Partial<AdminArticle>) => {
    const nextList = articles.map((a) => (a.id === id ? { ...a, ...updated } : a))
    setArticles(nextList)
    localStorage.setItem('hellodesh_admin_articles', JSON.stringify(nextList))
    showToast('Article updated!')
  }

  // Delete Article
  const deleteArticle = (id: string) => {
    const nextList = articles.filter((a) => a.id !== id)
    setArticles(nextList)
    localStorage.setItem('hellodesh_admin_articles', JSON.stringify(nextList))
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
    setArticles(nextList)
    localStorage.setItem('hellodesh_admin_articles', JSON.stringify(nextList))
    showToast('Status updated!')
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

  // Add User
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

  // Notifications
  const markNotificationAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n))
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
        categories,
        addCategory,
        users,
        addUser,
        subscribers,
        activities,
        notifications,
        markNotificationAsRead,
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
