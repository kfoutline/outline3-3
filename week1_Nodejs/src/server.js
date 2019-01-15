let http = require('http');
const fs = require('fs');

// 引入url模块，用于url地址格式化
let url = require('url');

// 引入querystring模块，用于GET/POST请求数据格式化
let qs = require('querystring');

let path = require('path');

//请求js目录下的index.js或package.json文件中main属性对应的文件
let mime = require('./js');

console.log(process.env);
// 创建静态资源服务器
let app = http.createServer((req,res)=>{


	// 格式化url，并格式化url中的search参数
	let urlObj = url.parse(req.url,true);

	// 获取路径
	let pathname = urlObj.pathname;

	// 接口
	if(pathname.startsWith('/api')){
		// 获取请求类型
		let type = req.method.toUpperCase();

		if(type === 'GET'){
			let data = '';
			switch(pathname){
				// 过滤小图标
				case '/api/football':
					res.writeHead(200,{
						'Content-Type':mime['json']
					});
					data = require('./static/data/football.json');
					data = JSON.stringify(data);
					break;
				default:
					res.writeHead(404,{
						'Content-Type':'text/plain'
					})
					data = 'url ' +pathname+ ' is not found!';
			}
			res.end(data);
		}else if(type === 'POST'){
			let data = '';

			// 接受数据
			req.on('data',chunk=>{
				data += chunk;
			});


			// 接收完毕
			req.on('end',()=>{
				// 格式化post数据
				data = qs.parse(data);

				res.end('post end');
			});


		}
	}else{
		// 得到扩展名
		let extname = path.extname(pathname).substring(1);

		// 获取真实路径
		let realpath = path.join(__dirname,pathname);

		// 如果有扩展名，则路由到/static/目录下访问相应文件
		// 否则获取当前目录下的index.html文件
		if(extname){
			extname!='html' && (realpath = path.join(__dirname,'/static', pathname));
		}else{
			realpath = path.join(__dirname,pathname,'/index.html');
		}
		
		console.log('realpath:',realpath);
		fs.readFile(realpath,(err,data)=>{
			// 如果读取文件错误，则抛出404
			if(err){
				res.writeHead(404,{'content-type':'text/html;charset=utf8'});
				fs.readFile('./static/404.html',function(err,data){
					if(err) {
						throw err;
						return;
					}
					res.end(data);
				});
				return;
			}

			// 正确读取文件
			res.writeHead(200,{'content-type':mime[extname] + ';charset=utf8'});
			res.end(data);
		})
	}
});

let PORT = 2000;
app.listen(PORT,()=>{
	console.log('http://localhost:%s',PORT);
});