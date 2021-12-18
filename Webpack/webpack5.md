# webpack

    为现代JavaScript应用提供静态模块打包

    打包：将不同类型资源按模块处理进行打包
    静态：打包后最终产出静态资源
    模块：webpack支持不同规范的模块化开发

## webpack结构

    Entry(入口)
    以哪个文件为入口起点开始打包，分析构建内部依赖图

    Output(输出)
    打包后的资源bundles输出到哪里去，以及如何命名

    Loader(加载器)
    处理非Javascript文件(webpack自身只理解Javascript)--读取文件内容开始工作

    Plugins(插件),每个插件的本质就是一个类
    插件可以用于执行范围更广的任务。插件的范围包括，从打包优化和压缩，一直到重新定义环境中的变量等

    Mode(模式)
    development：开发模式(能让代码本地调试运行)--process.NODE_ENV值为development
    production：生产模式(项目上线时的运行环境)--process.NODE_ENV值为production

### webpack 初体验

    npm init		//初始化包描述文件
    npm i webpack webpack-cli -g		//下载webpack包与webpack指令
    npm i webpack webpack-cli -D		//将webpack添加到开发依赖

    1.运行指令：
    	开发环境：webpack ./src/index.js -o ./build/built.js --mode=development
    		webpack会以./src/index.js为入口文件开始打包，打包输出到./build/built.js
    		整体打包环境，是开发环境
    	生成环境：webpack ./src/index.js -o ./build/built.js --mode=production
    		webpack会以./src/index.js为入口文件开始打包，打包输出到./build/built.js
    		整体打包环境，是生成环境

    此时页面引用的是打包后的资源(built.js)

    webpack 能处理js/json，不能处理css/img等其他资源
    将ES6模块化编译成浏览器能识别的模块化

## webpack相关指令

    npm init		//初始化包描述文件
    npm i webpack webpack-cli -g		//下载webpack包与webpack指令
    npm i webpack webpack-cli -D		//将webpack添加到开发依赖
    npm run build					   //项目打包
    npm run serve					   //项目热更新运行

## webpack安装的插件

    npm i css-loader style-loader -D	    //安装css-loader---处理css文件
    npm i less-loader -D				          //安装less-loader--处理less文件
    npm install node-sass sass-loader -D  //打包sass需要下载包node-sass和sass-loader

    npm i postcss-loader -D				       //安装postcss-loader--兼容浏览器样式ccs(处理样式兼容)
    npm i autoprefixer -D				         //可以对兼容浏览器的样式进行前缀的添加(处理样式兼容,这个可以不使用)
    npm i postcss-preset-env -D			     //很多处理css兼容功能的集合(处理样式兼容--可以替代autoprefixer)

    //把当前图片路径返回,图片资源拷贝到目录,分开请求
    npm i file-loader -D				  //处理图片文件
    //把当前图片要打包的以base64 url的方式加载到代码中,减少请求次数
    npm i url-loader -D					  //处理图片

    npm i clean-webpack-plugin -D		   //插件--清空之前打包的文件，便于下次打包重新生成
    npm i html-webpack-plugin -D		   //插件--打包时新建一个index.html,作为入口
    npm i @babel/preset-env -D			   //插件--安装babel中的预设
    npm i @babel/cli -D					       //安装babel命令行控制器
    //npm i @babel/polyfill -save			 //进行补丁填充，转换@babel/preset-env不能转换的js语法
    npm i core-js regenerator-runtime -save	//@babel/polyfill的两个核心包,因为上那个太大了,所以不推荐
    npm i vue-template-compiler -save		//转换vue中的语法让浏览器可以识别,实现浏览器兼容

    npm i copy-webpack-plugin -D		   //有些资源不需要打包，可以直接直接到目标文件夹
    npm i webpack-dev-server -D 		   //实现热更新实现,可实现局部加载,打包后的文件在内存，访问更快

    npm i vue -D						 //安装vue
    npm i vue-template-compiler			  //
    npm i vue-loader@14 -D				  //安装14版本的vue-loader,打包vue文件
    npm i typescript -D					 //安装TypeScript
    npm i ts-loader -D					 //安装ts-loader

