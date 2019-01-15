const fs = require('fs');

fs.readFile('about.txt',(err,data)=>{
    console.log(data.toString('UTF-8'))
});

// fs.writeFile('about.txt','来来，甜甜圈',err=>{
//     if(err) console.log('写入失败');
//     console.log('写入成功');
// });


fs.appendFile('about.txt','\r2燃烧我的卡路里',err=>{
    if(err) throw Error('写入失败');
    console.log('写入成功')
})

