/**
 * 用户数据相关的验证
 * body--验证get请求里面的参数
 * param--验证post请求的参数
 */
const {body,param} = require('express-validator');

const validate = require('../middleware/validate')
const {User} = require('../model')

//用户注册验证
exports.register = validate([
    body('user.username')
        .notEmpty().withMessage('用户名不能为空！')
        .bail()//这里验证失败，后面就可以不用验证了
        .custom(async value=>{//自定义错误
            //按邮箱查询数据库是否有该值
            const user = await User.findOne({username:value})
            if(user){
                return Promise.reject('用户名已存在')
            }
        }),
    body('user.email')
        .notEmpty()
        .isEmail().withMessage("邮箱格式不正确")
])

//用户登录验证
exports.login = [
    //1.先判断输入是否为空
    validate([
        body('user.email').notEmpty().withMessage('邮箱不能为空'),
        body('user.passw').notEmpty().withMessage('密码不能为空')
    ]),
    //2.在判断用户是否存在
    validate([
        body('user.email').custom(async(email,{req})=>{
            //因为在model中配置了password不可查询，所以这里查询对象的时候要声明一下要返回password字段
            const user =await User.findOne({email}).select('password')
            if(!user){
                return Promise.reject('用户不存在')
            }
            
            //将查询的数据挂载到请求对象中,连续的中间件中req对象都是使用的同一个
            req.user = user
        })
    ]),
    //3.判断用户输入的密码是否正确
    validate([
        body('user.password').custom(async (password,{req})=>{
            //若model设置了password不可查询，password可能为undefined
            if(md5(password)!==req.user.password){
                return Promise.reject('密码错误')
            }
        })
    ])

]