## webpack.config.js 配置

```javascript
//教学视频:https://www.bilibili.com/video/BV1iv411N7jg?p=39
const path = require('path')    //获取文件绝对路径
const {Defineplugin} = requir('webpark')	// 创建静态变量，网页中可以访问
const {CleanWebpackPlugin} = require('clean-webpack-plugin')	//引入插件--清空之前的打包文件
const HtmlWebpackPlugin = require('html-webpack-plugin') //插件,在打包时新建index.html,作为入口
const CopyWebpackPlugin=require('copy-webpack-plugin')	//有些资源不需要打包，可以直接直接到目标文件夹
//如果是Vue3版本要手动加载VueLoaderPlugin,不然识别不了vue-loader
const VueLoaderPlugin= require('vue-loader/lib/plugin') //插件

module.exports={
    //文件入口--相对路径
    entry:'./src/index.js',
    //development(开发模式),production(生产模式)
    mode:'development',
    // source-map:映射 --> 在调试的时候可以定位到源代码中的信息  因为默认值是eval,开发的时候不好调试
    devtool:'source-map',
    //输出文件
    output:{
      filename:'build.js',//输出文件名
      path:path.resolve(__dirname,'dist'),//文件路径--只能用绝对路径
      publicPath:'',//(默认值:"")index.html内部的引用路径 (引用路径:域名 + publicPath + filename)
      assetMouuleFilename:'img/[name].[hash:6].[ext]',//配置asset输出的资源(asset webpack5内置的加载图片)
    },
    watch:false,//实现项目自动更新,可以在package.json中配置;二选一,不推荐,最好用webpack-dev-server
    target:'web',//开发阶段 屏蔽浏览器兼容性设置
    resolve:{//配置文件引入的解析规则
        //自动解析确定扩展名,可以引入的时候不写后缀名
      	extensions:['.js','.json','.ts','.jsx','.vue'],
        alias:{
            //对引入文件的目录进行简化
            "@":path.resolve(__dirname,'src')
        }
    },
    //开发中所用的的设置
    devServer:{//新版本的devServer属性不一样了，有很多属性都没有，建议去官网看看
      	hot:true,//热更新
      	hotOnly:true,//当发生语法错误的时候，再次改对，页面不会重新刷新，而是局部刷新
      	port:4000,//指定在哪个端口开启项目(开启服务)
      	open:false,//打开窗口设置(true为打开)
      	compress:true,//开启服务端的gzip压缩
      	proxy:{
            //所有以api开头的请求，都走/api的这个设置
            // /api/users
            // http://localhost:4000/api/users
            // https://api.github.com/api/users
          	proxy:{
        		"/api":{                        //请求前缀(加上这个,请求会走API)
            		target:"请求地址",           //配置请求地址
            		pathRewrite:{'^/api':''}    //把最终请求数据中的'/api'字符替换掉--正则表达式
           	 		ws:true,                    //用于支持websocket
            		changeOrigin:true           //为真时,请求头里面的端口号和服务器一致;否则和前端一致
        		},
        	},
            //默认值('/':当前项目所在目录)指定本地服务所在的目录
      		//publicPath:'/',//最好和output中的publicPath值一样--弹幕说这个值不存在了
      		//打包后的资源依赖其他的资源，此时就告知去哪里找--弹幕说这个值不存在了
      		//contentBase:path.resolve(__dirname,'public'),
      		//watchcontentBase:true,//这个属性现在也没了，热更新上面这个文件夹的文件
        },
    },
    //设置loader
    moudle:{
        rules:[
            {
                test:'/\.ts$/',
                //use:['ts-loader'],//有语法错误时,解析阶段会直接暴露出来--不能兼容
                //用babel-loader是因为要解析ts让他兼容老版本的浏览器--有语法错误只会在运行阶段暴露
                //下面有关于babel.config.js的设置可以直接应用
                use:['babel-loader'],
            },
            {	//帮助处理JS兼容
              	test:'/\.js$/',
                exclude:/node_modules/,//排除node_modules文件里面的文件，不被处理
                //use:['babel-loader'],//若有配置文件（babel.config.js）可以直接写成这个
                use:[{
                    loader:'babel-loader',
                    options:{
                        //安装babel-loader中的插件
                        plugins:[
                            '@babel/plugin-transform-arrow-functions',		//处理转换箭头函数
						  '@babel/plugin-transform-block-scoping',		  //处理块作用域
                        ],
                        //使用babel中的预设
                        presets:[
                            [
                                '@babel/preset-env',
                                {targets:'chrome 91'}, //兼容版本浏览器--这个优先级比下面那个高
                            ]
                        ],
                    }
                }]
            },
            {
                test:/\.css$/,	//一般就是一个正则表达式，用于匹配我们要处理的文件类型
                use:[		   //设置使用的loader--use执行顺序：从下往上,从左往右
                    'style-loader',
                    {
                        lader:'css-loader',
                        options:{
                            //如过在解析css的时候又找到一个css。则向前在找一个postcss-loader
                            importLoaders:1,
                            //可能会遇到设置背景图片时加载不了图片
                            //不转为es6模块化,使用commonjs解析
                            esModule:false,
                        }
                    },
                    {
                        loader:'postcss-loader',//使用postcss-loader
                        options:{			   //配置autoprefixer，并使用--对加前缀的css代码进行处理
                            postcssOptions:{
                                plugins:[
                                    //require('autoprefixer'),
                                    'postcss-preset-env',
                                ]
                            }
                        }
                    }
                ]
            },
            {
                test:/\.less$/,	//一般就是一个正则表达式，用于匹配我们要处理的文件类型
                use:[		   //设置使用的loader--use执行顺序：从下往上,从左往右
                    'style-loader',
                    {
                        loader:'css-loader',
                        options:{
                            //当css资料中有@import导入资源的时候,允许css-loader前2个应用
                            importLoaders:2,
                        }
                    },
                    {
                       loader:'postcss-loader',
                       options:{postcssOptions:{ plugins:['postcss-preset-env',]}}
                    }
                    'less-loader',
                ]
            },
            {test:/\.scss$/
              ,use:[
                'style-loader',
                {
                  loader: 'css-loader',
                  options: {
                    //当css资料中有@import导入资源的时候,允许css-loader前2个应用
                    importLoaders: 2,
                  }
                },
                {
                  loader: 'postcss-loader',
                  options: {
                    postcssOptions: {
                      plugins: ['postcss-preset-env', ]
                    }
                  }
                },
                'sass-loader'
              ]
            },
            //加载图片
            {
                test:/\.(png|svg|gif|jpe?g)$/,
                use:[{
                    loader:'file-loader',
                    options:{
                        /**
                        * [ext]:扩展名
                        * [name]:文件名
                        * [hash]:结合文件内容生成的hash
                        * [hash:<length]:截取值
                        * [path]:配置文件路径
                        * 配置编译后的文件名--(img/)可以直接配置输出到的文件夹名
                        */
                        name:'img/[name].[hash:6].[ext]'
                        //不转为es6模块化,使用commonjs解析
                        esModule:false,
                        //编译后文件输出到的文件夹--可以直接在name中指定输出到的img文件夹
                        //输出后在dist/img文件夹中
                        outputPath:'img',
                    }
                }]
            },
            //加载图片
            {
                test:/\.(png|svg|gif|jpe?g)$/,
                use:[{
                    loader:'url-loader',
                    options:{
                        name:'img/[name].[hash:6].[ext]',
                        //比limit设置的值大就做拷贝，比这个值小就直接转成base64---(1024是1kb)
                        limit:'25 * 1024',
                    }
                }]
            },
            /**加载图片--通过webpack5内置的asset
			* asset module type
			* asset/resource -->相当于--file-loader
			* asset/inline -->相当于--url-loader
			* asset/source -->相当于--row-loader(不常用)
			* asset
			*/
            {
                test:/\.(png|svg|gif|jpe?g)$/,
                type:'asset/resource',
                generator:{
                    filename:"img/[name].[hash:6].[ext]"//想要输出的文件路径与文件名
                }
            },
            {
                test:/\.(png|svg|gif|jpe?g)$/,
                type:'asset/inline',
            },
            {
                test:/\.(png|svg|gif|jpe?g)$/,
                type:'asset',
                generator:{
                    filename:"img/[name].[hash:6].[ext]",//想要输出的文件路径与文件名
                    publicPath:'./',//想要输出的路径
                },
                parser:{
                    dataUrlCondition:{
                    	maxSize:25 * 1024;//超过25kb的图片直接拷贝到文件夹中
                	}
                }
            },
            //上面三种的asset的使用方式选择其一就可以了
            {
            	test:/\.(ttf|woff2?)$/,//加载字体
            	type:'asset/resource',
            	generator:{
            		 filename:"font/[name].[hash:3].[ext]"//想要输出的文件路径与文件名
            	}
            },
            {
                test:/\.vue$/,	//打包vue文件
                use:['vue-loader']
            }
        ]
    },
    plugins:[
        //清空之前打包的文件
        new CleanWebpackPlugin(),
        //在打包文件新建一个index.html,作为入口
        new HtmlWebpackPlugin({
            title:'html-webpack-plugin',//修改页面的title
            template:'./public/index.html',//自己定制html的模板文件
        }),
        //创建静态变量，网页中可以访问
        new Defineplugin({
            BASE_URL:'"./"',
        }),
        //有些资源不需要打包，可以直接直接到目标文件夹
        new CopyWebpackPlugin({
            patterns:[//放置拷贝的配置项
                {
                    from:'public',	//拷贝来源文件夹
                    //to:'dist',	//拷贝到目标文件夹(可以不写,因为上面输出到的就是dist文件夹)
                    globOptions:{	//排除public文件夹中的index.html文件
                        ignore:['**/index.html'],	//  **/index.html 表示 public/index.html
                    }
                }
            ],
        }),
        //手动加载VueLoaderPlugin,加载vue-loader
        new VueLoaderPlugin({}),

    ]
}
/**
*	当根据不同模式---development(开发模式),production(生产模式)
*	加载相关的配置设置,在该视频最后两集
*	视频中拆分了webpack.config.js的相关配置根据不同的模式加载配置
*/
```

