require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Resend } = require('resend');
const { Pool } = require('pg');
const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_URL && process.env.DATABASE_URL.includes('railway')
    ? { rejectUnauthorized: false }
    : false,
});

async function initDB() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      role TEXT DEFAULT 'buyer',
      email_verified INTEGER DEFAULT 0,
      verify_token TEXT,
      reset_token TEXT,
      reset_token_expiry BIGINT
    )
  `);
  await pool.query(`
    CREATE TABLE IF NOT EXISTS freelancer_gigs (
      id SERIAL PRIMARY KEY,
      "userId" INTEGER NOT NULL,
      name TEXT NOT NULL,
      username TEXT NOT NULL,
      category TEXT NOT NULL,
      bio TEXT NOT NULL,
      skills TEXT NOT NULL,
      "hourlyRate" TEXT,
      method TEXT,
      "linkedinUrl" TEXT,
      "createdAt" TEXT DEFAULT to_char(now(), 'YYYY-MM-DD HH24:MI:SS'),
      photos TEXT DEFAULT '[]',
      title TEXT DEFAULT '',
      extras TEXT DEFAULT '[]'
    )
  `);
  // Insert demo user if not exists
  await pool.query(`
    INSERT INTO users (name, email, password, role, email_verified)
    VALUES ('Demo User', 'demo@quicklancer.com', 'password123', 'buyer', 1)
    ON CONFLICT (email) DO NOTHING
  `);
  console.log('Database ready');
}

initDB().catch(err => console.error('DB init error:', err.message));

function sendEmail({ to, subject, html, text }) {
  if (!resend) return;
  resend.emails.send({
    from: 'Quicklancers <onboarding@resend.dev>',
    to,
    subject,
    html: html || `<p>${text}</p>`,
  }).catch(err => console.error('Email error:', err.message));
}

function sendNotification(subject, text) {
  sendEmail({ to: process.env.NOTIFY_EMAIL, subject, text });
}

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json({ limit: '50mb' }));

// ─── Mock Data ────────────────────────────────────────────────────────────────

const categories = [
  { id: 1, name: 'Graphics & Design', icon: '🎨', count: 3420, slug: 'graphics-design' },
  { id: 2, name: 'Programming & Tech', icon: '💻', count: 5210, slug: 'programming-tech' },
  { id: 3, name: 'Digital Marketing', icon: '📢', count: 2180, slug: 'digital-marketing' },
  { id: 4, name: 'Writing & Translation', icon: '✍️', count: 1890, slug: 'writing-translation' },
  { id: 5, name: 'Video & Animation', icon: '🎬', count: 1540, slug: 'video-animation' },
  { id: 6, name: 'Music & Audio', icon: '🎵', count: 980, slug: 'music-audio' },
  { id: 7, name: 'Business', icon: '💼', count: 1320, slug: 'business' },
  { id: 8, name: 'AI Services', icon: '🤖', count: 760, slug: 'ai-services' },
];

const sellers = [
  {
    id: 1, username: 'alex_designs', name: 'Alex Johnson',
    avatarColor: '#6366f1', initials: 'AJ', level: 'Top Rated',
    bio: 'Professional graphic designer with 8+ years of experience creating stunning brand identities.',
    rating: 4.9, reviewCount: 1243, location: 'New York, USA', completedOrders: 1540,
    memberSince: 'Jan 2019', responseTime: '1 hour',
  },
  {
    id: 2, username: 'codemaster_sam', name: 'Samantha Lee',
    avatarColor: '#10b981', initials: 'SL', level: 'Level 2',
    bio: 'Full-stack developer specializing in React, Node.js and cloud architecture.',
    rating: 4.8, reviewCount: 872, location: 'San Francisco, USA', completedOrders: 940,
    memberSince: 'Mar 2020', responseTime: '2 hours',
  },
  {
    id: 3, username: 'wordsmith_pro', name: 'James Carter',
    avatarColor: '#f59e0b', initials: 'JC', level: 'Top Rated',
    bio: 'SEO content writer and copywriter who has worked with 200+ brands worldwide.',
    rating: 4.95, reviewCount: 2105, location: 'London, UK', completedOrders: 2300,
    memberSince: 'Jun 2018', responseTime: '30 minutes',
  },
  {
    id: 4, username: 'motion_mike', name: 'Mike Torres',
    avatarColor: '#ef4444', initials: 'MT', level: 'Level 2',
    bio: 'Motion graphics artist and video editor with a passion for cinematic storytelling.',
    rating: 4.7, reviewCount: 541, location: 'Barcelona, Spain', completedOrders: 610,
    memberSince: 'Sep 2021', responseTime: '3 hours',
  },
  {
    id: 5, username: 'marketingqueen', name: 'Priya Sharma',
    avatarColor: '#8b5cf6', initials: 'PS', level: 'Top Rated',
    bio: 'Digital marketing strategist specializing in growth hacking and paid social ads.',
    rating: 4.85, reviewCount: 988, location: 'Mumbai, India', completedOrders: 1120,
    memberSince: 'Feb 2020', responseTime: '1 hour',
  },
  {
    id: 6, username: 'sound_studio', name: 'David Kim',
    avatarColor: '#06b6d4', initials: 'DK', level: 'Level 1',
    bio: 'Professional audio engineer and music producer with 5+ years in the industry.',
    rating: 4.75, reviewCount: 312, location: 'Seoul, South Korea', completedOrders: 380,
    memberSince: 'Nov 2022', responseTime: '4 hours',
  },
];

const gigs = [
  {
    id: 1,
    title: 'I will design a professional logo for your brand',
    description: 'Get a stunning, custom logo that perfectly represents your brand. I specialize in modern, minimalist, and versatile logo design that works across all platforms. Every logo comes with full source files and unlimited revisions until you\'re 100% satisfied.',
    category: 'graphics-design',
    sellerId: 1,
    rating: 4.9, reviewCount: 843,
    tags: ['logo', 'branding', 'graphic design', 'vector'],
    imageColor: '#6366f1',
    imageEmoji: '🎨',
    packages: [
      { name: 'Basic', price: 25, delivery: 3, revisions: 2, description: '1 logo concept, PNG files', features: ['1 Concept', 'PNG Files', '2 Revisions'] },
      { name: 'Standard', price: 75, delivery: 5, revisions: 5, description: '3 logo concepts, all file formats', features: ['3 Concepts', 'All File Formats', '5 Revisions', 'Source Files'] },
      { name: 'Premium', price: 150, delivery: 7, revisions: 999, description: 'Full brand identity package', features: ['5 Concepts', 'Brand Guidelines', 'Unlimited Revisions', 'Social Media Kit', 'Priority Support'] },
    ],
  },
  {
    id: 2,
    title: 'I will build a full-stack React and Node.js web application',
    description: 'I will develop a complete, production-ready web application using React for the frontend and Node.js/Express for the backend. Includes REST API, authentication, database integration, and deployment setup.',
    category: 'programming-tech',
    sellerId: 2,
    rating: 4.8, reviewCount: 562,
    tags: ['react', 'nodejs', 'web development', 'javascript', 'fullstack'],
    imageColor: '#10b981',
    imageEmoji: '💻',
    packages: [
      { name: 'Basic', price: 150, delivery: 7, revisions: 1, description: 'Simple landing page or static site', features: ['Responsive Design', '5 Pages', '1 Revision'] },
      { name: 'Standard', price: 400, delivery: 14, revisions: 3, description: 'Full web app with backend API', features: ['React Frontend', 'Node.js API', 'Database', '3 Revisions', 'Auth System'] },
      { name: 'Premium', price: 900, delivery: 21, revisions: 5, description: 'Complete SaaS-ready application', features: ['Everything in Standard', 'Payment Integration', 'Admin Dashboard', 'CI/CD Setup', '6 Months Support'] },
    ],
  },
  {
    id: 3,
    title: 'I will write SEO-optimized blog posts and articles',
    description: 'Drive organic traffic with expertly crafted, SEO-optimized content. I research keywords, write engaging copy, and structure articles to rank on Google. 100% original content with plagiarism reports included.',
    category: 'writing-translation',
    sellerId: 3,
    rating: 4.95, reviewCount: 1521,
    tags: ['seo', 'content writing', 'blog', 'copywriting'],
    imageColor: '#f59e0b',
    imageEmoji: '✍️',
    packages: [
      { name: 'Basic', price: 20, delivery: 2, revisions: 2, description: '500-word SEO article', features: ['500 Words', 'Keyword Research', '2 Revisions'] },
      { name: 'Standard', price: 50, delivery: 3, revisions: 3, description: '1000-word in-depth article', features: ['1000 Words', 'SEO Optimization', 'Plagiarism Report', '3 Revisions'] },
      { name: 'Premium', price: 120, delivery: 5, revisions: 999, description: '2500-word pillar content', features: ['2500 Words', 'Internal Linking', 'Meta Description', 'Unlimited Revisions', 'Social Snippets'] },
    ],
  },
  {
    id: 4,
    title: 'I will create a stunning explainer video with animation',
    description: 'Transform your complex ideas into engaging animated explainer videos. Perfect for product demos, company overviews, and marketing campaigns. High-quality 2D animation with professional voiceover and background music.',
    category: 'video-animation',
    sellerId: 4,
    rating: 4.7, reviewCount: 389,
    tags: ['animation', 'explainer video', 'motion graphics', '2D'],
    imageColor: '#ef4444',
    imageEmoji: '🎬',
    packages: [
      { name: 'Basic', price: 100, delivery: 5, revisions: 2, description: '30-second explainer video', features: ['30 Seconds', 'Background Music', '2 Revisions', 'HD Export'] },
      { name: 'Standard', price: 250, delivery: 10, revisions: 3, description: '60-second animated video', features: ['60 Seconds', 'Voiceover', 'Custom Graphics', '3 Revisions', 'Full HD'] },
      { name: 'Premium', price: 500, delivery: 14, revisions: 5, description: '2-minute full production video', features: ['2 Minutes', 'Script Writing', 'Professional VO', 'Sound Design', 'Unlimited Scenes'] },
    ],
  },
  {
    id: 5,
    title: 'I will manage and grow your social media presence',
    description: 'Get a complete social media management service tailored to your brand. I\'ll create engaging content, schedule posts, grow your following, and analyze performance metrics to continuously improve your social strategy.',
    category: 'digital-marketing',
    sellerId: 5,
    rating: 4.85, reviewCount: 701,
    tags: ['social media', 'instagram', 'marketing', 'content strategy'],
    imageColor: '#8b5cf6',
    imageEmoji: '📢',
    packages: [
      { name: 'Basic', price: 80, delivery: 30, revisions: 0, description: '10 posts/month on 1 platform', features: ['10 Posts', '1 Platform', 'Basic Analytics', 'Caption Writing'] },
      { name: 'Standard', price: 200, delivery: 30, revisions: 0, description: '20 posts/month on 3 platforms', features: ['20 Posts', '3 Platforms', 'Hashtag Research', 'Story Content', 'Monthly Report'] },
      { name: 'Premium', price: 500, delivery: 30, revisions: 0, description: 'Full management on all platforms', features: ['30 Posts', 'All Platforms', 'Community Management', 'Paid Ads Setup', 'Weekly Reports', 'Strategy Call'] },
    ],
  },
  {
    id: 6,
    title: 'I will produce an original music track for your project',
    description: 'Custom music production tailored to your needs. Whether it\'s a background track, podcast intro, YouTube music, or a full commercial song — I deliver professional quality audio using industry-standard tools.',
    category: 'music-audio',
    sellerId: 6,
    rating: 4.75, reviewCount: 228,
    tags: ['music production', 'audio', 'soundtrack', 'beats'],
    imageColor: '#06b6d4',
    imageEmoji: '🎵',
    packages: [
      { name: 'Basic', price: 40, delivery: 3, revisions: 1, description: '30-second background track', features: ['30 Seconds', 'Royalty Free', 'WAV + MP3', '1 Revision'] },
      { name: 'Standard', price: 100, delivery: 5, revisions: 3, description: '2-minute original track', features: ['2 Minutes', 'Custom Composition', 'Stem Files', '3 Revisions', 'Commercial License'] },
      { name: 'Premium', price: 250, delivery: 10, revisions: 5, description: 'Full song with mixing & mastering', features: ['Full Song', 'Lyrics Included', 'Mixing & Mastering', 'Unlimited Stems', 'Exclusive Rights'] },
    ],
  },
  {
    id: 7,
    title: 'I will design a modern UI/UX for your mobile app',
    description: 'Create a beautiful, user-friendly mobile app design that converts. I follow modern design principles and deliver fully interactive Figma prototypes with design systems, component libraries, and handoff-ready specs.',
    category: 'graphics-design',
    sellerId: 1,
    rating: 4.88, reviewCount: 432,
    tags: ['ui design', 'ux', 'figma', 'mobile app', 'prototype'],
    imageColor: '#ec4899',
    imageEmoji: '📱',
    packages: [
      { name: 'Basic', price: 60, delivery: 4, revisions: 2, description: '5 screen UI design', features: ['5 Screens', 'Figma File', '2 Revisions', 'Mobile Only'] },
      { name: 'Standard', price: 180, delivery: 7, revisions: 4, description: '15 screens + interactive prototype', features: ['15 Screens', 'Clickable Prototype', 'Component Library', '4 Revisions'] },
      { name: 'Premium', price: 400, delivery: 14, revisions: 999, description: 'Complete app design system', features: ['Unlimited Screens', 'Design System', 'Developer Handoff', 'Unlimited Revisions', 'Animations'] },
    ],
  },
  {
    id: 8,
    title: 'I will set up your Google Ads and PPC campaigns',
    description: 'Maximize your ROI with expertly managed Google Ads campaigns. I handle everything from keyword research and ad copywriting to bid optimization and conversion tracking setup. Certified Google Ads professional.',
    category: 'digital-marketing',
    sellerId: 5,
    rating: 4.82, reviewCount: 587,
    tags: ['google ads', 'ppc', 'paid advertising', 'sem'],
    imageColor: '#f97316',
    imageEmoji: '📊',
    packages: [
      { name: 'Basic', price: 75, delivery: 3, revisions: 1, description: 'Campaign setup and audit', features: ['Campaign Setup', 'Keyword Research', 'Ad Copywriting', '1 Revision'] },
      { name: 'Standard', price: 200, delivery: 7, revisions: 2, description: 'Full campaign build with tracking', features: ['5 Ad Groups', 'Conversion Tracking', 'Remarketing', 'Monthly Report', '2 Revisions'] },
      { name: 'Premium', price: 500, delivery: 14, revisions: 5, description: 'Complete PPC management (1 month)', features: ['Unlimited Ad Groups', 'A/B Testing', 'Landing Page Review', 'Bi-weekly Reports', 'Strategy Calls'] },
    ],
  },
  {
    id: 9,
    title: 'I will develop a WordPress website with custom theme',
    description: 'Get a fast, responsive WordPress website built from scratch. I create custom themes, implement SEO best practices, set up essential plugins, and ensure your site is optimized for speed and security.',
    category: 'programming-tech',
    sellerId: 2,
    rating: 4.78, reviewCount: 693,
    tags: ['wordpress', 'web design', 'php', 'cms', 'website'],
    imageColor: '#3b82f6',
    imageEmoji: '🌐',
    packages: [
      { name: 'Basic', price: 80, delivery: 5, revisions: 2, description: 'Simple 5-page WordPress site', features: ['5 Pages', 'Premium Theme', 'Contact Form', 'Mobile Responsive', '2 Revisions'] },
      { name: 'Standard', price: 200, delivery: 10, revisions: 3, description: 'Custom WordPress site with blog', features: ['10 Pages', 'Custom Design', 'Blog Setup', 'SEO Optimization', 'Speed Optimization'] },
      { name: 'Premium', price: 450, delivery: 21, revisions: 5, description: 'E-commerce WordPress site', features: ['Unlimited Pages', 'WooCommerce', 'Payment Gateway', 'Product Import', '6 Months Support'] },
    ],
  },
  {
    id: 10,
    title: 'I will translate your documents between 50+ languages',
    description: 'Professional human translation services for documents, websites, apps, and marketing materials. Native speakers only — no machine translation. Fast turnaround with guaranteed accuracy.',
    category: 'writing-translation',
    sellerId: 3,
    rating: 4.9, reviewCount: 1876,
    tags: ['translation', 'localization', 'language', 'proofreading'],
    imageColor: '#14b8a6',
    imageEmoji: '🌍',
    packages: [
      { name: 'Basic', price: 15, delivery: 1, revisions: 1, description: 'Up to 500 words', features: ['500 Words', 'Human Translation', '1 Language Pair', '1 Revision'] },
      { name: 'Standard', price: 35, delivery: 2, revisions: 2, description: 'Up to 1500 words', features: ['1500 Words', 'Certified Translation', 'Proofreading Included', '2 Revisions'] },
      { name: 'Premium', price: 80, delivery: 4, revisions: 5, description: 'Up to 5000 words + localization', features: ['5000 Words', 'Cultural Adaptation', 'SEO Localization', 'Glossary Provided', '5 Revisions'] },
    ],
  },
  {
    id: 11,
    title: 'I will edit and color grade your video professionally',
    description: 'Transform raw footage into a polished, cinematic masterpiece. I offer professional video editing, color grading, sound mixing, and motion graphics integration for YouTube, social media, commercials, and films.',
    category: 'video-animation',
    sellerId: 4,
    rating: 4.73, reviewCount: 318,
    tags: ['video editing', 'color grading', 'youtube', 'premiere pro'],
    imageColor: '#dc2626',
    imageEmoji: '🎞️',
    packages: [
      { name: 'Basic', price: 30, delivery: 2, revisions: 1, description: 'Up to 3-minute video edit', features: ['3 Minutes', 'Cuts & Transitions', 'Background Music', '1 Revision'] },
      { name: 'Standard', price: 80, delivery: 4, revisions: 2, description: 'Up to 10-minute video with effects', features: ['10 Minutes', 'Color Grading', 'Sound Mix', 'Subtitles', '2 Revisions'] },
      { name: 'Premium', price: 200, delivery: 7, revisions: 5, description: 'Long-form cinematic production', features: ['30 Minutes', 'Advanced Color', 'Motion Graphics', 'Audio Mastering', 'Rush Delivery Available'] },
    ],
  },
  {
    id: 12,
    title: 'I will build an AI-powered chatbot for your website',
    description: 'Integrate a smart, conversational AI chatbot into your website or application. I build custom bots using GPT-4, Claude, or open-source LLMs, with features like RAG, tool calling, and seamless CRM integration.',
    category: 'ai-services',
    sellerId: 2,
    rating: 4.91, reviewCount: 245,
    tags: ['ai chatbot', 'gpt', 'llm', 'automation', 'machine learning'],
    imageColor: '#7c3aed',
    imageEmoji: '🤖',
    packages: [
      { name: 'Basic', price: 200, delivery: 7, revisions: 2, description: 'Simple FAQ chatbot', features: ['FAQ Bot', 'Web Integration', 'Basic NLP', '2 Revisions'] },
      { name: 'Standard', price: 500, delivery: 14, revisions: 3, description: 'GPT-powered assistant', features: ['GPT-4 Integration', 'Custom Persona', 'Context Memory', 'Analytics Dashboard', '3 Revisions'] },
      { name: 'Premium', price: 1200, delivery: 21, revisions: 5, description: 'Full AI agent with integrations', features: ['RAG System', 'CRM Integration', 'Multi-channel', 'Training Included', '3 Months Support'] },
    ],
  },
];

const reviews = [
  { id: 1, gigId: 1, buyerName: 'Tom Richards', buyerInitials: 'TR', buyerColor: '#3b82f6', rating: 5, comment: 'Absolutely amazing work! Alex delivered beyond expectations. The logo is clean, professional and versatile. Will definitely hire again.', date: '2024-12-10' },
  { id: 2, gigId: 1, buyerName: 'Lisa Park', buyerInitials: 'LP', buyerColor: '#10b981', rating: 5, comment: 'Fast delivery and great communication throughout. The final design was exactly what I envisioned. Highly recommended!', date: '2024-11-28' },
  { id: 3, gigId: 1, buyerName: 'Carlos M.', buyerInitials: 'CM', buyerColor: '#f59e0b', rating: 4, comment: 'Really good work and quick revisions. Minor tweaks needed but overall very happy with the result.', date: '2024-11-15' },
  { id: 4, gigId: 2, buyerName: 'Sarah Wilson', buyerInitials: 'SW', buyerColor: '#ef4444', rating: 5, comment: 'Samantha built exactly what I needed. The code is clean and well-documented. Will come back for future projects.', date: '2024-12-05' },
  { id: 5, gigId: 2, buyerName: 'Kevin Nguyen', buyerInitials: 'KN', buyerColor: '#8b5cf6', rating: 5, comment: 'Outstanding developer. Delivered ahead of schedule and handled all edge cases. The app works perfectly.', date: '2024-11-20' },
];


// ─── Routes ───────────────────────────────────────────────────────────────────

app.get('/api/categories', async (req, res) => {
  const { rows: userGigs } = await pool.query('SELECT category FROM freelancer_gigs');
  const result = categories.map(cat => {
    const mockCount = gigs.filter(g => g.category === cat.slug).length;
    const userCount = userGigs.filter(g => g.category === cat.slug).length;
    return { ...cat, count: mockCount + userCount };
  });
  res.json(result);
});

app.post('/api/freelancer/gig', async (req, res) => {
  const { userId, name, username, category, title, bio, skills, hourlyRate, method, linkedinUrl, photos, extras } = req.body;
  if (!userId || !category || !name) return res.status(400).json({ message: 'Missing fields' });
  try {
    await pool.query(
      `INSERT INTO freelancer_gigs ("userId", name, username, category, title, bio, skills, "hourlyRate", method, "linkedinUrl", photos, extras)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)`,
      [userId, name, username || name, category, title || '', bio || '', skills || '', hourlyRate || '', method || '', linkedinUrl || '', JSON.stringify(photos || []), JSON.stringify(extras || [])]
    );
  } catch (err) {
    console.error('Failed to insert gig:', err.message);
    return res.status(500).json({ message: err.message });
  }
  res.json({ ok: true });
});

const CATEGORY_COLORS = {
  'graphics-design': '#6366f1',
  'programming-tech': '#10b981',
  'digital-marketing': '#8b5cf6',
  'writing-translation': '#f59e0b',
  'video-animation': '#ef4444',
  'music-audio': '#06b6d4',
  'business': '#0ea5e9',
  'ai-services': '#7c3aed',
};

app.get('/api/gigs', async (req, res) => {
  const { category, search, sort } = req.query;
  let result = gigs.map(g => ({ ...g, seller: sellers.find(s => s.id === g.sellerId) }));

  // Merge user-created freelancer gigs from DB
  const { rows: userGigs } = await pool.query('SELECT * FROM freelancer_gigs');
  userGigs.forEach(ug => {
    const skillList = ug.skills.split(',').map(s => s.trim().toLowerCase()).filter(Boolean);
    result.push({
      id: `u_${ug.id}`,
      title: ug.title || `I will provide ${ug.category.replace(/-/g, ' ')} services`,
      description: ug.bio,
      category: ug.category,
      rating: 5.0,
      reviewCount: 0,
      tags: skillList,
      imageColor: CATEGORY_COLORS[ug.category] || '#1dbf73',
      imageEmoji: '⭐',
      photos: JSON.parse(ug.photos || '[]'),
      extras: JSON.parse(ug.extras || '[]'),
      packages: [
        {
          name: 'Basic',
          price: ug.hourlyRate ? parseInt(ug.hourlyRate) : 50,
          delivery: 3,
          revisions: 2,
          description: 'Standard service package',
          features: skillList.slice(0, 3).map(s => s),
        },
      ],
      seller: {
        id: ug.userId,
        name: ug.name,
        username: ug.username,
        initials: ug.name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2),
        avatarColor: CATEGORY_COLORS[ug.category] || '#1dbf73',
        level: 'New Seller',
        bio: ug.bio,
        rating: 5.0,
        reviewCount: 0,
      },
    });
  });

  if (category && category !== 'all') {
    result = result.filter(g => g.category === category);
  }
  if (search) {
    const q = search.toLowerCase();
    result = result.filter(g =>
      g.title.toLowerCase().includes(q) ||
      g.tags.some(t => t.includes(q)) ||
      g.category.includes(q)
    );
  }
  if (sort === 'price_asc') result.sort((a, b) => a.packages[0].price - b.packages[0].price);
  if (sort === 'price_desc') result.sort((a, b) => b.packages[0].price - a.packages[0].price);
  if (sort === 'rating') result.sort((a, b) => b.rating - a.rating);

  res.json(result);
});

app.get('/api/gigs/:id', async (req, res) => {
  const rawId = req.params.id;
  // User-created gig
  if (rawId.startsWith('u_')) {
    const { rows } = await pool.query('SELECT * FROM freelancer_gigs WHERE id = $1', [rawId.replace('u_', '')]);
    const ug = rows[0];
    if (!ug) return res.status(404).json({ message: 'Gig not found' });
    const skillList = ug.skills.split(',').map(s => s.trim().toLowerCase()).filter(Boolean);
    const color = CATEGORY_COLORS[ug.category] || '#1dbf73';
    return res.json({
      id: rawId,
      title: ug.title || `I will provide ${ug.category.replace(/-/g, ' ')} services`,
      description: ug.bio,
      category: ug.category,
      rating: 5.0, reviewCount: 0,
      tags: skillList,
      imageColor: color,
      packages: [{ name: 'Basic', price: ug.hourlyRate ? parseInt(ug.hourlyRate) : 50, delivery: 3, revisions: 2, description: 'Standard service package', features: skillList.slice(0, 3) }],
      seller: { id: ug.userId, name: ug.name, username: ug.username, initials: ug.name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0,2), avatarColor: color, level: 'New Seller', bio: ug.bio, rating: 5.0, reviewCount: 0 },
      photos: JSON.parse(ug.photos || '[]'),
      extras: JSON.parse(ug.extras || '[]'),
      reviews: [],
    });
  }
  const gig = gigs.find(g => g.id === parseInt(rawId));
  if (!gig) return res.status(404).json({ message: 'Gig not found' });
  const seller = sellers.find(s => s.id === gig.sellerId);
  const gigReviews = reviews.filter(r => r.gigId === gig.id);
  res.json({ ...gig, seller, reviews: gigReviews });
});

app.get('/api/sellers/:id', (req, res) => {
  const seller = sellers.find(s => s.id === parseInt(req.params.id));
  if (!seller) return res.status(404).json({ message: 'Seller not found' });
  const sellerGigs = gigs.filter(g => g.sellerId === seller.id);
  res.json({ ...seller, gigs: sellerGigs });
});

app.post('/api/auth/register', async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password)
    return res.status(400).json({ message: 'All fields are required' });

  const { rows: existing } = await pool.query('SELECT id FROM users WHERE email = $1', [email]);
  if (existing.length > 0)
    return res.status(400).json({ message: 'Email already registered' });

  const token = require('crypto').randomBytes(32).toString('hex');
  await pool.query(
    'INSERT INTO users (name, email, password, role, email_verified, verify_token) VALUES ($1,$2,$3,$4,$5,$6)',
    [name, email, password, 'buyer', resend ? 0 : 1, token]
  );

  const origin = req.headers.origin || 'http://localhost:3000';
  const verifyUrl = `${origin}/verify-email?token=${token}`;

  sendEmail({
    to: email,
    subject: 'Verify your Quicklancers account',
    html: `
      <div style="font-family:Inter,sans-serif;max-width:520px;margin:0 auto;padding:32px 24px;background:#f8fafc;border-radius:12px;">
        <div style="text-align:center;margin-bottom:28px;">
          <span style="font-size:28px;font-weight:800;color:#1dbf73;">⚡ Quicklancer</span>
        </div>
        <div style="background:#fff;border-radius:10px;padding:32px;border:1px solid #e2e8f0;">
          <h2 style="margin:0 0 12px;font-size:22px;color:#0f172a;">Welcome, ${name}!</h2>
          <p style="color:#64748b;font-size:15px;line-height:1.6;margin:0 0 24px;">
            Thanks for signing up. Please verify your email address to activate your account.
          </p>
          <a href="${verifyUrl}" style="display:inline-block;background:#1dbf73;color:#fff;font-weight:700;font-size:15px;padding:14px 32px;border-radius:8px;text-decoration:none;">
            Verify my email
          </a>
          <p style="color:#94a3b8;font-size:12px;margin:24px 0 0;line-height:1.5;">
            This link expires in 24 hours. If you didn't create an account, you can safely ignore this email.
          </p>
        </div>
      </div>
    `,
  });

  sendNotification(
    '🆕 New user registered on Quicklancers',
    `Name: ${name}\nEmail: ${email}\nTime: ${new Date().toLocaleString()}`
  );
  res.status(201).json({ message: 'Account created. Please check your email to verify your account.' });
});

app.get('/api/auth/verify-email', async (req, res) => {
  const { token } = req.query;
  if (!token) return res.status(400).json({ message: 'Missing token' });

  const { rows } = await pool.query('SELECT * FROM users WHERE verify_token = $1', [token]);
  const user = rows[0];
  if (!user) return res.status(400).json({ message: 'Invalid or expired verification link.' });

  await pool.query('UPDATE users SET email_verified = 1, verify_token = NULL WHERE id = $1', [user.id]);
  const { password: _p, verify_token: _t, ...safeUser } = user;
  res.json({ user: { ...safeUser, email_verified: 1 }, token: `mock-token-${user.id}` });
});

app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  const { rows } = await pool.query('SELECT * FROM users WHERE email = $1 AND password = $2', [email, password]);
  const user = rows[0];
  if (!user) return res.status(401).json({ message: 'Invalid email or password' });
  const { password: _p, verify_token: _t, ...safeUser } = user;
  sendNotification(
    '🔑 User logged in on Quicklancers',
    `Name: ${user.name}\nEmail: ${email}\nTime: ${new Date().toLocaleString()}`
  );
  res.json({ user: safeUser, token: `mock-token-${user.id}` });
});

app.post('/api/auth/forgot-password', async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: 'Email is required' });

  const { rows } = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
  const user = rows[0];
  // Always respond with success to prevent email enumeration
  if (!user) return res.json({ message: 'If that email is registered, a reset link has been sent.' });

  const token = require('crypto').randomBytes(32).toString('hex');
  const expiry = Date.now() + 60 * 60 * 1000; // 1 hour from now
  await pool.query('UPDATE users SET reset_token = $1, reset_token_expiry = $2 WHERE id = $3', [token, expiry, user.id]);

  const origin = req.headers.origin || 'http://localhost:3000';
  const resetUrl = `${origin}/reset-password?token=${token}`;

  sendEmail({
    to: email,
    subject: 'Reset your Quicklancers password',
    html: `
      <div style="font-family:Inter,sans-serif;max-width:520px;margin:0 auto;padding:32px 24px;background:#f8fafc;border-radius:12px;">
        <div style="text-align:center;margin-bottom:28px;">
          <span style="font-size:28px;font-weight:800;color:#1dbf73;">⚡ Quicklancer</span>
        </div>
        <div style="background:#fff;border-radius:10px;padding:32px;border:1px solid #e2e8f0;">
          <h2 style="margin:0 0 12px;font-size:22px;color:#0f172a;">Reset your password</h2>
          <p style="color:#64748b;font-size:15px;line-height:1.6;margin:0 0 24px;">
            We received a request to reset the password for your account. Click the button below to choose a new password.
          </p>
          <a href="${resetUrl}" style="display:inline-block;background:#1dbf73;color:#fff;font-weight:700;font-size:15px;padding:14px 32px;border-radius:8px;text-decoration:none;">
            Reset password
          </a>
          <p style="color:#94a3b8;font-size:12px;margin:24px 0 0;line-height:1.5;">
            This link expires in 1 hour. If you didn't request a password reset, you can safely ignore this email — your password will not change.
          </p>
        </div>
      </div>
    `,
  });

  res.json({ message: 'If that email is registered, a reset link has been sent.' });
});

app.post('/api/auth/reset-password', async (req, res) => {
  const { token, password } = req.body;
  if (!token || !password) return res.status(400).json({ message: 'Token and new password are required' });
  if (password.length < 8) return res.status(400).json({ message: 'Password must be at least 8 characters' });

  const { rows } = await pool.query('SELECT * FROM users WHERE reset_token = $1', [token]);
  const user = rows[0];
  if (!user) return res.status(400).json({ message: 'Invalid or expired reset link.' });
  if (Date.now() > Number(user.reset_token_expiry)) {
    await pool.query('UPDATE users SET reset_token = NULL, reset_token_expiry = NULL WHERE id = $1', [user.id]);
    return res.status(400).json({ message: 'This reset link has expired. Please request a new one.' });
  }

  await pool.query('UPDATE users SET password = $1, reset_token = NULL, reset_token_expiry = NULL WHERE id = $2', [password, user.id]);
  res.json({ message: 'Password updated successfully.' });
});

app.get('/api/stats', (req, res) => {
  res.json({
    totalFreelancers: 24800,
    totalClients: 71200,
    totalGigs: 156000,
    countriesServed: 180,
  });
});

app.post('/api/create-checkout-session', async (req, res) => {
  const { lineItems, gigTitle, successData } = req.body;
  // lineItems: [{ name, price (in dollars), quantity }]
  if (!lineItems || lineItems.length === 0) return res.status(400).json({ message: 'No items' });

  const origin = req.headers.origin || 'http://localhost:3000';

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: lineItems.map(item => ({
        price_data: {
          currency: 'eur',
          product_data: { name: item.name },
          unit_amount: Math.round(item.price * 100),
        },
        quantity: item.quantity || 1,
      })),
      success_url: `${origin}/order-success?session_id={CHECKOUT_SESSION_ID}&data=${encodeURIComponent(JSON.stringify(successData))}`,
      cancel_url: `${origin}/order-cancelled`,
      metadata: { gigTitle },
    });
    res.json({ url: session.url });
  } catch (err) {
    console.error('Stripe checkout error:', err.message);
    res.status(500).json({ message: err.message });
  }
});

app.post('/api/notify/order', async (req, res) => {
  const { sellerUserId, buyerName, gigTitle, orderId, packageName, price } = req.body;
  if (!sellerUserId || !orderId) return res.status(400).json({ message: 'Missing fields' });

  const { rows } = await pool.query('SELECT name, email FROM users WHERE id = $1', [sellerUserId]);
  const seller = rows[0];
  if (!seller) {
    // Mock seller — no registered email, nothing to send
    return res.json({ ok: true, skipped: true });
  }

  const subject = `New Order Received — ${orderId}`;
  const text = `Hello ${seller.name},

You have received a new service purchase on Quicklancers!

Order Details:
  Order ID:  ${orderId}
  Service:   ${gigTitle}${packageName ? `\n  Package:   ${packageName}` : ''}${price ? `\n  Amount:    $${price}` : ''}
  Buyer:     ${buyerName}
  Date:      ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}

Please log in to your Quicklancers inbox to review the order and get in touch with your buyer.

Thank you for being part of Quicklancers!
— The Quicklancers Team`;

  sendEmail({ to: seller.email, subject, text });
  res.json({ ok: true });
});

app.post('/api/help', (req, res) => {
  const { email, subject, message } = req.body;
  if (!email || !subject || !message)
    return res.status(400).json({ message: 'All fields are required' });

  sendEmail({
    to: process.env.NOTIFY_EMAIL,
    subject: `[Help Center] ${subject}`,
    html: `<p><strong>From:</strong> ${email}</p><p>${message}</p>`,
  });
  res.json({ ok: true });
});

app.listen(PORT, () => {
  console.log(`Quicklancer API running on http://localhost:${PORT}`);
});
