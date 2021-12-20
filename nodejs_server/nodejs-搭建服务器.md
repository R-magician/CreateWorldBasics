### 后端技术栈
 - express + mysql + mvc分层
 - model   数据连接层
 - view    视图层
 - controller   业务逻辑层
   - router     路由分发请求
   - service    具体的业务处理

### 项目结构
 - apidoc       接口文档
 - bin          入口文件
 - config       数据库操作配置
 - model        定义sql语句并操作数据库
 - public       存放静态资源文件
 - routers      存放路由文件
 - service      存放业务操作
 - views        存放引擎模板
 - app.js       入口js

### 开始
```javascript
//Express 是一个基于 Node.js 平台的极简、灵活的 web 应用开发框架
npm i express -g

//Express-generator是Express的应用生成器，通过使用生成器工具，可以快速创建一个Express的应用骨架
npm i express-generator -g

//生成一个demo服务端项目
express demo

//nodemon 热更新
npm i nodemon --save
    //在package.json文件中添加启动的短命令
    "scripts": {
      "dev" : "nodemon ./bin/www"
    },
    npm run dev //热更新启动项目

//进入项目
cd demo

//安装依赖
npm install

//启动项目
npm start

//默认访问地址： http://localhost:3000/
```

### Express
 - 内部使用的还是 http 模块
 - 请求对象继承自 http.IncomingMessage
 - 响应对象继承自 http.ServerResponse
 - 特性
   - 简单易学
   - 强大的路由功能
   - 灵活中间件
   - 高性能
   - 非常稳定
 - 应用场景
   - 传统的Web网站
   - 接口服务
   - 服务端渲染中间件
   - 开发工具
     - JSON Server
     - webpack-dev-server

### Express 起步
```javascript
const express = require('express');
const app = express()

/**
 * 访问地址'/'
 * req:请求对象
 * res:响应对象
 * send()向页面发送的数据
*/
app.get('/',(req,res)=>{
    console.log(req.url)          //请求地址
    console.log(req.method)       //请求方法
    console.log(req.headers)      //请求头
    console.log(req.query)        //请求查询参数
    //console.log(req.params)     //请求参数--post

    res.statusCode = 201          //设置返回响应状态码
    res.status(201)               
    res.cookie('name','ciupt')    //返回响应时的cookie

    res.send("Hello World!")    
    res.send(Buffer.from('whoop'))//发送一个Buffer
    res.send({id:001})            //返回一个对象
    res.status(404).send('not')   //设置响应码并返回数据 
    
    res.write('a')                //发送多段文本，但没有结束响应，最后应该res.end()
    res.write('b')
    res.write('c')
    //res.end()                   //结束响应
    //res.end('abc')              //结束响应,并返回
})

//启动服务端口号
app.listen(3000,()=>{
  console.log('服务已启动')
})
```

### 路由基础
```
1.路由基础是指确定应用程序如何响应客户端对特定端点的请求，该特定端点是url(或路径)和特定的HTTP请求方法(GET,POST等)
2.每个路由可以具有一个或多个处理程序函数，这些函数在匹配该路由时执行
```
路由定义采用以下结构：
 - app.请求方法(请求路径,路由处理函数)
   - app.get('/',(req,res)=>{})
   - app.post('/',(req,res)=>{})
 - app是Express的实例

### 请求和响应
 - req:请求对象
   - 获取请求相关的数据信息
   - 请求对象的方法可以在Express官方文档下Request找到
   - 继承 http.IncomingMessage 对象
 - res:发送响应相关的对象
   - 继承 http.ServerResponse 对象