## package.json

```json
//webpack-cli执行的脚本--配置短命令
'scripts':{
    //config webpack.config.js：使用该文件中的配置
    //执行打包并自动编译，开启监控模式
    'buile':'webpack --config webpack.config.js --watch',
    //打包并自动编译,上面(加 watch)那种方式不推荐，不能局部刷新
    'serve':'webpack serve --config webpack.config.js --open',
    //编译ts文件,进行语法验证 noEmit:验证完不生成文件
    'ck':'tsc --noEmit'
}
//浏览器兼容性设置--可以让js和css兼容版本--正常在vue中的脚手架已经设置好了
'browserList':[
	">1%",				//市场占有率大于1%的浏览器
	"last 2 version",	 //兼容最近的两个版本的浏览器
	"not dead",			//没有过时的浏览器
]
```

## babel.config.js

```javascript
//进行语法填充,让新特性兼容老版本浏览器
module.exports={
	presets:[
		//根据预设，解决js兼容问题
		['@babel/preset-env',{
			//false:不对当前的js处理做 polyfill 的填充(默认值)
			//usage:依据用户源代码当中所使用到的新语法进行填充
			//entry:不管使用没有都要进行填充，会在js中import引用(不推荐)
			useBuiltIns:'usage',
			//引入的corejs版本,默认版本是2(会报错)
			corejs:3,
		}],
		//解决ts兼容问题
		['@babel/preset-typescript'],
	]
}
```

