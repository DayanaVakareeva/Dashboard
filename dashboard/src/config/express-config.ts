import * as express from 'express';
import * as cors from 'cors';
import { createProxyMiddleware } from 'http-proxy-middleware';

/** Express application instance */
const app = express.default();

// Enable CORS
app.use(cors.default());

/** Proxy middleware for '/line-chart' route */
app.use('/line-chart', createProxyMiddleware({
  target: 'https://interview-react-e81dacfd5324.herokuapp.com/line-chart-data',
  changeOrigin: true,
}));

/** Proxy middleware for '/pie-chart' route */
app.use('/pie-chart', createProxyMiddleware({
  target: 'https://interview-react-e81dacfd5324.herokuapp.com/pie-chart-data',
  changeOrigin: true,
}));

/** Proxy middleware for '/top-orders' route */
app.use('/top-orders', createProxyMiddleware({
  target: 'https://interview-react-e81dacfd5324.herokuapp.com/orders?limit=5',
  changeOrigin: true,
}));

/** Proxy middleware for '/orders' route */
app.use('/orders', createProxyMiddleware({
  target: 'https://interview-react-e81dacfd5324.herokuapp.com/orders',
  changeOrigin: true,
}));

app.listen(3000, () => {
  console.log('Proxy server running on http://localhost:3000');
});