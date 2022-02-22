### 安装运行

```
npm i @types/node --save-dev
npm i ts-node --g
npm i typescript --save-dev
tsc --init        //初始化配置ts文件
tsc 文件名        //编译ts文件

控制台运行命令
ts-node 文件名.ts
```

### 基本类型

```
基本类型：boolean、number、string
数组：number[]、Array<元素类型>
      ReadonlyArray<T>:只读数组,把所有可变方法去掉,创建后不能修改

元组 Tuple:[string, number]
  例如：let x: [string, number] = ['hello', 10];

枚举：
  enum Color {Red, Green, Blue}
  let c:Color = Color.Green;

Any:不清楚类型的变量指定一个类型
  let notSure: any = 4;

Void:表示没有任何类型，常用于函数

空值：Null、Undefined
Never：永不存在的值的类型
Object：非原始类型

转换类型：
  1.用<类型>转换
    let someValue: any = "this is a string";
    let strLength: number = (<string>someValue).length;
  2.用 as 转换
    let someValue: any = "this is a string";
    let strLength: number = (someValue as string).length;
```

### 接口

```
定义对象接口
  interface 对象描述{
    label: string;
    color?: string;             //可选属性
    readonly x: number;         //只读属性,赋完值后只能读
    [propName: string]: any;    //有任意数量的属性,只要不是上面定义的属性，那么就无所谓他们的类型是什么

  }
  function 函数: (对象:对象描述) {}

函数根据接口定义的参数类型来接收传参,如果类型不对会报错

let 对象 = { colour: "red", width: 100 };
let mySquare = 函数(对象);
这种方式接收参数可以绕开这些检查,但是不提倡

定义函数接口
  interface 函数描述{
    (参数1: string, 参数2: string): 返回值类型;
  }
  let 函数名: 函数描述 = function(参数1: string, 参数2: string): 返回值类型 {
    let result = src.search(sub);
    return true;
  }

  1.函数的参数会逐个进行检查，要求对应位置上的参数类型是兼容的。
  2.定义函数时可以不指定类型和返回值类型，在函数接口中有定义
  3.若返回值类型与定义时类型不同会报错

可索引的类型
  interface 数组描述{
    [index: number]: string;
  }
  let myArray: 数组描述 = ["Bob", "Fred"];
  console.log(myArray[0]);
  具有一个 索引签名，它描述了对象索引的类型，还有相应的索引返回值类型

定义类接口
  interface 类名 {
    currentTime: Date;
    setTime(d: Date);     //定义的方法
  }
  class 类名 implements 接口类 {
    currentTime: Date;    //定义数据
    setTime(d: Date) {}   //实现方法
  }
  1.与C#或Java里接口的基本作用一样，TypeScript也能够用它来明确的强制一个类去符合某种契约。
  2.可以在接口中描述一个方法，在类里实现它

继承接口
  interface 接口1 {
    color: string;
  }
  interface 接口2 extends 接口1 {
    sideLength: number;
  }

  let square = <Square>{};
  square.color = "blue";
  square.sideLength = 10;

  interface 接口1 extends 接口2, 接口3 {}     //继承多接口

  1.和类一样，接口也可以相互继承
  2.一个接口可以继承多个接口，创建出多个接口的合成接口。

混合类型
  interface Counter {
    (start: number): string;
    interval: number;
    reset(): void;
  }
  1.一个对象可以同时做为函数和对象使用，并带有额外的属性

接口继承类
  1.当接口继承了一个类类型时，它会继承类的成员但不包括其实现
  2.接口同样会继承到类的private和protected成员
  3.一个接口继承了一个拥有私有或受保护的成员的类时，这个接口类型只能被这个类或其子类所实现
```

### 类

