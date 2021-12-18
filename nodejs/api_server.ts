import express from "express";

const app = express()

//提供一个get请求
app.get('/',(req,res)=>{
  //res.end("<h1>参数</h1>")
  //res.json({id:'1',name:'名字'})
})

app.get('/exit',(req,res)=>{
  //res.end('1122')
  res.end('服务已关闭');
  process.exit(1)
})

//启动服务
app.listen(8282,()=>{
  console.log('服务已经开启');
})
