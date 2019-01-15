const express = require('express');
const Router = express.Router();

const bodyParser = require('body-parser');
let urlencodedParser = bodyParser.urlencoded({ extended: false })

const db = require('../db');

//本模块操作的集合
const COLLECTION_NAME = 'category';

// 获取所有分类
Router.route('/')

    .get(async (req,res)=>{
        let result;
        try{
            result = await db.find(COLLECTION_NAME,{});
        }catch(err){
            result = err;
        }
        res.send(result);
    })

    .put(urlencodedParser,async (req,res)=>{
        let result;
        try{
            result = await db.insert(COLLECTION_NAME,{name:req.body.name,add_time:Date.now()});
        }catch(err){
            result = err;
        }
        res.send(result);
    })

/**
 * @具体分类
 * get: 获取分类信息
 * post: 修改分类信息
 * put: 添加分类信息
 * delete: 删除分类信息
 */
Router.route('/:name')

    .get(async (req,res)=>{
        let result;
        try{
            result = await db.find(COLLECTION_NAME,{name:req.params.name});
        }catch(err){
            result = err;
        }
        res.send(result);
    })

    .post(urlencodedParser,async (req,res)=>{
        let result;
        try{
            result = await db.update(COLLECTION_NAME,{name:req.params.name},{...req.body,edit_time:Date.now()});
        }catch(err){
            result = err;
        }
        res.send(result);
    })

    .delete(urlencodedParser, async (req,res)=>{
        let result;
        try{
            result = await db.delete(COLLECTION_NAME,{name:req.params.name,...req.body});
        }catch(err){
            result = err;
        }
        res.send(result);
    })

module.exports = Router;