webpack依赖图

    若要webpack打包某个文件，要加到入口文件中，从而调用到

相关问题

    为什么需要Babel？
    JSX TS ES6  ---> 前面这些默认情况下浏览器不能直接识别，通过Babel让浏览器平台直接使用
    转换过程
    帮助处理JS兼容
    @babel/plugin-transform-arrow-functions		--处理转换箭头函数
    @babel/plugin-transform-block-scoping		--处理块作用域
    npx babel src --out-dir build --presets=@babel/preset-env //执行babel命令转换js

    babel-loader 相关的配置文件
    babel.config.js(后缀名可以是json/cjs/mjs)
    babelrc.js(后缀名可以是json)


    polufill是什么？
    在js中并不是所有的语法都能让@babel/preset-env进行转换(比如:Promise),让低版本浏览器兼容。
    进行补丁填充，转换@babel/preset-env不能转换的js语法
    webpack4中自带有这个转换，但是webpack5中为了加快打包速度，而改为手动添加
    @babel/polyfill --> 核心的两个core-js regenerator-runtime
    core-js：专门来做语法功能的
    regenerator-runtime：生成器函数、async、await函数
    npm i core-js regenerator-runtime -D
    按需加载


    watch自动编译的不足
    - watch(不推荐使用)
    - live server
    1.所有源代码都会被重新编译
    2.每次编译成功之后，都需要进行文件读写
    3.live server
    4.不能实现局部刷新
    webpack-dev-server可以实现热更新

    HMR：热更新
    需要热更新的需要在js引入阶段
    devServer:{
       hot:true,//热更新  
    },
    if(module.hot){
    	module.hot.accept(['./title.js'],()=>{
    		console.log('title.js模块更新')
    	})
    }

    output中的publicPath
    - publicPath：index.html内部引用路径
    - 引用路径：域名 + publicPath + filename

    devServer--新版本的devServer属性不一样了
    - publicPath：指定本地服务所在的目录，默认值：'/'	代表当前项目所在的目录下--弹幕说这个属性不存在了
    - contentBase：打包后的资源依赖其他的资源，此时就告知去哪里找--弹幕说这个属性不存在了
    - watchcontentBase：热更新上面设置的文件夹里面的文件
    proxy代理--可能属性不存在
    1.index.html 当中需要使用其他数据，然而这些数据在另外的端口上
    2.跨域请求，部署项目的时候一般不存在跨域请求的
    3.开发阶段可能有跨域请求

    source-map 映射 --> 在调试的时候可以定位到源代码中的信息

