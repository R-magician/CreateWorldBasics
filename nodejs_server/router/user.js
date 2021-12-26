const express = require('express')

const userCtrl = require('../controller/user')
const userValidator = require('../validator/user')

const auth = require('../middleware/auth')


//路由实例
const router = express.Router()

//用户相关路由
router.get('/register',userValidator.register,userCtrl.register)

//获取当前用户
router.get('/getuser',auth,userCtrl.getUser)

module.exports = router