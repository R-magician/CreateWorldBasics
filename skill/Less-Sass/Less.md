# 概述
```
Less （Leaner Style Sheets 的缩写） 是一门向后兼容的 CSS 扩展语言
```
## 使用
```
npm install -g less   //在node.js中安装全局less
```

### @import 规则
```CSS
/* 在标准 CSS 中，@importat 规则必须在所有其他类型的规则之前。但是Less 并不关心你把@import语句放在哪里。 */
/* 根据文件扩展名，Less 可能会以不同的方式处理语句： */
/* 1.如果文件有.css扩展名，它将被视为 CSS 并且@import语句保持原样 */
/* 2.如果它有任何其他扩展名，它将被视为 Less 并导入 */
/* 3.如果它没有扩展名，.less将被附加，并将作为导入的 Less 文件包含在内*/
```

### 导入选项
```css
/*
reference: 使用 Less 文件但不输出它
inline: 在输出中包含源文件但不处理它
less: 无论文件扩展名是什么，都将文件视为Less文件
css: 将文件视为 CSS 文件，无论文件扩展名是什么
once: 只包含文件一次（这是默认行为）
multiple: 多次包含文件
optional: 找不到文件时继续编译
 */

/* 每个@import允许多个关键字，您必须使用逗号分隔关键字： */
/* 例：@import (optional, reference) "1.less"; */
```
### @plugin 规则
```css
/* 导入插件 */
@plugin "my-plugin";
/* my-plugin.js 中的内容  */
module.exports = {
    install: function(less, pluginManager, functions) {
        functions.add('pi', function() {
            return Math.PI;
        });
    }
};
/* 使用插件 */
@plugin "my-plugin";       /* 引入插件 */
.show-me-pi {
  value: pi();            /* 使用插件 */
}
```

### Map--V3.5.0
```css
/* 使用规则集和 mixin 作为值的映射 */
/* 通过将命名空间与查找[]语法相结合，您可以将规则集/mixin 转换为映射。 */
/* 由于命名空间和重载 mixins 的能力，mixin 比 map 更通用一些。 */
@wh: {
  @size{
    size:0.1      /* 可以嵌套--只需要在后面加[] */
  }
  witdth: 320px;
  height: 768px;
}
.div{
  width: @wh[witdth];
  height: @wh[height];
}
```

### 变量--定义变量，在样式中引用变量

```css
/* 使用变量 */
@width: 10px;
@height: @width + 10px;
@w:width;
@images: "../img";

#header {
  /* 在 选择器名称、属性名称、URL 和 @import语句 */
  /* 一定要用大括号括起来 { } */
  @{w}: @width;                 
  height: @height;
  background: url("@{images}/white-sand.png");
}

/* 编译后 */
#header {
  width: 10px;
  height: 20px;
  background: url("../img/white-sand.png");
}

/* 在 Less 中，您可以使用另一个变量定义一个变量的名称,如下实例：*/
@primary:  green;
@secondary: blue;
.section {
  @color: primary;
  .element {
    color: @@color;  /* 这里进行了变量中使用变量 */
  }
}

/* 编译后 */
.section .element {
  color: green;
}
```

### 将属性作为变量--$prop语法轻松地将属性视为变量
```CSS
/* 与变量一样，Less 会选择当前/父范围内的最后一个属性作为“最终”值。 */
/* 您可以通过在后面放置定义来轻松覆盖变量 */
.widget {
  color: #efefef;
  background-color: $color;  /* 将上面的color属性值作为变量引用 */
}

```

### &--父选择嵌套规则并且最常用的施加改性类或伪类到现有的选择
```CSS
a {
  color: blue;
  &:hover {             //给当前元素的设置hover的样式
    color: green;
  }
}

/* & 它仅代表它父选择器的这个名字,还可以如下调用 */

.button {
  &-ok {background-image: url("ok.png");}
  &-cancel {background-image: url("cancel.png");}
}
.button-ok {  background-image: url("ok.png");}
.button-cancel {background-image: url("cancel.png");}

/* 多种调用 */
.link {
  & & {color: green;}
  &, &ish {color: cyan;}
}
.link .link {color: green;}
.link, .linkish {color: cyan;}

.grand {
  .parent {
    & > & {color: red;}
  }
}
.grand .parent > .grand .parent {
  color: red;
}

/* 更改选择器顺序 */
.header {
  .body &{
    background: red;
  }
}
.body .header{
  background: red;
}

/* 组合爆炸 */
p, a, ul, li {
  border-top: 2px dotted #366;
  & + & {
    border-top: 0;
  }
}
p,a,ul,li {border-top: 2px dotted #366;}
p + p,p + a,p + ul,p + li,a + p,a + a,a + ul,a + li,ul + p,ul + a,ul + ul,ul + li,li + p,li + a,li + ul,li + li {
  border-top: 0;
}
```

