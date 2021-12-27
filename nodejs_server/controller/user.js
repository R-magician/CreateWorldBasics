//具体操作的函数

const {User} = require('../model')
const jwt = require('../util/jwt')
const {jwtSecret} = require('../config/config.default')

exports.login = async(req,res,next) =>{
    try{
        //这里的uder是通过验证中间件的时候挂载的
        const user = req.user.toJSON()
        //生成token
        const token = await jwt.sign({
            userid:user._id
        },jwtSecret,{
            expiresIn:60 * 60//设置token过期时间3600秒
        })

        res.status(200).json({...user,token})
    }catch(err){
        next(err)
    }
}

//用户注册
exports.register = async(req,res,next)=>{
    try{
        /**
         * req.body的数据格式
         * {"user":{"username":"Jacob","email":"jj@qq.com",}}
         */
        const user = new User(req.body.user)

        //保存数据到数据库
        await user.save()

        //返回成功信息
        res.status(201).json({user})
    }catch(err){
        next(err)
    }
}

//获取当前用户
exports.getUser = async(req,res,next) =>{
    try{
        res.status(201).json({
            user:req.user
        })
    }catch(err){
        next(err)
    }
}