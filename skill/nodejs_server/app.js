const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const router = require('./router')
//挂载统一处理错误中间件
const errorHandler = require('./middleware/error-handler')

//引入数据库
require('./model')


const app = express();

//服务使用的中间件
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded())
app.use(cors())

//设置端口号
const PORT = process.env.PORT || 3000

//挂载用户路由
app.use('/api',router)

//挂载统一处理服务端错误中间件
app.use(errorHandler())

//启动服务端口号
app.listen(PORT,()=>{
    console.log('服务已启动')
})