### 继承--套用的地方将继承样式
```CSS
/* 它将它所放置的选择器与匹配它引用的选择器合并。 */
nav ul {
  &:extend(.inline);    /* nav ul:extend(.inline) */
  background: blue;
}
.inline {
  color: red;
}

/* 输出 */
nav ul {
  background: blue;
}
.inline,
nav ul {      /* 这里是继承样式 */
  color: red;
}

```

### 组合属性
```CSS
/* 将多个属性的值聚合到单个属性下的逗号或空格分隔列表中 */
.mixin() {box-shadow+: inset 0 0 10px #555;}
.myclass {
  .mixin();
  box-shadow+: 0 0 20px black;    /* 这里是+,所以是逗号连接 */
}
/* 输出 */
.myclass { box-shadow: inset 0 0 10px #555, 0 0 20px black;}


.mixin() {transform+_: scale(2);}
.myclass {
  .mixin();
  transform+_: rotate(15deg);   /* 这里是+_,所以是空格连接 */
}
/* 输出 */
.myclass {transform: scale(2) rotate(15deg);}
```


### 混合--将公共样式块定义好,在需要的地方直接引用

```css
/* 提前定义好的样式块 */
/* 若有多个匹配的 mixin，则会评估并合并所有规则，并返回具有该标识符的最后一个匹配值。这类似于 CSS 中的级联，它允许您“覆盖”混合值 */
.bordered {
  border-top: dotted 1px black;
  border-bottom: solid 2px black;
}

/* 引用样式块 */
#menu a {
  color: #111;
  .bordered();  /* 引用定义好的样式块 */
}

.post a {
  color: red;
  .bordered();  /* 引用定义好的样式块 */
}

/* 若你不想你定义的样式出现在css中,可以在定义样式块的地方加上() ,如下：*/
.my-mixin {color: black;}
.my-other-mixin() {background: white;}  /* 这个加了括号的 */
.class {
  .my-mixin();
  .my-other-mixin();
}
/* 输出--加了括号的混合属性就没出现在下面 */
.my-mixin {color: black;}
.class {color: black;background: white;}


/* !important关键字 */
/* 在 mixin 调用之后将继承所有属性都标记为 !important */
.foo (@bg: #f5f5f5, @color: #900) {/* 设置默认值 */
  background: @bg;
  color: @color;
}
.important {
  .foo() !important;
}
/* 输出 */
.important {
  background: #f5f5f5 !important;
  color: #900 !important;
}

/* 命名参数--mixin 引用可以通过名称提供参数值，而不仅仅是位置 */
.mixin(@color: black; @margin: 10px; @padding: 20px) {}
.class1 {
  .mixin(@margin: 20px; @color: #33acfe);/* 直接通过名称调用 */
}
.class2 {
  .mixin(#efca44; @padding: 40px);/* 直接通过名称调用 */
}


/* @arguments -- 它包含调用 mixin 时传递的所有参数 */
.box-shadow(@x: 0; @y: 0; @blur: 1px; @color: #000) {
  -webkit-box-shadow: @arguments;
     -moz-box-shadow: @arguments;
          box-shadow: @arguments;
}
.big-block {.box-shadow(2px; 5px);}
/* 输出 */
.big-block {
  -webkit-box-shadow: 2px 5px 1px #000;
     -moz-box-shadow: 2px 5px 1px #000;
          box-shadow: 2px 5px 1px #000;
}
```

### 将 Mixin 作为函数
```CSS
.average(@x, @y) {
  @result: ((@x + @y) / 2);   /* 定义变量 @result */
}
/* padding: 33px; -- Mixin中的 @result返回值 */
/* 若[]中没有指定,则所有值都将级联并选择最后一个声明的值。 */
div {padding: .average(16px, 50px)[@result];}

```

### 混合守卫
```css
/* when(逻辑表达式) -- 结果为真执行 */
.mixin(@a) when (@a >= 10px) {width: 10px;}
.mixin(@a) when (@a < 5) { width: 1px;}
.mixin(@a) {width: @a;}
/* 调用 */
.class1 { .mixin(8px) }
.class2 { .mixin(3px) }
/* 输出 */
.class1 {width: 10px;}
.class2 {width: 1px;}

/* 可用的比较运算符： */
/* >, >=, =, =<, <  ,true是唯一的真值,除关键字true以外的值都为假 */
```