```typescript
/**
 * 定义一个类并构造一个实例
 */
class Greeter {
  name: string;
  constructor(name: string) {
    //构造函数
    this.name = message;
  }
  print() {
    //用户的定义方法
    return "Hello, " + this.name;
  }
}
let greeter = new Greeter("world");

/**
 * 0.构造函数 constructor()
 *   使用 new创建类实例的时候被调用
 *
 * 1.使用继承来扩展现有的类
 */
class Animal {
  move(cm: number) {}
}
class Dog extends Animal {
  run(s: number) {}
}
const dog = new Dog();
dog.move(10);
dog.run(2);

/**
 * 2.派生类包含了一个构造函数，它 必须调用 super(),它会执行基类的构造函数
 *   在构造函数里访问 this的属性之前，我们 一定要调用 super()
 *
 * 3.修饰符
 *   public：公有，可以自由的访问程序里定义的成员
 *   private：私有，不能在声明它的类的外部访问
 *   protected：受保护的，与 private修饰符的行为很相似，在派生类中仍然可以访问
 */

class Octopus {
  readonly name: string;
  readonly numberOfLegs: number = 8;
  constructor() {
    //
    this.name = "aa";
  }

  private _fullName: string; //私有变量，通过get set来获取改变值
  get fullName(): string {
    return this._fullName;
  }
  set fullName(newName: string) {
    this._fullName = newName;
  }

  static origin = { x: 0, y: 0 }; //静态属性
}
/**
 * 4.readonly:将属性设置为只读
 *    只读属性必须在声明时或构造函数里被初始化,且不能被赋值
 *
 * 5.存取器 get和 set
 *    只带有 get不带有 set的存取器自动被推断为 readonly
 *    get 获取值，set 设置值
 *
 * 6.静态属性
 *    访问静态属性或方法的时候要在前面加上类名
 *    例如 Octopus.origin
 */

abstract class Animal {
  abstract makeSound(): void; //定义的抽象方法，必须在派生类中实现
  move(): void {
    //平常方法
    console.log("roaming the earch...");
  }
}
/**
 * 7.抽象类
 *   - 抽象类做为其它派生类的基类使用，一般不会直接被实例化
 *   - abstract关键字是用于定义抽象类和在抽象类内部定义抽象方法
 *   - 抽象类中的抽象方法不包含具体实现并且必须在派生类中实现
 *   - 抽象方法必须包含 abstract关键字并且可以包含访问修饰符
 */

class Point {
  x: number;
  y: number;
}
interface Point3d extends Point {
  z: number;
}
let point3d: Point3d = { x: 1, y: 2, z: 3 };
/**
 * 8.把类当做接口使用
 *   - 类定义会创建两个东西：类的实例类型和一个构造函数
 *   - 能够在允许使用接口的地方使用类
 */
```

### 函数

```
函数定义，也可以和JavaScript一样
function 函数名(x: number, y: number): 返回值类型 {
  return x + y;
}

可选参数和默认参数
  1.TypeScript里的每个函数参数都是必须的
  2.编译器检查用户是否为每个参数都传入了值
  3.传递给一个函数的参数个数必须与函数期望的参数个数一致

  function 函数名(参数1: string, 可选参数?: string,默认值 = "Smith") {

  }
    1. ?实现可选参数的功能
    2. 提供一个默认值当用户没有传递这个参数或值为undefined时候的值
    3. 带默认值的参数出现在必须参数前面，用户必须明确的传入 undefined值来获得默认值

剩余参数：arguments
  function buildName(参数1: string, ...剩余参数: string[]) {
    return 参数1 + " " + 剩余参数.join(" ");
  }
    1.剩余参数会被当做个数不限的可选参数。 可以一个都没有，同样也可以有任意个
    2. 编译器创建参数数组，名字是你在省略号（ ...）后面给定的名字
```

### 泛型

```
1.传入值可以是任意类型,返回值也可以是任意类型
  function 函数1(arg: any): any {
      return arg;
  }
2.泛型函数在传入值是什么类型,返回值就是什么类型
  function 函数2<T>(arg: T): T {
      return arg;
  }

使用泛型函数
  1.明确指定 T 是 string 类型，并做为一个参数传给函数
    let output = 函数2<string>("myString");
  2.利用了类型推论 -- 传入的参数自动地帮助我们确定T的类型
    let output = 函数2("myString");

使用泛型变量--定义数组类型的泛型
  function 函数<T>(arg: Array<T>): Array<T> {
    console.log(arg.length);  // Array has a .length, so no more error
    return arg;
  }

泛型类型
  括号调用泛型函数
    let myIdentity: <T>(arg: T) => T = identity;

  定义使用泛型接口
    interface GenericIdentityFn {<T>(arg: T): T;}   //定义接口
    function identity<T>(arg: T): T {return arg;}   //定义函数
    let myIdentity: GenericIdentityFn = identity;   //使用函数

泛型类
  class GenericNumber<T> {
    zeroValue: T;
    add: (x: T, y: T) => T;
  }
    1.泛型类看上去与泛型接口差不多。 泛型类使用（ <>）括起泛型类型，跟在类名后面
    2.定义在类中使用的类型

泛型约束
  interface Lengthwise {
    length: number;
  }
  function loggingIdentity<T extends Lengthwise>(arg: T): T {
    console.log(arg.length);  // Now we know it has a .length property, so no more error
    return arg;
  }
  1.定义一个接口 Lengthwise 来描述约束条件
  2.使用这个接口和extends关键字来实现约束
  3.现在这个泛型函数被定义了约束，因此它不再是适用于任意类型
    loggingIdentity(3);//会报错
  4.我们需要传入符合约束类型的值，必须包含必须的属性
    loggingIdentity({name: 10, value: 3});
```

