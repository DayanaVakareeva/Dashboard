"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var cors = require("cors");
var http_proxy_middleware_1 = require("http-proxy-middleware");

/**
 * Express application instance.
 * @type {Express.Application}
 */
var app = express();

// Enable CORS
app.use(cors());

/**
 * Proxy middleware for '/line-chart' route.
 */
app.use('/line-chart', (0, http_proxy_middleware_1.createProxyMiddleware)({
    target: 'https://interview-react-e81dacfd5324.herokuapp.com/line-chart-data',
    changeOrigin: true,
}));

/**
 * Proxy middleware for '/pie-chart' route.
 */
app.use('/pie-chart', (0, http_proxy_middleware_1.createProxyMiddleware)({
    target: 'https://interview-react-e81dacfd5324.herokuapp.com/pie-chart-data',
    changeOrigin: true,
}));

/**
 * Proxy middleware for '/top-orders' route.
 */
app.use('/top-orders', (0, http_proxy_middleware_1.createProxyMiddleware)({
    target: 'https://interview-react-e81dacfd5324.herokuapp.com/orders?limit=5',
    changeOrigin: true,
}));

/**
 * Proxy middleware for '/orders' route.
 */
app.use('/orders', (0, http_proxy_middleware_1.createProxyMiddleware)({
    target: 'https://interview-react-e81dacfd5324.herokuapp.com/orders',
    changeOrigin: true,
}));

// Start the server
app.listen(3000, function () {
    console.log('Proxy server running on http://localhost:3000');
});
