## CSS3有哪些新特性
 - RGBA和透明度
 - 背景
   - background-image----- 设置背景图片 
     - background-image: linear-gradient(#e66465, #9198e5); //设置渐变
   - background-size-------- 设置背景图像的大小
   - background-origin----- 背景图像的位置区域
   - background-clip-------- 背景剪裁属性是从指定位置开始绘制
 - word-wrap（对长的不可分割单词换行）word-wrap：break-word
 - 文字阴影：text-shadow：5px 5px 5px #FF0000;（水平阴影，垂直阴影，模糊距离，阴影颜色）
 - font-face属性：定义自己的字体
 - 圆角（边框半径）：border-radius 属性用于创建圆角
 - 边框图片：border-image: url(border.png) 30 30 round
 - 盒阴影：box-shadow: 10px 10px 5px #888888
 - 媒体查询：定义两套css，当浏览器的尺寸变化时会采用不同的属性
 - CSS3过渡
 - CSS3变换
 - CSS3动画

## CSS 选择器

- 1.标签选择器(如：body,div,p,ul,li)
- 2.类选择器(如：class="head",class="head_logo")
- 3.ID 选择器(如：id="name",id="name_txt")
- 4.全局选择器(如：\*号)
- 5.组合选择器(如：.head .head_logo,注意两选择器用空格键分开)
- 6.后代选择器 (如：#head .nav ul li 从父集到子孙集的选择器)
- 7.群组选择器 div,span,img {color:Red} 即具有相同样式的标签分组显示
- 8.继承选择器(如：div p,注意两选择器用空格键分开)
- 9.伪类选择器(如：就是链接样式,a 元素的伪类，4 种不同的状态：link、visited、active、hover)
- 10.字符串匹配的属性选择符(^ $ \*三种，分别对应开始、结尾、包含)
- 11.子选择器 (如：div>p ,带大于号>)
- 12.CSS 相邻兄弟选择器器 (如：h1+p,带加号+)

## CSS 选择器优先级

- !important > 行内样式 > ID 选择器 > 类选择器/属性/伪类 > 标签/伪元素 > 通配符 > 继承 > 浏览器默认属性

## 伪类 伪元素

- 伪类
  - :hover 鼠标悬停
  - :focus 获得焦点
  - :first-child 选择为父元素的首个子元素
  - :nth-child(n) 选择某个元素
  - :last-child 选择为父元素的最后一个子元素
  - :disabled 没有被禁用的元素
  - :active 被激活
  - :checked 被点击
  - :link 未被访问的链接
  - :visited 已访问的链接
  - <a href="[" target="_blank](https://www.w3school.com.cn/css/css_pseudo_elements.asp)">更多伪类</a>
- 伪元素
  - ::before 在元素内容之前插入一些内容
  - ::after 在元素内容之后插入一些内容
  - ::selection 匹配用户选择的元素部分
  - ::first-letter 选择元素的首个字母
  - ::first-line 选择元素的首行

## 盒子模型

- 标准盒子模型：宽度=内容的宽度（content）+ border + padding + margin
- 低版本 IE 盒子模型：宽度 = 内容宽度（content+border+padding）+ margin
- box-sizing(默认:content-box)
  - context-box : W3C 的标准盒子模型
  - border-box : IE 传统盒子模型

## display

- inline（默认）–内联
- none–隐藏
- block–块显示
- table–表格显示
- list-item–项目列表
- inline-block
- flex-弹性布局

## position 的值

- static（默认）：按照正常文档流进行排列；
- relative（相对定位）：不脱离文档流，参考自身静态位置通过 top, bottom, left, right 定位；
- absolute(绝对定位)：参考距其最近一个不为 static 的父级元素通过 top, bottom, left, right 定位；
- fixed(固定定位)：所固定的参照对像是可视窗口。

## BFC 机制

BFC(Block Formatting Context)，块级格式化上下文，是一个独立的渲染区域，让处于 BFC 内部的元素与外部的元素相互隔离，使内外元素的定位不会相互影响。

触发条件

- float 的值不为 none
- overflow 的值不为 visible
- display 的值为 table-cell、tabble-caption 和 inline-block 之一
- position 的值不为 static 或则 releative 中的任何一个

BFC 布局规则

- 浮动的元素会被父级计算高度(父级元素触发了 BFC)
- 非浮动元素不会覆盖浮动元素的位置(非浮动元素触发了 BFC)
- margin 不会传递给父级(父级触发 BFC)
- 属于同一个 BFC 的两个相邻元素上下 margin 会重叠
- 普通文档流布局: 浮动的元素是不会被父级计算高度
- 非浮动元素会覆盖浮动元素的位置
- margin 会传递给父级元素
- 两个相邻元素上下的 margin 会重叠

## flexbox（弹性盒布局模型）

- 弹性盒布局并没有这样内在的方向限制，可以由开发人员自由操作。
- 适用场景：弹性布局适合于移动前端开发，在 Android 和 ios 上也完美支持

## 居中布局

- 水平居中

```css
  行内元素: text-align:center
  块级元素: margin:0 auto
  绝对定位和移动: absolute + transform
  绝对定位和负边距: absolute + margin
  flex布局: flex + justify-content:center
```

- 垂直居中

```
  子元素为单行文本: line-height:height
  absolute + transform
  flex + align-items:center
  table: display:table-cell; vertical-align: middle
  利用position和top和负margin
```

- 水平垂直居中

```
  1. 已知元素宽高:绝对定位+margin:auto:
  2. 已知元素宽高: 绝对定位+负margin
  3. absolute+transform
  4.flex + justify-content + align-items
```

## 清除浮动有哪些方法, 各有什么优缺点

- .clear{clear:both;}
  - 优点: 简单, 写少量代码, 兼容性也好
  - 缺点: 添加无语义 html 元素, 不利于代码语义化, 后期维护成本大
- css 的 overflow 属性
  - overflow:hidden;或 overflow:auto;可以清除浮动
  - 优点: 简单, 代码少, 浏览器支持好
  - 缺点: 不能和 position 配合使用, 因为超出的尺寸会被隐藏(overflow:hidden)
- 利用:after 伪元素 添加 clear:both,注意得添加内容(可以加空格)
  - 优点: 浏览器支持好，不容易出现怪问题
  - 缺点: 代码多，要两句代码结合使用，才能让主流浏览器都支持
- 给父级元素设置高度
  - 优点: 简单, 代码少,好掌握
  - 缺点：只适用于高度固定的布局

## link 与 @import 的区别

- 从属关系区别
  - @import 是 CSS 提供的语法规则，只有导入样式表的作用；
  - link 是 HTML 提供的标签，不仅可以加载 CSS 文件，还可以定义 RSS、rel 连接属性等
- 加载顺序区别
  - 加载页面时，link 标签引入的 CSS 被同时加载；
  - @import 引入的 CSS 将在页面加载完毕后被加载。
- 兼容性区别
  - @import 是 CSS2.1 才有的语法，故只可在 IE5+ 才能识别；
  - link 标签作为 HTML 元素，不存在兼容性问题。
- DOM 可控性区别
  - 可以通过 JS 操作 DOM ，插入 link 标签来改变样式；
  - 由于 DOM 方法是基于文档的，无法使用@import 的方式插入样式。

## CSS 优化、提高性能的方法有哪些

- 精简页面的样式文件，去掉不用的样式
- 利用 CSS 继承减少代码量
- 避免！important，可以选择其他选择器
- 内容和样式分离，易于管理和维护

## 响应式设计的基本原理

- 响应式网站设计 是一个网站能够兼容多个终端
- 基本原理是通过媒体查询检测不同的设备屏幕尺寸做处理。
- 页面头部必须有 meta 声明的 viewport。
- < meta name="’viewport’" content="”width=device-width," initial-scale="1." maximum-scale="1,user-scalable=no”"/>

## ::before 和 :after 中双冒号和单冒号有什么区别？

- 单冒号(:)用于 CSS3 伪类，双冒号(::)用于 CSS3 伪元素。
- ::before 就是以一个子元素的存在，定义在元素主体内容之前的一个伪元素。并不存在于 dom 之中，只存在在页面之中。
- :before 和 :after 这两个伪元素，是在 CSS2.1 里新出现的。起初，伪元素的前缀使用的是单冒号语法

## 怎么让 Chrome 支持小于 12px 的文字，设置 0.5px 的线同理

- transform:scale(0.8)

## position:fixed;在 android 下无效怎么处理

- < meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no"/>

## CSS 属性 overflow 属性定义溢出元素内容区的内容会如何处理

- 参数是 scroll 时候，必会出现滚动条。
- 参数是 auto 时候，子元素内容大于父元素时出现滚动条。
- 参数是 visible 时候，溢出的内容出现在父元素之外。
- 参数是 hidden 时候，溢出隐藏。

## 如果需要手动写动画，你认为最小时间间隔是多久，为什么？

多数显示器默认频率是 60Hz，即 1 秒刷新 60 次，所以理论上最小间隔为 1/60＊1000ms ＝ 16.7ms。
