### 后端技术栈
 - express + mysql + mvc分层
 - model   数据连接层
 - view    视图层
 - controller   业务逻辑层
   - router     路由分发请求
   - service    具体的业务处理


### 项目结构
 - app.js       项目入口
 - config       项目配置
   - config.default.js
 - controller   解析用户输入，处理返回相应的结果
 - model        数据持久层
 - middleware   用于编写中间件，非路由的
 - routers      存放路由文件
 - public       存放静态资源文件
 - util         工具模块
 - validator    验证请求数据格式
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
    res.download('文件路径')       //将文件path作为“附件”传输
    res.redirect()                //重定向请求
    res.render()                  //发送渲染视图模板
    res.sendFile()                //发送文件字节流

    res.send("Hello World!")      //会结束响应
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
 - 路由(请求)路径可以是字符串模式或正则表达式
 - Express 使用 path-to-regexp 来匹配路由路径


### 请求和响应
 - req:请求对象
   - 获取请求相关的数据信息
   - 请求对象的方法可以在Express官方文档下Request找到
   - 继承 http.IncomingMessage 对象
 - res:发送响应相关的对象
   - 继承 http.ServerResponse 对象


### 中间件
```javascript
/**
 * req    请求对象
 * res    响应对象
 * next   下一个中间件
 * 任何请求都能被中间件拦截到。可以有多个中间件
 * 中间件要放在请求的前面
 * 中间件的顺序很重要
 * 路由也由中间件来处理的，路由(请求)也有next()
*/
app.use((req,res,next)=>{
  consol.log('hello')
  next();
})

//第二种调用
function fn({option}){
  return (req,res,next){
    consol.log(option)
    next();
  }
}
app.use(fn({'id':'1'}))
```
 - 一个Express应用，就是由许许多多的中间件来完成的
 - 在现有代码程序中，在程序生命周期或横向流程中，加入/减去 一个或多个功能，不影响原有功能
 - Express中，中间件就是一个可以访问请求对象、响应对象和调用next方法的一个函数
 - 在中间件中可以修改req和res，结束响应周期，开启下一个中间件


### 中间件分类
 - 应用程序级别中间件
   - 不关心请求路径
   - 都会执行
   - app.use((req,res,next)=>{next();})
 - 限定请求路径
   - 只有请求路径符合规则的请求
   - app.use('请求路径',(req,res,next)=>{next();})
 - 限定请求方法 + 请求路径
   - 路由(请求)这种中间件
   - app.get('请求路径',(req,res,next)=>{next();})
 - 多个处理函数
   - 对请求进行多个函数处理
   - app.use('请求路径',(req,res,next)=>{next();},(req,res,next)=>{next();})
 - next('route')
   - 从路由中间件中跳过其后的中间件
   - 只能在路由中间件中使用(app.方法())
 - 中间件在数据声明中可重用
  ```javascript
  function fn1(req,res,next){next();}
  function fn2(req,res,next){next();}
  let fn = [fn1,fn2]
  app.get('/',fn,(req,res,next)=>{next();})
  ```
 - app.all('请求',(req,res,next)=>{next();})
   - 用于所有http请求加载中间件功能
   - 会对该请求进行处理
   - all不限定请求方法


  ### 路由模块
  ```javascript
  //导入模块
  const express = require('express');
  //创建路由实例
  //相当于一个mini Express 实例
  const router = express.Router();

  //配置路由
  router.get('/',fn,(req,res,next)=>{next();})

  //导出路由实列
  module.exports = router

  //请求页面导入中间件

  //在请求的最后面挂载路由
  //可以给路由限定访问前缀
  //然后在router里面就会查找'/index'下的请求
  app.use('/index',router)
  ```


  ### 错误处理中间件
  ```javascript
  //在入口模块app.js
  //在所有中间件只有挂载错误处理中间件
  //里面的参数缺一不可
  app.get('/',fn,(req,res,next)=>{
    try{
      let i = 1/0;
    }catch(err){
      //next()函数中传递任何参数都将视为错误
      //并且跳过所有中间件，直接到处理错误的中间件
      //字符串'route'参数除外
      next(err);
    }
  })
  app.use((err,req,res,next)=>{
    console.log('错误',err)
    res.status(500).json({
      error:err.message
    })
  })
  ```


  ### 404错误
  ```javascript
  //通常在所有路由配置处理之后处理 404 的内容
  //从上到下依次匹配，到最后没匹配上的就执行
  app.use((req,res,next)=>{
    res.status(404).send('404 Not Found.');
  })
  ```


### 内置中间件
 - express.json()
   - 解析 Content-Type 为 application/json 格式的请求体
 - express.urlencoded()  
   - 解析 Content-Type 为 application/x-www-form-urlencoded 格式的请求体
 - express.raw()
   - 解析 Content-Type 为 application/octet-stream 格式的请求体
 - express.text()
   - 解析 Content-Type 为 text/plain 格式的请求体
 - express.static()
   - 托管静态资源文件


