const express = require('express');
const cors = require('cors');
const path = require('path');
const config = require('./config');
const { sequelize } = require('./models');

const authRoutes = require('./routes/auth');
const postsRoutes = require('./routes/posts');

const app = express();

const corsOptions = {
  origin: "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,     // if you use cookies or auth tokens
  allowedHeaders: ["Content-Type", "Authorization"],
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// static uploads
app.use('/uploads', express.static(path.join(process.cwd(), config.uploadDir || 'uploads')));

// mount API (prefix /api)
app.use('/api/auth', authRoutes);
app.use('/api/posts', postsRoutes);

// health
app.get('/api/health', (req, res) => res.json({ ok: true }));

// sync check route (danger: only for dev)
app.get('/api/debug/db', async (req, res) => {
  try {
    await sequelize.authenticate();
    res.json({ db: 'ok' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = app;
