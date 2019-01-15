const http = require('http');
const querystring = require('querystring');

//获取文件头函数，用获取cookie作为示例
let getHeader = (reqClient) => {
    let headers = reqClient.headers; 
    headers.path = reqClient.path;
    headers.query = reqClient.query;
    headers.cookie = reqClient.get('cookie') || '';

    return headers;
}

//代理函数，返回值是函数
let proxy = (options) => {
    let reqOptions = {
        hostname: options.host,
        port: options.port
    }
    //返回一个函数
    return function (reqClient, resClient) {
        let headers = getHeader(reqClient);
        reqOptions.headers = reqClient.headers;
        let query = [];
        if (headers.query) {
            Object.keys(headers.query).map(key => {
                query.push(key + '=' + headers.query[key]);
            });
            reqOptions.path = headers.path + (query.length === 0 ? '' : ('?' + query.join('&')));
            
        }
        reqOptions.cookie = headers.cookie;
        reqOptions.method = reqClient.method;
        //向目标服务器发送请求
        let reqProxy = http.request(reqOptions, (resProxy) => {
            if (resProxy.statusCode === 200) {
                resProxy.setEncoding('utf8');
                //设置返回http头
                resClient.set(resProxy.headers);
                //向浏览器写数据。
                resProxy.on('data', (chunk) => {
                    resClient.write(chunk);
                });
                resProxy.on('end', () => {
                    resClient.end();
                });
            } else {
                resClient.status(400).send('Bad Request');
            }
        });
        //请求目标服务器错误处理
        reqProxy.on('error', (err) => {
            resClient.status(400).send('Bad Request');
            console.error(`a request error occurred: ${err.message}`);
        });
    
        //文件上传代理，向目标服务器写数据
        reqClient.on('data', (chunk) => {
            reqProxy.write(chunk);
        });
        reqClient.on('end', () => {
            reqProxy.end();
        });
        
        //普通JSON数据代理
         if (Object.keys(reqClient.body).length) {
             reqProxy.write(querystring.stringify(reqClient.body));
             reqProxy.end();
         }
    }
}

module.exports = proxy;