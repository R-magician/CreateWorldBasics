### 相关视频

- https://www.bilibili.com/video/BV1RQ4y1D7UC?from=search&seid=2601592379219761853&spm_id_from=333.337.0.0

### 解析和执行过程

```
 javascript 是一种描述型的脚本语言，一种解析语言

 js执行过程分两大部分

    第一部分，解析过程，预编译期。对js代码中声明的所有变量函数进行预处理。这里仅仅是声明函数和变量，开辟一块内存空间。不进行赋值操作

    第二部分，执行过程，浏览器的js引擎对于每个代码块进行顺序执行

    总的来说js执行分为两个部分，解析过程：按照代码块一段一段进行解析；执行过程：按照代码块顺序逐行执行
    因为是解析语言，所以在解析过程中有错误不会提示，也可以理解js不会出现编译错误；但在运行时出现错误程序将会停止执行
```

### 执行上下文

---

执行上下文就是当前 JavaScript 代码被解析和执行时所在环境的抽象概念， JavaScript 中运行任何的代码都是在执行上下文中运行。

执行上下文总共有三种类型：

- 全局执行上下文：
  这是默认的、最基础的执行上下文。不在任何函数中的代码都位于全局执行上下文中。它做了两件事：1. 创建一个全局对象，在浏览器中这个全局对象就是 window 对象。2. 将 this 指针指向这个全局对象。一个程序中只能存在一个全局执行上下文。

- 函数执行上下文：
  每次调用函数时，都会为该函数创建一个新的执行上下文（一个函数可以拥有多个执行上下文）。每个函数都拥有自己的执行上下文，但是只有在函数被调用的时候才会被**创建**。一个程序中可以存在**任意数量的函数执行上下文**。每当一个新的执行上下文被创建，它都会按照特定的顺序执行一系列步骤

- Eval 函数执行上下文：
  运行在 eval 函数中的代码也获得了自己的执行上下文，但由于 Javascript 开发人员不常用 eval 函数

#### 执行上下文的生命周期

- 创建阶段：

1. 创建变量对象：首先初始化函数的参数 arguments，提升函数声明和变量声明。
2. 创建作用域链（Scope Chain）：在执行期上下文的创建阶段，作用域链是在变量对象之后创建的。作用域链本身包含变量对象。作用域链用于解析变量。当被要求解析变量时，JavaScript 始终从代码嵌套的最内层开始，如果最内层没有找到变量，就会跳转到上一层父作用域中查找，直到找到该变量。
3. 确定 this 指向

在一段 JS 脚本执行之前，要先解析代码（所以说 JS 是解释执行的脚本语言），解析的时候会先创建一个全局执行上下文环境，先把代码中即将执行的变量、函数声明都拿出来。变量先暂时赋值为 undefined，函数则先声明好可使用。这一步做完了，然后再开始正式执行程序。

另外，一个函数在执行之前，也会创建一个函数执行上下文环境，跟全局上下文差不多，不过 函数执行上下文中会多出 this arguments 和函数的参数。

- 执行阶段：
  执行变量赋值、代码执行

- 回收阶段：
  执行上下文出栈等待虚拟机回收执行上下文

### 全局预处理

```
 预处理：创建一个词法环境，扫描JS中声明的函数。用var定义的变量并将他们加到预处理的词法环境中去

 预处理阶段先读取代码块，不是一行一行的解析执行定义的方法和变量，会放到不同的词法环境中(我觉得应该是作用域中)

 预处理的函数必须是js中用声明的方式声明的函数(不是函数表达式 => var i=()=>{} )
    函数表达式在window的词法环境中会识别不了，要报错
```

### 命名冲突

- 在变量和函数同名冲突
  - 函数优先，最终结果往往是指向函数的引用
  - 同名的函数或变量，只有后面的函数方法会有效
  - 输出的时候注意看函数是否带了括号

### 函数冲突原则

- 函数声明有冲突时，会覆盖
- 变量声明时有冲突，会忽略
- 没有用声明的变量会变成外部成员，即全局变量

### 作用域

- 作用域决定了代码块中变量和其他资源的可见性
- 作用域是一个独立的地盘，让变量函数不会外泄暴露出去，隔离变量
- 全局作用域
  - 未定义直接赋值的变量自动声明为拥有全局作用域
  - 所有 window 对象属性拥有全局作用域
  - 容易污染全局命名空间
- 局部作用域
  - 一般只在固定的代码片段可以访问到函数和变量
  - 最大的作用域可以隔离变量
  - 内层作用域可以访问外层作用域的变量，反之则不行
- let : 声明的变量和函数不会被提升到代码块顶部,禁止重命名
- const : 和 let 差不多,静态变量,只能在声明时候赋值

### 作用域链

- 自由变量
  - 当前作用域没有定义的变量，顺着作用域链向上寻找
- 作用域链
  - 当前作用域一层一层向外层作用域向上寻找，直到全局作用域没找到，就宣布放弃。这种一层一层的关系就是作用域链
