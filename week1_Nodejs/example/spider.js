const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');
const http = require('http');


// 爬取这里的图片
let url = 'http://www.netbian.com/youxi/'

http.get(url,res=>{
    // res.setEncoding('utf-8') //防止中文乱码

    let html = ''
    res.on('data',function(chunk){
        html += chunk;    //监听data事件 每次取一块数据
    })
    res.on('end',function(){
        console.log(html);
        var $ = cheerio.load(html);  //获取数据完成后，解析html
        //将获取的图片存到images文件夹中
        $('#main .list a').each((idx,ele)=>{

            let src = $(ele).attr('href');
            if(src.startsWith('/')){
                let url = 'http://www.netbian.com'+src;

                http.get(url,res=>{
                    res.setEncoding('utf-8') //防止中文乱码

                    let html = ''
                    res.on('data',function(chunk){
                        html += chunk;    //监听data事件 每次取一块数据
                    })
                    res.on('end',function(){
                        var $ = cheerio.load(html);  //获取数据完成后，解析html

                        let url = $('.pic img').attr('src');
                        console.log('url:',url);
                        let filename = path.basename(url)
                        request(url).pipe(fs.createWriteStream('./img/'+filename));
                    });
                });
            }
            
        });
    });
});