### CSS 卫士
```CSS
/* 现在卫士可以应用于 css 选择器 */
/* 条件为真执行样式 */
button when (2>1) {
  color: white;
}

/* 也可以直接用if来实现类似的模式 */
/* if(表达式,执行块) */
button if(2>1,{
  color: white;
})
```
### 属性/变量访问器
```CSS
/* 您可以使用属性/变量访问器（也称为“查找”）从变量（分离的）规则集中选择一个值。 */
@config: {
  option1: true;
  option2: false;
}
mixin() when (@config[option1] = true) {
  selected: value;
}
.box {
  .mixin();
}
/* 输出 */
.box {
  selected: value;
}

```

### 嵌套--分层次写入css样式，不用多层连排写样式

```CSS
/* header 是 .navigation 和 .logo 的父元素 */
#header {
  color: black;
  .navigation {
    font-size: 12px;
  }
  .logo {
    width: 300px;
  }
}

/* 编译后 */
#header {   /* 父元素的样式 */
  color: black;
}
#header .navigation {   /* 父元素中 .navigation 的样式*/
  font-size: 12px;
}
#header .logo {         /* 父元素中 .logo 的样式*/
  width: 300px;
}

/* 还可以用伪选择器（pseudo-selectors）与混合（mixins）一同使用*/
.clearfix {
  display: block;
  zoom: 1;

  &:after {         /* & 表示当前选择器的父级 --给clearfix添加伪元素*/
    content: " ";
    display: block;
    font-size: 0;
    height: 0;
    clear: both;
    visibility: hidden;
  }
}
```
### 规则嵌套和冒泡
@ 规则（例如 @media 或 @supports）可以与选择器以相同的方式进行嵌套。@ 规则会被放在前面，同一规则集中的其它元素的相对顺序保持不变。这叫做冒泡（bubbling）。

```CSS
/* 使用 */
.component {
  width: 300px;
  @media (min-width: 768px) {
    width: 600px;
    @media  (min-resolution: 192dpi) {
      background-image: url(/img/retina2x.png);
    }
  }
  @media (min-width: 1280px) {
    width: 800px;
  }
}

/* 编译后 */
.component {
  width: 300px;
}
@media (min-width: 768px) {
  .component {
    width: 600px;
  }
}
@media (min-width: 768px) and (min-resolution: 192dpi) {
  .component {
    background-image: url(/img/retina2x.png);
  }
}
@media (min-width: 1280px) {
  .component {
    width: 800px;
  }
}
```

### 运算--算术运算符 +、-、*、/ 可以对任何数字、颜色或变量进行运算

```CSS
/* 所有操作数被转换成相同的单位 */
@width: 5cm + 10mm; /* 结果是 6cm */

/* 无效的单位换算例如：px 到 cm 或 rad 到 % 的转换 */
@width: 2 + 5px - 3cm; /* 结果是 4px */

/* 结果以最左侧操作数的单位类型为准 */
@width: 5% * 2; /* 结果是 10% */

/* 乘法和除法不作转换 */
@width: 2cm * 3mm; /* 结果是 6cm */

/* 对颜色进行算术运算 */
@color: #224488 / 2; /* 结果是 #112244 */
```

### calc() 特例--在css中是用于动态计算长度值
```CSS
/* 为了与 CSS 保持兼容，calc() 并不对数学表达式进行计算，但是在嵌套函数中会计算变量和数学公式的值。 */
@var: 50vh/2; /* 这里把表达式提出来 --calc引用是时候不能使用公式*/
div{
  width: calc(50% + (@var - 20px));  /* 结果是 calc(50% + (25vh - 20px))*/
}

```

### 转义--允许使用任意字符串作为属性或变量值--形式的内容将原样输出--格式：~'' 或 ~""

```CSS
@变量: ~"(min-width: 768px)"; /* 设置变量值 */
.element {
  @media @变量 {              /* 引用变量 */
    font-size: 1.2rem;
  }
}

/* 编译完 */
@media (min-width: 768px) {
  .element {
    font-size: 1.2rem;
  }
}

/*  从 Less 3.5 开始就可以不用写 (~''或~"") */
@变量: (min-width: 768px);  /* 这里没有按照格式引用起来 */
.element {
  @media @变量 {
    font-size: 1.2rem;
  }
}
```


### 命名空间和访问符--有时，出于组织结构或仅仅是为了提供一些封装的目的，你希望对混合（mixins）进行分组

