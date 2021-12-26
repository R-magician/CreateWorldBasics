const jwt = require('jsonwebtoken')
const {promisify} = require('util')

//生成jwt
exports.sign = promisify(jwt.sign)

//验证jwt
exports.verify = promisify(jwt.verify)

//不验证直接解析jwt
exports.decode = promisify(jwt.decode)