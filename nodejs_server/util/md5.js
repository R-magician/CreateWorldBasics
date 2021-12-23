//进行数据加密上传
const crypto = require('crypto')

//获取crypto支持的散列算法
console.log(crypto.getHashes())

module.exports = str =>{
    //创建一个hash对象,md5可以在上面那个方法里面得到
    return crypto.createHash("md5")
    .update(str)//加密的明文加密后不能反向解析，除非暴力破解
    .digest('hex')//十进制
}