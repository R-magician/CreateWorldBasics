### NodeJs架构
```
    nodejs的核心是由以下三层组成

    Natives Modules(内置核心模块)
        当前层内容由JS实现
        提供应用程序可直接调用库(内置核心模块),例fs、path、http等
        Js无法直接操作底层硬件设置，所有要与硬件之间通信就要通过(Builtin modules)
    Builtin modules(胶水层)
        通过C++让核心模块和硬件通信
    底层
        V8:执行JS代码,提供桥梁接口
        Libuv:事件循环、事件队列、异步IO  (进行抽象的封装实现跨平台的效果)
        第三方模块：zlib、http、c-ares等


    Reactor模式
        单线程完成多线程工作，实现异步IO，事件驱动

    Nodejs更适用于IO密集型高并发请求

    异步IO
      IO是应用程序的瓶颈所在
      异步IO提高性能无需在原地等待结果返回
      IO操作属于操作系统级别，平台都有对应实现
      Nodejs 单线程配合事件驱动架构及libuv实现了异步IO
```
### npm 包管理器
```
安装所有依赖
  1.项目具有 package.json 文件
  2.npm install
  3.软件包会默认安装到当前文件树中的 node_modules 子文件夹下

--save(-s) 安装并添加条目到 package.json 文件的 dependencies(生产环境)
--save-dev(-d) 安装并添加条目到 package.json 文件的 devDependencies(开发环境)。
-g 全局安装 安装的位置：npm root -g
                Windows：C:\Users\YOU\AppData\Roaming\npm\node_modules
                macOS：/usr/local/lib/node_modules

更新软件包
  npm update
  npm update <package-name>  更新指定软件包

自定义短命令,常见于Webpack
  在package.json通过配置
  {
    "scripts": {
      "start-dev": "node lib/server-development",
      "start": "node lib/server-production",
      自定义短命令:具体功能的长命令
    },
  }

运行短命令
npm run 自定义短命令

引入包并使用包
const lodash = require('lodash')

查看 npm 包安装的版本 npm list
查看全局安装包的版本 npm list -g

安装 npm 包的旧版本
npm install <package>@<版本号>

卸载 npm 软件包
  1.npm uninstall <package-name>
  2.使用 -S 或 --save 标志，则此操作还会移除 package.json 文件中的引用
  3.程序包是开发依赖项，列出在 package.json 文件的 devDependencies 中 必须使用 -D 或 --save-dev 标志从文件中移除
    npm uninstall -D <package-name>
  4.软件包是全局安装 -G
    npm uninstall -g <package-name>



```
### package.json
```
package.json 文件是项目的清单,存储所有已安装软件包的名称和版本

相关属性配置：
    version 表明了当前的版本。
    name 设置了应用程序/软件包的名称。
    description 是应用程序/软件包的简短描述。
    main 设置了应用程序的入口点。
    private 如果设置为 true，则可以防止应用程序/软件包被意外地发布到 npm。
    scripts 定义了一组可以运行的 node 脚本。
    dependencies 设置了作为依赖安装的 npm 软件包的列表。
    devDependencies 设置了作为开发依赖安装的 npm 软件包的列表。
    engines 设置了此软件包/应用程序在哪个版本的 Node.js 上运行。
    browserslist 用于告知要支持哪些浏览器（及其版本）。

```
### package-lock.json
```
跟踪被安装的每个软件包的确切版本，以便产品可以以相同的方式被 100％ 复制
```

### npx
```
  1.可以运行使用 Node.js 构建并通过 npm 仓库发布的代码
  2.无需先安装命令即可运行命令,当被下载完，则下载的代码会被擦除
```

### 安装ts
```
npm i typescript -g
tsc --init        //初始化

若上面指令运行出错可以
  1.管理员运行powerShell
  2.输入指令：set-ExecutionPolicy RemoteSigned
  3.(是)Y

npm ts-node -d    //可以直接运行ts脚本，不用转换为js

ts-node ./app.ts  //运行文件
```

### 终止程序
```
控制台：ctrl-C
当前程序：process.exit(1)
系统中运行的其他程序终止Node.js程序：process.kill(process.pid, 'SIGTERM')
  process.pid：终止进程的 PID
  SIGTERM：立即终止
  SIGTERM: 正常终止
```

