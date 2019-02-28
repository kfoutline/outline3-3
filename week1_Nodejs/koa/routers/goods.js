const Router = require('koa-router');
const koaBody = require('koa-body');

const router = new Router();

router
    // 格式化数据：multipart/form-data(false),urlencoded(true),json(true)
    .use(koaBody({
        multipart:true,
        formidable:{
            uploadDir:'./uploads',
            keepExtensions:true,
            onFileBegin(name,file){
                // console.log('name/file',name,file)

                // 修改文件名
                file.path = './uploads/laoxie.txt';
            }
        }
    }))

    .get('/:id',(ctx)=>{
        ctx.body = '商品详情';
        console.log('body:',ctx.request.body)
        console.log('params:',ctx.params)
        console.log('query:',ctx.query)
    })

    .post('/:id',ctx=>{
        ctx.body = {msg:'修改商品',body:ctx.request.body,query:ctx.query,qs:ctx.querystring};
        console.log('body:',ctx.request.body)
        console.log('params:',ctx.params)
        console.log('query:',ctx.query)
    })

    .del('/:id',ctx=>{
        ctx.body = '删除商品';
        console.log('body:',ctx.request.body)
        console.log('params:',ctx.params)
        console.log('query:',ctx.query)
    })

router.put('/',(ctx)=>{
    ctx.body = '添加商品';
    console.log('body:',ctx.request.body)
    console.log('params:',ctx.params)
    console.log('query:',ctx.query)
})

module.exports = router.routes();