- 自由变量取值
  - 取值的时候要在创建(声明)作用域 的函数中取值 (是创建不是调用)

### 变量提升和函数提升

- 当前作用域和外层作用域存在同名的变量，在当前作用域未定义前调用此变量，那么打印出来的值，只会是 undefined，不会是上层作用域同名变量的值，因为当前作用域在预编译的时候把变量提升到上面，执行的时候可以找到变量，但是未赋值
- 若当前作用域和外层作用域存在同名的变量，要注意预编译时的提升变量机制
- 函数提升---可以在声明函数之前调用
- 函数提升是必要的，是 js 规定好的
- 变量提升是 js 语言的问题，在开发提升尽量避免变量提升
- 在同一个作用域中存在多个同名函数声明，后面的会覆盖前面的函数声明
- 函数表达式是不会提升的(如：var i=()=>{})
- 封装好的类库应该包裹在{}里面，这样才会有自己的作用域，不会和其他人的代码冲突
- 变量提升是 js 中的一个 bug，函数提升是 js 必须要进行的(设计时是有目的的)

### 变量的本质

- 保存数据的一串符号
- 保存在计算机中的数据，在程序运行时读取这段数据时应该如何找到这个内存地址(通过变量)
- 全局变量
  - 当 js 加载到改变量所在行时产生
  - js 代码加载完毕，变量死亡
- 局部变量
  - 当 js 加载到改变量所在行时产生
  - 当函数执行完毕时死亡

### 变量的类型

- (0.1+0.2=0.30000000...004)
  - 因为 0.1 和 0.2 是先转成二进制存储到计算机里面进行运算的，转换的过程中会产生无线循环，只有通过截取运算
- 基本类型：Number、Boolean、String、null、undefined、symbol（ES6 新增）
  - Symbol 本质上是一种唯一标识符，可用作对象的唯一属性名，这样其他人就不会改写或覆盖你设置的属性值。
  - Symbol 数据类型的特点是唯一性，即使是用同一个变量生成的值也不相等，另一特点是隐藏性。
- 引用类型：Object
- 对象子类型：（Array，Function）
- typeof 用于判断数据类型

### js 中的判空方法

- 判断变量为空
  - obj == null 能判断变量为 null 或者 undefined
  - obj == undefined 只能判断变量为 undefined
- 判断对象为空
  - Object.getOwnPropertyNames(obj).length == 0
  - JSON.stringify(obj) == "{}"
  - Object.keys(obj).length == 0
  - 还有就是通过 hasOwnProperty 循环遍历
- 判断是否为空数组
  - array.instanceof Array 判断 array 数据类型是否为数组
  - array.length == 0
- 判断空串
  - str ===''
  - str.trim().length ==0

### 数组类型

- array instanceof Array 判断变量是数组,返回布尔值
- obj instanceof object 判断变量是对象,返回布尔值

### 原型链上绑定方法

```javascript
//在数组上绑定一个获取最小值的方法
Array.prototype.min = () => {};
```

### apply call 与 bind

- apply(绑定的对象,[参数])
  - 改变执行主体,就使用 apply 方法
- call(绑定的对象,参数)
  - 参数不是数组的时候,就使用 call 方法
- apply，call 和 bind 都是 用来改变 this 的指向
- apply 和 call 会让当前函数立即执行，而 bind 会返回一个函数，后续需要的时候再调用执行
- call 接受多个参数，而 apply 接受的是一个数组
- bind 也是用于改变上下文的指向，它和 call 一样，接受多个参数
- bind 和 apply，call 的区别在于，bind 返回一个方法，用于后面调用，apply 和 call 会直接执行

### 函数的定义与调用

- 函数实际上也是一种对象，每个函数都是 Function 类型的实例
- 函数定义大体可以分三种
  - 函数声明 function aa(){}
  - 函数表达式 let fn =()=>{}
  - Function 构造函数 let fn = new Function(参数 1,参数 2,执行函数体)
    - 构造函数的其中的参数除了最后一个参数是执行的函数体，其他的都是参数
    - Function 构造函数声明的函数是顶级函数，就是全局作用域下面的函数
- 代码模块化
  - 只给外部提供接口，具体的实现方法不给予展示
- 函数声明和函数表达式的区别
  - 对应函数名称，函数表达式可有可无
  - 对应函数提升，函数声明存在函数提升；函数表达式，不存在函数提升
- 构造器调用模式
  - 构造器调用模式会定义一个函数，在函数定义实例属性，在原型上定义函数，然后通过 new 操作符生成函数实例，在通过实例调用原型上定义的函数
- 自执行函数
  - (function(){console.log('1111')})()
  - (function(){console.log('1111')}())

### 函数参数

- 形参 -- 出现在函数定义中，只能在主体函数中使用
- 实参 -- 出现在调用函数处
- 当传入数组时，在函数体中改变数组的值，外部传入数组变量也会改变
  - 数组的引用数据类型是地址