# 进阶版webpack

-   教学视频:<https://www.bilibili.com/video/BV1cv411C74F?p=13>

## loader配置

### webpack.config.js

```javascript
const path = require(path);

module.exports = {
    //loader使用
    module:{
        reles:[
            {
                test:/\.js$/,
                //通过配置文件在loaders文件夹中找到loader1.js配置文件
                //loader:'loader1',
                //如果加载多个loader文件,因为执行是从下往上执行的,所以要用module.exports.pitch暴露出去
                //module.exports.pitch:先解析文件,然后从下往上开始执行loader文件
                //下面有loader相关文件
                use:[
                    'loader1',
                    'loader2',
                    {
                        loader:"loader3",
                        options:{
                            name:'我就是name值'
                        }
                    },
                    {
                        loader:'babelLoader',//自定义babelLoader
                        presets:[
                            '@babel/preset-env'
                        ]
                    }
                ]
            }
        ]
    },
    //解析loader的规则
    resolveLloader:{
        //默认在哪些目录下面找loader
        modules:[
            //在项目中的node_modules文件夹中找loader文件配置
            'node_modules',
            //在项目中的loaders文件夹找loader文件配置
            path.resolve(__dirname,"loaders"),
        ],
    }
}
```

### loaders/loader3.js

```javascript
//loader本质上是一个函数

//获取loader中options里面设置属性值
//这里要安装 npm i loader-utils -D
const {getOptions} = require('loader-utils');
//验证loader中options属性值是否符合规范
const {validate} = require('schema-utils');
//校验options的规范规则--在下面有schema.json文件
const schema = require('./schema.json');

//一个loader时返回的可以用这种写法--这是同步执行的一种方式
module.exports = function(content,map,meta){
    //获取options
    const options = getOptions(this);
    //this.getOptions();//听说这样也可以获取到options的值
    console.log(options.name);//会输出--我就是name值

    //校验options是否合法
    //第一个参数：options的规范规则
    //第二个参数：options的内容
    //第三个参数：如果校验失败返回信息的loader名字
    validate(schema,options,{
        name:'loader3'
    })
    return content;
}
//同步执行的还有第二种写法
module.exports = function(content,map,meta){
    //第一个参数：是否有错误		  要传
    //第二个参数：要传递的内容		 要传
    //第三个参数：map文件			可传,可不传
    //第四个参数：meta信息			可选,可不传
    this.callback(null,content,map,meta)
}

//推荐异步loader写法
module.exports = function(content,map,meta){
    //当程序执行到这里就会停住,重新调用callback方法将会继续执行
    const callback = this.async();
    setTimeout(()=>{
        callback(null,content);
    })
}

//当加载多个loader时,pitch可以先解析,然后从最后一个从下往上执行
module.exports.pitch = function(content,map,meta){
    return content;
}
```

