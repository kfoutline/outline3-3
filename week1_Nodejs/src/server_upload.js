/**
 * 上传服务器
 * express+multer
 */

const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const {PORT,upload_dir} = require('./config.json');

const app = express();

// 设置静态服务器
app.use(express.static('./',{
    // setHeaders : function(res,path,stat){
    //   res.setHeader('Cache-Control', 'max-age=' + 6000);
    // }
    maxAge:60*1000
}));

// 设置上传接口(简单模式)
// const uploadMiddleware = multer({ 
//     dest: upload_dir
// })

// 设置上传接口(diskStorage模式)
const storage = multer.diskStorage({
    // 必须先手动创建upload目录
    // destination:upload_dir,
    destination(req,file,cb){
        // 判断目录是否存在，无则自动创建
        try{
            fs.accessSync(upload_dir)
        }catch(err){
            fs.mkdir(upload_dir)
        }


        cb(null, upload_dir);
    },
    filename(req,file,cb){
        let ext = path.extname(file.originalname);
        cb(null, file.fieldname + '-' + Date.now() + ext);
    }
});
const uploadMiddleware = multer({storage});

// app.post('/upload',uploadMiddleware.single('goods'),(req,res)=>{
//     console.log(req.file,req.body)

//     res.end();
// });

app.post('/upload',express.json(),express.urlencoded(),uploadMiddleware.array('goods'),(req,res,n)=>{
    console.log(req.files,req.body)
    
    res.send(req.body);
});

// 监听端口
app.listen(PORT,()=>{
    console.log('Server is running on port %s',PORT);
});