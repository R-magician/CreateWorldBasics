//验证token，认证用户身份

const {verify} = require('../util/jwt')
const {jwtSecret} = require('../config/config.default')
const {User} = require('../model')

module.exports = async (req,res,next) =>{
    const token = req.headers['authorization']
    if(token){
        return res.status(401).end()
    }

    try{
        //验证成功
        const decodedToken = await verify(token,jwtSecret)
        //按id查询用户
        req.user = await User.findById(decodedToken.userId)
        next()
    }catch(err){
        return res.status(401).end()
    }

}