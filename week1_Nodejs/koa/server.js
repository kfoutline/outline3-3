const Koa = require('koa');
const static = require('koa-static');

const {PORT} = require('../src/config.json');

const routers = require('./routers');

const app = new Koa();

// 静态资源服务器
app.use(static('./'))
app.use(routers)

app.listen(PORT,()=>{
    console.log('server is running on http://localhost:%s',PORT);
})