### 新建一个服务
```typescript
import express from "express";
const app = express()

//提供一个get请求
app.get('/请求地址',(req,res)=>{})

//开启一个服务
app.listen(端口号,()=>{
  console.log('服务已经开启');
})

/**
 * request 提供了请求的详细信息。 通过它可以访问请求头和请求的数据。
 * response 用于构造要返回给客户端的数据。
 */
```

### 终端控制
```
通过控制台输入表达式，将结果返回到控制台
在控制台中输入：node 回车

输入js代码，在该模式下会输出运行代码后的结果
输入 类名 + . 并按下tab键，会打印出该类上的所有属性和方法
  例如:Number. + tab
      global. + table   打印全局对象的所有属性和方法

点命令
  .help: 显示点命令的帮助。
  .editor: 启用编辑器模式，可以轻松地编写多行 JavaScript 代码。当处于此模式时，按下 ctrl-D 可以运行编写的代码。
  .break: 当输入多行的表达式时，输入 .break 命令可以中止进一步的输入。相当于按下 ctrl-C。
  .clear: 将 REPL 上下文重置为空对象，并清除当前正在输入的任何多行的表达式。
  .load: 加载 JavaScript 文件（相对于当前工作目录）。
  .save: 将在 REPL 会话中输入的所有内容保存到文件（需指定文件名）。
  .exit: 退出 REPL（相当于按下两次 ctrl-C）。
```

### 全局对象
```
  与浏览器平台的window不完全相同
  Nodejs全局对象上挂载许多属性
  全局对象是JavaScript中特殊对象,可以子在程序中的任何地方访问
  Nodejs中全局对象是Global

  常见的全局对象变量
  __filename:返回正在执行脚本文件的绝对路径
  __dirname:返回正在执行脚本所在目录
  timer类函数执行顺序与事件循环间的关系
  process:提供与当前进程互动的接口
  require:实现模块的加载
  module、exports:处理模块的导出

  默认情况下 this 是空对象,和 global 不是同一个对象
```

### process
```
  process 不需要 "require"，它是自动可用的

  1.资源：内存  CPU
  process.memoryUsage()
  {
    rss:常驻内存,
    heapTotal:生成的总的内存大小
    heapUsed:实际使用的内存大小
    external:底层实现所占用的大小(c++)
    arrayBuffers:代表一片独立的空间大小
  }
  process.cpuUsage()
  {
    user:用户执行所占用的时间片段
    system:操作系统所占用的时间片段
  }

  2.运行环境:运行目录、node环境、cpu架构、用户环境、系统平台
  process.cwd()           ---返回项目运行目录
  process.version         ---返回node版本
  process.versions        ---返回node详细的版本信息
  process.arch            ---返回操作系统 CPU 架构
  process.env             ---返回用户运行环境
  process.env.USERPROFILE ---返回电脑C盘的用户目录
  process.platform        ---获取运行系统平台

  3.运行状态: 启动参数、PID、运行时间
  process.argv            ---若没有输入参数返回一个数组[node.exe,当前文件路径]
  process.argv0           ---获取argv的第一个数组的值
  process.pid             ---返回运行程序的PID  
  process.uptime()        ---获取项目的运行时间

  4.事件
  process.on('exit',(code)=>{})       ---当项目退出时执行,不能执行异步代码
  process.on('beforeExit',(code)=>{}) ---当项目退出前执行,不能执行异步代码
  process.exit()                      ---手动退出项目

  5.标准的输入 输出
  process.stdout.write('111')              ---输出数据
  process.stdin.pipe('111')                ---输入数据

```

### path模块常见的API
```
    const path = require('path')

    basename()                  ----获取路径中基础名称
    dirname()                   ----获取文件目录名称
    extname()                   ----获取路径中的扩展名
    isAbsolute()                ----获取路径是否为绝对路径
    join()                      ----拼接多个路径片段
    resolve()                   ----返回绝对路径
    pasre()                     ----解析路径(地址转为对象)
    format()                    ----序列化路径(对象转为地址)
    normalize()                 ----规范化路径
```

