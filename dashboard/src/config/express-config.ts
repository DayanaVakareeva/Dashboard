import * as express from 'express';
import * as cors from 'cors';
import { createProxyMiddleware } from 'http-proxy-middleware';

const app = express();

app.use(cors());

app.use('/line-chart', createProxyMiddleware({
    target: 'https://interview-react-e81dacfd5324.herokuapp.com/line-chart-data',
    changeOrigin: true,
}));

app.use('/orders', createProxyMiddleware({
    target: 'https://interview-react-e81dacfd5324.herokuapp.com/orders',
    changeOrigin: true,
}));

app.listen(3000, () => {
  console.log('Proxy server running on http://localhost:3000');
});