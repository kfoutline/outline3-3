const http = require('http');
const request = require('request');

http.createServer((req,response)=>{

    // http.get('http://www.baidu.com/img/baidu_jgylogo3.gif',function(res){
    //     // 设置编码格式
    //     // res.setEncoding('utf8');
    
    //     var html='';  
    //     console.log("已经发送请求");
    //      //通过req的data事件监听函数，每当接受到请求体的数据，就累加到post变量中
    //     res.on('data',function(data){
    //         console.log("\n\n\n");
    //         console.log("这次返回的数据是")		
    //         //注意，这儿返回的是buffer，具体看文档：http://nodejs.cn/api/buffer.html
    //         console.log(data);
    //         html+=data.toString('base64');  		
    //     });  
    //     //end事件
    //     res.on('end',function(){  
    //         console.log("\n\n\n"); 
    //         console.log("最后返回的整体数据是:");
    //         console.log(html);
    //         response.writeHead(200,{'content-type':'image/gif'})
    //         var decodedImage = new Buffer(html,'base64');
    //         response.end(decodedImage)	
    //     });  
    // });

    // request得到文件流，并导出到response（流：自动调用response.end()）
    request('http://www.baidu.com/img/baidu_jgylogo3.gif').pipe(response);
}).listen(888);

request('https://cnodejs.org/api/v1/topics?page=1&limit=10', (error, response, body) => {
      console.log(error, response,body)
  });