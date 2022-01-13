# 概述

世界上最成熟、最稳定、最强大的专业级CSS扩展语言！

-   完全兼容 CSS3
-   在 CSS 基础上增加变量、嵌套 (nesting)、混合 (mixins) 等功能
-   通过函数进行颜色值与属性值的运算
-   提供控制指令 (control directives)等高级功能
-   自定义输出格式

## 相关命令

    // 在node.js中安装全局less
    npm i sass -g      

    // 在命令行中运行sass
    sass input.scss output.css

    // 监视单个 Sass 文件，每次修改并保存时自动编译
    sass --watch input.scss:output.css

    // 监视整个文件夹
    sass --watch app/sass:public/stylesheets

    // 没有文件名时 sass 命令默认编译 .sass 文件
    // 添加 --scss 选项或者使用 scss 命令编译 SCSS 文件

    //在样式文件的起始位置(第一行/前面没有任何注释)
    //插入 @charset "encoding-name" ,Sass 将会按照给出的编码格式编译文件
    //默认使用 UTF-8 编码

## 语法格式

      SCSS : SCSS 的语法书写和我们的 CSS 语法书写方式相类似
      SASS : 它使用 '缩进' 代替 '花括号' 表示属性属于某个选择器，用 '换行' 代替 '分号' 分隔属性。不带大括号({})和分号(;)

        任何一种格式可以直接 导入 (@import) 到另一种格式中使用
        或者通过 sass-convert 命令行工具相互转换成另一种格式

        将style.sass文件转换成scss类型的style.scss文件
        //sass-convert style.sass style.scss

## 使用变量

你可以把反复使用的 css 属性值 定义成变量, sass 使用 $ 符号来标识变量
$ 它好认、更具美感，且在 CSS 中并无他用，不会导致与现存或未来的 css 语法冲突

### 变量声明

```scss
/* sass变量的声明和css属性的声明很像： */
/* 赋值方法与 CSS 属性的写法一样 */
/* 变量可以用 _ , - 两个符合相连 */
/* sass中的变量都是先声明后使用 */
/* 有作用域被限制 */
$变量名: 变量值;
$xx:#F90;
```

### 数据类型

```scss
- 数字，1, 2, 13, 10px
- 字符串，有引号字符串与无引号字符串，"foo", 'bar', baz
- 颜色，blue, #04a3f9, rgba(255,0,0,0.5)
- 布尔型，true, false
- 空值，null
- 数组 (list)，用空格或逗号作分隔符，(1.5em 1em 0 2em), (Helvetica, Arial, sans-serif)
- maps, 相当于 JavaScript 的 object，(key1: value1, key2: value2)

/* SassScript 也支持其他 CSS 属性值，比如 Unicode 字符集 */
/* 但是 Sass 不会特殊对待这些属性值，一律视为无引号字符串 */
```

### 字符串 (Strings)

```scss
/* 两种字符串类型：有引号字符串、无引号字符串，在编译 CSS 文件时不会改变其类型。*/
/* 只有使用 #{} 时,有引号字符串将被编译为无引号字符串,这便于方便引用选择器:如下例 */

  @mixin firefox-message($selector) {
    body.firefox #{$selector}:before {
      content: "Hi, Firefox users!";
    }
  }
  @include firefox-message(".header");
//编译
  body.firefox .header:before {
    content: "Hi, Firefox users!";
  }
```

### 数组

```scss
/* nth 函数可以直接访问数组中的某一项 */
/* join 函数可以将多个数组连接在一起 */
/* append 函数可以在数组中添加新值 */
/* @each 指令能够遍历数组中的每一项 */

/* 1px 2px, 5px 6px 是包含 1px 2px 与 5px 6px 两个数组的数组 */
/* (1px 2px) (5px 6px) 内外两层数组使用相同的分隔方式，需要用圆括号包裹内层 */
/* 空括号 () 表示不包含任何值的空数组,在 Sass 3.3 版之后也视为空的 map*/
/* 空数组不可以直接编译成 CSS,编译 font-family: () Sass 将会报 */
/* 如果数组中包含空数组或空值，编译时将被清除，比如 1px 2px () 3px 或 1px 2px null 3px */
/* 基于逗号分隔的数组允许保留结尾的逗号,强调数组的结构关系 */
```

### Map

```scss
/* 它们语法上类似于媒体查询表达式 */
/* $map: (key1: value1, key2: value2, key3: value3); */
/* Map必须始终用括号括起来，并且必须始终以逗号分隔 */
// map-get 函数   在地图中查找值
// map-merge 函数 将值添加到地图中
// @each 指令可用于为地图中的每个键/值对添加样式
// 键值对顺序始终与创建的时候相同
// List函数中 Map会被自动转换为List，空List除外
// 如 (key1: value1, key2: value2)会被List函数转换为 key1 value1, key2 value2
// () 表示没有键/值对的映射和没有元素的列表
// 映射键可以是任何 Sass 数据类型（甚至是另一个映射）
```

### 作用域

