import {
  AdminArticle,
  AdminCategory,
  AdminUser,
  AdminSubscriber,
  AdminActivity,
  AdminNotification
} from '../types/admin'

export const INITIAL_ADMIN_ARTICLES: AdminArticle[] = [
  {
    id: 'art-1',
    title: 'স্বাধীনতার সুবর্ণজয়ন্তী: আমাদের গর্বের ইতিহাস',
    slug: 'golden-jubilee-of-independence-our-proud-history',
    category: 'Politics',
    status: 'Published',
    views: 12542,
    publishedDate: 'Oct 14, 2026',
    image: '/images/hero-yunus.jpg',
    author: 'Mehedi Hasan',
    excerpt: 'বাংলাদেশের মহান স্বাধীনতার গৌরবময় ইতিহাস ও ভবিষ্যৎ প্রজন্মের করণীয়।'
  },
  {
    id: 'art-2',
    title: 'ঢাকায় যানজট নিরসনে নতুন পরিকল্পনা',
    slug: 'new-plan-to-reduce-dhaka-traffic-congestion',
    category: 'City',
    status: 'Published',
    views: 9876,
    publishedDate: 'Oct 14, 2026',
    image: '/images/metro-rail.jpg',
    author: 'Shakil Ahmed',
    excerpt: 'রাজধানীর ট্রাফিক ব্যবস্থার আধুনিকায়ন ও সমন্বিত সিগন্যাল বাস্তবায়ন।'
  },
  {
    id: 'art-3',
    title: 'বাংলাদেশ ক্রিকেট দলের নতুন চ্যালেঞ্জ',
    slug: 'new-challenge-for-bangladesh-cricket-team',
    category: 'Sports',
    status: 'Published',
    views: 8421,
    publishedDate: 'Oct 13, 2026',
    image: '/images/cricket-win.jpg',
    author: 'Tanvir Ahmed',
    excerpt: 'আসন্ন আন্তর্জাতিক সিরিজের জন্য টাইগারদের নতুন কৌশল ও দল গঠন।'
  },
  {
    id: 'art-4',
    title: 'কৃত্রিম বুদ্ধিমত্তা: বাংলাদেশের জন্য সম্ভাবনা ও চ্যালেঞ্জ',
    slug: 'artificial-intelligence-prospects-and-challenges-bangladesh',
    category: 'Technology',
    status: 'Draft',
    views: 0,
    publishedDate: 'Oct 13, 2026',
    image: '/images/ai-bangladesh.jpg',
    author: 'Arif Mahmud',
    excerpt: 'চতুর্থ শিল্পবিপ্লবে কৃত্রিম বুদ্ধিমত্তার বহুমুখী প্রয়োগ ও প্রস্তুতি।'
  },
  {
    id: 'art-5',
    title: 'গ্রামবাংলার উন্নয়নে প্রযুক্তির ভূমিকা',
    slug: 'role-of-technology-in-rural-development',
    category: 'Others',
    status: 'Published',
    views: 5230,
    publishedDate: 'Oct 12, 2026',
    image: '/images/padma-bridge.jpg',
    author: 'Farhana Islam',
    excerpt: 'কৃষি ও গ্রামীণ অর্থনীতিতে ডিজিটাল প্রযুক্তি ও মোবাইল সেবার সুফল।'
  },
  {
    id: 'art-6',
    title: 'দেশের উন্নয়নে তরুণদের ভূমিকা অত্যন্ত গুরুত্বপূর্ণ: প্রধান উপদেষ্টা',
    slug: 'role-of-youth-in-national-development-chief-adviser',
    category: 'National',
    status: 'Published',
    views: 18450,
    publishedDate: 'Oct 14, 2026',
    image: '/images/hero-yunus.jpg',
    author: 'Mehedi Hasan',
    excerpt: 'নতুন বাংলাদেশ বিনির্মাণে তারুণ্যের শক্তিই মূল চালিকাশক্তি হতে যাচ্ছে।'
  },
  {
    id: 'art-7',
    title: 'ঐতিহাসিক ৭ মার্চ উপলক্ষে শপথ নিলো নতুন প্রজন্ম',
    slug: 'new-generation-takes-oath-on-historic-7th-march',
    category: 'National',
    status: 'Published',
    views: 31200,
    publishedDate: 'Oct 14, 2026',
    image: '/images/national-memorial.jpg',
    author: 'Mohammad Rakib',
    excerpt: 'জাতির পিতা বঙ্গবন্ধু শেখ মুজিবুর রহমানের ৭ মার্চের ঐতিহাসিক ভাষণের চেতনায় শপথ।'
  }
]

