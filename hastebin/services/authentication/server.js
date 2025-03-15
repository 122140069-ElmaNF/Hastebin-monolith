const express = require('express');
const redis = require('redis');

const app = express();
app.use(express.json());

// Koneksi ke Redis untuk autentikasi
const redisClient = redis.createClient({ host: 'redis-auth', port: 6380 });
redisClient.on('error', (err) => console.error('Redis error:', err));

// Endpoint untuk registrasi pengguna
app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  redisClient.hset('users', username, password, (err) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to register user' });
    }
    res.json({ message: 'User registered successfully' });
  });
});

// Endpoint untuk login pengguna
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  redisClient.hget('users', username, (err, storedPassword) => {
    if (err || !storedPassword || storedPassword !== password) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    res.json({ token: 'generated-jwt-token' });
  });
});

// Jalankan server
const PORT = 3002;
app.listen(PORT, () => {
  console.log(`Authentication Service running on port ${PORT}`);
});