```scss
/* 定义在最外面的全局变量,可以在任意位置使用 */
$nav-color: #F90;
nav {
  $width: 100px;      /* 在 样式块中 定义的变量,只能在该块中使用 */
  width: $width;      /* 块中变量 */
  color: $nav-color;  /* 外部变量 */
}
```

### 变量引用

```scss
/* 凡是css属性的标准值（比如说1px或者bold）可存在的地方，变量就可以使用 */
$c: #F90;               /* 变量 */
.selected {
  border: 1px solid $c; /* 引用的地方 */
}
/* 编译后 */
.selected {
  border: 1px solid #F90;
}
```

### 相互引用变量

```scss
$c:#111;
$b:1px solid $c;  /* 在b变量中引用了c变量 */
/* 调用 */
border:$b
```

### 嵌套CSS 规则

```scss
/* 在Sass中，你可以像俄罗斯套娃那样在规则块中嵌套规则块，避免你的重复书写 */
#body{
  .div{
    .a{
      cursor: pointer;
    }
  }
}
```

### 父选择器的标识符&

```scss
/* 当父选择器含有不合适的后缀时，Sass 将会报错 */
/* & 符号的值会变成父级元素(article a) */
article a {
  &:hover { color: red }
  body & {font-size:12px;}
}
/* 编译 */
article a:hover { color: red; }
body article a { font-size:12px; }

/* 没有父选择器，& 的值为空。这意味着您可以在 mixin 中使用它来检测父选择器是否存在 */
@mixin does-parent-exist {
  @if & {
    &:hover {
      color: red;
    }
  } @else {
    a {
      color: red;
    }
  }
}
```

### 群组选择器的嵌套

```scss
/* 将一个元素下的多个子元素设置同一属性 */
.container {
  h1, h2, h3 {margin-bottom: .8em}
}
/* 编译 */
.container h1, .container h2, .container h3 { margin-bottom: .8em }
```

### 子组合选择器和同层组合选择器

```scss
/* 同层相邻组合选择器 + 选择 header 元素后紧跟的 p 元素 */
header + p { font-size: 1.1em }
/*同层全体组合选择器~，选择所有跟在article后的同层article元素 */
article ~ article { border-top: 1px dashed #ccc }
/* 这些组合选择器可以毫不费力地应用到sass的规则嵌套中。可以把它们放在外层选择器后边，或里层选择器前边 */
article {
  ~ article { border-top: 1px dashed #ccc }
  > section { background: #eee }
  dl > {
    dt { color: #333 }
    dd { color: #555 }
  }
  nav + & { margin-top: 0 }
}
/* 编译 */
article ~ article { border-top: 1px dashed #ccc }
article > footer { background: #eee }
article dl > dt { color: #333 }
article dl > dd { color: #555 }
nav + article { margin-top: 0 }
```

### 嵌套属性

```scss
/* 在sass中，除了CSS选择器，属性也可以进行嵌套 */
/* 嵌套属性的规则：*/
/* 属性名从中划线-的地方断开 */
/* 在根属性后边添加一个冒号: */
/* 紧跟一个{ }块,把子属性部分写在这个{ }块中  */
/* 如下:把重复的 border- 提取出来 */
nav {
  border: {
    style: solid;
    width: 1px;
    color: #ccc;
  }
}
/* 编译 */
nav {
  border-style: solid;
  border-width: 1px;
  border-color: #ccc;
}
```

### 插值语句 #{}

```scss
/* 通过 #{} 插值语句可以在选择器或属性名中使用变量 */
  $name: foo;
  $attr: border;
  p.#{$name} {
    #{$attr}-color: blue;
  }
//编译后
p.foo {
  border-color: blue;
}
```

## 运算

```scss
/* 所有数据类型均支持相等运算 == 或 != */
/* 支持数字的加减乘除、取整等运算 (+, -, *, /, %)，在不同单位间转换值 */
/* 关系运算 <, >, <=, >= 也可用于数字运算，相等运算 ==, != 可用于所有数据类型。 */
```

### 除运算

```scss
/* 除运算比较特殊 -- 因为(/)在 CSS 中通常起到分隔数字的用途 */
/* 以下三种情况 / 将被视为除法运算符号： */
- 如果值，或值的一部分，是变量或者函数的返回值
- 如果值被圆括号包裹
- 如果值是算数表达式的一部分

p {
  $width: 1000px;
  font: 10px/8px;             // CSS语法,不能被除
  width: $width/2;            // 值是变量
  width: round(1.5)/2;        // 值是函数的返回值
  height: (500px/2);          // 被圆括号包裹
  margin-left: 5px + 8px/2px; // 算数表达式的一部分
}
//编译后
p {
  font: 10px/8px;
  width: 500px;
  height: 250px;
  margin-left: 9px;
}
/* 如果要使用变量，同时又要确保 / 不做除法运算而是完整地编译到 CSS 文件中，只需要用 #{} 插值语句将变量包裹 */
  p {
    $font-size: 12px;
    $line-height: 30px;
    font: #{$font-size}/#{$line-height};
  }
  //编译后
  p {
    font: 12px/30px;
  }
```

