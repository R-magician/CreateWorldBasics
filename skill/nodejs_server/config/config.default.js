/**
 * 默认配置
 */
module.exports = {
    //数据库连接地址
    dbUri:'mongodb://127.0.0.1:27017/test',
    //jwt计算签名的字符,因为生成和验证都要用,所以后期最好不要变动
    jwtSecret:'ciupt'
}