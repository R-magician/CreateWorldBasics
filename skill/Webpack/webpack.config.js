const path = require('path');

const {
  CleanWebpackPlugin
} = require('clean-webpack-plugin') //引入插件--清空之前的打包文件
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  mode: 'development',
  output: {
    filename: 'build.js', //输出文件名
    path: path.resolve(__dirname, 'build'), //文件路径--只能用绝对路径
  },
  devServer: {
    static: './build' //将 build 目录下的文件 部署 到 localhost:8080 下
  },
  resolve: { //配置文件引入的解析规则
    //自动解析确定扩展名,可以引入的时候不写后缀名
    extensions: ['.js', '.json', '.ts', '.jsx', '.vue'],
    alias: {
      //对引入文件的目录进行简化
      "@": path.resolve(__dirname, 'src')
    }
  },
  module: {
    rules: [{
        test: /\.css$/, //一般就是一个正则表达式，用于匹配我们要处理的文件类型
        use: [ //设置使用的loader--use执行顺序：从下往上,从左往右
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              //如过在解析css的时候又找到一个css。则向前在找一个postcss-loader
              importLoaders: 1,
              //可能会遇到设置背景图片时加载不了图片
              //不转为es6模块化,使用commonjs解析
              esModule: false
            }
          },
          {
            loader: 'postcss-loader', //使用postcss-loader
            options: { //配置autoprefixer，并使用--对加前缀的css代码进行处理
              postcssOptions: {
                plugins: [
                  //require('autoprefixer'),
                  'postcss-preset-env'
                ]
              }
            }
          }
        ]
      },
      {
        test: /\.less$/, //一般就是一个正则表达式，用于匹配我们要处理的文件类型
        use: [ //设置使用的loader--use执行顺序：从下往上,从左往右
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
          "less-loader"
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
      { //帮助处理JS兼容
        test: '/\.js$/',
        exclude: /node_modules/, //排除node_modules文件里面的文件，不被处理
        //use:['babel-loader'],//若有配置文件（babel.config.js）可以直接写成这个
        use: [{
          loader: 'babel-loader',
          options: {
            //安装babel-loader中的插件
            plugins: [
              '@babel/plugin-transform-arrow-functions', //处理转换箭头函数
              '@babel/plugin-transform-block-scoping', //处理块作用域
            ],
            //使用babel中的预设
            presets: [
              [
                '@babel/preset-env',
                {
                  targets: 'chrome 91'
                }, //兼容版本浏览器--这个优先级比下面那个高
              ]
            ],
          }
        }]
      },
    ]
  },
  plugins: [
    //清空之前打包的文件
    new CleanWebpackPlugin(),
    //在打包文件新建一个index.html,作为入口
    new HtmlWebpackPlugin({
      title: 'Webpack', //修改页面的title
      template: './public/index.html', //自己定制html的模板文件
    })
  ]
}
