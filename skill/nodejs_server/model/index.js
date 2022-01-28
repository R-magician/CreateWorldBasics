const mongoose = require('mongoose');
const {dbUri} = require('../config/config.default')

//连接MongoDB数据库
mongoose.connect(dbUri,{
  useNewUrlParser:true,
  useUnifiedTopology:true
});

const db = mongoose.connection

//当连接数据库失败的时候
db.on('error',(err)=>{
  console.log('数据库连接失败',err)
})

//当连接数据成功的时候
db.once('open',()=>{
  console.log('数据库连接成功')
})


//组织导出模型
module.exports = {
  User:mongoose.model("User",require('./user'))//用户表
  //Article:mongoose.model("Article",require('./article'))//文章表
}