### 枚举

```
1.使用枚举我们可以定义一些带名字的常量
2.每个枚举成员的值都是不同的
3.通过枚举的属性来访问枚举成员

数字枚举
enum Direction {
  Up = 1,
  Down,
  Left,
  Right
}
Up使用初始化为 1。 其余的成员会从 1开始自动增长。 换句话说， Direction.Up的值为 1， Down为 2， Left为 3， Right为 4。
若不初始化Up的默认值为0,其他的依次类推

字符串枚举
enum Direction {
    Up = "UP",
    Down = "DOWN",
    Left = "LEFT",
    Right = "RIGHT",
}
  1.在一个字符串枚举里，每个成员都必须用字符串字面量
  2.字符串枚举没有自增长的行为

异构枚举
enum BooleanLikeHeterogeneousEnum {
  No = 0,
  Yes = "YES",
}
  1.从技术的角度来说，枚举可以混合字符串和数字成员,但是不建议这样使用

计算的和常量成员
  1.枚举的第一个成员且没有初始化器，这种情况下它被赋予值 0
  2.不带有初始化器且它之前的枚举成员是一个 数字常量，当前枚举成员的值为它上一个枚举成员的值加1
  3.枚举成员使用 常量枚举表达式初始化
    - 数枚举表达式求值后为 NaN或 Infinity，则会在编译阶段报错

联合枚举与枚举成员的类型
1.一种特殊的非计算的常量枚举成员的子集：字面量枚举成员
  字面量枚举成员：不带有初始值的常量枚举成员，或者是值被初始化为：
    - 任何字符串字面量（例如： "foo"， "bar"， "baz"）
    - 任何数字字面量（例如： 1, 100）
    - 应用了一元 -符号的数字字面量（例如： -1, -100）

2.当所有枚举成员都拥有字面量枚举值时，它就带有了一种特殊的语义。
  - 枚举成员成为了类型 某些成员 只能是枚举成员的值（详细看文档）
  - 枚举类型本身变成了每个枚举成员的 联合

运行时的枚举
  1.枚举是在运行时真正存在的对象。

反向映射
  1.数字枚举成员还具有了 反向映射，从枚举值到枚举名
  enum Enum {
    A
  }
  let a = Enum.A;//从枚举值到枚举名
  let nameOfA = Enum[a];

const枚举
   1.为了避免在额外生成的代码上的开销和额外的非直接的对枚举成员的访问，我们可以使用 const枚举
   2. 常量枚举通过在枚举上使用 const修饰符来定义
   3.常量枚举只能使用常量枚举表达式，并且不同于常规的枚举，它们在编译阶段会被删除。
   3.常量枚举成员在使用的地方会被内联进来。 之所以可以这么做是因为，常量枚举不允许包含计算成员。

外部枚举
  1.外部枚举用来描述已经存在的枚举类型的形状。
  2.在正常的枚举里，没有初始化方法的成员被当成常数成员
  3.非常数的外部枚举而言，没有初始化方法时被当做需要经过计算的
```

### 类型推论

```
最佳通用类型
  1.TypeScript里，在有些没有明确指出类型的地方，类型推论会帮助提供类型
  2.当候选类型不能使用的时候我们需要明确的指出类型
  3.没有找到最佳通用类型的话，类型推断的结果为联合数组类型

上下文类型
  1.TypeScript类型推论也可能按照相反的方向进行
  2.上下文归类通常包含函数的参数，赋值表达式的右边，类型断言，对象成员和数组字面量和返回值语句
  3.上下文类型也会做为最佳通用类型的候选类型
```

### 类型兼容性

