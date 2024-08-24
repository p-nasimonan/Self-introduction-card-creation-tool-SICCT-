
const { proxy } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(process.env.GENSHIN_API_CONTEXT, proxy({ target: process.env.GENSHIN_API_URL,changeOrigin: true,secure: false}));
};   