### loaders/schema.json

```json
{
    'type':'object', //指定options的类型
    'properties':{	 //指定options可以拥有的属性
        'name':{	 
            'type':'string',	//关于options中name的类型
            'description':'类型是字符型',	//关于options中name的描述
        }
    },
    'addtionalProperties':true	//允不允许追加一些其他的属性(自定义),true:允许
}
```

### 自定义babel-loader----实战

```javascript
const {getOptions} = require('loader-utils');
const {validate} = require('schema-utils');
const babel = require('@babel/core');
const util = require('util');		//引入nodeJs的一个工具类

const babeSchema = require('./babeSchema.json');
//babel.transform用来编译代码方法
//是一个普通异步方法
//util.promisify将普通的异步函数转为基于promise的异步方法
const transform = util.promisify(babel.transform)

module.exports = function(content,map,meta){
    //获取loader的options配置
    const options = getOptions(this) || {};
    //校验babel的options配置
    validate(babeSchema,options,{
        name:'Babel Loader'
    });

    //创建异步
    const callback = this.async();

    //使用babel编译代码
    transform(content,options)
    .then(({code,map}) => callback(null,code,map,mate))
    .catch((e) => callback(e))
}
```

### 定义babel-loader的校验规则----loaders/babeSchema.json

```json
{
    'type':'object',
    'properties':{	 
        'presets':{	 
            'type':'array',
            'description':'类型是数组',
        }
    },
    'addtionalProperties':true
}
```

## plugin配置

### tapable.test.js

```javascript
//要安装 npm i tapable -D
const {SyncHook,SyncBailHook,AsyncParalleHook,AsyncSeriesHook} = require('tapable');

class Lesson{
    constructor(){
        //初始化hooks容器(钩子)
        //添加hooks属性,hooks是一个对象,在对象添加多个钩子
        this.hooks ={
            //中括号里面里面是SyncHook函数可以接受到什么参数
            //同步hooks,任务会依次执行
            syncHook:new SyncHook(['参数1']),
            //一旦有返回值就会立即退出
            syncBailHook:new SyncBailHook(['参数1']),
            //异步并行--异步执行
            asyncParalleHook:new AsyncParalleHook(['参数1']),
            //异步串行--同步执行
            asyncSeriesHook:new AsyncSeriesHook(['参数1']),
        }
    }

    //定义方法使用容器
    tap(){
        //hooks容器中注册事件/添加回调函数
        this.hooks.syncHook.tap('class0310',(address) => {
            console.log('class0310',address)
        })
        this.hooks.syncBailHook.tap('class0410',(address) => {
            console.log('class0410',address)
            return address;
        })
        this.hooks.AsyncParalleHook.tapAsync('class0510',(address,callback) => {
            setTimeout(()=>{
                //传入的回调函数
                callback();
            },1000)
        })
        this.hooks.AsyncParalleHook.tapPromise('class0610',(address) => {
            retrun new Promies((resolve,)=>{
                setTimeout(()=>{
                	//传入的回调函数
                	resolve();
            	},1000);
            })
        })
    }

    //
    start(){
        //触发hooks
        this.hooks.syncHook.call('c318')
        this.hooks.syncBailHook.call('c318')

        //tapAsync 和 tapPromise都会执行
        this.hooks.AsyncParalleHook.callAsync('c318',function(){
            //代表所有AsyncParalleHook容器中的函数触发完了,
        })
    }
}

const l = new Lesson();
l.tap();
l.start();
```

