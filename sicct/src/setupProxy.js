const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(createProxyMiddleware('/genshin', {target: 'https://enka.network/api/uid/'}));
};