### node中的Buffer
```
0、Buffer是Nodejs的内置类
1、无须require的一个全局变量
2、实现Nodejs平台下的二进制数据操作
3、不占据V8堆内存大小的内存空间
4、内存使用由Node来控制，由V8的GC回收
5、一般配合Stream流使用，充当数据缓冲区
6、可以将 buffer 视为整数数组，每个整数代表一个数据字节。

Buffer中的一些实例方法
    alloc：创建指定字节大小的buffer
    allocUnsafe：创建指定大小的buffer(不安全)
    from：接收数据，创建buffer
    fill：使用数据填充buffer
    write：向buffer中写入数据
    tString：从buffer中提取数据
    slice：截取buffer
    indexOf：在buffer中查找数据
    copy：拷贝buffer中的数据
    concat：将多个buffer拼接成一个新的buffer
    isBuffer：是否是buffer数据
```

### FS内置核心模块
```
const fs = require('fs')

flag常用的操作符
  r:可读
  w:可写
  s:同步
  +:执行相反操作
  x:排他
  a:追加

常用的API
  readFile:从指定文件中读取数据
  writeFile:向指定文件中写入数据
  appendFile:追加方式向指定文件中写入数据
  copyFile:将某个文件中的数据拷贝至另一文件
  watchFile:对指定文件进行监控，如果由修改进行调用
  open:打开文件
    fs.open(path.reslove('文件路径'),'操作符',(err,fd)=>{})
  close:关闭文件
    fs.open(path.reslove('文件路径'),'操作符',(err,fd)=>{
          fs.close(fd,err =>{})
    })
  read:读取数据
    fs.open(path.reslove('文件路径'),'操作符',(err,fd)=>{
        /**
         * fd:定位当前被打开的文件
         * buffer:用于表示当前缓冲区
         * offset:从Buffer中的哪个位置开始进行写操作,值为下标
         * length:表示当前写入的长度
         * position:表示从文件的哪个位置开始读取
         */
        fs.read(fd,buffer,offset,length,position,(err,实际读了多少个字节,data)=>{

        })
    })
  write:将缓冲区里的内容写入到磁盘中
    fs.open('文件路径',操作符,(err,wfd)=>{
        fs.write(wfd,buffer,offset,length,position,(err,witten,data)=>{})
    })


目录操作API,异步(同步的可以查询文档):
    access:判断文件或目录是否具有操作权限
      fs.access(文件路径=>(err)=>{})
    stat:获取目录及文件信息
      fs.stat(文件路径=>(err,statObj)=>{
          statObj.isFile()        //是否是文件
          statObj.isDirectory()   //是否是目录
      })
    mkdirSync:异步创建目录
    mkdir:创建目录
      recursive: 开启递归,即使上级目录不存在,在当前目录下创建
      fs.mkdir(创建目录路径,{recursive:true},(err)=>{})
    rmdir:删除目录
      默认情况只能删除非空目录
      recursive:删除非空目录
      fs.rmdir(目录路径,{recursive:true},(err)=>{})
    readdir:读取目录中内容
      files:里面是包含目录下的文件及文件夹的数组
      fs.readdir(目录路径,(err,files)=>{})
    unlink:删除指定文件
      fs.unlink(文件路径,(err)=>{})

所谓的读操作就是将数据从磁盘写入缓冲区(Buffer)
```
### 操作系统模块
```
  可用于从底层的操作系统和程序运行所在的计算机上检索信息并与其进行交互
  const os = require('os')
```

### 模块化
```
1、模块化是前端走向工程化中的重要一环
2、早期JavaScript语言层面没有模块化规范

Commonjs规范
  nodejs遵循的规范
ES modules规范
  浏览器下面遵循的规范
```

### Commonjs规范
```
CommonJS规定起初是为了弥补JS语言模块化缺陷
CommonJS是语言层面的规范,当前主要用于Node.js
CommonJS规定模块化分为引入、定义、标识三个部分
CommonJS规范定义模块的加载是同步完成,所以不适用浏览器平台
1、任何一个文件就是一模块,具有独立作用域
2、使用require导入其他模块
3、将模块ID(也可以是文件路径)传入require实现模板模块定位

任意js文件就是一个模块,可以直接使用module属性

module属性
id:返回模块标识符,一般是一个绝对路径
filename:返回文件模块的绝对路径
loaded:返回布尔值,表示模块是否完成加载
parent:返回对象存放调用当前模块的模块
children:返回数组,存放当前模块调用的其他模块
exports:返回当前模块需要暴露的内容
paths:返回数组,存放不同目录下的node_modules位置  

require属性
基本功能是读入并执行一个模块文件  
resolve:返回模块文件绝对路径
extensions:依据不同后缀名执行解析操作
main:返回主模块对象
```