- arguments 对象的性质
  - arguments 对象是所有函数具有的一个内置局部变量
  - 表示的是函数实际接收的参数，是一个类数组，只能使用 length()方法，其他的方法不能用
  - arguments.length() 获取调用函数传入的参数的个数
  - 不会随着函数的处理而改变
  - 若函数有接收值，会与 arguments 相互绑定
  - arguments.callee() 相当于当前函数的调用
    - 适用于匿名函数的递归调用

### 防抖

触发高频事件后 n 秒内函数只会执行一次，如果 n 秒内高频事件再次被触发，则重新计算时间

思路：每次触发事件时都取消之前的延时调用方法

对于短时间内连续触发的事件（上面的滚动事件），防抖的含义就是让某个时间期限（如上面的 1000 毫秒）内，事件处理函数只执行一次。

```
/* * fn [function] 需要防抖的函数
* delay [number] 毫秒，防抖期限值
*/
debounce(fn,delay){   
    let timer = null //借助闭包
    return function() {       
        if(timer){//有一个计时过程中，触发了相同事件。所以要取消当前的计时，重新开始计时
            clearTimeout(timer)  //取消计算器          
            timer = setTimeout(fn,delay)       
       }else{ 
            timer = setTimeout(fn,delay) // 当前并没有在计时，那么就开始一个计时       
        }   
    }
}

window.onscroll = this.debounce(this.showTop,100)


```

### 节流

高频事件触发，但在 n 秒内只会执行一次，所以节流会稀释函数的执行频率

思路：每次触发事件时都判断当前是否有等待执行的延时函数

```
//节流
throttle(fn,delay){ 
    let valid = true   
    return function() {       
         if(!valid){           
            //休息时间 暂不接客           
            return false       
        } 
        // 工作时间，执行函数并且在间隔期内把状态位设为无效       
        valid = false       
        setTimeout(() => {           
        fn()           
        valid = true;       
     }, delay)    、
 }
 },

window.onscroll = this.throttle(this.showTop,100)

```

### 闭包

- 用于许多变量和绑定了这些变量执行上下文环境的表达式，通常是一个函数(理解不了可以看下面)
  - 函数拥有外部变量的引用，在函数返回时该变量仍然处于活跃状态
  - 闭包作为一个函数返回时，上下文环境不会被销毁，仍处于执行上下文环境中
  - 函数执行形成私有作用域，保护里面的变量不受外界干扰
  ```
   function fn(){
     let max = 10;
     return function bar(x){
       if(x > max){console.log(x)}
     }
   }
   var fl = fn()
   fl(11)//这里的传参是直接传给返回函数的
  ```
- 闭包最大的缺点，会导致数据一直在增长
- 定时器和 for 循环使用会出现意想不到的情况
  - 第一种解决：将 for 中的 var i = 0 , 改为 let i = 0 ES6 的方式
  - 第二种解决：将 setTimeout 改为闭包方式 ES5 用闭包解决
- 作用域链问题
  - 闭包会导致作用域链问题
  - 解决方法：改变 this 的指向
- 闭包的优点
  - 保护函数内变量的安全，实现封装
  - 防止变量流入其他环境发生命名冲突，造成环境污染
  - 在适当的时候，可以在内存中维护变量并缓存，提高执行效率
- 闭包的缺点
  - 内存消耗
  - 内存泄漏

### this 使用详解

- 一般来说 this 的指向是函数调用者
- 在构造函数中 this 是当前类的一个实例
- call apply bind ,this 是第一个参数
- 箭头函数 this 指向：箭头函数没有自己的 this，要看其外层是否有函数，如果有就是指向外层的 this，如果没有就是指向 window
- 当函数没有所属调用时，this 指向的是全局对象，比如说：**_匿名函数_**
- this 重新绑定对象
  - call apply bind
- 闭包内部的 this 关键字无法访问到外部变量函数的 this 变量

### 创建对象

