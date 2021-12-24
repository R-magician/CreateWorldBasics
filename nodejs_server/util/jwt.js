const jwt = require('jsonwebtoken')

//生成jwt
const token = jwt.sign({
    foo:'bar'//传递数据
},'计算签名的字符')

//异步生成jwt
jwt.sign({
    foo:'bar'//传递数据
},'计算签名的字符',(err,token)=>{
    if(err){
        return console.log('生成 token 失败')
    }
    console.log(token)
})

//验证jwt 会得到传递数据 {foo:'bar'}
const ret = jwt.verify(token,"sign中计算签名的字符")

//异步验证
jwt.verify(token,"sign中计算签名的字符",(err,ret)=>{
    if(err){
        return console.log('token 验证失败')
    }
    console.log(ret)
})