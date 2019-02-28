let express = require('express');
let http = require('http');
let ws = require('ws');
const {PORT} = require('./config.json');

let app = express();
let server = http.Server(app);
let socket = new ws.Server({
	server
	// port:3003
});

// 设置静态服务
app.use(express.static('./'));

server.listen(PORT,()=>{
	console.log('server start at http://localhost:'+PORT);
});

socket.on('connection', function (client) {
	// client.send(JSON.stringify({status:1,msg:'connect success'}));

	// 接收消息
    client.on('message', function (msg) {console.log(666)
    	// msg = JSON.parse(msg);

        //把客户端的消息广播给所有在线的用户
        socket.broadcast(msg);
    });

    // 退出聊天  
    client.on('close', function() {  
        //把客户端的消息广播给所有在线的用户
        socket.broadcast(JSON.stringify({status:0,data:'logout'}));  
    });  
});

//定义广播方法
socket.broadcast = function broadcast(msg) {  
    socket.clients.forEach(function(client) { 
        client.send(msg)
    });  
}; 