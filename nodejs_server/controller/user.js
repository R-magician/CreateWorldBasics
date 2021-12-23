//具体操作的函数

const {User} = require('../model')
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