```
TypeScript里的类型兼容性是基于结构子类型的, 结构类型是一种只使用其成员来描述类型的方式。它正好与名义（nominal）类型形成对比

名义类型的语言：C#、Java

关于可靠性的注意事项
  1.TypeScript的类型系统允许某些在编译阶段无法确认其安全性的操作
  2.TypeScript结构化类型系统的基本规则是，如果x要兼容y，那么y至少具有与x相同的属性。
    interface Named { name: string; }
    let x: Named;
    let y = { name: 'Alice', location: 'Seattle' };
    x = y;
    -- y 有个额外的location属性，但这不会引发错误。 只有目标类型（这里是Named）的成员会被一一检查是否兼容。

比较两个函数
  let x = (a: number) => 0;
  let y = (b: number, s: string) => 0;

  y = x; // OK      只看它们的类型。 这里，x的每个参数在y中都能找到对应的参数，所以允许赋值
  x = y; // Error   y有个必需的第二个参数，但是x并没有，所以不允许赋值

  两个返回值类型不同的函数,类型系统强制源函数的返回值类型必须是目标函数返回值类型的子类型。

函数参数双向协变(详情看文档)
  当比较函数参数类型时，只有当源函数参数能够赋值给目标函数或者反过来时才能赋值成功。 这是不稳定的，因为调用者可能传入了一个具有更精确类型信息的函数，但是调用这个传入的函数的时候却使用了不是那么精确的类型信息。 实际上，这极少会发生错误，并且能够实现很多JavaScript里的常见模式。

可选参数及剩余参数、函数重载、枚举、类、类的私有成员和受保护成员、泛型（详情请看文档）
```

### 高级类型(详细看文档)

```
交叉类型
  1.交叉类型是将多个类型合并为一个类型
  2.这让我们可以把现有的多种类型叠加到一起成为一种类型，它包含了所需的所有类型的特性

联合类型
  function padLeft(value: string, padding: any) {}
  function padLeft(value: string, padding: string | number) {}

  1.联合类型与交叉类型很有关联，但是使用上却完全不同。
  2.一个代码库希望传入 number或 string类型的参数

类型保护与区分类型(详情看文档)

类型别名
  type Name = string; //将string类型赋予Name的别名
  1.类型别名不能出现在声明右侧的任何地方
    type Yikes = Array<Yikes>; // error
  2.类型别名不能被 extends 和 implements
  3.应该尽量去使用接口代替类型别名
  4.如果你无法通过接口来描述一个类型并且需要使用联合类型或元组类型，这时通常会使用类型别名。

字符串字面量类型
  type Easing = "ease-in" | "ease-out" | "ease-in-out";
  1.字符串字面量类型允许你指定字符串必须的固定值
  2.字符串字面量类型可以与联合类型，类型保护和类型别名很好的配合

数字字面量类型
  if (x !== 1 || x !== 2) {}

枚举成员类型
  1.当每个枚举成员都是用字面量初始化的时候枚举成员是具有类型的
  2.在我们谈及“单例类型”的时候，多数是指枚举成员类型和数字/字符串字面量类型，尽管大多数用户会互换使用“单例类型”和“字面量类型”

可辨识联合
  1.合并单例类型，联合类型，类型保护和类型别名来创建一个叫做 可辨识联合(标签联合\代数数据)的高级模式
  2.一些语言会自动地为你辨识联合；而TypeScript则基于已有的JavaScript模式。 它具有3个要素：
    - 具有普通的单例类型属性— 可辨识的特征。
    - 一个类型别名包含了那些类型的联合— 联合。
    - 此属性上的类型保护。
    interface Square {
      kind: "square";
      size: number;
    }
    interface Rectangle {
      kind: "rectangle";
      width: number;
      height: number;
    }
    interface Circle {
      kind: "circle";
      radius: number;
    }
    //声明了将要联合的接口，kind属性称做 可辨识的特征
    //下面是把他们联合在一起
    type Shape = Square | Rectangle | Circle;

    //使用可辨识联合
    function area(s: Shape) {
      switch (s.kind) {
        case "square": return s.size * s.size;
        case "rectangle": return s.height * s.width;
        case "circle": return Math.PI * s.radius ** 2;
      }
    }

完整性检查
  - 给 area 函数指定一个返回类型

多态的 this类型
  1.多态的 this类型表示的是某个包含类或接口的 子类型， 这被称做 F-bounded多态性
  2.它能很容易的表现连贯接口间的继承

索引类型
  1.使用索引类型，编译器就能够检查使用了动态属性名的代码

映射类型(详情见文档)
  1.一个常见的任务是将一个已知的类型每个属性都变为可选的

```

### Symbols

