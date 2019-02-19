const path = require('path');
const express = require('express');
const Router = express.Router();

const multer = require('multer');

const db = require('../db');

let storage = multer.diskStorage({
    // destination: function (req, file, cb) {
    //   cb(null, './uploads/');
    // },

    // 上传文件保存目录，无则自动创建
    destination:'./uploads/',

    // 格式化文件名
    filename: function (req, file, cb) {
        let ext = path.extname(file.originalname);
        cb(null, file.fieldname + '-' + Date.now() + ext);
    }
})
  
// 设置文件保存目录
let upload = multer({storage});

// 单个文件上传
Router.post('/',upload.single('goods'),async(req,res)=>{
    
    // let result;
    // try{
    //     result = await db.insert('user',{...req.body,add_time:Date.now()});
    // }catch(err){
    //     result = err;
    // }
    console.log(req.file,req.body);
    res.send('文件上传成功');
});

Router.post('/goods',upload.array('goods',5),async(req,res)=>{
    console.log('goods:',req.files,req.body)
    res.send({
        code:1,
        msg:'文件上传成功',
        data:req.files
    });
})



module.exports = Router;