export const INITIAL_CATEGORIES: AdminCategory[] = [
  { id: 'cat-1', name: 'জাতীয়', nameEn: 'National', slug: 'national', articleCount: 482, color: '#15803d' },
  { id: 'cat-2', name: 'রাজনীতি', nameEn: 'Politics', slug: 'politics', articleCount: 261, color: '#dc2626' },
  { id: 'cat-3', name: 'প্রযুক্তি', nameEn: 'Technology', slug: 'technology', articleCount: 198, color: '#2563eb' },
  { id: 'cat-4', name: 'খেলা', nameEn: 'Sports', slug: 'sports', articleCount: 164, color: '#f59e0b' },
  { id: 'cat-5', name: 'অন্যান্য', nameEn: 'Others', slug: 'others', articleCount: 143, color: '#9333ea' },
  { id: 'cat-6', name: 'অর্থনীতি', nameEn: 'Economy', slug: 'economy', articleCount: 185, color: '#d97706' },
  { id: 'cat-7', name: 'আন্তর্জাতিক', nameEn: 'International', slug: 'international', articleCount: 210, color: '#0284c7' },
  { id: 'cat-8', name: 'বিনোদন', nameEn: 'Entertainment', slug: 'entertainment', articleCount: 142, color: '#e11d48' },
]

export const PAGE_VIEWS_DATA = [
  { date: 'Oct 8', views: 19200, visitors: 11400 },
  { date: 'Oct 9', views: 24500, visitors: 14200 },
  { date: 'Oct 10', views: 22000, visitors: 13100 },
  { date: 'Oct 11', views: 31000, visitors: 18500 },
  { date: 'Oct 12', views: 26400, visitors: 15800 },
  { date: 'Oct 13', views: 35800, visitors: 21900 },
  { date: 'Oct 14', views: 48320, visitors: 28640 },
]

export const CONTENT_DISTRIBUTION_DATA = [
  { name: 'News', value: 482, percent: 38.6, color: '#15803d' },
  { name: 'Politics', value: 261, percent: 20.9, color: '#dc2626' },
  { name: 'Technology', value: 198, percent: 15.9, color: '#2563eb' },
  { name: 'Sports', value: 164, percent: 13.1, color: '#f59e0b' },
  { name: 'Others', value: 143, percent: 11.5, color: '#9333ea' },
]

export const INITIAL_ACTIVITIES: AdminActivity[] = [
  {
    id: 'act-1',
    type: 'publish',
    title: 'New article published',
    detail: 'বাংলাদেশের নতুন অর্থনৈতিক সম্ভাবনা...',
    timeAgo: '2 hours ago',
    timestamp: Date.now() - 2 * 3600 * 1000
  },
  {
    id: 'act-2',
    type: 'register',
    title: 'User registered',
    detail: 'shuvo123@example.com',
    timeAgo: '3 hours ago',
    timestamp: Date.now() - 3 * 3600 * 1000
  },
  {
    id: 'act-3',
    type: 'comment',
    title: 'Comment added',
    detail: '“খুব ভালো লেখা, ধন্যবাদ!”',
    timeAgo: '4 hours ago',
    timestamp: Date.now() - 4 * 3600 * 1000
  },
  {
    id: 'act-4',
    type: 'subscribe',
    title: 'New subscriber',
    detail: 'rakesh@example.com',
    timeAgo: '5 hours ago',
    timestamp: Date.now() - 5 * 3600 * 1000
  },
  {
    id: 'act-5',
    type: 'update',
    title: 'Article updated',
    detail: 'রাজধানীর যানজট নিরসনে নতুন পরিকল্পনা',
    timeAgo: '6 hours ago',
    timestamp: Date.now() - 6 * 3600 * 1000
  }
]

export const INITIAL_USERS: AdminUser[] = [
  { id: 'u1', name: 'Mehedi Hasan', email: 'mehedi@hellodesh.com', role: 'Super Admin', status: 'Active', joinedDate: 'Jan 15, 2026', articlesCount: 142 },
  { id: 'u2', name: 'Mohammad Rakib', email: 'rakib@hellodesh.com', role: 'Reporter', status: 'Active', joinedDate: 'Feb 10, 2026', articlesCount: 88 },
  { id: 'u3', name: 'Shakil Ahmed', email: 'shakil@hellodesh.com', role: 'Editor', status: 'Active', joinedDate: 'Mar 01, 2026', articlesCount: 95 },
  { id: 'u4', name: 'Farhana Islam', email: 'farhana@hellodesh.com', role: 'Reporter', status: 'Active', joinedDate: 'Apr 20, 2026', articlesCount: 64 },
  { id: 'u5', name: 'Shuvo Roy', email: 'shuvo123@example.com', role: 'User', status: 'Active', joinedDate: 'Oct 14, 2026', articlesCount: 0 },
]

export const INITIAL_NOTIFICATIONS: AdminNotification[] = [
  { id: 'n1', title: 'High Traffic Alert', description: 'Real-time concurrent visitors exceeded 5,000.', time: '10 min ago', read: false, type: 'warning' },
  { id: 'n2', title: 'New Comment Pending', description: 'A comment on March 7th article requires moderation.', time: '45 min ago', read: false, type: 'info' },
  { id: 'n3', title: 'Backup Successful', description: 'Daily database backup was completed successfully.', time: '2 hours ago', read: false, type: 'success' },
]
