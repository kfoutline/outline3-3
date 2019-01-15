const express = require('express');
const Router = express.Router();

const userRouter = require('./user');
const goodsRouter = require('./goods');
const categoryRouter = require('./category');
const uploadRouter = require('./upload');

Router.use('/user',userRouter);
Router.use('/goods',goodsRouter);
Router.use('/category',categoryRouter)
Router.use('/upload',uploadRouter);

module.exports = Router;