### 颜色值运算

```scss
/* 颜色值的运算是分段计算进行的，也就是分别计算红色，绿色，以及蓝色的值 */
/* 数字与颜色值之间也可以进行算数运算，同样也是分段计算的 */
/* 如果颜色包含alpha,必须拥有相等的 alpha 值才能进行运算(alpha不参与运算)*/
p {
  color: #010203 + #040506;
  color: #010203 * 2;
  color: rgba(255, 0, 0, 0.75) + rgba(0, 255, 0, 0.75);
}
//解析
/* 加法：01 + 04 = 05 02 + 05 = 07 03 + 06 = 09 */
/* 乘法：01 * 2 = 02 02 * 2 = 04 03 * 2 = 06 */
/* alpha： alpha不参与运算 0.75*/
//编译
p {
  color: #050709;
  color: #020406;
  color: rgba(255, 255, 0, 0.75);
}
```

### 字符串运算

```scss
p {
  // 连接两个字符
  // 编译后:cursor:Foo-Bar
  cursor: Foo + -Bar;      

  // 引号字符串（位于 + 左侧）,运算结果是有引号的
  // 编译后:content:"Foo Bar"
  content: "Foo " + Bar;       

  // 无引号字符串（位于 + 左侧）,运算结果则没有引号
  // 编译后:font-family:Foo Bar
  font-family: Foo + " Bar";

  // 运算表达式与其他值连用时，用空格做连接符
  // 编译后:margin: 7px auto;
  margin: 3px + 4px auto;

  // 在有引号的文本字符串中使用 #{} 插值语句可以添加动态的值
  // 插入了空值将被视作空字符串
  // 编译后:content: "I ate 15 pies!";
  content: "I ate #{5 + 10} pies!";
}
```

### 布尔运算 and 数组运算

```scss
/* 支持布尔型的 and or 以及 not 运算 */
/* 数组不支持任何运算方式，只能使用 列表函数 控制 */
```

### 控制指令

```scss
/* 提供了一些基础的控制指令，比如在满足一定条件时引用样式、复输出格式 */

@if
/* @if 的表达式返回值不是 false 或者 null 时，条件成立，输出 {} 内的代码 */
  p {
    @if 1 + 1 == 2 { border: 1px solid; }
    @else if 5 < 3 { border: 2px dotted; }
    @else  { border: 3px double; }
  }
//输出
p {
  border: 1px solid;
}

@for
/* 在限制的范围内根据条件循环输出格式 */
/* @for指令的两种格式  */
/* through : 包含 <start> 与 <end> 的值 */
/* to : 只包含 <start> 的值不包含 <end */
@for $var from <start> through <end>
@for $var from <start> to <end>
//如下例
@for $i from 1 through 3 {
  .item-#{$i} { width: 2em * $i; }
}
//编译后
.item-1 {width: 2em;}
.item-2 {width: 4em;}
.item-3 {width: 6em;}


@each
/* 将变量 $var 作用于值列表中的每一个项目，然后输出结果 */
/* 语法格式：@each $var in <list> */
$list:1, 2, 3, 4;     //list集合
@each $i in $list {
  .x-#{$i} {
    width:2px * $i
  }
}
//编译后
.x-1{ width:2px; }
.x-2{ width:4px; }
.x-3{ width:6px; }
.x-4{ width:8px; }

@each --  多重赋值
/* 看作一个大集合中的三个值 */
/* 每次循环 x y z 分别代表小集合中的值 */
@each $x, $y, $z in (puma, black, default),
                    (sea-slug, blue, pointer),
                    (egret, white, move)
{
  .#{$x}-icon {
    background-image: url('/images/#{$x}.png');
    border: 2px solid $y;
    cursor: $z;
  }
}
//编译后
 .puma-icon {
  background-image: url('/images/puma.png');
  border: 2px solid black;
  cursor: default; }
.sea-slug-icon {
  background-image: url('/images/sea-slug.png');
  border: 2px solid blue;
  cursor: pointer; }
.egret-icon {
  background-image: url('/images/egret.png');
  border: 2px solid white;
  cursor: move; }

/* 映射被视为对列表，因此多重赋值也适用于它们 */
@each $header, $size in (h1: 2em, h2: 1.5em, h3: 1.2em) {
  #{$header} {
    font-size: $size;
  }
}
//编译后
h1 {font-size: 2em; }
h2 {font-size: 1.5em; }
h3 {font-size: 1.2em; }


@while
/* 循环输出,直到条件为假时退出 */
$i: 6;
@while $i > 0 {
  .item-#{$i} { width: 2em * $i; }
  $i: $i - 2;
}
//输出
.item-6 {width: 12em; }
.item-4 {width: 8em; }
.item-2 {width: 4em; }
```

## 混合器

