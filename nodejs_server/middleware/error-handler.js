//统一处理请求错误中间件
const util = require('util')

module.exports = () =>{
    return (err,req,res,next) => {
        res.status(500).json({
            error:util.format(err)
        })
    }
}