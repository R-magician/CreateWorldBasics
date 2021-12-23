const express = require('express')
//路由实例
const router = express.Router()

//用户相关路由
router.use('/users',require('./user'))

//文章相关路由
//router.use('文章',require('./文章'))

module.exports = router