```javascript
//基于Objiect()构造函数
//适用于单个创建对象
let obj = new Object();
obj.name = "ciupt";

//字面量
//适用于单个创建对象
let obj = {
  name: "ciupt",
};

//基于工厂方法模式
//抽象出创建对象和属性赋值的过程，值对外暴露出需要设置的属性值
//用于生成多个同种类型的对象
//可以减少重复代码，但是实例都是Obj类型，无法更近一步区分具体类型
//对外暴露name,age,address参数
function createPerson(name, age, address) {
  //生成一个对象，并添加各种属性方法
  let obj = new Object();
  obj[name] = name;
  obj[age] = age;
  obj[address] = address;
  obj.caoz = () => {
    //一系列的操作
  };
  return obj;
}
let p = createPerson("ciupt", 18, { name: "重庆", code: "000000" });

//基于构造函数
//构造函数创建对象可以确定器所属类型,解决了工厂方法模式出现的问题
//构造函数创建的对象,相同实例的函数是不一样的
function Obj(name) {
  this.name = name;
  this.getName = () => {
    return this.name;
  };
}
let p = new Obj("ciupt");

//基于原型对象的模式
//基于原型对象模式是将所有函数和属性都封装在prototype属性上
function obj() {
  obj.prototype.name = "ciupt";
  obj.prototype.age = 18;
  obj.prototype.getName = () => {
    return this.name;
  };
}
let p = new obj();
let p1 = new obj();
console.log(p.name === p1.name); //true
//通过上面的代码可以发现，使用基于原型对象的模式创建的实例，其属性都是相等的
//不同的实例会共享原型上的属性和函数
//改变其中一个实例的属性值，便会引起其他实例的属性值的变化

//构造函数和原型混合的模式
//狗函数和原型混合模式是目前最常见的创建自定义类型对象的方式
//构造函数定义实例的属性
//原型对象定义实例共享的属性和函数
//这样每个实例都能拥有自己的属性值，同时实例还能共享函数的引用
//构造函数中定义实例属性
function obj(name, age) {
  this.name = name;
  this.age = age;
}
//原型中添加实例共享函数
obj.prototype.getName = () => {
  return this.name;
};

//生成实例
let p = new obj("ciupt", 18);
let p = new obj("R魔法师", 25);
//这样可以改变一个实例的属性不会影响另一个实例的属性
//不同的实例共享相同的函数，因此在比较时是相等的

//基于动态原型模式
//是将原型对象放在构造函数的内部，通过变量进行控制，只在第一次生成实例的时候进行原型的设置
//动态模式的模式相当于懒汉模式，只在生成实例时设置原型对象，但是功能与构造函数和原型混合模式是相同的
function obj(name) {
  this.name = name;
  //如果对象中_initialized为undefined，则表明没有给obj的原型对象添加函数
  //_initialized是用户自定义的标记变量用来记录第一次进行原型的设置
  if (typeof obj._initialized === "undefined") {
    obj.prototype.getName = () => {
      return this.name;
    };
    obj._initialized = true;
  }
}
//生成实例
let p = new obj("ciupt", 18);

//创建对象根据自己的实际情况使用
```

### 对象的克隆

- 将某个变量的值复制到另一个变量的过程
- 赋值对于基本类型的没影响
- 对引用地址的变量来说，多个变量实际指向的都是同一个值
- 浅克隆(赋值)
  - 引用数据类型如果执行的是浅克隆(赋值)，对克隆后值的修改会影响到原始值
  - 浅克隆值克隆对象最外层的属性，如果对象存在更深层的属性；则不进行处理，这会导致克隆对象和原始对象的深层属性仍然在同一块内存。
- 深克隆
  - 克隆的对象和原始对象相互独立，不会彼此影响
  - 使用 JSON 的序列化和反序列化
    - JSON.parse(JSON.stringify(origin)) 先序列号为字符串，在序列化成对象
    - 无法实现对函数，RegExp 等特殊对象的
    - 对象的 constructor 会被抛弃，所有的构造函数会指向 Object，原型链会破裂
    - 对象中如果存在循环引用，会抛异常
  - 自定义实现深克隆
  ```
   function deepClone(obj) {
    let newObj = Array.isArray(obj) ? [] : {}
    if (obj && typeof obj === "object") {
        for (let key in obj) {
            if (obj.hasOwnProperty(key)) {
                newObj[key] = (obj && typeof obj[key] === 'object') ? deepClone(obj[key]) : obj[key];
            }
        }
    }
    return newObj
   }
   const newObj = deepClone(oldObj));
  ```

### 原型对象

- 每一个函数在创建时都会被赋予一个 prototype 属性，它指向函数的原型对象
- 这个对象可以包含所有实例共享的属性和函数
- 在使用 prototype 属性后，就可以将实例共享的属性和函数抽离出构造函数，添加到 prototype 属性中

```javascript
//构造函数中定义实例属性
function obj(name, age) {
  this.name = name;
  this.age = age;
}
//原型中添加实例共享函数
obj.prototype.getName = () => {
  return this.name;
};

//生成实例
let p = new obj("ciupt", 18);
let p1 = new obj("R魔法师", 25);
console.log(p.getName === p1.getName); //true
```

