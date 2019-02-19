const http = require('http');
const fs = require('fs');
const url = require('url');
const path = require('path');

const mime = require('./js/mime');

const PORT = 3003;

http.createServer(function(req,res){
	let {pathname} = url.parse(req.url,true);
	
	console.log('pathname:',pathname)

	if(pathname == '/favicon.ico') res.end();

	let extname = path.extname(pathname).slice(1);
	let realPath = path.join(__dirname,pathname);


	// 如果有后缀名，则自己读取文件
	if(extname){
		// 读取文件数据
		fs.readFile(realPath,function(err,data){
				
			res.writeHead(200,{'content-type':mime[extname]+';charset=utf-8'});
			if(err){
				res.end(JSON.stringify({code:404,data:[],msg:'读取文件错误'}));
				return;
			}
			res.end(data);
		})
	}else{
		fs.readdir(realPath,(err,files)=>{
			res.setHeader('content-type','application/json')
			if(err){
				res.end(JSON.stringify({code:404,data:[],msg:'路径不存在'}));
				return;
			}
			files = files.map(file=>{
				let stats = fs.statSync(path.join(realPath,file));
				let isFolder = stats.isDirectory();
				if(isFolder){
					return {name:file,type:'folder'}
				}else{
					let {ext,name} = path.parse(file);
					// 获取当前文件距根路径的相对路径
					let relativePath = path.relative(__dirname,path.join(realPath,file));
					return {name,type:'file',path:relativePath}
				}
			});

			//过滤图片文件
			// let imgTypes = 'jpg,jpeg,png,gif,bmp'.split(',');
			// files = files.filter(item=>item.type=='folder' || item.ext && imgTypes.includes(item.ext.slice(1)));
			
			res.end(JSON.stringify({code:200,data:files,msg:'读取目录成功'}));
		});
	}


}).listen(PORT,function(){
	console.log('服务器已经开启，请访问http://localhost:'+PORT);
});