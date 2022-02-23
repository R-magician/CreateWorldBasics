<a href="https://www.runoob.com/jsref/jsref-tutorial.html" target="_blank">JS 对象,Browser 对象,DOM 对象参考手册</a>

### HTML5 声明

<!DOCTYPE> 声明必须是 HTML 文档的第一行

指示 web 浏览器关于页面使用哪个 HTML 版本进行编写的指令

### HTML5 新元素

- < canvas>
  - 标签定义图形，比如图表和其他图像。该标签基于 JavaScript 的绘图 API
- 新多媒体元素
  - < audio>
    - 定义音频内容
  - < video>
    - 定义视频（video 或者 movie）
  - < source>
    - 定义多媒体资源 < video> 和 < audio>
  - < embed>
    - 定义嵌入的内容，比如插件。
  - < track>
    - 为诸如 < video> 和 < audio> 元素之类的媒介规定外部文本轨道。
- 新的语义和结构元素
  - 就是加了一些新的标签,都可以用 div 或 span 重新设置

## Canvas

- HTML5 < canvas> 元素用于图形的绘制，通过脚本 (通常是 JavaScript)来完成
- < canvas> 标签只是图形容器，您必须使用脚本来绘制图形
- <a href="https://www.w3school.com.cn/tags/html_ref_canvas.asp">查看详细属性</a>

```javascript
//找到 <canvas> 元素
let c = document.getElementById("myCanvas");
//创建 context 对象
let ctx = c.getContext("2d");
//绘制一个红色的矩形
ctx.fillStyle = "#FF0000";
ctx.fillRect(0, 0, 150, 75);
//开启一条路径
ctx.beginPath();
//定义线条开始坐标
ctx.moveTo(0, 0);
//定义线条结束坐标
ctx.lineTo(200, 100);
//绘制线条
ctx.stroke();

//开启一条路径
ctx.beginPath();
//绘制圆形 arc(x,y,r,start,stop)
//arc(绘制x坐标,绘制y坐标,半径r,start,stop)
ctx.arc(95, 50, 40, 0, 2 * Math.PI);
//绘制线条
ctx.stroke();
//绘制线条
ctx.stroke();
```

## SVG

- SVG 指可伸缩矢量图形 (Scalable Vector Graphics)
- SVG 用于定义用于网络的基于矢量的图形
- SVG 使用 XML 格式定义图形
- SVG 图像在放大或改变尺寸的情况下其图形质量不会有损失
- SVG 是万维网联盟的标准
- 三种图像对象存在，分别是矢量图像、点阵图像和文本
- 优势
  - SVG 图像可通过文本编辑器来创建和修改
  - SVG 图像可被搜索、索引、脚本化或压缩
  - SVG 是可伸缩的
  - SVG 图像可在任何的分辨率下被高质量地打印
  - SVG 可在图像质量不下降的情况下被放大

## MathML

MathML 是数学标记语言，是一种基于 XML（标准通用标记语言的子集）的标准
用来在互联网上书写数学符号和公式的置标语言

## 拖放

- 设置元素可拖放
  - < img draggable="true">
  - ondragstart 拖动什么
  - ondragover 放到何处
  - ondrop 进行放置

## 地理位置

getCurrentPosition() 方法来获得用户的位置

navigator.geolocation.getCurrentPosition((data)=>{console.log(data)})

watchPosition() - 返回用户的当前位置，并继续返回用户移动时的更新位置（就像汽车上的 GPS）。

clearWatch() - 停止 watchPosition() 方法

## 新的 Input 输入类型

- color 颜色
- date 日期
- datetime 日期和时间
- datetime-local 日期和时间
- email 邮箱
- month 月份
- number 数字
- range 选择一个范围
- search 搜索
- tel 电话
- time 时间
- url 链接
- week 选择周和年

## 新的表单元素

- < datalist> 规定输入域的选项列表。
  - 输入时有下拉选项
- < keygen> 提供一种验证用户的可靠方法
- < output> 不同类型的输出，比如计算或脚本输出

## 语义元素

语义= 意义

语义元素 = 有意义的元素

- < header> 头部标签
- < nav> 导航标签
- < section> 文档中的节\段区域
- < article> 页面独立的内容
- < aside> 侧边栏内容
- < figcaption> 定义 < figure> 元素的标题
- < figure> 独立的流内容（图像、图表、照片、代码）
- < footer> 定义页脚

## Web 存储

localStorage ：用于长久保存整个网站的数据，保存的数据没有过期时间，直到手动去除。

sessionStorage : 用于临时保存同一窗口(或标签页)的数据，在关闭窗口或标签页之后将会删除这些数据。

