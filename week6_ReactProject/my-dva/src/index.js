import dva from 'dva';
import './index.css';
import routers from './router';
import products from './models/products'

// 1. Initialize
const app = dva();

// 2. Plugins
// app.use({});

// 3. Model
app.model(products);

// 4. Router
app.router(routers);

// 5. Start
app.start('#root');
