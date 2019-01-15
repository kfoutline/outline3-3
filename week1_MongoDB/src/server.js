const express = require('express');
const app = express();

//引入配置文件
const {PORT} = require('./config.json');
const routers = require('./router');

// 模块化路由
app.use(express.static('./'),routers);


app.listen(PORT,()=>{
  console.log(`server is running on http://localhost:${PORT}`)
})