### 模块
```
模块导出
  module.exports {}
模块导入
  require(文件路径)

内置模块(核心模块)
  Node源码编译时写入到二进制文件中
文件模块(包,自定义模块)
  代码运行时,动态加载

加载流程
  路径分析：依据标识符确定模块位置
    路径标识符
    非路径标识符：常见于核心模块

  文件定位：确定目标模块中具体的文件及文件类型
    1.若导入模块时没有传入文件名,会按照以下顺序查找
      .js -> .json ->.node
    2.若到没找到,node就会认为自己拿到的是一个目录,会把目录当作一个包处理
    3.查找package.json文件,使用JSON.pasre()解析,找到描述文件中的mian文件
      若没有按以下后缀名查找
      mian.js -> mian.json ->mian.node
    4.若都没找到会将index做为目标模块中的具体文件名称,若没有按以下文件名查找
      index.js -> index.json ->index.node

  编译执行：采用对应的方式完成文件的编译执行
    1.将某个具体类型的文件按照相应的方式进行编译和执行
    2.创建新对象,按路径载入,完成编译执行

    JS文件的编译执行
      1.使用fs模块同步读入目标文件内容
      2.对内容进行语法包装,生成课执行JS函数
    JSON文件编译执行
      将读取到内容通过JOSN.parse()进行解析

缓存优先原则
  1.提高模块加载速度
  2.当前模块不存在,则经历一次完整加载流程
  3.模块加载完成后,使用路径作为索引进行缓存

1.module.exports方式导出，会使文件只导出该对象
  const car = {
    brand: 'Ford',
    model: 'Fiesta'
  }
  module.exports = car

2.将要导出的对象添加为 exports 的属性,这种方式可以导出多个对象、函数或数据
  const car = {
    brand: 'Ford',
    model: 'Fiesta'
  }
  exports.car = car

module.exports 和 export 之间有什么区别？
  前者公开了它指向的对象。 后者公开了它指向的对象的属性。
```

### 内置模块 VM
```
const vm = require('vm')
创建独立运行的沙箱环境

vm.runInThisContext(字符代码)
  字符代码中有let定义的同名变量不会报错
  可以访问全局变量
eval(字符代码)
  字符代码中有let定义的同名变量会报错
```

### 事件模块 Events
```
NodeJs 是基于事件驱动的异步操作架构,内置events模块
events 模块提供了EventEmmitter类
nodeJS 中很多内置核心核心模块继承EventEmitter,所以导入了其他模块也可以使用

const EventEmitter = require('events')
const eventEmitter = new EventEmitter()

常见的API
  on:添加当事件被触发时调用的回调函数
  addListener: on() 的别名--和上面一样
  emit:触发事件,按照注册的序同步调用每个事件监听器
  once:添加当事件注册之后首次被触发时调用的回调函数(只触发第一次)
  off:移除特定的监听器
  removeAllListeners:移除事件的所有监听器。
  eventNames:在当前 EventEmitter 对象上注册的事件
  getMaxListeners:获取可以添加到 EventEmitter 对象的监听器的最大数量
  setMaxListeners:设置 EventEmitter 监听器的最大数量
  prependListener:把添加的添加器放到最前面


  const Em = require('events')
  const ev = new Em()

  //声明事件
  ev.on('事件名',=>{
      //事件执行操作
  })

  //调用事件
  ev.emit('事件名')
```

### 浏览器中的事件环
```
1.从上至下执行所有的同步代码
2.执行过程中将遇到宏任务与微任务添加至相应的队列
3.同步代码执行完毕后，执行满足条件的微任务回调
4.微任务队列执行完毕后执行所有满足需求的宏任务回调
5.循环事件换操作
注意：每执行一个宏任务后就会立刻检查微任务队列
```

### Nodejs事件循环机制
```
timers:执行 setTimout 与 setInterval 回调
pending callbacks:执行系统操作的回调,列如tcp udp
idle,prepare:只在系统内部进行使用
poll:执行I/O相关的回调
check:执行setImmediate中的回调
close callbacks:执行 close 事件的回调

NodeJS完整事件环
    1.执行同步代码，将不同的任务添加至相应的队列
    2.所有同步代码执行后会去执行满足条件的微任务
    3.所有微任务执行后会执行timer队列中满足的宏任务
    4.timer中的所有宏任务执行完成后就会依次切换队列
    注意：在完成队列切换之前会先先清空微任务代码
```