```
1.symbol成为了一种新的原生类型，就像number和string一样
2.symbol类型的值是通过Symbol构造函数创建的
3.Symbols的值是不可改变且唯一的。
  let sym2 = Symbol("key");

  symbols做为对象属性的键
    let sym = Symbol();
    let obj = {[sym]: "value"};
    console.log(obj[sym]); // "value"

  symbols用计算出的属性名声明相结合来声明对象的属性和类成员
    const getClassNameSymbol = Symbol();
    class C {
      [getClassNameSymbol](){
        return "C";
      }
    }
  let c = new C();
  let className = c[getClassNameSymbol](); // "C"

  内置symbols方法
    Symbol.hasInstance
    方法，会被instanceof运算符调用。构造器对象用来识别一个对象是否是其实例。

    Symbol.isConcatSpreadable
    布尔值，表示当在一个对象上调用Array.prototype.concat时，这个对象的数组元素是否可展开。

    Symbol.iterator
    方法，被for-of语句调用。返回对象的默认迭代器。

    Symbol.match
    方法，被String.prototype.match调用。正则表达式用来匹配字符串。

    Symbol.replace
    方法，被String.prototype.replace调用。正则表达式用来替换字符串中匹配的子串。

    Symbol.search
    方法，被String.prototype.search调用。正则表达式返回被匹配部分在字符串中的索引。

    Symbol.species
    函数值，为一个构造函数。用来创建派生对象。

    Symbol.split
    方法，被String.prototype.split调用。正则表达式来用分割字符串。

    Symbol.toPrimitive
    方法，被ToPrimitive抽象操作调用。把对象转换为相应的原始值。

    Symbol.toStringTag
    方法，被内置方法Object.prototype.toString调用。返回创建对象时默认的字符串描述。

    Symbol.unscopables
    对象，它自己拥有的属性会被with作用域排除在外。
```

### 迭代器和生成器

```
for..of 语句
  for..of会遍历可迭代的对象，调用对象上的Symbol.iterator方法。

for..of vs. for..in 语句
  1.for..in迭代的是对象的 键 的列表，而for..of则迭代对象的键对应的值
  2.for..in可以操作任何对象；提供了查看对象属性的方法。 但是 for..of关注于迭代对象的值。
  3.内置对象Map和Set已经实现了Symbol.iterator方法，让我们可以访问它们保存的值
```

### 模块

```
1.“内部模块”现在称做“命名空间”。 “外部模块”现在则简称为“模块”
2.模块有自己的作用域，外部是不可见的，可以用export导出，让外部文件import导入使用
3.模块里不要使用命名空间，命名空间在使用模块时几乎没什么价值

导出：任何声明（比如变量，函数，类，类型别名或接口）都能够通过添加export关键字来导出。
    class 导出类 implements StringValidator {}
    export { 导出类 as 重命名 };

    重新导出：在扩展的模块中，只导出那个模块的部分内容
      export {原导出类名 as 重命名} from "目标文件";

默认导出：个模块只能够有一个default导出
    export default 方法名;
    类和函数声明可以直接被标记为默认导出。 标记为默认导出的类和函数的名字是可以省略的。

导入：模块的导入操作与导出一样简单。 可以使用以下 import形式之一来导入其它模块中的导出内容
    import { 导出名 } from "目标文件";
    import { 导出名 as 重命名} from "目标文件";

    整个模块导入到一个变量
      import * as 重命名 from "目标文件";
      重命名.方法

export = 和 import = require()
    1.export =语法定义一个模块的导出对象。 这里的对象一词指的是类，接口，命名空间，函数或枚举。
        export = 对象;
    2.若使用export =导出一个模块，则必须使用TypeScript的特定语法import module = require("module")来导入此模块。
        import zip = require("目标文件");
```

### 命名空间

```
 1.“内部模块”现在称做“命名空间”。 “外部模块”现在则简称为“模块”
 2.只要命名空间的名字相同在多个文件中，他们还是属于同一个命名空间

 使用命名空间
    //定义
    namespace 名字{
      export class 类名
    }
    //使用
    命名空间名字.类名

3.另一种简化命名空间操作的方法是使用import q = x.y.z给常用的对象起一个短的名字
namespace Shapes {
  export namespace Polygons {
      export class Triangle { }
      export class Square { }
  }
}
import polygons = Shapes.Polygons; //这里是引入方式
let sq = new polygons.Square();

```

### 命名空间和模块

