var http = require('http');
var fs = require('fs');
var url = require('url');
var path = require('path');

var imgs = '.jpg,.jpeg,.png,.gif,.bmp';
var PORT = 3003;

http.createServer(function(req,res){
	var params = url.parse(req.url,true);
	var pathname = decodeURI(params.pathname);
	if(pathname == '/favicon.ico') return;console.log('pathname:',pathname)

	var realPath = pathname;console.log(realPath)

	//ajax接口
	if(/^\/photo(.*)/i.test(pathname)){
		realPath = RegExp.$1;
		/*switch(realPath){
			case '/':
				read('./',res);
				break;
			default:
				read('.' + realPath,res);
		}*/
		read(realPath,res);
	}
	// 静态服务器
	else{
		if(/^\/img(.+)/i.test(pathname)){
			realPath = RegExp.$1;
		}

		fs.stat('./'+realPath,function(err,stats){
			res.writeHead(200,{'content-type':'text/html;charset=utf-8'});
			if(err){
				res.end('无法获取文件信息');
				return;
			}
			// 如果为文件夹，自动加上index.html
			if(stats.isDirectory()){
				realPath += 'index.html'
			}console.log(realPath);

			// 读取文件数据
			fs.readFile('./'+realPath,function(err,data){
				res.writeHead(200,{'content-type':'text/html;charset=utf-8'});
				if(err){
					res.end('文件读取错误...');
					return;
				}
				res.end(data);
			})
		})
	}


}).listen(PORT,function(){
	console.log('服务器已经开启，请访问http://localhost:'+PORT);
});

function read(realPath,res){console.log('read:' + realPath)
	var arr_file = [];
	var arr_dir = [];
	fs.readdir('.'+realPath,function(err,files){
		res.writeHead(200,{'content-type':'text/plain;charset=utf-8'});
		if(err){
			res.end('文件夹路径错误');
			return;
		}
		files.forEach(function(file){
			// 利用扩展名来判断是文件还是文件夹
			var extname = path.extname(file);console.log('ext:',extname)
			if(extname){
				if(imgs.match(extname)){
					arr_file.push(file);
				}
			}else{
				arr_dir.push(file);
			}
		})
		res.end(JSON.stringify({file:arr_file,dir:arr_dir,path:realPath}));
	});
}