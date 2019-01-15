const express = require('express');
const Router = express.Router();

const bodyParser = require('body-parser');
let urlencodedParser = bodyParser.urlencoded({ extended: false })

const db = require('../db');

// 添加用户
Router.put('/',urlencodedParser,async(req,res)=>{
    let result;
    try{
        result = await db.insert('user',{...req.body,add_time:Date.now()});
    }catch(err){
        result = err;
    }
    res.send(result);
})

// RESTful api
Router.route('/:username')
    .get(async(req,res)=>{
        let result;
        try{
            result = await db.find('user',{name:req.params.username});
        }catch(err){
            result = err;
        }
        res.send(result);
    })

    .post(urlencodedParser, async(req,res)=>{
        let result;
        try{
            result = await db.update('user',{name:req.params.username},{...req.body,edit_time:Date.now()});
        }catch(err){
            result = err;
        }
        res.send(result);
    })

    .delete(urlencodedParser, async(req,res)=>{
        let result;
        try{
            result = await db.delete('user',{name:req.params.username,...req.body});
        }catch(err){
            result = err;
        }
        res.send(result);
    })

module.exports = Router;