const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

// Arahkan rute ke layanan mikro
app.use('/documents', createProxyMiddleware({ target: 'http://document-storage:3000', changeOrigin: true }));
app.use('/render', createProxyMiddleware({ target: 'http://rendering:3001', changeOrigin: true }));
app.use('/auth', createProxyMiddleware({ target: 'http://authentication:3002', changeOrigin: true }));

// Jalankan server
const PORT = 8080;
app.listen(PORT, () => {
  console.log(`API Gateway running on port ${PORT}`);
});