## 应用程序缓存

- 离线浏览 - 用户可在应用离线时使用它们
- 速度 - 已缓存资源加载得更快
- 减少服务器负载 - 浏览器将只从服务器下载更新过或更改过的资源。
- 一旦文件被缓存，则浏览器会继续展示已缓存的版本，即使您修改了服务器上的文件。为了确保浏览器更新缓存，您需要更新 manifest 文件。
- 完整的 Manifest 文件

```
CACHE MANIFEST       //在此标题下列出的文件将在首次下载后进行缓存
# 2012-02-21 v1.0.0  //"#" 开头的是注释行
/theme.css
/logo.gif
/main.js

NETWORK:             //在此标题下列出的文件需要与服务器的连接，且不会被缓存
login.php

FALLBACK:            //在标题下列出的文件规定当页面无法访问时的回退页面(比如404页面)
/html/ /offline.html
```

## Web Workers

- web worker 是运行在后台的 JavaScript，不会影响页面的性能。
- 独立于其他脚本，不会影响页面的性能。
- 您可以继续做任何愿意做的事情：点击、选取内容等等，而此时 web worker 在后台运行。
- 同源限制
  - 分配给 Worker 线程运行的脚本文件，必须与主线程的脚本文件同源。
- DOM 限制
  - Worker 线程所在的全局对象，与主线程不一样，无法读取主线程所在网页的 DOM 对象
  - 也无法使用 document、window、parent 这些对象
  - 但是，Worker 线程可以 navigator 对象和 location 对象
- 通信联系
  - Worker 线程和主线程不在同一个上下文环境，它们不能直接通信，必须通过消息完成
- 脚本限制
  - Worker 线程不能执行 alert()方法和 confirm()方法，但可以使用 XMLHttpRequest 对象发出 AJAX 请求
- 文件限制
  - Worker 线程无法读取本地文件，即不能打开本机的文件系统（file://），它所加载的脚本，必须来自网络。
- 主线程 API
  - Worker.onerror：指定 error 事件的监听函数。
  - Worker.onmessage：指定 message 事件的监听函数，发送过来的数据在 Event.data 属性中。
  - Worker.onmessageerror：指定 messageerror 事件的监听函数。发送的数据无法序列化成字符串时，会触发这个事件。
  - Worker.postMessage()：向 Worker 线程发送消息。
  - Worker.terminate()：立即终止 Worker 线程。
- Worker 线程(开启的线程)
  - self.name： Worker 的名字。该属性只读，由构造函数指定。
  - self.onmessage：指定 message 事件的监听函数。
  - self.onmessageerror：指定 messageerror 事件的监听函数。发送的数据无法序列化成字符串时，会触发这个事件。
  - self.close()：关闭 Worker 线程。
  - self.postMessage()：向产生这个 Worker 线程发送消息。
  - self.importScripts()：加载 JS 脚本。

```javascript
//主线程采用new命令，调用Worker()构造函数，新建一个 Worker 线程
//Worker()构造函数的参数是一个脚本文件，该文件就是 Worker 线程所要执行的任务
let worker = new Worker("work.js", { name: "Worker 的名称" });

//主线程调用worker.postMessage()方法，向 Worker 发消息
worker.postMessage("Hello World");
worker.postMessage({ method: "echo", args: ["Work"] });

//主线程通过worker.onmessage指定监听函数，接收子线程发回来的消息
worker.onmessage = function (event) {
  console.log("Received message " + event.data);
  doSomething(); //执行任务函数
};

//完成任务以后，主线程就可以把它关掉。
worker.terminate();

//监听主线程的error事件
//方法一
worker.onerror(function (event) {
  console.log(
    ["ERROR: Line ", e.lineno, " in ", e.filename, ": ", e.message].join("")
  );
});

//方法二
worker.addEventListener("error", function (event) {
  // ...
});
```

Worker 线程

```javascript
//Worker 线程内部需要有一个监听函数，监听message事件
//写法一
this.addEventListener(
  "message",
  function (e) {
    this.postMessage("You said: " + e.data);
  },
  false
);

// 写法二
addEventListener(
  "message",
  function (e) {
    postMessage("You said: " + e.data);
  },
  false
);

//除了使用self.addEventListener()指定监听函数，也可以使用self.onmessage指定

//用于在 Worker 内部关闭自身
this.close();

//加载其他脚本,该方法可以同时加载多个脚本。
importScripts("script1.js", "script2.js");
```

## SSE(Server-Sent Events 单向消息传递)

