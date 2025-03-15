const express = require('express');
const ejs = require('ejs');

const app = express();

// Endpoint untuk rendering dokumen
app.get('/render', (req, res) => {
  const { content } = req.query;
  if (!content) {
    return res.status(400).json({ error: 'Content is required' });
  }
  const html = ejs.render('<%= content %>', { content });
  res.send(html);
});

// Jalankan server
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Rendering Service running on port ${PORT}`);
});