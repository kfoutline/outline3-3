const Router = require('koa-router');

const router = new Router();

const homeRouter = require('./home');
const listRouter = require('./list');
const goodsRouter = require('./goods');
const cartRouter = require('./cart');

// router.redirect('/', '/home');
router.use('/home',homeRouter);
router.use('/list',listRouter);
router.use('/goods',goodsRouter);
router.use('/cart',cartRouter);


module.exports = router.routes();