- 服务器发送事件（server-sent event）允许网页获得来自服务器的更新。
- Server-Sent 事件指的是网页自动获取来自服务器的更新。
- 只能服务器向浏览器发送，因为流信息本质上就是下载
- 如果浏览器向服务器发送信息，就变成了另一次 HTTP 请求
- 优点
  - SSE 使用 HTTP 协议，现有的服务器软件都支持。WebSocket 是一个独立协议。
  - SSE 属于轻量级，使用简单；WebSocket 协议相对复杂。
  - SSE 默认支持断线重连，WebSocket 需要自己实现。
  - SSE 一般只用来传送文本，二进制数据需要编码后传送，WebSocket 默认支持传送二进制数据。
  - SSE 支持自定义发送的消息类型。

```javascript
// SSE 的客户端 API 部署在EventSource对象上
// 生成一个EventSource实例，向服务器发起连接。
// 上面的url可以与当前网址同域，也可以跨域
// 打开withCredentials属性，表示是否一起发送 Cookie
let source = new EventSource(url,{ withCredentials: true });

//EventSource实例的readyState属性，表明连接的当前状态。该属性只读，可以取以下值。
0：相当于常量EventSource.CONNECTING，表示连接还未建立，或者断线正在重连。
1：相当于常量EventSource.OPEN，表示连接已经建立，可以接受数据。
2：相当于常量EventSource.CLOSED，表示连接已断，且不会重连。

//连接一旦建立，就会触发open事件，可以在onopen属性定义回调函数。
source.onopen = function (event) {
  // ...
};

//客户端收到服务器发来的数据，就会触发message事件，可以在onmessage属性的回调函数。
//第一种写法
source.onmessage = function (event) {
  var data = event.data;
  // handle message
};

//第二种写法
source.addEventListener('message', function (event) {
  var data = event.data;
  // handle message
}, false);

//关闭SSE连接
source.close();
```

<a target="_blank" href="https://www.ruanyifeng.com/blog/2017/05/server-sent_events.html">查看服务器实现</a>

## WebSocket

- WebSocket 是 HTML5 开始提供的一种在单个 TCP 连接上进行全双工通讯的协议。
- WebSocket 使得客户端和服务器之间的数据交换变得更加简单，允许服务端主动向客户端推送数据。
- 在 WebSocket API 中，浏览器和服务器只需要完成一次握手，两者之间就直接可以创建持久性的连接，并进行双向数据传输。
- HTML5 定义的 WebSocket 协议，能更好的节省服务器资源和带宽，并且能够更实时地进行通讯。
- WebSocket 的特点
  - （1）建立在 TCP 协议之上，服务器端的实现比较容易。
  - （2）与 HTTP 协议有着良好的兼容性。默认端口也是 80 和 443，并且握手阶段采用 HTTP 协议，因此握手时不容易屏蔽，能通过各种 HTTP 代理服务器。
  - （3）数据格式比较轻量，性能开销小，通信高效。
  - （4）可以发送文本，也可以发送二进制数据。
  - （5）没有同源限制，客户端可以与任意服务器通信。
  - （6）协议标识符是 ws（如果加密，则为 wss），服务器网址就是 URL。
  - ` ws://example.com:80/some/path`
- readyState 属性返回实例对象的当前状态，共有四种。
  - CONNECTING：值为 0，表示正在连接。
  - OPEN：值为 1，表示连接成功，可以通信了。
  - CLOSING：值为 2，表示连接正在关闭。
  - CLOSED：值为 3，表示连接已经关闭，或者打开连接失败。

```javascript
//WebSocket 对象作为一个构造函数，用于新建 WebSocket 实例
let ws = new WebSocket("ws://localhost:8080");

//指定连接成功后的回调函数
ws.onopen = function () {
  ws.send("Hello Server!");
};

//可以用addEventListener添加绑定方法
ws.addEventListener("open", function (event) {
  ws.send("Hello Server!");
});

//指定连接关闭后的回调函数
//第一种
ws.onclose = function (event) {
  var code = event.code;
  var reason = event.reason;
  var wasClean = event.wasClean;
  // handle close event
};

//第二种
ws.addEventListener("close", function (event) {
  var code = event.code;
  var reason = event.reason;
  var wasClean = event.wasClean;
  // handle close event
});

//指定收到服务器数据后的回调函数
//第一种
ws.onmessage = function (event) {
  var data = event.data;
  // 处理数据
};

//第二种
ws.addEventListener("message", function (event) {
  var data = event.data;
  // 处理数据
});

//向服务器发送数据
ws.send("your message");

//指定报错时的回调函数
ws.onerror = function (event) {
  // handle error event
};
```
