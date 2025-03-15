const express = require('express');
const redis = require('redis');

const app = express();
app.use(express.json());

// Koneksi ke Redis untuk dokumen
const redisClient = redis.createClient({ host: 'redis-document', port: 6379 });
redisClient.on('error', (err) => console.error('Redis error:', err));

// Endpoint untuk menyimpan dokumen
app.post('/documents', async (req, res) => {
  const { content } = req.body;
  const key = generateUniqueKey();
  redisClient.set(key, content, (err) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to save document' });
    }
    res.json({ key });
  });
});

// Endpoint untuk mengambil dokumen
app.get('/documents/:key', async (req, res) => {
  const { key } = req.params;
  redisClient.get(key, (err, content) => {
    if (err || !content) {
      return res.status(404).json({ error: 'Document not found' });
    }
    res.json({ content });
  });
});

// Fungsi untuk menghasilkan key unik
function generateUniqueKey() {
  return Math.random().toString(36).substring(2, 10);
}

// Jalankan server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Document Storage Service running on port ${PORT}`);
});