### webpack.config.js

```javascript
//应用自定义插件
const plugin1 = require(./plugins/Plugin1);
const plugin2 = require(./plugins/Plugin2)

module.exports = {
    plugins:[
        new plugin1();
        new plugin2();
    ]
}
```

### plugins/Plugin1.js --- compiler钩子

```javascript
class Plugin1{
	apply(compiler){
		compiler.hooks.emit.tap("Plugin1",(compilation)=>{
			console.log('emit.tap');
		});
		compiler.hooks.emit.tapAsync("Plugin1",(compilation,callback)=>{
			setTimeout(()=>{
                callback();
            },1000)
		});
        compiler.hooks.emit.tapPromise("Plugin1",(compilation)=>{
			return new Promise((resolve)=>{
                setTimeout(()=>{
                    resolve();
             	},1000)
            })
		});

		compiler.hooks.afterEmit.tap("Plugin1",(compilation)=>{
			console.log('afterEmit.tap');
		});

		compiler.hooks.done.tap("Plugin1",(stats)=>{
			console.log('done.tap');
		});
	}
}

module.exprots = Plugin1;
```

### plugins/Plugin2.js --- compilation钩子

```javascript
const fs = require('fs');			//文件读取模块
const util = require('util');		//工具方法
const path = require('path');		//处理文件路径的模块

//把数据转成基于webpack文件风格的样式
const webpack = require('webpack');
const {RawSource(data);} = webpack.sources;

//将fs.readFile变成基于promise风格的异步方法
const readFile = util.promisify(fs.readFile);

class Plugin2{
    apply(compiler){
        //初始化compilation钩子
        compiler.hooks.thisCompilation.tap("Plugin2",(compilation)=>{
            //添加资源
            compilation.hooks.additionalAssets.tapAsync('Plugin2',async (callback)=>{
                //往要输出资源中，添加一个a.text
                const content = 'hello world'
                compilation.assets[a.txt] = {
                    //文件的大小
                    size(){
                        return content.length;
                    },
                    //文件的具体内容
                    source(){
                        return content;
                    };
                }
                //读取项目中的b.txt文件--并输出到dist文件下
                const data = await readFile(path.resolve(__dirname,'b.txt'));

                //下面两种方式二选一，效果是一样的
                compilation.assets[b.txt] = new RawSource(data);
                compilation.emitAsset('b.text',new RawSource(data))
                callback();
            })
        })
    }
}

module.exprots = Plugin2;
```

### package.json

```json
{
	//以调试模式运行./node_modules/webpack/bin/webpack,js这个文件,然后就可以在文件中打debugger了
	'scripts':'node --inspect-brk ./node_modules/webpack/bin/webpack,js'
}
```

## 实战Plugins -- 将某些文件夹下面的文件复制到指定文件夹中

### webpack.config.js

```javascript
const CopyWebpackPlugin = require('./plugins/CopyWebpackPlugin');

module.exprots = {
	plugins:[
		new CopyWebpackPlugin({
			from:'public',//文件来自哪个目录
			to:'.',//将文件复制到哪个目录下--可选值
			ignore:['index.html'],//将要忽略的文件
		});
	]
}
```