```scss
/* 需要大段的重用样式的代码,可以通过混合器实现大段样式的重用 */
/* 简写：@mixin 可以用 = 表示，而 @include 可以用 + 表示 */
@mixin      //定义一个混合器
@include    //使用定义的混合器
@content    //在mixin中使用,让引用的include内容会替换content

//定义一个 名为 borderRadius 的混合器
@mixin borderRadius {
  border-radius: 5px;
}

//使用borderRadius混合器
button {
  border: 2px solid #00aa00;
  @include borderRadius;
}

/* 编译 */
button {
  border: 2px solid #00aa00;
  border-radius: 5px;
}

/* @content 使用 */
@mixin xxx {
  * html {
    @content;
  }
}
@include xxx {
  #logo {
    background-image: url(/logo.gif);
  }
}
//编译
* html #logo {
  background-image: url(/logo.gif);
}
```

### 何时使用混合器

```scss
// 利用混合器，可以很容易地在样式表的不同地方共享样式
// 一直重复一段样式,就应该把这段样式构造成优良的混合器
// 混合器要先定义后使用
```

### 混合器中的CSS规则

```scss
// 混合器中可以包含属性,css规则,选择器和选择器中的属性
// 定义混合器
@mixin no-bullets {
  list-style: none;
  li {
    margin-left: 0px;
  }
}
// 使用混合器
ul.plain {
  @include no-bullets;
}

//编译后
ul.plain {
  list-style: none;
}
ul.plain li {
  list-style-type: none;
  margin-left: 0px;
}
```

### 给混合器传参

```scss
/* 混合器可以通过参数返回不同样式---相当于方法传参 */
@mixin 混合器名($参数1, $参数2 $参数3) {
  color: $参数1;
  &:hover { color: $参数2; }
  &:visited { color: $参数3; }
}
//调用
@include 混合器名(blue, red, green)
```

### 混合器默认参数值

```scss
/* 在定义的时候就把值赋好,调用的时候就可以不用传参 */
@mixin 混合器名($参数1, $参数2:red) {
  color: $参数1;
  &:hover { color: $参数2; }
}
//调用
@include 混合器名(blue)
@include 混合器名(参数1:blue)
```

### 使用选择器继承来精简CSS

```scss
/* 一个选择器可以继承为另一个选择器定义的所有样式 */
/* 通过@extend语法实现 */
.bor {
  border: 1px solid red;
}
.bu {
  @extend .bor;
}
//编译后
.bor,.bu{
  border: 1px solid red;
}
/* 这样 .bu 将会继承样式表中任何位置处为 .bor 定义的所有样式 */
/* class="bu" 修饰的html元素最终的展示效果就好像是class="bu bor" */
/* .bu 不仅会继承 .bor 自身的所有样式，任何跟 .bor 有关的组合选择器样式也会被 .bu 以组合选择器的形式继承 */

.bor a{  //应用到.bu a
  color: red;
}
h1.bor { //应用到hl.bu
  font-size: 1.2rem;
}
/* .bor 定义的所有样式都会以继承者再次实现一次  */


/* @extend 失败会收到错误提示 -- 比如继承了一个没有的样式 */
/* 加上 !optional(可选的) -- 若样式不存在忽略报错*/
a.important {
  @extend .notice !optional;
}


/* @media 中不能胯作用域使用外层的样式继承 @extend --会产生大量的无用代码*/
/* @media 中只能使用同作用域下面的@extend */
```

### extend-Only 选择器--不是给元素使用的继承

```scss
/* 定义一套样式并不是给某个元素用，而是只通过 @extend 指令使用 */
/* 联合使用 % 占位符 -- 占位符不会被编译 */
#context a%extreme {   /* % 后面的内容就是继承调用的名称 */
  font-size: 2em;
}
.notice {
  @extend %extreme;
}
//编译后
#context a.notice {
  font-size: 2em;
}
```

### 继承的高级用法

```scss
// 任何css规则都可以继承其他规则，几乎任何css规则也都可以被继承
// 最常用的一种高级用法是继承一个html元素的样式
// 默认的浏览器样式不会被继承，它们不属于样式表中的样式，但是你对html元素添加的所有样式都会被继承
// 继承中的 选择器在样式表中存在且有样式

/* 定义了一个名为disabled的类，样式修饰使它看上去像一个灰掉的超链接。通过继承a这一超链接元素来实现 */
.disabled {
  color: gray;
  @extend a;
}
```

### 继承的工作细节

```scss
/* 跟变量和混合器不同，继承不是仅仅用css样式替换@extend处的代码那么简单 */

若 .a @extend .b 那么下列html中，所有的引用class a 都将变成 class = 'a b'
同时样式表中的定义 .b 的下级样式，都将在实现
.b a{ color:red; }
.b button{magin:4px;}

/*
<div class='a'>                   --->会变成<div class='a b'>
    <a><a>
</div>
<div class='d'>
    <div class='a'>               --->会变成<div class='a b'>
        <button></button>
    </div>
</div>
*/

@extend有两个要点
 ·· 跟混合器相比，继承生成的css代码相对更少。因为继承仅仅是重复选择器，而不会重复属性，所以使用继承往往比混合器生成的css体积更小。如果你非常关心你站点的速度，请牢记这一点。
 ·· 继承遵从css层叠的规则。当两个不同的css规则应用到同一个html元素上时，并且这两个不同的css规则对同一属性的修饰存在不同的值，css层叠规则会决定应用哪个样式。相当直观：通常权重更高的选择器胜出，如果权重相同，定义在后边的规则胜出。
```

