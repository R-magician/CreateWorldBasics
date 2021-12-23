const express = require('express')

const userCtrl = require('../controller/user')
const userValidator = require('../validator/user')


//路由实例
const router = express.Router()

//用户相关路由
router.get('/register',userValidator.register,userCtrl.register)

module.exports = router