### url.parse() 解析请求地址
```
可以解析一个url地址，通过传入第二个参数把包含有查询字符串的query转换成对象
let url = require('url);
let obj = url.parse('链接地址');
```

### url.resolve() 合成地址
```
let url = url.resolve('https://www.baidu.com','/index')
```

### request 爬虫请求
```
request.get(url,(err,response,body)=>{
    console.log(err,response,body)
})
```

### 匹配字符
```
let reg =/<a href="(.*?)"></a>/igs
let arryClass=[];
let res;
while(res = reg1.exec(result){
    arryClass.push({ name:res[1]})
}
```

### cheerio 不用正则抓取数据
```
cheerio是nodejs的抓取页面模块，为服务器特别定制的，快速灵活实时jQuery核心实现，适合各种Web爬虫程序
npm install cheerio

搭配axios请求数据用

axios.get(url).then(res=>{
    //像jQuery使用
    let $ = cheerio.load(res.data)
    $('a').attr('herf')
})

```

### axios 请求代理
```javascript
//请求配置对象
let config ={
    //代理配置
    proxy: {
        host: '127.0.0.1',
        port: 9000,
        auth: {
            username: 'mikeymike',
            password: 'rapunz3l'
        }
    },
}
axios.get(url,config).then(res=>{
    
})
```

### puppeteer 无头浏览器
```javascript
let puppeteer = require('puppeteer')
(async () => {
    //开启一个浏览器
    const browser = await puppeteer.launch({
        slowMo:500,//延时500ms打开
        devtools:true,//模拟打开控制台
    });
    //打开一个页面
    const page = await browser.newPage();
    //访问一个网址
    await page.goto('https://example.com');
    //截图当前页面
    await page.screenshot({ path: 'example.png' });
    //关闭浏览器
    //await browser.close();

    //设置某个元素获取焦点
    await page.focus("#id");
    //模拟用户输入内容
    await page.keyboard.sendCharacter('输入内容');
    //模拟用户点击事件
    await page.click("#id")

    page.on('load',async ()=>{
        
        let result = awqit page.evaluate(async()=>{
            //找到页面上所有class为img的元素
            let imges = await document.getElementsByClassName('img');
            return [...imges].map(img=>img.src)
        })
    })
})();

```