```CSS
/* 前提：想把 #bundle 中的 .button 元素的样式给到 #header a 中 */
#bundle() {   /* 这里有括号 */
  .button {
    display: block;
    border: 1px solid black;
    background-color: grey;
    &:hover {
      background-color: white;
    }
  }
  .tab { ... }
  .citation { ... }
}

/* 根据命名空间可以这样使用 */
#header a {
  color: orange;
  #bundle.button();  /* 还可以书写为 #bundle > .button 形式 */
}

/* 注意：如果不希望它们出现在输出的 CSS 中，例如 #bundle .tab，请将 () 附加到命名空间，例如 #bundle.button()。 */
```

### 映射（Maps）--从 Less 3.5 版本开始，你还可以将混合（mixins）和规则集（rulesets）作为一组值的映射（map）使用。
```CSS
/* 定义好映射 */
#colors() {   /* 这里有括号 */
  primary: blue;
  secondary: green;
}

.button {
  color: #colors[primary];    /* 定义好映射 */
  border: 1px solid #colors[secondary];   /* 定义好映射 */
}

```

### 作用域（Scope
变量会在当前作用域查找变量,若当前作用域没有变量，就会从他的上一级查找,在同一作用域下，变量值是以最下面的值为最终值
```CSS

/* 变量设置的值与出现的先后顺序无关 */
@var: red;
#page {
  @var: white;
  #header {
    color: @var; // white
  }
}

@var: red;
#page {
  #header {
    color: @var; // white
  }
  @var: white;
}

/* 在同一作用域下，变量值是以最下面的值为最终值 */
#page {
  @var: white;
  #header {
    color: @var; // red
  }
  @var: red;
}
```

### 注释--块注释和行注释都可以使用
```less
/* 这个是块注释 */
// 这个是行注释
```

### 导入--你可以导入一个 .less 文件，此文件中的所有变量就可以全部使用了。如果导入的文件是 .less 扩展名
```less
@import "library"; // library.less
@import "typo.css";
```

### 观看模式--不推荐
```html
<!-- 要启用监视模式，选项env必须设置为development。然后在包含 less.js 文件后，调用less.watch() -->
<script>less = { env: 'development'};</script>
<script src="less.js"></script>
<script>less.watch();</script>
<!-- 当修该样式后页面会自动进行刷新,感觉用处不到,不如webpack的热更新,有点像后台不停重新加载资源 -->
```
### 修改变量--当使用新值调用时，Less 文件会在不重新加载的情况下重新编译

```javascript
//先引用  import less from 'less';
//我没整出来
//简单的基本用法
less.modifyVars({
  '@buttonFace': '#5B83AD',
  '@buttonText': '#D9EEF2'
});
```

## Less 函数

### 逻辑函数
```less
if(布尔表达式,'为真返回值','为假返回值');

div{
  width:if((3>1),3px,1px);    //输出 ：width:3px;
}

//支持：not and or true false 等逻辑运算符
```

### 字符串函数
```javascript
escape('要转义的字符串')         //转义字符串
//这些字符不用转义：, / ? @ & + ' ~ ! $
//这些字符要转义：\<space\> # ^ ( ) { } | : > < ; ] [ =
例：escape('a=1')   //输出：a%3D1


e('输出字符串');               //原样输出字符串
//它期望字符串作为参数并按原样返回其内容,它可用于输出不是有效 CSS 语法的 CSS 值
//或者使用 Less 无法识别的专有语法。
例：e('a=1')       //输出：a=1


%('%a 占位符输出 %d','占位a的值','占位d的值')
//大写的占位符会将值中的特殊字符转义
//s可以替换为任意表达式
例：%('%a 占位符输出 %d','占位a的值','占位d的值')
输出：占位a的值 占位符输出 占位d的值


replace('字符串文本','被替换的字符串 或 正则表达式','替换成的字符串值');
//第四个参数是 （可选）正则表达式标志。
例：replace('This is a string.', "(string)\.$", "new $1.");
输出：'This is a new string.';

```

