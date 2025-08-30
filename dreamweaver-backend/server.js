const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB (local)
mongoose.connect('mongodb://localhost:27017/dreamweaver', { useNewUrlParser: true, useUnifiedTopology: true });

// Register endpoint
app.post('/api/register', async (req, res) => {
  const { name, email, password, mobile } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const user = await User.create({ name, email, password: hashedPassword, mobile });
    res.status(201).json({ message: 'User registered', user: { name: user.name, email: user.email } });
  } catch (err) {
    res.status(400).json({ error: 'Email already exists' });
  }
});

// Login endpoint
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ error: 'Invalid credentials' });
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });
  res.json({ message: 'Login successful', user: { name: user.name, email: user.email, role: user.role } });
});

// Admin: Get all users
app.get('/api/users', async (req, res) => {
  // In production, add authentication and admin check!
  const users = await User.find({}, '-password');
  res.json(users);
});

app.listen(5000, () => console.log('Server running on http://localhost:5000'));