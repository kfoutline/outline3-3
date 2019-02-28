'use strict';
const http = require('http');
const request = require('request');
const url = require('url');
const express = require('express');
// const proxy = require('express-http-proxy');
var proxy = require('http-proxy-middleware');

const {PORT} = require('./config.json');

let app = express();

app.use(express.static('./'))

app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");

    // 跨域请求CORS中的预请求
    if(req.method=="OPTIONS") {
      res.sendStatus(200);/*让options请求快速返回*/
    } else{
      next();
    }
});


 
// proxy middleware options 
var options = {
    target: 'http://www.juooo.com', // target host 
    changeOrigin: true,               // needed for virtual hosted sites 
    // ws: true,                         // proxy websockets 
    pathRewrite: {
        '^/proxy' : '/',     // rewrite path 
    },
    // router: {
    //     // when request.headers.host == 'dev.localhost:3000', 
    //     // override target 'http://www.example.org' to 'http://localhost:8000' 
    //     'dev.localhost:3000' : 'http://localhost:8000'
    // }
};
 
// create the proxy (without context) 
var exampleProxy = proxy(options);
 
// mount `exampleProxy` in web server 
app.use('/proxy', exampleProxy);
app.use('/jxapi', proxy({
    "target": "https://m.jiuxian.com",
    "changeOrigin": true,
    "pathRewrite": {
        "^/jxapi" : "/"
    }
}));

app.listen(PORT, function(){
    console.log('Server running on http://localhost:'+PORT);
});


// http.createServer((req,res)=>{
//     let data = url.parse(req.url,true).query;
//     res.writeHead(200,{'Access-Control-Allow-Origin':'*'});
//     request.get(data.url,(err,response,body)=>{
//         if(err){
//             res.end('获取数据失败');
//         }
//         res.end(body);
//     });
// }).listen(4004,()=>{
//     console.log('server is running on port 4004')
// });