### 使用继承的最佳实践

```scss
/* 最好不要在css规则中使用后代选择器( 比如:.foo .bar) --- 尽可能避免这种用法 */
/* 但是只要你想，你完全可以放心地继承有后代选择器修饰规则的选择器
不管后代选择器多长，但有一个前提就是，不要用后代选择器去继承 */

/* 不要用后代选择器去继承，避免出现不必要的bug */
```

### @media指令--媒体查询

```scss
/* 针对不同的媒体类型定义不同的样式 */
/* @media 在sass中允许在CSS规则中嵌套 */
/* 编译时，@media 将被编译到文件的最外层，包含嵌套的父选择器 */
/* @media 允许互相嵌套使用，编译时，Sass 自动添加 and */
/* @media 中不能胯作用域使用外层的样式继承 @extend --会产生大量的无用代码*/
/* @media 中只能使用同作用域下面的@extend */

@media screen {
  .sidebar {
    @media (orientation: landscape) {
      width: 500px;
    }
  }
}
//编译后
@media screen and (orientation: landscape) {
  .sidebar {
    width: 500px;
  }
}

/* @media 还可以使用 （比如变量，函数，以及运算符） 代替条件的名称或者值 */
$media: screen;
$feature: -webkit-min-device-pixel-ratio;
$value: 1.5;

@media #{$media} and ($feature: $value) {
  .sidebar {
    width: 500px;
  }
}

//编译后
@media screen and (-webkit-min-device-pixel-ratio: 1.5) {
  .sidebar {
    width: 500px;
  }
}
```

### @at-root

```scss
/* 可以使一个或多个规则在文档的根部(最外层作用域)发出 */
/* 它可以与单个内联选择器一起使用 */
.parent {
  ...
  @at-root .child { ... }
  @at-root {
    .child1 { ... }
    .child2 { ... }
  }
}
//编译后
.parent { ... }
.child { ... }
.child1 { ... }
.child2 { ... }

/* 也让通过 @at-root 移除嵌套指令(@media) */
/* 您可以使用 @at-root (without: ...) 移出任何指令 */
/* 您还可以使用由空格分隔的多个指令 */
/* @at-root (without: media supports){} */
/* @at-root (without: rule)---和 @at-root 一样，没有查询 */
/* @at-root (without: all)----样式应该移到所有指令和 CSS 规则之外 */
/* 如果要指定要包含哪些指令或规则,而不是列出应排除哪些指令或规则 */
/* 使用 with 而不是 without,@at-root (with: rule) 将移到所有指令之外 */
@media print {
  .page {
    width: 8in;
    @at-root (without: media) {   //without:没有
      color: red;
    }
  }
}
//编译后
@media print {
  .page {
    width: 8in;
  }
}
.page {
  color: red;
}
```

### 函数指令

```scss
/* Sass 支持自定义函数，并能在任何属性值或 Sass script 中使用 */
/* 使用方式和js差不多，就是整加 @ */
$w1: 40px;
$w2: 10px;
@function getw($n) {
  @return ($w1 + $w2) * $n;
}
#sidebar { width: getw(5); }
//编译后
#sidebar {width: 250px; }
```

### 输出格式

```scss
/* Sass 提供了四种输出格式 */

/* :nested      Nested （嵌套）样式是 Sass 默认的输出格式 */
#main {
  color: #fff;
  background-color: #000; }
  #main p {
    width: 10em; }

/* :expanded    Expanded 输出更像是手写的样式，选择器、属性等各占用一行，属性根据选择器缩进，而选择器不做任何缩进。 */
#main {
  color: #fff;
  background-color: #000;
}
#main p {
  width: 10em;
}

/* :compact 每条 CSS 规则只占一行，包含其下的所有属性。嵌套过的选择器在输出时没有空行，不嵌套的选择器会输出空白行作为分隔符 */
#main { color: #fff; background-color: #000; }
#main p { width: 10em; }

/* :compressed 会删除所有无意义的空格、空白行、以及注释，力求将文件体积压缩到最小，同时也会做出其他调整，比如会自动替换占用空间最小的颜色表达方式*/
#main{color:#fff;background-color:#000}#main p{width:10em}
```

### 导入SASS文件

```scss
/* css 中,只有执行到@import时,才下载引用的css文件*/
/* sass 中,当引用@import时,就把相关文件导入进来*/
/* @import 文件时,可以不用写文件后缀 */
/* Sass 允许同时导入多个文件 */
/* 引入index.scss文件 */
@import 'index';
@import "文件1", "文件2";

/* 导入文件也可以使用 #{ } 插值语句，但不能动态导入 Sass 文件，只能作用于 CSS 的 url() 导入方式 */
```

