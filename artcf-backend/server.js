const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const fs = require('fs');
const rateLimit = require('express-rate-limit');

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'artcf-admin-secret-key-2024-dev-only';

if (!process.env.JWT_SECRET) {
  console.warn('⚠️  JWT_SECRET not set in .env — using insecure default. Set it before going to production.');
}

// ── Data helpers ──
const dataDir = path.join(__dirname, 'data');
const readJSON = (file) => JSON.parse(fs.readFileSync(path.join(dataDir, file), 'utf-8'));
const writeJSON = (file, data) => fs.writeFileSync(path.join(dataDir, file), JSON.stringify(data, null, 2));

// ── Middleware ──
const allowedOrigins = (process.env.ALLOWED_ORIGINS || 'http://localhost:3000,http://localhost:3001')
  .split(',').map(o => o.trim());

app.use(cors({
  origin: (origin, cb) => {
    if (!origin || allowedOrigins.includes(origin)) return cb(null, true);
    cb(new Error('Not allowed by CORS'));
  },
}));
app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({ extended: true }));

// ── Security headers ──
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  next();
});

// ── Rate limiters ──
const contactLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 5, message: { error: 'Too many messages sent. Please try again in 15 minutes.' } });
const loginLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 10, message: { error: 'Too many login attempts. Please try again in 15 minutes.' } });
const newsletterLimiter = rateLimit({ windowMs: 60 * 60 * 1000, max: 3, message: { error: 'Too many subscribe attempts. Please try again later.' } });

// ── Auth middleware ──
function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Authentication required' });
  }
  try {
    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, JWT_SECRET);
    req.admin = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
}

// ── Input sanitizer (strip HTML tags) ──
const sanitize = (str) => typeof str === 'string' ? str.replace(/<[^>]*>/g, '').trim() : str;

// ── Email transporter ──
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER || 'artcfr@gmail.com',
    pass: process.env.EMAIL_PASS || '',
  },
});

// ══════════════════════════════════════════
// PUBLIC ROUTES
// ══════════════════════════════════════════

app.get('/', (req, res) => {
  res.json({ status: 'ok', message: 'ARTCF Backend API is running', version: '2.0.0' });
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'healthy', timestamp: new Date().toISOString() });
});

// ── Public: Events ──
app.get('/api/events', (req, res) => {
  const events = readJSON('events.json');
  const { category } = req.query;
  const filtered = category ? events.filter(e => e.category === category) : events;
  res.json({ count: filtered.length, events: filtered });
});

// ── Public: Programs ──
app.get('/api/programs', (req, res) => {
  const programs = readJSON('programs.json');
  res.json(programs);
});

// ── Public: Content ──
app.get('/api/content', (req, res) => {
  const content = readJSON('content.json');
  res.json(content);
});

// ── Contact Form ──
app.post('/api/contact', contactLimiter, async (req, res) => {
  const name = sanitize(req.body.name);
  const email = sanitize(req.body.email);
  const phone = sanitize(req.body.phone);
  const subject = sanitize(req.body.subject);
  const message = sanitize(req.body.message);
  const type = sanitize(req.body.type);

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: 'Name, email, subject, and message are required.' });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: 'Please provide a valid email address.' });
  }
  if (message.length > 5000) {
    return res.status(400).json({ error: 'Message is too long (max 5000 characters).' });
  }

  const messages = readJSON('messages.json');
  const entry = {
    id: Date.now(),
    name, email, phone, subject, message, type,
    read: false,
    createdAt: new Date().toISOString()
  };
  messages.unshift(entry);
  writeJSON('messages.json', messages);

  console.log('📨 New contact message:', entry.subject);

  try {
    if (process.env.EMAIL_PASS) {
      await transporter.sendMail({
        from: `"ARTCF Website" <${process.env.EMAIL_USER}>`,
        to: process.env.EMAIL_USER || 'artcfr@gmail.com',
        subject: `[Website Message] ${subject} – ${type}`,
        html: `
          <div style="font-family:sans-serif;max-width:600px;margin:0 auto;border:1px solid #eee;border-radius:10px;overflow:hidden">
            <div style="background:#1a5276;padding:24px;color:white">
              <h2 style="margin:0">New Message from ARTCF Website</h2>
            </div>
            <div style="padding:28px">
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> ${email}</p>
              ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
              <p><strong>Type:</strong> ${type}</p>
              <p><strong>Subject:</strong> ${subject}</p>
              <hr style="border:none;border-top:1px solid #eee;margin:16px 0"/>
              <p><strong>Message:</strong></p>
              <p style="background:#f9f9f9;padding:16px;border-radius:8px;white-space:pre-wrap">${message}</p>
            </div>
          </div>
        `,
      });
    }
  } catch (err) {
    console.warn('Email send failed:', err.message);
  }

  res.json({ success: true, message: 'Your message has been received.', id: entry.id });
});