- 实例共享的 getName 函数添加在了 obj.prototype 属性上，通过测试发现不同实例中的 getName 属性是相等的
- 原型对象，构造函数和实例
  - 构造函数的 prototype 属性会指向它的原型对象，而通过构造函数生成具体的实例
  - 构造函数：function obj(name,age){this.name = name;this.age = age;}
  - 实例：let p1 = new obj('R 魔法师',25);
  - 原型对象：obj.prototype
  - 它们之间的关系
    - 每个函数在创建的时候都会被赋予一个 prototype 属性
    - 它指向函数的原型对象
    - 默认情况下所有原型对象都会增加一个 constructor 属性，指向 prototype 属性所在的函数，即构造函数
    - 先有声明构造函数 再有原型(绑定方法) 再有实例
  - **proto**属性
    - 当我们通过 new 操作符调用构造函数创建一个实例时，具有一个**proto**属性
    - 它指向构造函数的原型对象，因此**proto**属性可以看做是一个连接实例与构造函数的桥梁
  - 实例的读取顺序
    - 先在实例的本身去找
    - 如果没找到，就沿着原型对象寻找
  - 重写原型对象
    - 之前是分开写的，可以统一写
    - obj.prototype={constructor:obj,name,age}
    - constructor:obj，这个一定要加；使用上面这种方法就会没有 constructor 属性，所有要手动加
    - constructor 指向 原型对象

原型  prototype  和  ** proto**

- 每个对象都有一个**proto**属性，并且指向它的 prototype 原型对象
- 每个构造函数都有一个 prototype 原型对象
- prototype 原型对象里的 constructor 指向构造函数本身

### 原型链

- 对象每个实例都具有一个**proto**属性，指向的是构造函数的原型对象
- 在 js 中几乎所有对象都具有**proto**属性
- 可以在原型链上面查找实例上可以调用的方法
- 由**proto**属性链接而成的链路构成了 js 的原型链
- 原型链的顶端是 Object.prototype,它的**proto**属性为 null

```javascript
function obj() {}
let o = new obj();
console.log(o.__proto__ === o.prototype); //true
console.log((o.__proto__.__proto__ === o.prototype.__proto__) === o.prototype); //true
```

- 原型链的特点
  - 由于原型链的存在，属性查找过程不在只查找自身的原型对象
  - 它会沿着整个原型链一直向上追溯到 Object.prototype
  - 如果在这期间找到会返回结果(谁先找到谁返回)
  - 如果没找到则会返回 'undefined'
  - 如果链上有相同的属性会覆盖
  - 比如 toString 是 Object 上的方法，可以通过原型链查找
  - 由于原型链的存在，因此查找的链路越长，对性能影响越大
- 属性区分
  - hasOwnProperty() 是 Object() 构造函数的原型对象提供可以判断属性是否为自身拥有
  ```javascript
  function obj(name) {
    his.name = name;
  }
  obj.prototype.age = 12;
  let o = new obj("ciupt");
  console.log(o.hasOwnProperty("name")); //true
  console.log(o.hasOwnProperty("age")); //false
  ```
- 内置构造函数
  - Js 中有一些特定的内置构造函数,如：String() Number() Array() Object()
  - 他们本身的**proto**属性都统一指向 Function.prototype
- **proto**属性
  - 在原型链体系中它很重要
  - 只有通过它能将原型链串联起来

### 继承

- 在不影响父类的情况下使子类具有父类对象的特性
- **_原型链继承_**

```javascript
/**
 * 原型链继承的优点
 *    1.简单容易实现
 *        只需要设置子类的 prototype 属性为父类实例即可
 *    2.继承关系纯粹
 *        生成实例既是子类实例也是父类实例
 *    3.可以通过子类直接访问父类原型链属性和函数
 * 原型链继承的缺点
 *    1.子类所有实例将共享父类属性
 *        如果父类中有个值为 引用数据 类型，那么改变子类某个实例的属性值将会影响其他实例的属性值
 *        涉及到了深度拷贝
 *    2.创建子类实现时，无法向父类构造函数传递参数
 *        通过new操作符创建子类的实例时，会调用子类的构造函数，
 *        而在子类的构造函数中并没有设置与父类的关联，
 *        从而导致无法向父类的构造函数传递参数
 *    3.无法实现多继承
 *        由于子类的 prototype 属性只能设置一个值，如果设置多个，后面的值会覆盖前面的值
 *        导致子类只能继承一个父类，从而无法多继承
 *    4.为子类增加原型对象上的属性和函数时，必须放在 new 父类() 函数之后
 *        实现继承的冠军语句是  Cat.prototype = new Animal()
 *        如果想要为子类新增原型对象上的属性和函数，就要在上面语句之后添加
 *        因为在这个语句之前设置 prototype 属性，后面的语句会重写 prototype 属性导致前面设置全部失效
 *
 */
//父类
function Animal(name) {
  //自身的属性
  this.type = "animal";
  this.name = name;
  this.sleep = function () {
    console.log(this.name + "正在睡觉");
  };
}

//原型链上的属性和方法
Animal.prototype.age = 5;
Animal.prototype.eat = () => {
  console.log(this.name + "正在吃饭");
};

//子类
function Cat(name) {
  this.name = name;
}

//原型链继承
Cat.prototype = new Animal();

//将 Cat 的构造函数指向自身
//如果不将Cat原型对象的 constructor 属性指向自身的构造函数，那将会指向父类Animal的构造函数
Cat.prototype.constructor = Cat;

let cat = new Cat("ciupt");
```