## 使用SASS局部文件

```scss
/* 当sass文件名前加上下划线,该文件就不会在一开局就被编译 */
/* 加上下划线的sass文件只有在被 @import 引入的时候才会被编译 */

/* 引入局部文件 */
/* 引入的局部文件名前必须有 下划线 */
@import "themes/_night-sky"
```

### 默认变量值--!default

```scss
/* 如果这个变量被声明赋值了，那就用它声明的值，否则就用这个默认值。 */

/* 设置变量w默认值为400px */
$w: 400px !default;
```

### 嵌套导入

```scss
/* 在 @import 调用的地方,会直接把内容插入进去 */
/* 一个名为_w.scss的局部文件的内容 */
aside {
  background: blue;
  color: white;
}
/* 引用文件 */
.blue-theme {
  @import "w"     /*scss引用文件可以不用写_和扩展名*/
}
```

### 原生的CSS导入

```css
/* 下列三种情况下会生成原生的 CSS@import */
/* 坏处：会造成浏览器解析css时的额外下载 */

/**
 * 被导入文件的名字以.css结尾；
 * 被导入文件的名字是一个URL地址（比如http://www.sass.hk/css/css.css）
 * 被导入文件的名字是CSS的url()值
 * @import 包含 media queries
 */

/* 若要用 sass 的方式导入原始的 css 文件 */
/* 可以把 css 文件名改为 .scss的后缀 */
```

### 静默注释

```scss
/* 静默注---// */
body {
  color: #333; // 这种注释内容不会出现在生成的css文件中
  padding: 0; /* 这种注释内容会出现在生成的css文件中 */
}
```

### @debug

```scss
/* 将 SassScript 表达式的值打印到标准错误输出流 */
/*  */
@debug 10em + 12em;
//输出
Line 1 DEBUG: 22em
```

### @warn

```scss
/* 将 SassScript 表达式的值打印到标准错误输出流 */
/* 您可以使用 --quiet 命令行选项或 :quiet Sass 选项关闭警告。 */
/* 样式表跟踪将与消息一起打印出来，以便被警告的用户可以看到他们的样式导致警告的位置 */

/* 用法示例 */
@mixin adjust-location($x, $y) {
  @if unitless($x) {
    @warn "假设#{$x}以像素为单位";  //这里将会被控制台输出
    $x: 1px * $x;
  }
  @if unitless($y) {
    @warn "假设#{$y}以像素为单位";  //这里将会被控制台输出
    $y: 1px * $y;
  }
  position: relative; left: $x; top: $y;
}
```

### @error

```scss
/* 将 SassScript 表达式的值作为致命错误抛出 */
@mixin adjust-location($x, $y) {
  @if unitless($x) {
    @error "$x可能不是无单位的，{$x}.";  //弹出报错信息
  }
  @if unitless($y) {
    @error "$y可能不是无单位的，{$y}.";  //弹出报错信息
  }
  position: relative; left: $x; top: $y;
}
```
## Sass String常用 函数

### 字符串函数
| 函数 | 描述 | 调用 | 结果 |
| ---- | ---- | ---- | ---- |
| quote(string) | 给字符串添加引号 |quote(runoob)| "runoob" |
| unquote(string) | 移除字符串的引号 |unquote("runoob")| runoob |
| str-index(string, 子串) | 查找 子串 第一次在 string 中的位置。没有匹配返回 null |str-index(abcd, a)| 1 |
| str-insert(string, insert, index) | 在字符串 string 中 index 位置插入 insert |str-insert("Hello world!", " runoob", 6)| "Hello runoob world!" |
| str-length(string) | 返回字符串的长度 |str-length("runoob")| 6 |
| str-slice(string, start, end) | 截取字符串,不指定索引默认截取到末尾 |str-slice("abcd", 2, 3)| "bc" |
| to-lower-case(string) | 将字符串转成小写 |to-lower-case("AA")| "aa" |
| to-upper-case(string) | 将字符串转成大写 |to-upper-case("aa")| "AA" |
| unique-id() | 无引号的随机字符串作为 id,只能保证在单次Sass编译中的唯一性 |unique-id()| uad053b1c |

### 数字函数
| 函数 | 描述 | 调用 | 结果 |
| ---- | ---- | ---- | ---- |
| abs(number) | 求绝对值 | abs(-15) | 15 |
| ceil(number) | 向上取整 | ceil(15.20) | 16 |
| floor(number) | 向下取整 | floor(15.80)| 15 |
| round(number)) | 四舍五入 | round(15.20) | 15 |
| max(number...) | 返回列表最大值 | max(5, 7, 9, 0, -3, -7)| 9 |
| min(number...) | 返回列表最小值 | min(5, 7, 9, 0, -3, -7)| -3 |
| comparable(num1, num2) | 数1比数2大返回true,否则反之 | comparable(15px, 10px)| true |
| percentage(number) | 数字转化为百分比 | percentage(1.2) | 120 |
| random() | 返回 0-1 区间内的小数 | random() | 0.45673 |
| random(number) | 返回 1 至 number 之间的整数，包括 1 和 limit | random(6) | 4 |