// ── Newsletter Subscription ──
app.post('/api/newsletter', newsletterLimiter, (req, res) => {
  const email = sanitize(req.body.email)?.toLowerCase();
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: 'Valid email is required.' });
  }
  const subscribers = readJSON('subscribers.json');
  const exists = subscribers.find(s => s.email.toLowerCase() === email);
  if (exists) return res.json({ success: true, message: 'You are already subscribed!' });

  subscribers.unshift({ id: Date.now(), email, subscribedAt: new Date().toISOString() });
  writeJSON('subscribers.json', subscribers);
  console.log('📧 New subscriber:', email);
  res.json({ success: true, message: 'Thank you for subscribing!' });
});


// ══════════════════════════════════════════
// ADMIN ROUTES
// ══════════════════════════════════════════

// ── Login ──
app.post('/api/admin/login', loginLimiter, (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required.' });
  }

  const admin = readJSON('admin.json');
  if (email !== admin.email) {
    return res.status(401).json({ error: 'Invalid credentials.' });
  }

  const valid = bcrypt.compareSync(password, admin.password);
  if (!valid) {
    return res.status(401).json({ error: 'Invalid credentials.' });
  }

  const token = jwt.sign({ email: admin.email, name: admin.name }, JWT_SECRET, { expiresIn: '24h' });
  res.json({ success: true, token, name: admin.name, email: admin.email });
});

// ── Verify Token ──
app.get('/api/admin/verify', authMiddleware, (req, res) => {
  res.json({ valid: true, admin: req.admin });
});

// ── Dashboard Stats ──
app.get('/api/admin/stats', authMiddleware, (req, res) => {
  const events = readJSON('events.json');
  const programs = readJSON('programs.json');
  const messages = readJSON('messages.json');
  const subscribers = readJSON('subscribers.json');

  const totalPrograms = (programs.education?.length || 0) + (programs.healthcare?.length || 0) + (programs.economic?.length || 0);
  const unreadMessages = messages.filter(m => !m.read).length;

  res.json({
    events: { total: events.length, upcoming: events.filter(e => e.category === 'upcoming').length, past: events.filter(e => e.category === 'past').length },
    programs: { total: totalPrograms },
    messages: { total: messages.length, unread: unreadMessages },
    subscribers: { total: subscribers.length },
    recentMessages: messages.slice(0, 5),
    recentSubscribers: subscribers.slice(0, 5),
  });
});

// ── Admin: Events CRUD ──
app.get('/api/admin/events', authMiddleware, (req, res) => {
  const events = readJSON('events.json');
  res.json({ count: events.length, events });
});

app.post('/api/admin/events', authMiddleware, (req, res) => {
  const events = readJSON('events.json');
  const newEvent = { id: Date.now(), ...req.body };
  events.unshift(newEvent);
  writeJSON('events.json', events);
  res.json({ success: true, event: newEvent });
});

app.put('/api/admin/events/:id', authMiddleware, (req, res) => {
  const events = readJSON('events.json');
  const idx = events.findIndex(e => e.id === parseInt(req.params.id));
  if (idx === -1) return res.status(404).json({ error: 'Event not found' });
  events[idx] = { ...events[idx], ...req.body, id: events[idx].id };
  writeJSON('events.json', events);
  res.json({ success: true, event: events[idx] });
});

app.delete('/api/admin/events/:id', authMiddleware, (req, res) => {
  let events = readJSON('events.json');
  const len = events.length;
  events = events.filter(e => e.id !== parseInt(req.params.id));
  if (events.length === len) return res.status(404).json({ error: 'Event not found' });
  writeJSON('events.json', events);
  res.json({ success: true });
});

// ── Admin: Programs CRUD ──
app.get('/api/admin/programs', authMiddleware, (req, res) => {
  const programs = readJSON('programs.json');
  res.json(programs);
});

app.post('/api/admin/programs', authMiddleware, (req, res) => {
  const programs = readJSON('programs.json');
  const { category, ...data } = req.body;
  if (!programs[category]) return res.status(400).json({ error: 'Invalid category' });
  const newProgram = { id: Date.now(), ...data };
  programs[category].push(newProgram);
  writeJSON('programs.json', programs);
  res.json({ success: true, program: newProgram });
});