### 列表函数
```javascript
@list: "banana", "tomato", "potato", "peach";

length(list);           //返回值列表中的元素数
//list:逗号或空格分隔的值列表
例：n: length(@list);
输出:n: 4;

extract(list,元素位置);          //返回列表中指定位置的值
//元素列表从1开始
例：value: extract(@list, 3);
输出：value ：potato

range(起始值,结束值,步长)        //生成一个跨越一系列值的列
//范围内每个值的输出将与该end值具有相同的单位(px %)。
例：content:range(10px,30px,7)
输出：content：10px 17px 24px;

each(列表,规则集)              //将规则集的评估绑定到列表的每个成员
//v--value值   k--key值   i--index值
例：
.set-2() {
  one: blue;
  two: green;
  three: red;
}
.set-2 {
  // Call mixin and iterate each rule
  each(.set-2(), .(@v, @k, @i) {
    @{k}-@{i}: @v;
  });
}

输出：
.set {
  one-1: blue;
  two-2: green;
  three-3: red;
}
```

### 数学函数
```javascript
ceil()                      //向上取整
floor()                     //向下取整
percentage()                //小数转百分比
round(浮点数,保留几位小数)   //四舍五入
sqrt()                      //开平方
abs()                       //计算绝对值
sin()                       //正弦函数
asin()                      //反正弦（正弦的倒数）函数
cos()                       //余弦函数
acos()                      //反余弦（余弦的倒数）函数
tan()                       //切线函数
atan()                      //反正切（切线的倒数）函数
pi()                        //返回一个Π
pow(数字,次幂)               //求一个数的次幂
mod(数字,除数)               //取模
min(list)                   //求最小值
max(list)                   //求最大值
```

### 类型函数
```javascript
isnumber(1)                  //是否是数字
isstring('1')                //是否是字符串
iscolor(#ff0|blue)           //是否是颜色
iskeyword(keyword)           //是否是关键字
isurl(url(...))              //是否是网址
ispixel(56px)                //是否是像素
isem(7.8em)                  //是否是em
ispercentage(7.8%)           //是否是百分比
isunit(变量值,单位)           //判断单位是否正确 --- isunit(11px, px);
isruleset(@rules)            //是否是规则集 -- @rules: {color: red;}
```

### 杂项功能

```javascript
color('#aaa')                //把字符转为颜色
image-size("file.png")       //获取图片的长宽    输出：10px 10px
image-width("file.png")      //获取图片的宽度
image-height("file.png")     //获取图片的高度
convert(转换值，转换单位)     //转换值(要带有值,否则原样输出)
    //例：convert(9s, "ms") --->输出：9000ms
data-uri(MIME类型,内联文URL) //内联资源转为base64数据
    //例：data-uri('image/jpeg;base64', '../data/image.jpg');
    //输出：url('data:image/jpeg;base64,bm90IGZyBmaWx==…');
default()                   //设置默认值--仅有when守卫条件内使用
unit()                      //删除或添加单位
    //例：  unit(5, px)       unit(5em)
    //输出：5px               5
get-unit(5px)               //返回数字的单位
svg-gradient()              //生成多站 svg 渐变。
```

### 颜色定义函数
```javascript
rgb(90, 129, 32)           //生成颜色
rgba(90, 129, 32, 0.5)     //生成带透明度的颜色
hsl(90, 100%, 50%)         //色调 饱和度 亮度 创建不透明颜色
hsla(90, 100%, 50%, 0.5)   //色调 饱和度 亮度 透明度 创建透明颜色
hsv(90, 100%, 50%)         //色调 饱和度 值 创建不透明颜色
hsva(90, 100%, 50%, 0.5)   //色调 饱和度 值 透明度 创建透明颜色
```

### 颜色通道函数
```javascript
hue(hsl(90, 100%, 50%))   //在 HSL 颜色空间中提取色调通道值--90
saturation(hsl(90, 100%, 50%))//在 HSL 颜色空间中提取饱和度值--100%
lightness(hsl(90, 100%, 50%))//在 HSL 颜色空间中提取亮度值--50%
hsvhue(hsv(90, 100%, 50%))//在 HSV 颜色中提取色调值--90
hsvsaturation(hsv(90, 100%, 50%))//在 HSV 颜色中提取饱和度值--100%
hsvvalue(hsv(90, 100%, 50%))//在 HSV 颜色中提取值--50%
red(rgb(10, 20, 30))      //输出红色值--10
green(rgb(10, 20, 30))    //输出绿色值--20
blue(rgb(10, 20, 30))     //输出蓝色值--30
alpha(rgba(10, 20, 30, 0.5))//获取颜色的透明度--0.5
luma(rgb(100, 200, 30))   //返回颜色的亮度（感知亮度）--44%
luminance(rgb(100, 200, 30))//计算未经伽马校正的亮度值--65%
```

### 颜色运算功能
```javascript
//颜色功能现在用处不打，等以后工作需要可以在官方文档中查阅
//https://less.bootcss.com/functions/
```