- **_构造继承_**

```JavaScript
 /**
  * 在子类的构造函数中通过call()改变this的指向，调用父类的构造函数
  * 从而能将父类的实例属性和函数绑定到子类的this上
  *
  * 构造继承的优点
  *    1.可以解决子类实例共享父类属性的问题
  *        call()函数实际是改变了父类构造函数中this的指向
  *        相当于父类的属性和函数绑定到了子类的this中，成了子类实例的属性和函数，不会相互影响
  *    2.创建子类的实例时，可以向父类传递参数
  *        在call()中可以对父类传递参数，同时由子类继承下来
  *    3.可以实现多继承
  *        在子类构造函数中可以通过多次调用call()函数实现继承多个父对象
  *        每调用一次call()函数就会将父类的实例属性和函数绑定到子类的this中
  * 构造继承继承的缺点
  *    1.实例只是子类的实例，并不是父类的实例
  *        我们只是通过原型对象将子类和父类进行串联，所以生成的实例与父类没有关系，这就失去了继承的意义
  *        console.log(cat instanceof Animal)    //false
  *        console.log(cat instanceof Cat)       //true
  *    2.只能继承父类实例的属性和函数，并不能继承原型对象上的属性和函数
  *        子类不能访问原型对象上的属性和函数
  *    3.无法复用父类的实例对象
  *        父类的实例函数通过call()函数绑定到子类的this中，因此每个实例都会拥有父类实例的引用
  *        这会造成不必要的内存消耗，影响性能
 */
 //父类
 function Animal(name){
   //自身的属性
   this.type = "animal";
   this.name = name;
   this.sleep = function(){
     console.log(this.name + "正在睡觉");
   }
 }
 //父类原型上增加方法
 Animal.prototype.eat = ()=>{
   console.log(this.name + "正在吃饭");
 }
 //子类
 function Cat(name){
   //继承
   Animal.call(this);
   this.name = name;
 }

 let c = new Cat('ciupt');
 c.eat()     //这里会报错，构造继承访问不到原型链上面的方法
 c.sleep()   //这里可以访问到自身属性上的方法
```

- **_复制继承_**

```JavaScript
 /**
  * 通过for……in遍历父类实例的属性和函数，并将其依次设置为子类的属性和函数或原型对象上的属性和函数
  *
  * 复制继承的优点
  *    1.支持多继承
  *        只需要在子类的构造函数中生成多个父类的实例，然后用for……in处理即可
  *    2.能同时继承实例的属性和函数与原型对象上的属性和函数
  *    3.可以向父类构造函数中传递值
  * 复制继承的缺点
  *    1.父类的所有属性都需要复制，消耗内存
  *    2.实例只是子类的实例，并不是父类的实例
  *        console.log(cat instanceof Animal)    //false
  *        console.log(cat instanceof Cat)       //true
  *
 */
 //父类
 function Animal(name){
   //自身的属性
   this.type = "animal";
   this.sleep = function(){
     console.log(this.name + "正在睡觉");
   }
 }
 //父类原型上增加方法
 Animal.prototype.eat = ()=>{
   console.log(this.name + "正在吃饭");
 }
 //子类
 function Cat(name){
   let animal = new Animal(name);
   //开始实现复制继承
   for(key in animal){
     if(animal.hasOwnProperty(key)){
       this[key] = animal[key]
     }else{
       Cat.prototype[key] = animal[key]
     }
   }
   return this.name
 }

 let c = new Cat('ciupt')
```

- **_组合继承_**

```javascript
/**
 * 组合继承结合了构造继承和原型继承两种
 *
 * 组合继承的优点
 *    1.既能继承父类实例的属性和函数，又能继承原型对象的属性和函数
 *    2.即是子类的实例，又是父类的实例
 *    3.不存在引用属性共享的问题
 *    4.可以向父类的构造函数中传递参数
 * 组合继承的缺点
 *    1.父类的实例属性会绑定两次
 *        通过call()函数调用了一次父类的构造函数
 *        改写子类的prototype属性生成实例调用了一次父类的构造函数
 */
//父类
function Animal(name) {
  //自身的属性
  this.type = "animal";
  this.sleep = function () {
    console.log(this.name + "正在睡觉");
  };
}
//父类原型上增加方法
Animal.prototype.eat = () => {
  console.log(this.name + "正在吃饭");
};
//子类
function Cat(name) {
  //构造继承
  Animal.call(this);
  this.name = name;
}
//原型链继承
Cat.prototype = new Animal();
//绑定到自己身上
Cat.prototype.constructor = Cat;

let cat = new Cat("ciupt");
cat.sleep();
cat.eat();
```

- **_寄生组合继承_**