### 列表函数
| 函数 | 描述 | 调用 | 结果 |
| ---- | ---- | ---- | ---- |
| append(list, value, [分隔符]) | 将值添加到列表尾部,分隔符会自动侦测,或者指定为逗号或空格 | append((a b c), d) | a b c d |
| index(list, value) | 返回元素在列表中的索引,没有返回null | index(a b c, b) |  2 |
| is-bracketed(list) | 	判断列表中是否有中括号 | is-bracketed([a b c]) | true |
| join(list1,list2,分隔符,是否有中括号) | 将 list2 添加到 list1 的末尾 | join((a b c), (d e f), comma) | a, b, c, d, e, f |
| length(list) | 返回列表的长度 | length(a b c) | 3 |
| list-separator(list) | 返回一列表的分隔符类型。可以是空格或逗号。 | list-separator(a b c) | "space"(另一种类型是:"comma") |
| nth(list, n) | 取list第 n 项的值,index从1开始 | nth(a b c, 3) | 3 |
| set-nth(list, n, value) | 设置列表第 n 项的值为 value | set-nth(a b c, 2, x) | a x c |
| zip(lists) | 将多个列表按照以相同索引值为一组，重新组成一个新的多维度列表。 | zip(1px 2px 3px, solid dashed dotted, red green blue) | 1px solid red, 2px dashed green, 3px dotted blue |

### Map函数
| 函数 | 描述 |
| ---- | ---- |
| map-get(map, key) | 	返回 Map 中 key 所对应的 value(值)。如没有对应的 key，则返回 null 值。 |
| map-has-key(map, key) | 判断 map 是否有对应的 key，存在返回 true，否则返回 false。 |
| map-keys(map) | 返回 map 中所有的 key 组成的队列。 |
| map-merge(map1, map2) | 合并两个 map 形成一个新的 map 类型，即将 map2 添加到 map1的尾部 |
| 移除 map 中的 keys，多个 key 使用逗号隔开。 | 移除 map 中的 keys，多个 key 使用逗号隔开。 |
| map-values(map) | 返回 map 中所有的 value 并生成一个队列。 |

### 选择器函数
| 函数 | 描述 |
| ---- | ---- |
| is-superselector(super, sub) | 比较两个选择器匹配的范围，即判断 super 选择器是否包含了 sub 选择器所匹配的范围，是的话返回 true，否则返回 false。 |
| selector-append(selectors) | 将第二个 (也可以有多个) 添加到第一个选择器的后面。 selector. |
| selector-nest(selectors) | 返回一个新的选择器，该选择器通过提供的列表选择器生成一个嵌套的列表。 |
| selector-parse(selector) | 将字符串的选择符 selector 转换成选择器队列。 |
| selector-replace(selector, original, replacement) | 给定一个选择器，用replacement 替换 original 后返回一个新的选择器队列。 |
| selector-unify(selector1, selector2) | 将两组选择器合成一个复合选择器。如两个选择器无法合成，则返回 null 值。 |
| simple-selectors(selectors) | 将合成选择器拆为单个选择器。 |

### Introspection 函数
Introspection 函数比较少用于构建样式表，一般用于代码的调试上。

| 函数 | 描述 |
| ---- | ---- |
| call(function, arguments...) | 函数的动态调用，即调用函数 function 参数为 arguments，并返回结果。 |
| content-exists() | 查看当前的混入是否传递 @content 块。 |
| feature-exists(feature) | 检查当前的 Sass 实现是否支持该特性。 |
| function-exists(functionname) | 检测指定的函数是否存在 |
| get-function(functionname, css: false) | 返回指定函数。如果 css 为 true，则返回纯 CSS 函数。 |
| global-variable-exists(variablename) | 检测某个全局变量是否定义。 |
| inspect(value) | 返回一个字符串的表示形式，value 是一个 sass 表达式。 |
| mixin-exists(mixinname) | 检测指定混入 (mixinname) 是否存在。 |
| type-of(value) | 返回值类型。返回值可以是 number, string, color, list, map, bool, null, function, arglist。 |
| unit(number) | 返回传入数字的单位（或复合单位）。 |
| unitless(number) | 返回一个布尔值，判断传入的数字是否带有单位。 |
| variable-exists(variablename) | 判断变量是否在当前的作用域下。 |

### 颜色函数
| 函数 | 描述 |
| ---- | ---- |
| rgb(red, green, blue) | 创建一个 Red-Green-Blue (RGB) 色 |
| rgba(red, green, blue, alpha) | 根据红、绿、蓝和透明度值创建一个颜色。 |
| hsl(hue, saturation, lightness) | 通过色相（hue）、饱和度(saturation)和亮度（lightness）的值创建一个颜色。 |
| hsla(hue, saturation, lightness, alpha) | 通过色相（hue）、饱和度(saturation)、亮度（lightness）和透明（alpha）的值创建一个颜色。 |
| grayscale(color) | 将一个颜色变成灰色，相当于 desaturate( color,100%)。 |
| complement(color) | 返回一个补充色，相当于adjust-hue($color,180deg)。 |
| invert(color, weight) | 返回一个反相色，红、绿、蓝色值倒过来，而透明度不变。 |