app.put('/api/admin/programs/:id', authMiddleware, (req, res) => {
  const programs = readJSON('programs.json');
  const { category, ...data } = req.body;
  let found = false;
  for (const cat of Object.keys(programs)) {
    const idx = programs[cat].findIndex(p => p.id === parseInt(req.params.id));
    if (idx !== -1) {
      if (category && category !== cat) {
        programs[cat].splice(idx, 1);
        programs[category].push({ ...programs[cat][idx], ...data, id: parseInt(req.params.id) });
      } else {
        programs[cat][idx] = { ...programs[cat][idx], ...data, id: programs[cat][idx].id };
      }
      found = true;
      break;
    }
  }
  if (!found) return res.status(404).json({ error: 'Program not found' });
  writeJSON('programs.json', programs);
  res.json({ success: true });
});

app.delete('/api/admin/programs/:id', authMiddleware, (req, res) => {
  const programs = readJSON('programs.json');
  let found = false;
  for (const cat of Object.keys(programs)) {
    const idx = programs[cat].findIndex(p => p.id === parseInt(req.params.id));
    if (idx !== -1) {
      programs[cat].splice(idx, 1);
      found = true;
      break;
    }
  }
  if (!found) return res.status(404).json({ error: 'Program not found' });
  writeJSON('programs.json', programs);
  res.json({ success: true });
});

// ── Admin: Messages ──
app.get('/api/admin/messages', authMiddleware, (req, res) => {
  const messages = readJSON('messages.json');
  res.json({ count: messages.length, unread: messages.filter(m => !m.read).length, messages });
});

app.put('/api/admin/messages/:id/read', authMiddleware, (req, res) => {
  const messages = readJSON('messages.json');
  const msg = messages.find(m => m.id === parseInt(req.params.id));
  if (!msg) return res.status(404).json({ error: 'Message not found' });
  msg.read = true;
  writeJSON('messages.json', messages);
  res.json({ success: true });
});

app.delete('/api/admin/messages/:id', authMiddleware, (req, res) => {
  let messages = readJSON('messages.json');
  const len = messages.length;
  messages = messages.filter(m => m.id !== parseInt(req.params.id));
  if (messages.length === len) return res.status(404).json({ error: 'Message not found' });
  writeJSON('messages.json', messages);
  res.json({ success: true });
});

// ── Admin: Subscribers ──
app.get('/api/admin/subscribers', authMiddleware, (req, res) => {
  const subscribers = readJSON('subscribers.json');
  res.json({ count: subscribers.length, subscribers });
});

app.delete('/api/admin/subscribers/:id', authMiddleware, (req, res) => {
  let subscribers = readJSON('subscribers.json');
  const len = subscribers.length;
  subscribers = subscribers.filter(s => s.id !== parseInt(req.params.id));
  if (subscribers.length === len) return res.status(404).json({ error: 'Subscriber not found' });
  writeJSON('subscribers.json', subscribers);
  res.json({ success: true });
});

// ── Admin: Content ──
app.get('/api/admin/content', authMiddleware, (req, res) => {
  const content = readJSON('content.json');
  res.json(content);
});

app.put('/api/admin/content', authMiddleware, (req, res) => {
  const current = readJSON('content.json');
  const updated = { ...current, ...req.body };
  writeJSON('content.json', updated);
  res.json({ success: true, content: updated });
});

// ── ERROR HANDLING ──
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong. Please try again.' });
});

app.use((req, res) => {
  res.status(404).json({ error: 'Route not found.' });
});

// ── START ──
app.listen(PORT, () => {
  console.log(`\n🚀 ARTCF Backend API v2.0 running on http://localhost:${PORT}`);
  console.log(`📋 Public API Endpoints:`);
  console.log(`   GET  /api/events     – List events`);
  console.log(`   GET  /api/programs   – List programs`);
  console.log(`   GET  /api/content    – Site content`);
  console.log(`   POST /api/contact    – Contact form`);
  console.log(`   POST /api/newsletter – Newsletter signup`);
  console.log(`🔐 Admin API:`);
  console.log(`   POST /api/admin/login        – Admin login`);
  console.log(`   GET  /api/admin/stats         – Dashboard stats`);
  console.log(`   CRUD /api/admin/events        – Manage events`);
  console.log(`   CRUD /api/admin/programs      – Manage programs`);
  console.log(`   GET  /api/admin/messages      – View messages`);
  console.log(`   GET  /api/admin/subscribers   – View subscribers`);
  console.log(`   PUT  /api/admin/content       – Update content\n`);
});