```
内部模块”现在称做“命名空间”。 “外部模块”现在则简称为“模块”
不应该对模块使用命名空间，使用命名空间是为了提供逻辑分组和避免命名冲突

使用命名空间
  1.命名空间是位于全局命名空间下的一个普通的 带有名字 的JavaScript对象
  2.命名空间是帮你组织Web应用不错的方式，你可以把所有依赖都放在HTML页面的 <script>标签里。
  3.但就像其它的全局命名空间污染一样，它很难去识别组件之间的依赖关系，尤其是在大型的应用中

使用模块
  1.模块可以包含代码和声明。 不同的是模块可以 声明它的依赖。
  2.模块会把依赖添加到模块加载器上,可以长久的模块化和可维护性上的便利
  3.更强的封闭性以及更好的使用工具进行优化。
  4.对于Node.js应用来说，模块是默认并推荐的组织代码的方式。
```

### 模块解析

```
1.模块解析是指编译器在查找导入模块内容时所遵循的流程
2.你应该为你自己写的模块使用相对导入，这样能确保它们在运行时的相对位置

  相对 vs. 非相对模块导入
    1.相对导入是以/，./或../开头的
        如: import Entry from "./components/Entry";
            import { DefaultHeaders } from "../constants/http";
            import "/mod";
    2.所有其它形式的导入被当作非相对的
        如: import * as $ from "jQuery";
            import { Component } from "@angular/core";
```

### 声明合并 (详情见文档)

```
“声明合并”是指编译器将针对同一个名字的两个独立声明合并为单一声明。 合并后的声明同时拥有原先两个声明的特性。 任何数量的声明都可被合并；不局限于两个声明。

TypeScript中的声明会创建以下三种实体之一：命名空间，类型和值。
创建命名空间的声明会新建一个命名空间，它包含了用（.）符号来访问时使用的名字



```

| 声明类型   | 命名空间 | 类型 | 值  |
| :--------- | :------- | :--- | :-- |
| Namespace  | X        |      | X   |
| Class      |          | X    | X   |
| Enum       |          | X    | X   |
| Interface  |          | X    | X   |
| Type Alias |          | X    |     |
| Function   |          |      | X   |
| Variable   |          |      | X   |

### 装饰器

```
1.装饰器是一种特殊类型的声明，它能够被附加到类声明，方法， 访问符，属性或参数上
2.装饰器是特殊的闭包，其参数是一个函数，形成一个闭包就是装饰器了。装饰器的返回值也是一个函数对象
3.只要函数声明使用了装饰器，就会自动执行装饰器的内容，只不过没有执行装饰器内部的函数，只有调用被装饰的函数时，才会执行装饰器内部的函数。

使用：1.tsconfig.json里启用experimentalDecorators
     2.命令行：tsc --target ES5 --experimentalDecorators
     1. 以@ + 函数名 方式组成装饰器

装饰器工厂：1.装饰器工厂就是一个简单的函数，它返回一个表达式，以供装饰器在运行时调用。
           2.装饰器工厂就是有参数的装饰器
           function color(value: string) { // 这是一个装饰器工厂 调用：@color
                return function (target) { //  这是装饰器
                // do something with "target" and "value"...
              }
           }

装饰器组合：多个装饰器可以同时应用到一个声明上
    例如：@f @g x

    - 当多个装饰器应用在一个声明上时会进行如下步骤的操作：
      1.由上至下依次对装饰器表达式求值。
      2.求值的结果会被当作函数，由下至上依次调用。

装饰器求值：
  类中不同声明上的装饰器将按以下规定的顺序应用：
    1.参数装饰器，然后依次是方法装饰器，访问符装饰器，或属性装饰器应用到每个实例成员。
    2.参数装饰器，然后依次是方法装饰器，访问符装饰器，或属性装饰器应用到每个静态成员。
    3.参数装饰器应用到构造函数。
    4.类装饰器应用到类。

类装饰器
  1.类装饰器在类声明之前被声明（紧靠着类声明）
  2.类装饰器应用于类构造函数，可以用来监视，修改或替换类定义
  3.类装饰器不能用在声明文件中( .d.ts)，也不能用在任何外部上下文中
    //使用装饰器
    @sealed
    class Greeter {
      constructor(message: string) {}
    }

    //定义装饰器
    function sealed(constructor: Function) {}

方法装饰器
    1.方法装饰器声明在一个方法的声明之前（紧靠着方法声明）
    2.它会被应用到方法的 属性描述符上，可以用来监视，修改或者替换方法定义
    3.方法装饰器表达式会在运行时当作函数被调用，传入下列3个参数
      - 对于静态成员来说是类的构造函数，对于实例成员是类的原型对象。
      - 成员的名字。
      - 成员的属性描述符。
      @gg(false)
      greet() {}

      //装饰器工厂--会修改属性描述符的enumerable属性
      gg(value: boolean){
        return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
            descriptor.enumerable = value;
        };
      }

访问器装饰器
  访问器装饰器表达式会在运行时当作函数被调用，传入下列3个参数：
    - 对于静态成员来说是类的构造函数，对于实例成员是类的原型对象。
    - 成员的名字。
    - 成员的属性描述符。
    class Point {
      private _x: number;
      constructor(x: number) {
          this._x = x;
        }
        //访问器装饰器
        @configurable(false)
        get x() { return this._x; }
      }

      //定义configurable装饰器
      function configurable(value: boolean) {
        return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
          descriptor.configurable = value;
        };
      }

属性装饰器
    1.属性装饰器声明在一个属性声明之前（紧靠着属性声明）
    2.属性描述符不会做为参数传入属性装饰器，这与TypeScript是如何初始化属性装饰器的有关
    3.属性描述符只能用来监视类中是否声明了某个名字的属性
    4.传入下列2个参数
      - 对于静态成员来说是类的构造函数，对于实例成员是类的原型对象。
      - 成员的名字。
      class Greeter {
        @format("Hello, %s")
        greeting: string;
      }

参数装饰器
  1.参数装饰器声明在一个参数声明之前（紧靠着参数声明）
  2.参数装饰器只能用来监视一个方法的参数是否被传入
  3.传入下列3个参数：
    - 对于静态成员来说是类的构造函数，对于实例成员是类的原型对象。
    - 成员的名字。
    - 参数在函数参数列表中的索引
      greet(@required name: string) {
        return "Hello " + name + ", " + this.greeting;
      }
```