### nodejs 与 浏览器事件环区别
```
  1.任务队列数不同
      浏览器中只有两个队列(宏任务、微任务)
      Nodejs中有6个事件队列
  2.Nodejs微任务执行时机不共
      二者都会在同步代码执行完毕后执行微任务
      浏览器平台下每当一个宏任务执行完毕后就会清空微任务
      Nodejs平台在事件切换时会去清空任务
  3.微任务优先级不同
      浏览器事件环中,微任务存放于事件队列,先进先出
      Nodejs 中 process.nextTick 先于 promise.then
```
### process.nextTick()
```
  当前操作结束（在下一个事件循环滴答开始之前）时调用此函数
```
### setImmediate()
```
  1. setImmediate() 参数传入的任何函数都是在事件循环的下一个迭代中执行的回调
  2. 延迟 0 毫秒的 setTimeout() 回调与 setImmediate() 非常相似,他们执行输出的结果不确定谁在前面
```

### 核心模块 Stream
```
Node.js 诞生之初就是为了提高IO性能
文件操作系统和网络模块实现了流接口
Node.js 中的流就是处理流式数据的抽象接口
Node.js 的 stream 模块 提供了构建所有流 API 的基础。 所有的流都是 EventEmitter 的实例

时间效率：流的分段处理可以同时操作多个数据chunk
空间效率：同一时间流无须占据大内存空间
使用方便，流配合管理，扩展程序变得简单

流的分类
  Readable:可读流，能实现数据的读取
  Writeable:可写流，能实现数据的写操作
  Duplex:双工流，即可读又可写
  Tranform:转换流，可读可写，还能实现数据转换

Node.js 流的特点
  Stream：模块实现了四个具体的抽象
  所有流都继承自 EventEmitter ，然后基于发布订阅模式具备发布数据的读写事件

可读流：生产供程序消费数据的流

pipe: 它获取来源流，并将其通过管道传输到目标流

process.stdin 返回连接到 stdin 的流。
process.stdout 返回连接到 stdout 的流。
process.stderr 返回连接到 stderr 的流。
fs.createReadStream() 创建文件的可读流。
fs.createWriteStream() 创建到文件的可写流。
net.connect() 启动基于流的连接。
http.request() 返回 http.ClientRequest 类的实例，该实例是可写流。
zlib.createGzip() 使用 gzip（压缩算法）将数据压缩到流中。
zlib.createGunzip() 解压缩 gzip 流。
zlib.createDeflate() 使用 deflate（压缩算法）将数据压缩到流中。
zlib.createInflate() 解压缩 deflate 流。

const Stream = require('stream')

创建可读流
const readableStream = new Stream.Readable({
  read() {}
})
readableStream.push('hi!')

创建可写流
writableStream._write = (chunk, encoding, next) => {
  console.log(chunk.toString())
  next()
}
process.stdin.pipe(writableStream)

从可读流中获取数据
readableStream.pipe(writableStream)

发送数据到可写流
writableStream.write('hey!\n')

使用信号通知已结束写入的可写流
writableStream.end()
```

### JavaScript 异步编程与回调
```
  1.JavaScript 默认情况下是同步的，并且是单线程的。 这意味着代码无法创建新的线程并且不能并行运行。
  2.回调是一个简单的函数，会作为值被传给另一个函数，并且仅在事件发生时才被执行。 之所以这样做，是因为 JavaScript 具有顶级的函数，这些函数可以被分配给变量并传给其他函数（称为高阶函数）。

  回调的替代方法:Promise（ES6）和 Async/Await（ES2017）。
```

### Promise
```
  1.Promise 是一种处理异步代码（而不会陷入回调地狱）的方式
  2.被创建的 promise 最终会以被解决状态或被拒绝状态结束，并在完成时调用相应的回调函数（传给 then 和 catch）
```

### async/await
```
  async/await 建立在 promise 之上
    1.函数必须被定义为 async
    2.定义为 async 的函数返回值为 一个 promise 对象
    3.定义的函数中有异步函，前面要加 await (代码会停止，直到promise被解决或被拒绝代码才会继续执行)
```