### ./plugins/CopyWebpackPlugin.js

```javascript
const path = require('path');
const fs = require('fs');
const {promisify} = requrie('util');

//npm i schema-utils -D  //-验证规则方法库
const {validate} = require('schema-utils');
//专门用来匹配文件列表的--可以根据规则忽略一些文件
// npm i globby -D
const globby = require('globby');
const webpack = require('webpack');

//引入校验规则
const schema = require('./schema.json');

const readFile = promisify(fs.readFile);
const {RawSource} = webpack.sources;

class CopyWebpackPlugin{
	constructor(options={}){
		//严重option是否符合规范
		validate(schema,options,{
			name:'CopyWebpackPlugin',
		})
		this.options = options;
	}

	apply(compiler){
		//初始化compilation
		compiler.hooks.thisCompilation.tap('CopyWebpackPlugin',(compilation)=>{
			//在添加资源触发的钩子函数
			compilation.hooks.additionalAssets.tapAsync('CopyWebpackPlugin',async (cb)=>{
				//将from下面的资源复制到to下面
				const {from,ignore} = this.options;
				const to = this.options.to ? this.options.to : '.';

				//1.读取from中所有资源

				//context就是webpack配置
				//运行指令的目录
				const context = compiler.options.context;//process.cwd()
				//将输入路径转为绝对路径
				//如果传入的是绝对路径就原样返回否则就转为绝对路径
				const absoluteFrom = path.isAbsolute(from) ? from : path.resolve(context,from)

				//globby(要处理的文件夹,忽略文件的规则)
				//得到所有要加载的文件路径数组
				const paths = await globby(absoluteFrom,{ignore});

				//2.读取paths中的所有资源
				const files = await Promise.all(
					paths.map(async (absolutePath)=>{
						//读取文件
						const data = await readFile(absolutePath);
						//得到文件路径最后文件名称
						const relativePath = path.basename(absolutePath);

						//和to属性结合
						//to没有值 -->  reset.class
						//to的值是css -->  css/reset.class
						const filename = paht.join(to,relativePath);

						retrun {
							//文件数据
							data,
							//文件名称
							filename,
						}
					})
				)

				//3.生成webpack格式的资源文件
				const assets = files.map((file) =>{
					const source = new RawSource(file.data);
					return{
						source,
						filename:file.filename,
					}
				})

				//4.添加到compilation中,输出出去
				assets.forEach((asset) => {
					compilation.emitAsset(asset.filename,asset.source)
				});

				//回调函数
				cb();

			});
		})
	}
}

moudle.exports = CopyWebpackPlugin;
```

### ./plugins/schema.json

```json
{
	'type':'object',
	'properties':{
		'from':{
			'type':'String',
		},
		'to':{
			'type':'String',
		},
		'ignore'{
			'type':'array',
		}
	},
	'addtionalProperties':false
}
```

## webpack执行流程

    1、初始化 Compiler:new Webpack(config) 得到 Compiler 对象
    2、开始编译：调用 Compiler 对象 run 方法开始执行编译
    3、确定入口：根据配置中的 entry 找出所有的入口文件
    4、编译模块：从入口文件出发，调用所有配置的 Loader 对模块进行编译,找出改模块依赖的模块,递归直到所有模块被加载进来
    5、完成模块编译：在经过第 4 步使用 Loader 编译完所有模块后，得到了每个模块编译后的最终内容以及它们之间的依赖关系。
    6、输出资源：根据入口和模块之间的依赖关系，组装成一个个包含多个模块的 Chunk,再把每个 Chunk 转换成一个单独的文件加入到输出列表。(注意：这步是可以修改输出内容的最后机会)
    7、输出完成：在确定输出内容后，根据配置确定输出路径和文件名，把文件内容写入到文件系统

### 自定义一个自己简单的webpack----在视频p23
