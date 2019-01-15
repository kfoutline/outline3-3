/*
	* 在本地根据指定端口启动一个http server，等待着来自客户端的请求
	* 当请求抵达时，根据请求的url，以设置的静态文件目录为base，映射得到文件位置
	* 检查文件是否存在
	* 如果文件不存在，返回404状态码，发送not found页面到客户端
	* 如果文件存在：
		* 打开文件待读取
		* 设置response header
		* 发送文件到客户端
	* 等待来自客户端的下一个请求


	所需模块
		* http
		* fs
		* querystring
 */

const http = require('http');
const path = require('path');
const fs = require('fs');

const config = require('./config');
const mime = require('./mime');

let start = ()=>{
	http.createServer((req,res)=>{console.log(req.url)
		let pathname = path.join(__dirname,config.root,path.normalize(req.url));

		// res.writeHead(200);
		// res.end(`${pathname}`);
		router(pathname,req,res);
	}).listen(config.port,err=>{
		if (err) {
            console.error(err);
            console.info('Failed to start server');
        } else {
            console.info(`Server started on http://localhost:${config.port}`);
        }
	});
}

// 路由
let router = (pathname,req,res)=>{console.log('router',pathname)
	fs.stat(pathname,(err,stat)=>{console.log(err,stat)
		if(err){
			notFound(req,res);
		}else{
			resFile(pathname,req,res);
		}
	})
}

// 404
let notFound = (req,res)=>{
	res.writeHead(404,{
		'Content-Type':'text/html;charset=utf-8'
	});
	res.end(`<h1>无法找到文件${req.url}</h1>`);
}

// 响应文件
let resFile = (pathname,req,res)=>{
	//读取文件，这里用的是流的形式createReadStream而不是readFile，
	//是因为后者会在得到完整文件内容之前将其先读到内存里。
	//这样万一文件很大，再遇上多个请求同时访问，readFile就承受不来了。
	//使用文件可读流，服务端不用等到数据完全加载到内存再发回给客户端，而是一边读一边发送分块响应
	// let readStream = fs.createReadStream(pathname);
	// res.setHeader('Content-Type',mime(pathname));
 //    readStream.pipe(res);
 	fs.readFile(pathname,(err,data)=>{console.log(data)
 		res.setHeader('Content-Type',mime(pathname));
 		res.end(data);
 	})
}

// 导出接口
module.exports = start