```javascript
/**
 * 在组合继承，进行子类的prototype属性的设置时去掉父类实例的属性和函数
 */
//父类
function Animal(name) {
  //自身的属性
  this.type = "animal";
  this.feature = ["fat", "thin", "tall"];
  this.sleep = function () {
    console.log(this.name + "正在睡觉");
  };
}
//父类原型上增加方法
Animal.prototype.eat = () => {
  console.log(this.name + "正在吃饭");
};
//子类
function Cat(name) {
  //构造继承
  Animal.call(this);
  this.name = name;
}
//原型的两次绑定加入函数去处理控制
//立即执行函数
(function () {
  let Super = function () {};
  //Super()函数的原型指向父类的原型，去掉父类的实例属性
  Super.prototype = Animal.prototype;
  Cat.prototype = new Super();
  Cat.prototype.constructor = Cat;
})();

let cat = new Cat("ciupt");
```

### Object 类型及其实例和静态函数

- 了解 new 运算符
  - new 操作符在执行过程中会改变 this 的执行
  - 创建一个新对象
  - 将构造函数的作用域赋值给新对象(改变 this 指向)
  - 执行构造函数中的代码(给对象添加方法属性)
  - 返回新对象
  - 视频：p35

### 事件流

- 捕获
  - 从最上层到最内层
- 冒泡
  - 从最里层，一步一步向上层冒出
- 一个完整的事件流包含了 3 个阶段：事件捕获阶段 > 事件目标阶段 > 事件冒泡阶段
- addEventListener('绑定事件',调用方法,是否支持捕获(true/支持))
  - 默认是情况下，即第三个参数默认是 false 时，按照冒泡事件处理

### Event 对象(事件)

- 事件在浏览器中是以 Event 对象的形式存在的，每触发一个事件就会产生一个 Even 对象
- 该对象包含所有事件相关的信息，包括事件的元素，事件的类型及其他与特定事件相关的信息
- Event 对象在不同的浏览器中是有差异的
  - Firefox 浏览器只支持 event 传参的方式
- 阻止事件冒泡
  - event.stopPropagation() 在里层使用这个，就不会触发外层事件

```javascript
 /**
  * 获取Event对象的两种方式
  *    1.通过绑定函数时的参数名event
  *    2.在处理函数中，通过 window.event 获取对象
 */
 let btn = document.getElementById("button");
 btn.addEventListener.('click',(event)=>{
     let winE = window.event;
     console.log(event == winE) //true
 })
```

### 阻止默认行为

- 通过在触发函数中调用 event.preventDefault() 函数去实现

### 事件委托

- 事件委托 就是利用事件冒泡原理，管理某一类型的所有事件
- 利用父元素来代表子元素来处理某一类型事件的处理方式
- 就是将事件绑定到父元素上，任何来管理触发到子元素上面的事件
  - 通过 event 来获取点击的子元素

### 浏览器的重排和重绘

- 浏览器渲染页面默认采用的是流布局模型
- 页面会重排的操作
  - 页面首次渲染
  - 浏览器窗口大小发生改变
  - 元素尺寸或位置发生改变
  - 元素内容发送变化
  - 元素字体发生改变
  - 添加或者删除 Dom 元素
  - 获取特定的属性。offsetTop offsetLeft scrollTop scrollLeft
- 浏览器的重绘
  - 相对于重绘比重排简单多了，只会改变元素在页面中的展示，而不会引起元素在文档流中位置的改变
  - 例如：字体颜色、背景色、透明度等
- 重排会引起重绘的操作，重绘却不会引起重排的操作
- 性能优化
  - 我们应该尽量减少重排重绘的操作，这样也是网站性能优化的一种方式
  - 将多次改变样式的属性操作合并为一次
  - 将多次重排元素设置为决定定位
  - 在内存中多次操作节点，在完成后添加到文档树中
  - 将复杂处理的元素处理为 display:none ,处理完后在进行显示
  - 将频繁获取会引起重排的属性存到变量中
  - 尽量减少使用 table 布局(table 中任何一个元素改变，都会引起重排)
  - 使用事件委托处理程序

### Ajax 的基本执行原理和执行过程

- Ajax 的基本原理是通过 XMLHttpRequset 对象向服务器发送异步请求
- XMLHttpRequset 对象
  - 从创建到销毁存在一个完整的生命周期，每个周期都会调用特定的函数
  - abort() 如果请求已发送，则停止请求
  - getAllResponseHeader() 获取所有 HTTP 请求的响应头，作为键值对返回，如果每返回则 null
  - getResponseHeader('key') 获取指定 key 的 HTTP 响应头，如果不存在返回 null
  - open("method","URL",[asyncFlag],[username],[password])
    - 建立对服务器的调用
    - method ：表示请求 GET POST 或者 PUT
    - URL ： 请求路径
    - 后面 3 个是可选参数，分别表示是否异步(默认同步/true)，用户名，密码
  - send(content) 向服务器发送请求
  - setRequesHeader('key',value)
    - 设置请求头中属性为 key 的值为 value,设置前先调用 open(),设置后 header 将随着 send()函数一起发送

