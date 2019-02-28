const Router = require('koa-router');

const router = new Router();
router.get('/',(ctx)=>{
    ctx.body = '列表页';
})

module.exports = router.routes();