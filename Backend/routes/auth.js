const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../modal/User');

const router = express.Router();

// Login Route
router.post('/login', async (req, res) => {
  const { userName, password } = req.body;
  const user = await User.findOne({ userName });

  if (!user) {
    return res.status(400).json({ message: 'Invalid login details' });
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(400).json({ message: 'Invalid login details' });
  }

  const token = jwt.sign({ id: user._id }, 'secretKey', { expiresIn: '1h' });

  res.json({ token, userName: user.userName });
});

// Signup Route
router.post('/signup', async (req, res) => {
  const { userName, password } = req.body;
  const existingUser = await User.findOne({ userName });

  if (existingUser) {
    return res.status(400).json({ message: 'Username already exists' });
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = new User({
    userName,
    password: hashedPassword,
  });

  await newUser.save();

  const token = jwt.sign({ id: newUser._id }, 'secretKey', { expiresIn: '1h' });

  res.json({ token, userName: newUser.userName });
});

module.exports = router;
