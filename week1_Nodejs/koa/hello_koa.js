const Koa = require('koa');

const {PORT} = require('../src/config.json');

const app = new Koa();

app.use(async (ctx,next)=>{
    console.log('ctx.type',ctx.type)

    // 等待下一个中间件完成后才继续往下执行代码
    // 结论：每一个中间件都是一个返回promise对象的函数
    let mynext = await next();
    // console.log('next()',next());
    // console.log('mynext',mynext);
    console.log('ctx.type',ctx.type)
    // ctx.body = 'hello Koa!'
    ctx.response.body = 'hello Koa'
})

app.use(ctx=>{
    ctx.type = 'text/html';
    // 这里的返回值会称为promise对象Resolved状态时的返回值
    return 10086
})

.listen(PORT,()=>{
    console.log('server is running on port %s',PORT);
})