```javascript
//创建XML
function createXMLHttp() {
  let xmlhttp;
  //兼容浏览器 IE7及以上 Firefox Chrome Opera Safari
  if (window.XMLHttpRequest) {
    xmlhttp = new XMLHttpRequest();
  }
  //IE6 IE5
  if (window.ActiveObject) {
    try {
      xmlhttp = new ActiveObject("Microsoft.XMLHTTP");
    } catch (e) {
      try {
        xmlhttp = new ActiveObject("msxm12.XMLHTTP");
      } catch (ex) {
        console.log(ex);
      }
    }
  }
  return xmlhttp;
}

//建立连接
let xhr = createXMLHttp();
xhr.open("post", "/admin/login", true);
//设置请求头
xhr.setRequesHeader("Content-type", "application/json;charset=UTF-8");

//发送请求并传输数据
let content = { usernam: "aaaa", password: "1111" };
xhr.send(content);

//处理响应
xhr.onreadystatechange = () => {
  //当readyState为4，且状态码为200时表示请求成功
  if (xhr.readyState === 4 && xhr.status === 200) {
    //处理响应值
    xhr.responseText;
  }
};
```

- Ajax 的优缺点
  - 优点
    - 无须刷新更新数据
    - 异步通信
    - 前后端分离
    - 标准化支持
  - 缺点
    - 破坏浏览器的正常后退功能(影响不大)
    - 安全性问题
    - 对搜索引擎不友好
    - 违背 URL 唯一资源定位的初衷

### get 方式和 post 方式的区别

- 参数传递
  - get 会将请求参数添加到请求 URL 的后面,用户可以看到 xhr.send() ,不用发送数据
  - post 请求会将参数放到请求体中，用户无法通过 URL 直接看到 xhr.send(data) ,要携带参数
- 服务端参数获取
  - 使用 Express 作为服务器 get 请求可以直接通过 Request.query 来获取
  - post 要加载中间件 通过 Request.body 来获取
- 传递的数据量
  - get 可以传输的数据量小 Chrome 限制 8K IE 限制 2K
  - post 传递数据量一般不受限制，单实际上，服务器上会限制
- 安全性
  - get 安全较低
  - post 数据不会出现在 URL 上,安全性比 get 高点
- 使用 get 方式需要注意的点
  - 使用 get 时，如果 url 不发生改变，可能存在缓存问题，因此在请求 url 后一般会拼接上一个时间戳
  - 使用 get 方式请求时请求参数在拼接后 可能浏览器编码 服务器编码 数据库编码不一致出现乱码
    - 因此需要用 encodeURIComponent()函数处理
- Ajax 进度事件
  - loadstart：在开始项目时触发
  - progress：在接收响应期间不断触发，直到请求完成
  - error：在请求失败时触发
  - abort：在主动调用 abort()函数触发，表示请求终止
  - load：在数据接收完成触发
  - loadend：在通信完成或者 error abort load 事件后触发
  - timeout：在请求超时触发

### 跨域的解决方案

- CORS 和 JSONP
- CORS
  - 可以在网上加关键字百度，不是很难
- JSONP
  - 是客户端与服务器通信最常用的解决办法，特点简单适用
  - JSONP 的主要思想可以分两步
    - 在网页中动态添加一个 script 标签，通过标签向服务器发送请求，在请求中会携带一个请求 callback 回调函数
    - 服务器在接收到请求后，会处理响应获取返回的参数，然后将参数放在 callback 回调函数中对应的位置返回

### MVC 和 MVVM 的区别

- MVC
  - 所有通信都是单向的
  - 视图（View）：用户界面。
  - 控制器（Controller）：业务逻辑
  - 模型（Model）：数据保存
- MVVM
  - 它采用双向绑定（data-binding）：View 的变动，自动反映在 ViewModel
  - M:模型（Model）:data 中的数据
  - V:视图（View）：模块代码
  - VM：视图模型（ViewModel）：Vue 实例

### jQuery 和 Vue 的区别

- jQuery
  - 专注视图层
  - 事件驱动
- Vue
  - 专注于数据层
  - 数据驱动

### Web Socket

```
1.创建连接
  URL必须以“ws”字符开头
  URL必须由4个部分组成
    通信标记（ws）
    主机名称（host）
    端口号（port）
    及WebSocket Server.
let host = "ws://echo.websocket.org/";
let socket=new WebSocket(host);


// 打开Socket
socket.onopen = function(event) {

  // 发送一个初始化消息
  socket.send('I am the client and I\'m listening!');

  // 监听消息
  socket.onmessage = function(event) {
    console.log('Client received a message',event);
  };

  // 关闭Socket....
  socket.close()
}

WebSocket对象的“readyState”属性记录连接过程中的状态值
0     CONNECTING      连接尚未建立
1     OPEN            WebSocket的链接已经建立
2     CLOSING         连接正在关闭
3     CLOSED          连接已经关闭或不可用
```