### 三斜线指令（详情见文档）
 + 三斜线指令仅可放在包含它的文件的最顶端
 + 一个三斜线指令的前面只能出现单行或多行注释，这包括其它的三斜线指令
 + 引用不存在的文件会报错。 一个文件用三斜线指令引用自己会报错。
 + 指定了--noResolve编译选项，三斜线引用会被忽略
```
/// <reference path="..." />
这个指令是用来声明 依赖的； 

/// <reference types="..." />
这个指令则声明了对某个包的依赖。
/// <reference types="node" /> 引入到声明文件，
表明这个文件使用了 @types/node/index.d.ts里面声明的名字； 
并且，这个包需要在编译阶段与声明文件一起被包含进来。

/// <reference no-default-lib="true"/>
这个指令把一个文件标记成默认库。 
你会在 lib.d.ts文件和它不同的变体的顶端看到这个注释。

/// <amd-module />
默认情况下生成的AMD模块都是匿名的。
但是，当一些工具需要处理生成的模块时会产生问题，比如 r.js。
amd-module指令允许给编译器传入一个可选的模块名

/// <amd-dependency />
这个指令被废弃了。使用import "moduleName";语句代替
```
### 声明文件
 + 结构
   + 全局库：全局库是指能在全局命名空间下访问的
     + 会看到
       + 顶级的var语句或function声明
       + 一个或多个赋值语句到window.someName
       + 假设DOM原始值像document或window是存在的
     + 不会看到
       + 检查是否使用或如何使用模块加载器，比如require或define
       + CommonJS/Node.js风格的导入如var fs = require("fs");
       + define(...)调用
       + 文档里说明了如何去require或导入这个库
   + 模块化库
     + 无条件的调用require或define
     + 像import * as a from 'b'; or export c;这样的声明
     + 赋值给exports或module.exports
     + 它们极少包含 对window或global的赋值
   + UMD模块
     + 既可以作为模块使用（通过导入）又可以作为全局（在没有模块加载器的环境里）使用的模块
     + 比如：Moment.js
       + import moment = require("moment");//引入使用
       + console.log(moment.format());//浏览器中使用
     + 判断UMD库
       + 如果你在库的源码里看到了typeof define，typeof window，
       + 或typeof module这样的测试，尤其是在文件的顶端，那么它几乎就是一个UMD库。
     + 大多数流行的库现在都能够被当成UMD包。 比如 jQuery,Moment.js,lodash和许多其它的。
   + 模版
     + module-function.d.ts
       + 如果模块能够作为函数调用
       + var x = require("foo");
       + var y = x(42);
     + module-class.d.ts
       + 如果模块能够使用new来构造
       + var x = require("bar");
       + var y = new x("hello");
     + module.d.ts
       + 如果模块不能被调用或构造
   + 模块插件
     + 一个模块插件可以改变一个模块的结构（UMD或模块）
     + 对于声明文件的目标，我们会写相同的代码不论被改变的模块是一个纯粹的模块还是UMD模块
     + 使用module-plugin.d.ts模版
   + 全局插件
     + 一个全局插件是全局代码，它们会改变全局对象的结构
     + 全局修改的模块，在运行时存在冲突的可能
     + 一些库往Array.prototype或String.prototype里添加新的方法
     + 使用global-plugin.d.ts模版。
   + 全局修改的模块
     + 当一个全局修改的模块被导入的时候，它们会改变全局作用域里的值
     + 全局修改的模块通常可以很容易地从它们的文档识别出来。 
     + 通常来讲，它们与全局插件相似，但是需要 require调用来激活它们的效果。
     + 使用global-modifying-module.d.ts模版。
   + 使用依赖
     + 依赖全局库
       + 如果你的库依赖于某个全局库，使用 /// < reference types="..." />指令
       + /// < reference types="someLib" />
     + 依赖模块
       + 如果你的库依赖于模块，使用import语句：
       + import * as moment from "moment";
     + 依赖UMD库
       + 从全局库
         + 如果你的全局库依赖于某个UMD模块，使用/// < reference types />指令
         + /// < reference types="moment" />
       + 从一个模块或UMD库
         + 如果你的模块或UMD库依赖于一个UMD库，使用import语句
         + import * as someLib from 'someLib';
         + 不要使用/// < reference指令去声明UMD库的依赖！
   + 防止命名冲突
     + 在书写全局声明文件时，允许在全局作用域里定义很多类型
     + 十分不建义这样做，当一个工程里有许多声明文件时，它会导致无法处理的命名冲突
     + 使用库定义的全局变量名来声明命名空间类型
   + ES6模块插件的影响
     + 一些插件添加或修改已存在的顶层模块的导出部分
     + 当然这在CommonJS和其它加载器里是允许的，ES模块被当作是不可改变的因此这种模式就不可行了
     + 因为TypeScript是能不预知加载器类型的，所以没在编译时保证，但是开发者如果要转到ES6模块加载器上应该注意这一点。
   + ES6模块调用签名的影响
     + 很多流行库，比如Express，暴露出自己作为可以调用的函数,如下：
       + import exp = require("express");
       + var app = exp();
     + 在ES6模块加载器里，顶层的对象（这里以exp导入）只能具有属性；
     + 顶层的模块对象 永远不能被调用
     + 十分常见的解决方法是定义一个 default导出到一个可调用的/可构造的对象
     + 一会模块加载器助手工具能够自己探测到这种情况并且使用 default导出来替换顶层对象。
 + 举例
   + declare (正式声明宣告)
     + 在声明的变量 函数 类 前添加declare,可以在引用后有全局提示
 + 规范
   + 普通类型
     + 不要使用如下类型Number，String，Boolean或Object
     + 这些类型指的是非原始的装盒对象，它们几乎没在JavaScript代码里正确地使用过
     + 应该使用类型number，string，Object，boolean
   + 泛型
     + 不要定义一个从来没使用过其类型参数的泛型类型
   + 回调函数返回值类型
     + 不要为返回值被忽略的回调函数设置一个any类型的返回值类型(应为：void)
   + 回调函数里的可选参数
     + 不要在回调函数里使用可选参数除非你真的要这么做
   + 重载与回调函数
     + 不要因为回调函数参数个数不同而写不同的重载，应该只使用最大参数个数写一个重载
   + 函数重载
     + 不要把一般的重载放在精确的重载前面，应该排序重载令精确的排在一般的之前
   + 使用可选参数
     + 不要为仅在末尾参数不同时写不同的重载，应该尽可能使用可选参数
   + 使用联合类型
     + 不要为仅在某个位置上的参数类型不同的情况下定义重载
     + 应该尽可能地使用联合类型
 + 深入(详情见文档)
   + 类型：类型通过以下方式引入
     + 类型别名声明（type sn = number | string;）
     + 接口声明（interface I { x: number[]; }）
     + 类声明（class C { }）
     + 枚举声明（enum E { A, B, C }）
     + 指向某个类型的import声明
   + 值：创建值
     + let，const，和var声明
     + 包含值的namespace或module声明
     + enum声明
     + class声明
     + 指向值的import声明
     + function声明
 + 模板(详情见文档)
 + 发布(详情见文档)
 + 使用(详情见文档)

### tsconfig.json(详情见文档)

```
如果一个目录下存在一个tsconfig.json文件
```