### 第三方中间件
https://www.expressjs.com.cn/resources/middleware.html
 - morgan：HTTP 请求记录器。
   - npm i morgan
   - const morgan = require('morgan')
   - app.use(morgan('tiny'))
  

### RESTful 接口设计规范
 - API 与用户的通信协议，尽量使用HTTPs协议
   - HTTP动词
     - GET(读取)
     - POST(创建)
     - PUT(完整更新)
     - PATCH(部分更新)
     - DELETE(删除)
 - 在 RESTful 架构中，每个网址代表一种资源，所以网址中不能有动词，只能由名词，而且所用名词往往与数据库的表格名向对应
 - 过滤信息
   - 如果记录数量很多，服务器不可能都将他们返回给用户。API应该提供参数，过滤返回
     - ?limit = 10
     - ?pagesize=10&pageindex=1
 - HTTP状态码
   - 1xx：相关信息
   - 2xx：操作成功
     - 200：服务器成功返回用户请求数据
     - 201：用户新建或修改成功
     - 204：用户删除成功
   - 3xx：重定向
   - 4xx：客户端错误
     - 400：用户发出请求有错误，服务器没有进行新建或修改数据
     - 401：表示用户没有权限
     - 403：用户得到授权，但是访问是被禁止的
     - 404：用户发出的请求不存在
     - 406：用户请求的格式不可得
     - 410：用户请求的资源被永久删除，且不会得到
     - 422：当创建一个对象时，发生一个验证错误
   - 5xx：服务器错误
     - 500：服务器内部错误
 - 返回结果：不应该是一个纯文本，而是一个JSON对象
   - 服务器回应的HTTP头的Content-Type属性要设为 application/json
   - GET获取集合：返回一个对象列表
   - GET具体的对象：返回单个资源对象
   - POST：返回新生成的资源对象
   - PUT：返回完整的资源对象
   - PATCH：返回完整的资源对象
   - DELETE：返回一个空文档
 - 错误处理
   - 即使发生错误也返回200状态码，把错误信息放在数据体里面(不推荐)
   - 建议还是用状态码验证
 - 身份认证
   - 基于JWT的接口权限认证
   - 字段名：Authorization
   - 字段值：Bearer token数据
 - 跨域处理
   - 可以在服务端设置 CORS 允许客户端跨域资源请求

### 初步搭建
 - 配置常用的中间件
   - 解析请求体
     - express.json()
       - app.use(express.json())
     - express.urlencoded()
       - app.use(express.urlencoded())
   - 日志输出
     - morgan()
       - const morgan = require('morgan');
       - app.use(morgan())
   - 为客户端提供跨域资源请求
     - cors()
       - const cors = require('cors');
       - app.use(cors())

### 项目路由设计
 - 在主页面下新建router文件夹
 - router文件夹
   - index.js
     - 管理下面的不同类别的路由
     - 例如：router.use('/users',require('./user'))
   - 其他类别的路由配置
     - 开始写路由

### 提取控制器
 - 在 controller 文件夹进行
   - 提取 router 中的函数到 controller 进行处理

### 安装 MongoDB 数据库
```
https://www.runoob.com/mongodb/mongodb-window-install.html
```

### Mongoose 数据库
```javascript
//文档：https://mongoosejs.com/
npm i mongoose

const mongoose = require('mongoose');

//连接MongoDB数据库
mongoose.connect('mongodb://localhost:27017/test',{
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

//创建一个数据模型
const Cat = mongoose.model('Cat',{name:String})

//根据模型建立一个对象
const kitty = new Cat({name:"ciupt"})

//将数据保存到数据库当中
kitty.save().then(()=>console.log("meow"))
```

### Mongoose 数据库 数据操作
```javascript
//引入表字段模型
const User = require('../model')

//保存数据到数据库
const user = new User(req.body.user)
await user.save()

//查询数据库
const user = await User.findOne({email:value})

```

### Express 数据验证(express-validator)[中间件]
```javascript
npm install express-validator
//基本使用：https://express-validator.github.io/docs/

//在路由页面引入
const { body, validationResult } = require('express-validator');

//用户相关路由
router.get('/register',[//1.配置验证规则
    //验证传过来的数据user.username不能为空
    body('user.username')
      .notEmpty().withMessage('这里可以定制错误消息')
      .bail()//这里验证失败，后面就可以不用验证了
      .custom(async value=>{//自定义错误
            //按邮箱查询数据库是否有该值
            const user = await User.findOne({username:value})
            if(user){
                return Promise.reject('邮箱已存在')
            }
        }),
    //验证传过来的数据user.email不能为空
    body('user.email')
      .notEmpty()
      .isEmail().withMessage("邮箱格式不正确"),
],(req,res,next)=>{//2.判断验证结果
  const errors = validationResult(req)

  //验证不通过
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  //验证通过
  next()
},userCtrl.register)//3.通过验证，执行具体控制器处理

//上面这一大坨可以单独提出了，放到validator文件夹里面
//详情请看项目
```

### 基于 JWT 的身份认证
```

```