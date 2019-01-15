const request = require('request');
const fs = require('fs');
const cheerio = require('cheerio');
const path = require('path');

let spider = (url) => {
    return new Promise((resolve, reject) => {
        request(url, (error, response, body) => {
            if(error) {
                reject('获取失败');
            }else{
                resolve(body);
            }
            
        })
    })
}

let start = async () => {
    try{
        let dom = await spider('http://www.lanrentuku.com/');
        let $ = cheerio.load(dom);

        if(!fs.existsSync('./img')){
            fs.mkdirSync('img');
        }
        $('img', '.in-ne').each((i, e) => {
            let src = $(e).attr('src');
            // let name = src.substr(src.lastIndexOf('/') + 1);
            let filename = path.basename(src);console.log(src,filename)
            
            request(src).pipe(fs.createWriteStream('./img/'+filename));
        })

    }catch(err){
        console.log(err);
    }
}

start();