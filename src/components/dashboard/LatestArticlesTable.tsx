import React from 'react'
import { FileText, Edit2, MoreVertical } from 'lucide-react'
import { useAdmin } from '../../context/AdminContext'

export const LatestArticlesTable: React.FC = () => {
  const { articles, toggleArticleStatus, setCurrentTab } = useAdmin()

  const displayArticles = articles.slice(0, 5)

  return (
    <div className="dashboard-panel-card">
      <div className="panel-header">
        <div className="panel-title">
          <FileText size={18} color="var(--color-primary)" />
          <span>Latest Articles</span>
        </div>
        <span
          className="panel-view-all"
          onClick={() => setCurrentTab('articles')}
        >
          View All
        </span>
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table className="admin-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Category</th>
              <th>Status</th>
              <th>Views</th>
              <th>Published</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {displayArticles.map((art) => (
              <tr key={art.id}>
                <td>
                  <div className="article-row-title-wrap">
                    <img
                      src={art.image}
                      alt={art.title}
                      className="article-row-thumb"
                    />
                    <div className="article-row-title" title={art.title}>
                      {art.title}
                    </div>
                  </div>
                </td>
                <td>
                  <span className="badge-tag badge-category">
                    {art.category}
                  </span>
                </td>
                <td>
                  <span
                    className={`badge-tag ${
                      art.status === 'Published'
                        ? 'badge-published'
                        : 'badge-draft'
                    }`}
                    onClick={() => toggleArticleStatus(art.id)}
                    style={{ cursor: 'pointer' }}
                    title="Click to toggle status"
                  >
                    {art.status}
                  </span>
                </td>
                <td style={{ fontWeight: 600 }}>
                  {art.views.toLocaleString()}
                </td>
                <td style={{ color: 'var(--text-light)', fontSize: '12px' }}>
                  {art.publishedDate}
                </td>
                <td>
                  <button
                    className="action-btn"
                    style={{ width: '28px', height: '28px' }}
                    onClick={() => toggleArticleStatus(art.id)}
                    title="Toggle Publish/Draft"
                  >
                    <Edit2 size={13} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
