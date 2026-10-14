import React, { useEffect } from 'react'
import { Topbar } from './components/layout/Topbar'
import { Sidebar } from './components/layout/Sidebar'
import { DashboardPage } from './pages/DashboardPage'
import { ArticlesPage } from './pages/ArticlesPage'
import { CategoriesPage } from './pages/CategoriesPage'
import { UsersPage } from './pages/UsersPage'
import { SubscribersPage } from './pages/SubscribersPage'
import { AnalyticsPage } from './pages/AnalyticsPage'
import { SettingsPage } from './pages/SettingsPage'
import { CreateArticleModal } from './components/modals/CreateArticleModal'
import { AddCategoryModal } from './components/modals/AddCategoryModal'
import { CommandPaletteModal } from './components/modals/CommandPaletteModal'
import { useAdmin } from './context/AdminContext'
import { CheckCircle } from 'lucide-react'

export const App: React.FC = () => {
  const {
    currentTab,
    sidebarCollapsed,
    toastMessage,
    setIsCommandPaletteOpen
  } = useAdmin()

  // Listen for Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault()
        setIsCommandPaletteOpen(true)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [setIsCommandPaletteOpen])

  return (
    <div className="admin-shell">
      <Topbar />
      <Sidebar />

      <main className={`admin-main-wrap ${sidebarCollapsed ? 'collapsed' : ''}`}>
        {currentTab === 'dashboard' && <DashboardPage />}
        {currentTab === 'articles' && <ArticlesPage />}
        {currentTab === 'categories' && <CategoriesPage />}
        {currentTab === 'authors' && <UsersPage />}
        {currentTab === 'users' && <UsersPage />}
        {currentTab === 'subscribers' && <SubscribersPage />}
        {currentTab === 'analytics' && <AnalyticsPage />}
        {currentTab === 'reports' && <AnalyticsPage />}
        {currentTab === 'media' && <ArticlesPage />}
        {currentTab === 'comments' && <ArticlesPage />}
        {currentTab === 'general-settings' && <SettingsPage type="general" />}
        {currentTab === 'website-settings' && <SettingsPage type="website" />}
        {currentTab === 'seo' && <SettingsPage type="seo" />}
      </main>

      {/* Modals */}
      <CreateArticleModal />
      <AddCategoryModal />
      <CommandPaletteModal />

      {/* Floating Toast */}
      {toastMessage && (
        <div className="admin-toast-container">
          <div className="admin-toast-box">
            <CheckCircle size={16} color="var(--color-primary-light)" />
            <span>{toastMessage}</span>
          </div>
        </div>
      )}
    </div>
  )
}
