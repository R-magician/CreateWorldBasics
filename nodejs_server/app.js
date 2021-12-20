const express = require('express');
const app = express();

app.get('/',(req,res)=>{
    res.send("Hello World!")
})
//启动服务端口号
app.listen(3000,()=>{
    console.log('服务已启动')
})