Sass 颜色获取

| 函数 | 描述 |
| ---- | ---- |
| red(color) | 从一个颜色中获取其中红色值（0-255）。 |
| green(color) | 从一个颜色中获取其中绿色值（0-255）。 |
| blue(color) | 从一个颜色中获取其中蓝色值（0-255）。 |
| hue(color) | 返回颜色在 HSL 色值中的角度值 (0deg - 255deg)。 |
| saturation(color) | 获取一个颜色的饱和度值(0% - 100%)。 |
| lightness(color) | 获取一个颜色的亮度值(0% - 100%)。 |
| alpha(color) | 获取透明度值 |
| opacity(color) | 获取颜色透明度值(0-1)。 |

Sass 颜色操作

| 函数 | 描述 |
| ---- | ---- |
| mix(color1, color2, weight) | 把两种颜色混合起来。 weight 参数必须是 0% 到 100%。默认 weight 为 50% |
| adjust-hue(color, degrees) | 通过改变一个颜色的色相值（-360deg - 360deg），创建一个新的颜色 |
| rgba(color, alpha) | 根据红、绿、蓝和透明度值创建一个颜色。 |
| lighten(color, amount) | 通过改变颜色的亮度值（0% - 100%），让颜色变亮，创建一个新的颜色。 |
| darken(color, amount) | 通过改变颜色的亮度值（0% - 100%），让颜色变暗，创建一个新的颜色。 |
| saturate(color, amount) | 提高传入颜色的色彩饱和度。等同于 adjust-color( color, saturation: amount) |
| desaturate(color, amount) | 调低一个颜色的饱和度后产生一个新的色值。同样，饱和度的取值区间在 0% ~ 100%。等同于 adjust-color(color, saturation: -amount)|
| opacify(color, amount) | 降低颜色的透明度，取值在 0-1 之。等价于 adjust-color(color, alpha: amount) |
| fade-in(color, amount) | 降低颜色的透明度，取值在 0-1 之。等价于 adjust-color(color, alpha: amount) |
| transparentize(color, amount) | 提升颜色的透明度，取值在 0-1 之间。等价于 adjust-color(color, alpha: -amount) |
| fade-out(color, amount) | 提升颜色的透明度，取值在 0-1 之间。等价于 adjust-color(color, alpha: -amount) |
| adjust-color(color, red, green, blue, hue, saturation, lightness, alpha) | 这个函数能够调整给定色彩的一个或多个属性值，包括 RGB 和 HSL 色彩的各项色值参数，另外还有 alpha 通道的取值。这些属性值的调整依赖传入的关键值参数，通过这些参数再与给定颜色相应的色彩值做加减运算。 |
| change-color(color, red, green, blue, hue, saturation, lightness, alpha) | 跟上面 adjust-color 类似，只是在该函数中传入的参数将直接替换原来的值，而不做任何的运算。 |
| scale-color(color, red, green, blue,  saturation, lightness, alpha) | 另一种实用的颜色调节函数。adjust-color 通过传入的参数简单的与本身的色值参数做加减，有时候可能会导致累加值溢出，当然，函数会把结果控制在有效的阈值内。而 scale-color 函数则避免了这种情况，可以不必担心溢出，让参数在阈值范围内进行有效的调节。举个例子，一个颜色的亮度 lightness 取值在 0% ~ 100% 之间，假如执行 scale-color($color, $lightness: 40%)，表明该颜色的亮度将有 (100 - 原始值) × 40% 的增幅。另一个例子，执行 scale-color($color, $lightness: -40%)，表明这个颜色的亮度将减少 (原始值 - 0) × 40% 这么多的值。所有传参的取值范围都在 0% ~ 100% 之间，并且 RGB 同 HSL 的传参不能冲突。 |


## 小结

```scss
/* 变量是sass提供的最基本的工具 --- 可以让独立的css值变得可重用 */
/* 变量、混合器的命名、sass的文件名，可以互换通用 _和- */
/* sass的嵌套机制，嵌套允许css规则内嵌套css规则，减少重复编写常用的选择器 */
/* 特殊的父选择器标识符&，它可以构造出更高效的嵌套 */
/* 导入可以把分散在多个sass文件中的内容合并生成为一个css文件，避免了项目中有大量的css文件通过原生的css @import带来的性能问题 */
/* 通过嵌套导入和默认变量值，导入可以构建更强有力的、可定制的样式 */
/* 使用混合器可以让css变得更加可维护和语义化 */
/* 选择器继承允许声明类之间语义化的关系，可以让你保持css的整洁和可维护性。*/
```
