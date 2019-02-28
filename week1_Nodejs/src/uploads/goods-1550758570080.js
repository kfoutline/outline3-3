const http = require('http');
const fs = require('fs');
const url = require('url');
const path = require('path');

const mime = require('./js/mime');

const PORT = 3003;

http.createServer(function(req,res){
	let params = url.parse(req.url,true);
	let pathname = params.pathname;
	console.log('pathname:',pathname)

	if(pathname == '/favicon.ico') return;

	let realPath = path.join(__dirname,pathname);



		fs.stat(realPath,(err,stats)=>{
			res.writeHead(200,{'content-type':'application/json;charset=utf-8'});
			if(err){
				res.end(JSON.stringify({code:404,data:[],msg:'路径不存在'}));
				return;
			}
			// 如果为文件夹，列举文件内容
			if(stats.isDirectory()){
				fs.readdir(realPath,(err,files)=>{
					files = files.map(file=>{
						let extname = path.extname(file);
						return {name:file,type:extname?'file':'folder'}
					})
					res.end(JSON.stringify({code:200,data:files,msg:'读取目录成功'}));
				});
				return;
			}

			// 读取文件数据
			fs.readFile(realPath,function(err,data){
				let extname = path.extname(realPath).slice(1);
				res.writeHead(200,{'content-type':mime[extname]+';charset=utf-8'});
				if(err){
					res.end(JSON.stringify({code:404,data:[],msg:'读取文件错误'}));
					return;
				}
				res.end(data);
			})
		})


}).listen(PORT,function(){
	console.log('服务器已经开启，请访问http://localhost:'+PORT);
});