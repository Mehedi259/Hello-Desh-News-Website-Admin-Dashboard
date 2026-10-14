import React from 'react'
import { FileText, Eye, Users, Mail, TrendingUp } from 'lucide-react'
import { useAdmin } from '../../context/AdminContext'

export const StatCards: React.FC = () => {
  const { articles, users, subscribers } = useAdmin()

  const stats = [
    {
      label: 'Total Articles',
      value: (1248 + (articles.length - 7)).toLocaleString(),
      change: '+12%',
      icon: <FileText size={18} color="var(--color-primary)" />,
      bgColor: 'var(--color-primary-bg)',
      color: 'var(--color-primary)'
    },
    {
      label: 'Total Page Views',
      value: '48,320',
      change: '+18%',
      icon: <Eye size={18} color="#059669" />,
      bgColor: '#ecfdf5',
      color: '#059669'
    },
    {
      label: 'Registered Users',
      value: (12643 + (users.length - 5)).toLocaleString(),
      change: '+9%',
      icon: <Users size={18} color="#2563eb" />,
      bgColor: '#eff6ff',
      color: '#2563eb'
    },
    {
      label: 'Subscribers',
      value: (8921 + (subscribers.length - 4)).toLocaleString(),
      change: '+15%',
      icon: <Mail size={18} color="#0d9488" />,
      bgColor: '#f0fdfa',
      color: '#0d9488'
    }
  ]

  return (
    <>
      {stats.map((s, idx) => (
        <div key={idx} className="stat-card">
          <div className="stat-card-header">
            <div className="stat-icon-wrap" style={{ background: s.bgColor }}>
              {s.icon}
            </div>
            <span className="stat-label">{s.label}</span>
          </div>
          <div className="stat-number">{s.value}</div>
          <div className="stat-trend trend-up">
            <TrendingUp size={13} />
            <span>{s.change}</span>
            <span className="trend-period">vs. last 7 days</span>
          </div>
        </div>
      ))}
    </>
  )
}
