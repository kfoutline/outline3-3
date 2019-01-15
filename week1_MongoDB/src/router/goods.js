const express = require('express');
const Router = express.Router();

const bodyParser = require('body-parser');
let urlencodedParser = bodyParser.urlencoded({ extended: false })

const db = require('../db');

// 添加商品
Router.put('/',urlencodedParser, async (req,res)=>{
    let result;
    try{
        result = await db.insert('goods',{...req.body,add_time:Date.now()});
    }catch(err){
        result = err;
    }
    res.send(result);
})

Router.route('/:id')

    .get(async (req,res)=>{
        let result;
        try{
            result = await db.find('goods',{_id:req.params.id});
        }catch(err){
            result = err;
        }
        res.send(result);
    })

    .post(urlencodedParser,async(req,res)=>{
        let result;
        try{
            result = await db.update('goods',{_id:req.params.id},{...req.body,edit_time:Date.now()});
        }catch(err){
            result = err;
        }
        res.send(result);
    })

    .delete(async(req,res)=>{ 
        let result;
        try{
            result = await db.delete('goods',{_id:req.params.id});
        }catch(err){
            result = err;
        }
        res.send(result);
    })

module.exports = Router;