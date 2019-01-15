const express = require('express');
const fs = require('fs');

const app = express();

// 设置静态服务器
app.use(express.static('../',{
	maxAge:1000*60
}));

// 后端设置cookie
app.get('/setcookie',(req,res)=>{
	res.cookie('username','laoxie');
	// 重定向
	// res.redirect(302,'/r302');
	res.end('ok');
})

app.listen(3003,()=>{
	console.log('服务器启动成功:http://localhost:3003')
})