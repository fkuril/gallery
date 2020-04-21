require('dotenv').config();

const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

const UNSPLASH_CLIENT_ID = process.env.UNSPLASH_CLIENT_ID;

if (!UNSPLASH_CLIENT_ID) {
  console.log('Please provide UNSPLASH_CLIENT_ID environment variable');
  process.exit(1);
}

app.use(express.static('dist'));

app.use(
  '/api',
  createProxyMiddleware({
    target: 'https://api.unsplash.com',
    pathRewrite: { '^/api': '' },
    changeOrigin: true,
    onProxyReq: proxyReq => {
      proxyReq.setHeader('Authorization', `Client-ID ${UNSPLASH_CLIENT_ID}`);
      proxyReq.setHeader('Accept-Version', 'v1');
    },
  }),
);

app.listen(3000, () => {
  console.log('\nDev server started at http://localhost:3000\n');
});
