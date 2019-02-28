//引入模块
const mongodb = require('mongodb');
const {MongoClient,ObjectId} = mongodb;

const {DBhost,database} = require('../config.json');

exports.connect = async ()=>{
    //连接MongoDB
    let client = await MongoClient.connect(DBhost,{useNewUrlParser:true});

    // 连接数据库，无则自动创建
    let db = client.db(database);
            
    return {db,client};
}


//封装增删查改
exports.insert = async (collectionName,data)=>{

    let {db,client} = await this.connect();

    let col = db.collection(collectionName);
    
    let result;
    try{
        result = await col[Array.isArray(data)?'insertMany':'insertOne'](data);
    }catch(err){
        result = err;
    }

    client.close();

    return result;
}

/**
 * @删除
 * 支持单条删除和多条删除
 */
exports.delete = async (collectionName,query)=>{

    let {db,client} = await this.connect();

    let col = db.collection(collectionName);

    // 条件筛选
    // 如有id, 则只要使用id查询
    if(query._id){
        query = {_id:ObjectId(query._id)};
    }

    let result;
    try{
        result = await col[query._id?'deleteOne':'deleteMany'](query);
    }catch(err){
        result = err;
    }

    client.close();

    return result;
}

/**
 * @修改
 * 支持单条和多条修改
 */
exports.update = async (collectionName,query,data)=>{
        let {db,client} = await this.connect();

        let col = db.collection(collectionName);
        
        let result;
        try{
            result = await col[query._id?'updateOne':'updateMany'](query,{$set:data});
        }catch(err){
            result = err;
        }

        client.close();

        return result;
}

/**
 * @修改
 * 支持单条和多条修改
 */
exports.find = async (collectionName,query)=>{

    let {db,client} = await this.connect();

    let col = db.collection(collectionName);

    // 条件筛选
    if(query._id){
        query._id = ObjectId(query._id);
    }

    let result;
    try{
        result = await col.find(query).toArray();
    }catch(err){
        result = err;
    }

    client.close();

    return result;
}