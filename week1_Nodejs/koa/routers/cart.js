const Router = require('koa-router');

const router = new Router();


router.get('/',(ctx)=>{
    ctx.body = '购物车';
})

module.exports = router.routes();