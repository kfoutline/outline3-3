const fs = require('fs');
const http = require('http');
const url = require('url');

http.createServer((req,res)=>{
    let urlObject = url.parse(req.url);
    if(urlObject.path.startsWith('/pic')){
        let path = urlObject.path.replace('/pic','./img')
        fs.readFile(path,(err,data)=>{
            // if(err) throw Error('file is not found');
            if(err) {
                console.log('file is not found');
                res.end('file is not found');
                return;
            }
            res.writeHead(200,'image/jpeg');
            res.write(data);
            res.end();
        })
    }
}).listen(3004,()=>{
    console.log('server is runing on port 3004')
})

