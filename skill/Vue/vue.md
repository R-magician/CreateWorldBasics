### Vue 开始

```javascript
vue -v      //查询版本
cnpm install -g @vue/cli        //安装脚手架
cnpm i -g @vue/cli //更新脚手架为最新版本
```

### cnpm 和 npm 的区别

```
npm下载的服务器在国外，阿里巴巴把国外的插件同步到了中国的服务器。因此使用cnpm就要先安装
npm install cnpm -g --registry=https://registry.npm.taobao.org
```

### vue create 项目名称 //创建项目

```
第一个是手动安装
第二个是默认安装Vue2项目
第三个是默认安装Vue3项目

选择3.x（Preview）
选择使用的路由模式（Y：历史/N：哈希（路由有#））
```

### 启动项目

```
cd 项目名
npm run serve
Ctrl + C                停止运行
```

### 项目别人搭建好，我们自己下载下来的

```
down下来的项目是没有node_modules文件，存项目中的依赖文件，这个文件不会被提交
拿到项目以后更新项目的依赖文件（下依赖）
cnpm install
或者 yarn install
```

### 解决未使用变量而导致的报错

```
在package.json里找到eslintConfig->rules添加配置
"no-unused-vars":"off"
```

### 引入插件

```
vue-router: npm instal vue-router --save //路由管理器
vuex: npm i vuex --save //状态管理器
echarts: npm install echarts --save //表格插件
Element: npm install element-plus --save //UI插件
Ant: npm install ant-design-vue --save //UI插件
axios: npm i axios --save  //请求
pubsub-js: npm i pubsub-js //消息订阅与发布插件,在任何框架里面都能用
Animate: npn install animate.css --save //CSS动画库

moment.js
```

main.js //引入全局的插件可以放到这里面

```
render:用来解析js中引入的组件,通过createElement函数去指定具体的内容
原因是开发的时候引入的是运行版Vue(vue.runtime.xxx.js)里面没有核心功
能模板解析器,这样可以给项目打包时省点空间
```

App.vue 文件是所有组件的父组件

```
在main.js中引入样式文件用import
在App.vue中引入样式文件用@import

./同级    ../上一级      @/根目录
```

### 配置文件

```
vue inspect > output.js     //在控制台输入语句可以查看项目配置

修改项目配置
新建vue.config.js文件,通过官网API修改项目配置
```

# vue3.0

### 与 Vue2 相比较

1.性能的提升

- 打包大小减少 41%
- 初次渲染快 55%, 更新渲染快 133%
- 内存减少 54%

2.源码的升级

- 使用 Proxy 代替 defineProperty 实现响应式(对象、数组类型的响应式数据得到了优化)
- 重写虚拟 DOM 的实现和 Tree-Shaking

3.拥抱 TypeScript

- Vue3 可以更好的支持 TypeScript

4.新的特性

- Composition API（组合 API）

### setup 配置

- ref 与 reactive(数据声明的类型)
- watch 与 watchEffect(里面用到什么变量,当这个变量发生变化的时候,就会调用这个函数)
- provide 与 inject(祖孙组件之间的传递数据)

### 新的内置组件

- Fragment(虚拟标签 vue 自动生成--模板中可以的跟标签下可以包含多个标签)
- Teleport(在页面上指定标签选择器，把组件传送到该选择器下面)
- Suspense(异步组件--组件数据加载完和加载中是两个样式)

### 其他改变

- 新的生命周期钩子
- data 选项应始终被声明为一个函数
- 移除 keyCode 支持作为 v-on 的修饰符

### 1.使用 vue-cli 创建

官方文档：https://cli.vuejs.org/zh/guide/creating-a-project.html#vue-create

```
## 查看@vue/cli版本，确保@vue/cli版本在4.5.0以上
vue --version
## 安装或者升级你的@vue/cli
npm install -g @vue/cli
## 创建
vue create vue_test
## 启动
cd vue_test
npm run serve
```

### 2.使用 vite 创建

官方文档：https://v3.cn.vuejs.org/guide/installation.html#vite

vite 官网：https://vitejs.cn

- 什么是 vite？—— 新一代前端构建工具。
- 优势如下：
  - 开发环境中，无需打包操作，可快速的冷启动。
  - 轻量快速的热重载（HMR）。
  - 真正的按需编译，不再等待整个应用编译完成。

```
## 创建工程
# npm 6.x
$ npm init vite@latest <project-name> --template vue

# npm 7+，需要加上额外的双短横线
$ npm init vite@latest <project-name> -- --template vue

$ cd <project-name>
$ npm install
$ npm run dev
```

### Vue3--main.js

```javascript
//引入的不再是Vue构造函数,引入的是一个名为createApp的工厂函数
import { createApp } from "vue";
import App from "./App.vue";

//创建应用实例对象app(类似于Vue2中的Vm,单app更‘轻’)
//mount:挂载---unmount:卸载
createApp(App).mount("#app");
```

### 常用的 Composition API

setup(props,context)函数--Vue3 中新的配置项--值为一个函数

```javascript
1、setup函数是处于 围绕 beforeCreate 和 created 生命周期钩子运行  也就说在 setup函数中是无法 使用 data 和 methods 中的数据和方法的
2、setup函数是 Composition API（组合API）的入口
3、在setup函数中定义的变量和方法最后都是需要 return 出去的 不然无法再模板中使用
4.组件外部若没有用Suspense异步组件包裹,setup函数只能是同步的不能是异步的(不能是一个async函数--返回值不是return的对象,而是promise)
5.vue3.0中的set里面可以放vue2.0里面分离代码的部分，也可以像vue2.0那样分离代码块(不提倡)
6.组件中所用到的数据、方法均要配置在setup中。
7.setup()函数中的this是无效的(undifined)
8.setup(props,context)--props父组件传过来的变量--context一个对象
{
    name:'Demo',
    props:['变量1','变量1'],
    emits:['自定义事件名'],//不加不会报错，但是会出现警告
    setup(props,context){
        console.log(props)//会打印出父组件传递过来的值(props接收的值)
        //context.attrs----组件上存在的属性(props接收过的变量不会显示)--相当于Vue2中的$attrs
        //context.emit-----组件上自定义事件--context.emit("自定义事件名",参数)--Vue2中的$slots
        //context.slots----收到的插槽内容,相当于Vue2中的$slots--模板中最好用(v-sloat)
    },
}

import {ref, reactive,toRefs,computed,watch,watchEffect,provide,inject,onMounted,onUpdated,onUnmounted} from 'vue'
ref 模块是用来声明简单数据类型的，例如,string , number ,boolean 等（转为响应式数据）--引用实现的对象
reactive 模块是用来声明复杂数据类型的，例如，数组，对象等（转为响应式数据）
toRef 把不是响应式数据的变成响应式数据--toRef(对象名,'对应属性')--转换对象里面的某个属性
toRefs 把不是响应式数据的变成响应式数据用于...toRefs(对象名)--转换一个对象
provide 给自己的后代组件传数据(祖-子-孙-后代)--都可以传--子组件传参最好用props
inject 获取祖先组件传下来的数据
computed 计算属性
watch 变量监听
watchEffect 变量批量监听
onMounted 挂载
onUpdated 更新
onUnmounted 销毁
这里把methods给取消了，但是实际上可以把方法写成对象，最后返回出去就行
这个里面没有this
这些生命周期函数按需加载

provide()和inject()
这两函数是在组件的嵌套中使用的，他们只能在setup()中使用
父组件使用provide()向下传递数据，子组件使用inject()向上层获取数据，
setup() {//在这里面声明变量和方法在模板中可以调用,在Vue3.0中可以在setup()执行所有Vue2.0分块代码
    provide('globalColor','red')//向下级组件传递数据--provide('变量名',变量值)
    const color = inject('globalColor')//获取上级组件传递的数据--inject('变量名')
    const name =ref('小四')
    const age=ref(18)//初始化
    age.value=19//赋值--使用ref声明的数据要用.value的方式赋值
    const obj = reactive({//reactive声明的对象数据--可以直接赋值
        name:'abc',
        age:'1'
        n:computed(()=>obj.age++)//简写计算属性--只有读
    })
    //计算属性完整写法
    obj.n = computed({
        get(){//读取调用
            return 值;
        },
        set(val){//修改调用
            //执行代码
        }
    })

	//监视ref定义的响应式数据，可以写多个watch，只要把监视变量换了就行
	//如果监视的数据是reactive定义的(非对象)：
	//			1.此处无法正确的获取oldValue(会和newValue的值一样)
	//			2.强制开启了深度监视(deep配置无效)--直接监视的reactive定义数据
    watch(监视变量,(newValue,oldValue)=>{//变量监听
        console.log('值改变了',newValue,oldValue)
    },{//监视的配置
        immediate:true,//初始化的时候就调用
        deep:true,//开启深度监视
    }),
	//多个响应数据一起监视
	watch([监视变量1,监视变量2],(newValue,oldValue)=>{//变量监听
        console.log('值改变了打印的是数组',newValue,oldValue)
    }),
    //监视reactive定义对象中的某个值
    watch(()=>监视变量1.属性名,(newValue,oldValue)=>{//变量监听
        console.log('监视变量1的属性值改变了',newValue)
    }),
    //监视reactive定义对象中的某些值
    //如果监视变量属性下的值依然是一个对象，就要开启--deep配置(否则监视无效)
    watch([()=>监视变量1.属性名,()=>监视变量2.属性名],(newValue,oldValue)=>{//变量监听
        console.log('监视变量1的属性值改变了',newValue)
    }),
    //监视全部的变量--这个里面用到什么变量,当变量发生变化时--就会调用这个函数
    //watchEffect与computed相比：
    //		1.computed注重计算出来的值(回调函数的返回值),所以必须要写返回值
    //		2.watchEffect更注重的是过程(回调函数的函数体),所以不用写返回值
    watchEffect(()=>{
      	  //里面用的什么变量，都会执行这个函数
          const x =  ref变量.value;
    }),

	//onBeforeMount--挂载之前执行
    onMounted(()=>{
        console.log('挂载执行')
    })

	//onBeforeUpdate--更新之前执行
    onUpdated(()=>{
        console.log('更新执行')
    })

	//onBeforeUnmount--销毁之前执行
    onUnmounted(()=>{
        console.log('销毁执行')
    })

    //若返回一个对象,则对象中的属性、方法在模板中均可以直接使用(常用)
    //若返回一个函数,则可以自定义渲染内容(了解)
    return { //必须返回 模板中才能使用 , 必须使用return
        ...obj,name,age//如果添加了...就不是响应式数据了要toRefs
    }
}
```

### ref 和 reactive 的区别

```
数据角度
	ref:基本数据类型
	reactive:对象、数组类型
	备注：ref也可以定义 对象或数组 类型,它内部会自动reactive转为代理对象
原理角度
	ref:通过Object.defineProperty()的 get 与 set 来实现响应式 (数据劫持)
	reactive:通过使用Proxy来实现响应式 (数据劫持) ,并通过Reflect操作源对象内部的数据
从使用角度
	ref:操作数据需要 .value ,读取数据时模板中直接读取不需要 .value
	reactive:操作数据 与 读取数据均不需要 .value
```

### ref、ref() 和 $refs() 的区别

```
ref() 用来声明简单数据类型的，例如,string , number ,boolean（Vue3的setup函数中使用--转为响应式数据）

ref 被用来给元素或子组件注册引用信息。引用信息将会注册在父组件的 $refs 对象上。如果在普通的 DOM 元素上使用，引用指向的就是 DOM 元素；如果用在子组件上，引用就指向组件实例

$refs() 可以用来调用父组件中的方法

它还可以用在组件上,可以获得组件的实例对象

<input type='text' ref='标记名'>
console.log(this.$refs.标记名 ) => 打印结果(<input type='text' ref='input1'>)
```

### Vue3 中的实现数据响应 ----- reactive 实现响应式的原理

```javascript
window.Proxy---window身上自带的构造函数(代理对象);拦截对象中任意属性的变化--属性的增删改查
window.Reflect---反射对象;对源对象的属性进行操作

let person = {
	name:'张三',
	age:'18',
}
const p = new Proxy(person,{//实现响应数据的简易雏形
    //获取值调用
    get(原数据-person,对象身上的对应属性){
        //return 原数据[对象身上的对应属性];
        return Reflect.get(原数据-person,对象身上的对应属性)
    },
    //设置值调用--新增时也调用
    set(原数据-person,对象身上的对应属性,修改属性的值){
        //原数据[对象身上的对应属性] = 修改属性的值;
        Reflect.set(原数据-person,对象身上的对应属性,修改属性的值)
    },
    //删除值调用--要有返回值
    deleteProperty(原数据-person,对象身上的对应属性){
    	//return delete 原数据-person[对象身上的对应属性]
        return Reflect.deleteProperty(原数据-person,对象身上的对应属性)
	}
})
```

### 自定义 hook 函数

```
本质是一个函数，把setup函数中使用的Composition API 进行了封装
类似于Vue2中的mixin
能复用代码,让setup中的逻辑更清楚易懂
本质就是把setup中可能要复用的代码复制粘贴到另外一个文件,到时候直接import引入就可以了
```

### 不常用的--其他 Composition API

```javascript
shallowReactive 与 shallowRef---定义数据(对应 reactive与ref )--使用前要引用
shallowReactive：只处理对象第一层属性的响应式
shallowRef：只处理基本数据类型的响应式,不进行对象的响应式处理。
使用场景：
	1.如果有个对象数据,结构比较深,但变化时只是外层属性变化---->使用shallowReactive
	2.如果有一个对象属性,后续功能不会修改该对象中的属性,而是生新的对象来替换---->使用shallowRef

readonly 与 shallowReadonly
readonly：让一个响应式数据变为只读(深只读)
shallowReadonly：让一个响应式数据变为只读(浅只读--对象第一层不能修改，后几层就可以修改了)
使用场景：不希望数据被修改时

toRaw 与 markRaw
toRaw：将一个reactive生成的响应式对象转为普通对象
使用场景：更新对象而不引起页面更新的时候
markRaw：标记一个对象，使其永远不会成为响应式对象
使用场景：
	1.有些值不应该设置为响应式，例如复杂的第三方库
	2.渲染不可变数据源的大列表，跳过响应式可以提高性能

customRef
作用：创建一个自定义的ref,并对其依赖项跟踪和更新触发进行显式控制
setup(){
	//自定义一个ref---名为myRef
	function myRef(val){
		return customRef((track,trigger)=>{
			return {
				get(){//获取数据时执行
					track();//通知Vue追踪val的变化
					return val;
				},
				set(newVal){//修改数据时执行
					val = newVal;
					trigger();//通知Vue重新解析模板
				}
			}
		})
	}
	let keyWord = myRef("hello")//使用程序员自定义ref
}
```

### 响应式数据判断

```
isRef：检查一个值是否为ref对象
isReactive：检查一个对象是否是由reactive创建的响应式代理
isReadonly：检查一个对象是否由readonly创建的只读代理
isProxy：检查一个对象是否由reactive或者readonly方法创建的代理
```

### Composition(组合式) API 的优势

```
OptionsAPI---Vue2.0
每当新增或者修改一个需求,就需要分别在data,methods,computed里面修改

CompositionAPI---Vue3.0
我们可以更加优雅的组织我们的代码、函数。让相关功能的代码更加有序的组织在一起
```

### 新的组件

```javascript
Fragment-->片段
在Vue2中组件必须有一个根标签
在Vue3中组件可以没有根标签,内部会将多个标签包含在一个Fragment虚拟元素中,不参与渲染
好处：减少标签层级,减少内存占用


Teleport-->传送
它能够将我们的组件html结构移动到指定位置
<teleport to='传送到的html元素下(可用标签选择器)'>
	//传送的html内容
</teleport>


Suspense-->悬念
等待异步组件时渲染一些额外内容,让应用有更好的用户体验
import 组件名 from '路径'//静态引入组件
import {defineAsyncComponent} from 'vue'
const Child = defineAsyncComponent(()=>import('组件路径'))//动态引入组件--异步引入
使用：
<Suspense>
	<template v-slot:default>	//本应该渲染的组件
		<使用的组件/>
	</template>
	<template v-slot:fallback>	//上面组件出问题时、加载中的应急渲染---fallback:撤回
		//加载中执行的渲染方案
	</template>
</Suspense>
若使用Suspense组件,则包含的组件内的 setup 函数可以 return 一个 Promise 异步函数--->async
若没有使用Suspense组件,setup函数返回了一个Promise，则组件无效
//异步使用
async setup(){
    let sum = ref(0);
    let p = new Promise((resolve,reject)=>{
    	setTimeout(()=>{
            resolve({sum})
        })
    })
    return await p;
}
```

### Vue3 其他的变化

- 全局 API 的转移
- app.config.xxx
- app.component
- app.directive
- app.mixin
- app.use
- app.config.globalPropertiess
- 其他改变

  - data 选项应始终声明为一个函数
  - 过渡动画类名的更改
    .v-enter-from,
    .v-leave-to{//来时的样式

    }
    .v-leave-from,
    .v-enter-to{//离开时的样式

    }

  - 移除 keyCode 作为 v-on 的修饰符,同时也不再支持 config.keyCodes
  - 移除 v-on.native 修饰符---通知组件实现原生点击事件的修饰符
  - 移除过滤器

# vue2.0

### MVVM 模型

```
M:模型（Model）:data中的数据
V:视图（View）：模块代码
VM：视图模型（ViewModel）：Vue实例

data中所有属性最后都出现在了vm实例上
vm实例上的所有属性 及 Vue原型上所有属性，在Vue模板中都可以直接使用
```

### Vue2 数据代理

```javascript
数据代理：通过一个对象代理对另一个对象中属性的操作（读/写）

let number = 18
let person = {
    name:'aa',
    sex:'男'
}
//给对象添加属性(可以实现数据的双向绑定)
Object.defineProperty(添加属性的对象,添加的属性名,{
    配置项(如下配置)
    value:18,
    enumerable:true      //控制属性是否可被枚举(遍历),默认为false
    writable:true       //控制属性是否可被修改,默认为false
    configurable:true       //控制属性是否可被删除,默认为false

    //当有人读取对象添加的这个属性时,get函数就会调用,返回值就是添加属性的值
    get(){
        return number;
    }
    //当有人修改对象添加的这个属性时,set函数就会调用,会收到修改的具体值
    set(value){
        number = value
    }
})

Vue中的数据代理：
    通过vm实例对象来代理data对象中属性的操作（读/写）
Vue中的数据代理的好处
    更加方便的操作data中的数据（不代理：{{_data.name}},通过代理：{{name}}）
基本原理
    通过Object.defineProperty()把data对象中所有属性添加到vm上。
    为每一个添加到vm上的属性，都指定一个getter/setter。
    在getter/setter内部去操作（读/写）data中对应的属性
```

### Vue 检测数据改变的原理

```
1.vue会监视data中所有层次的数据。

2.如何监测对象中的数据？
    通过setter实现监视，且在new Vue时就传入要检测的数据
        （1）对象中 后追加的属性（在页面运行时向data中添加的变量），Vue默认不做响应式处理
        （2）如需给后添加的变量属性做响应式（不能直接在vue实例或data节点下添加变量），请使用如下API：
            Vue.set(添加变量的父节点[不能用vm/vm.data],添加的变量名/数组index，添加的变量值)
            vue实例.$set(添加变量的父节点[不能用vm/vm.data],添加的变量名/数组index，添加的变量值)

3.如何检测数组中的数据
    通过包裹数组更新元素的方法实现，本质就是做了两件事：
        （1）调用原生对应的方法对数组进行更新
        （2）重新解析模板，进而更新页面。

4.在Vue修改数组中的某个元素一定要使用如下方法：
    1.使用这些API(这些API都被vue重新写过，它和原生的数组方法不一样)：
        push()、pop()、shift()、unshift()、splice()、sort()、reverse()
    2.Vue.set()或vm.$set()

特别注意：Vue.set() 和 vm.$set() 不能给vm 或者 vm的根数据对象(data)添加属性变量
```

### 事件处理--修饰符

```
@click          //点击事件
@scroll         //页面滚动条事件
@whell          //鼠标滚轮滚动事件
@blur           //失去焦点事件
@keydown        //按下键盘事件
@keyup          //键盘按键弹起事件

$event：事件对象
@click = "demo" 和 @click = "demo($event)"效果是一样的，后者可以传参

事件修饰符-->@click.prevent.self="demo"
prevent         //阻止默认事件
stop            //阻止事件冒泡（<div @click='demo'><a @click.stop='demo'></a></div>;点击a标签,事件demo只会执行一次）
once            //一次刷新好的页面，事件只触发一次
capture         //使用事件的捕获模式（<div @click.capture='demo1'><a @click='demo2'></a></div>;点击a标签,会先执行demo1在执行demo2；一般先执行demo2在执行demo1）
self            //只有event.target是当前操作元素时才触发事件
passive         //事件的默认行为立即执行，无需等待事件回调执行完毕

1.使用修饰符时，顺序很重要；相应的代码会以同样的顺序产生
2.修饰符可以连续使用
3.不要把 .passive 和 .prevent 一起使用，因为 .prevent 将会被忽略，同时浏览器可能会向你展示一个警告。请记住，.passive 会告诉浏览器你不想阻止事件的默认行为。

键盘修饰符-->@keydown.enter  / @keydown.65（按键key值,不推荐-->@keydown.a代替）
enter           //回车键
tab             //Tab键-->比较特殊配合keydown使用才会触发
delete          //删除/退格
esc             //Esc
space           //空格
up              //上
down            //下
left            //左
right           //右

系统修饰健--> @keydown.alt.67（Alt + A） / @click.ctrl（Ctrl + 点击）
ctrl            //Ctrl --> 最好配合keydown使用
alt             //Alt --> 最好配合keydown使用
shift           //Shift --> 最好配合keydown使用
meta            //系统键 --> 最好配合keydown使用

1.有一些按键 (.esc 以及所有的方向键) 在 IE9 中有不同的 key 值, 如果你想支持 IE9，这些内置的别名应该是首选。
2.可以使用编码去指定具体的按键（不推荐，Vue3中已删除，最好用键名(key)去指定）
3.Vue.config.keyCodes.自定义键名 = 键码；定制按键别名（不推荐--Vue3中已删除）

输入修饰符-->v-model.lazy
lazy：当输入框失去焦点在收集数据
number：输入字符串转换为有效数字
trim：过滤输入字符串首尾的空格
```

### 计算属性

```javascript
get有什么作用？当有人读取计算属性时，get就会被调用，且返回值就作为计算属性的值
get什么时候被调用？1.初次读取fullName时  2.所依赖的数据发生变化时。

set什么时候调用？当计算属性被修改时
如果计算属性要被修改，那必须写set函数去响应修改。set中要计算依赖的数据

计算属性与methods实现相比，内部有缓存机制（复用，效率更高，调试方便）
computed:{
    //简写--这个就只对应get(只考虑读取不考虑修改)
    计算属性1(){
        return '';
    }
    //完整写法
    计算属性2:{
        get(){
            return '';
        }
        set(value){

        }
    }
}
```

### 监视属性

```javascript
当监视属性发生变化时，回调函数自动调用
Vue中的watch默认不检测对象内部指定的改变,配置deep:true可以检测对象内部值的改变
Vue自身可以检测对象内部值的改变（多层级）

两种写法
    watch:{
        '属性1':{
            immediate:true,//初始化的时候就调用
            deep:true,//开启深度检测（检测对象，对象中的某个值发生变化也会触发）
            handler(new,old){

            }
        }
        //简写,只用到了haddler的时候使用
        属性2(val, old) {
            this.page.pageIndex = 1;
            this.getData()
        }
    }

    //下面这种也可以用简写
    vm.$watch("属性",{
        {
            immediate:true,//初始化的时候就调用
            handler(new,old){

            }
        }
    })
```

### 过滤器-->filters--( Vue3 中被移除 ）

对要显示的数据进行特定格式化处理后显示（适用于一些简单逻辑处理）

```
//实例中的局部过滤器
filters:{
    函数名(参数1,参数2){
        return 返回值;
    }
}

//全局过滤器
Vue.filter('函数名',function(val){
    return 返回值;
})

页面调用-->过滤器可以传多个参数，他们也可以链式调用
<h3>{{参数1 | 过滤器(参数2) | 过滤器3}}</h3>
```

### 内置指令

```
v-bind      :单向绑定解析表达式,可以简写为:name='变量'
v-model     :双向数据绑定
v-for       :遍历数组/对象/字符串
v-if        :条件渲染(真就加载出来,假就不加载出来[不会加载DOM节点])
v-else      :条件渲染,搭配有时候v-if使用
v-show      :条件渲染(真就显示,假就不显示[DOM节点还存在])
v-text      :向其所在节点插入文字
v-html      :会支持html结构的解析,v-html有严重的安全性问题，在网站上动态渲染任意的html是非常危险的，容易导致XSS攻击(冒充用户)
v-cloak     :没有值,本质是一个特殊属性，在Vue实例创建并接管容器后，会自动删掉v-cloak属性,要配合css使用,解决因网络慢页面展示{{name}}的问题
v-once      :没有值,v-once所在节点初次动态渲染后，就视为静态内容了，以后数据改变就不会引起v-once所在结构的更新，可以优化性能
v-pre       :没有值,跳过所在节点的编译过程,变成静态页面,没有使用插值语法/指令语法的节点会加快编译
```

### 自定义指令-->directives 配置

```
directives:{
    //函数方式创建
    自定义指令名(element[真实的Dom元素],binding[指令和元素绑定]){
        //通过element对Dom元素进行改样式,改值
    },
    //对象方式创建
    自定义指令名:{
        bind(element,binding){
            //指令与元素成功绑定时调用
        },
        inserted(element,binding){
            //指令所在元素被插入页面时调用
        },
        update(element,binding){
            //指令所在模板被重新解析时调用
        },
    }
}

调用
定义指令时不加v-,用的时候要加v-
指令名如果是多个单词，要使用kebab-case命名方式,不要用camelCase命名

<span v-自定义名></span>

全局指令
Vue.directive('自定指令名',{
    bind(element,binding){},
    inserted(element,binding){},
    update(element,binding){},
})
```

### 生命周期

生命周期中的 this 指向 vm 或者组件

```
beforeCreate(数据监测和数据代理创建之前):无法通过实例访问data中的数据和methods中的方法
creadted(创建数据监测和数据代理):可以访问data中的数据和methods中的方法
beforeMount(挂载之前):页面呈现的是未经Vue编译的Dom结构,所有对Dom的操作，最终都不凑效
mounted(挂载)：页面呈现的是经过Vue编译的Dom,对Dom的操作均有效,自此初始化过程结束
beforeUpdate(更新之前):此时数据是新的，但页面是旧的（之前数据未更新的）
updated(更新)：数据是新的，页面也是新的
beforeDestroy(销毁之前):data,methods都可以执行,马上要执行销毁过程,关闭定时器,取消订阅,解绑事件
destroyed:成功销毁

//路由时候的钩子
activated:组件激活
deactivated:组件取消激活(失活)
beforeRouteEnter(to,from,next):通过路由规则--进入该组件时调用--要用next()函数放行
beforeRouteLeave(to,from,next):通过路由规则--离开该组件时调用--要用next()函数放行
```

### template(模板)

```
页面上可以不用写Dom结构可以通过实例中给的template来创建Dom元素
template：{
    `<h2>{{n}}</h2>`
}
template里面不能出现多个根节点，不能以<template></template>作为根节点
```

### html 元素绑定

```
class绑定-->字符串绑定'class名',数组绑定['class名']，对象绑定{class名：false}
style绑定-->对象绑定{fontSize：'40px'}
```

### 条件渲染(v-show,v-if)

```
v-show-->DOM元素还在，用display:none隐藏了元素
v-if-->DOM元素将去除
用多级包裹的元素可以使用<template></template>标签，不会改变页面结构，页面不会渲染
```

### 列表渲染(v-for)

```
可遍历：数组,对象,字符串,指定次数
key：如果不写，vue会默认把index做为key值

1.虚拟DOM中的key的作用：
key是虚拟DOM对象的标识，当状态中的数据发生变化时，Vue会根据[新数据]生成[新的虚拟DOM]，
随后Vue进行[新虚拟DOM]与[旧虚拟DOM]的差异比较。对比规则如下：

2.对比规则：
（1）旧虚拟DOM中与新虚拟DOM的key相同：
    ①.若虚拟DOM中内容没变，直接使用之前的真实DOM
    ②.若虚拟DOM中内容变了，则生成新的真实DOM，替换掉页面之前真实的DOM
（2）旧虚拟DOM中与新虚拟DOM的key不相同：
    创建新的真实DOM，渲染到页面

3.index作为key可能引发的问题
    ①.若对数据进行：逆序添加删除等破坏顺序操作：
        会产生没有必要的真实DOM更新==>界面没问题，但效率低下
    ②.如果结构中包含输入类DOM：
        会产生错误DOM更新==>界面会有问题

4.开发中如何选择key？
    ①.最好选择数据的唯一标识作为key,如数据ID
    ②.如果不对遍历数据进行破坏顺序操作，使用index作为key还是没问题的
```
### Vue 项目时为什么要在列表组件中写 key，其作用是什么？
```
1. 更准确
因为带key就不是就地复用了，在sameNode函数 a.key === b.key对比中可以避免就地复用的情况。所以会更加准确。

2. 更快
利用key的唯一性生成map对象来获取对应节点，比遍历方式更快。(这个观点，就是我最初的那个观点。从这个角度看，map会比遍历更快。)
```

### 组件化

```javascript
实现应用中局部功能代码和资源的集合
每次调用Vue.extend,返回的都是一个全新的VueComponent
组件实例.prototype.__proto === Vue实例.prototype,这样可以使组件访问Vue原型上的属性和方法

非单文件组件：
一个文件中包含有多个组件文件后缀名.html
const 组件名 = Vue.extend({
    //组件内没有el配置
    name:"vue开发工具显示的标签名",
    data(){//data一定要写成函数式
        return{
            //这里是键值对
        }
    },
    template:`<div></div>`;//页面上的htm代码
})
简写
const 组件名 = {
    //配置项
}

单文件组件：
一个文件中包含一个组件,文件后缀名.vue
App.vue是汇总其他所有的组件
一个vue文件包含组件结构(template)、组件交互(script)、组件样式(style)
<template>//组件结构</template>
<script>
	//组件交互
	export default {//默认暴露出去
    	name:组件开发者工具显示标签名,
    	data(){
        	return{
            	//组件数据键值对
        	}
    	},
    	components: {//引入其他组件},
    	methods:{//组件定义的内部方法}
	}
</script>
<style>//组建的样式</style>

调用组件的时候要使用实例中的components配置项
//局部注册
components:{
    组件名,
}
//全局注册-全局组件
Vue.components("组件名1","组件名2"){}
```

### props:让组件接收外部传过来的数据

```javascript
props传入组件的值不允许修改,是只读状态
如果要改props传入组件的值,可以把传入的值与组件data中的变量进行绑定
v-model绑定的值不能使用props传过来的值,因为props是不可以修改的

简单配置
props:['接受参数名1','接受参数名2']

详细配置
props:{//required和default只能选填一个
    接受参数名1:{
        type:参数类型,
        required:参数必须传值,
        default:默认值
    }
}
```

### 子组件给父组件传递数据

```html
1.通过父组件给子组件传递函数类型的props实现 父组件相关代码： <自定义组件
:自定义函数名=自定义函数/> methods:{ 自定义函数(可以接收组件内的参数){} }
子组件相关代码
<button @click="触发函数"></button>
props:["自定义函数"] methods:{ 触发函数(){ this.自定义函数(参数) } }
2.通过父组件绑定一个自定义事件实现 父组件相关代码 方法一：使用@或者v-on
<自定义组件 @自定义事件名=被调用函数/> methods:{ 被调用函数(参数){} }
方法二：使用ref <自定义组件 ref='ref名称'/> mounted(){//钩子函数
this.$refs.ref名称.$on('atguigu',this.被调用函数) } 子组件相关代码
<button @click="触发函数"></button>
methods:{ 触发函数(){ this.$emit('自定义事件名',参数)
//this.$off('自定义事件名'),解绑 } }
```

### 全局事件总线-实现组件中的通信

```javascript
在vm中创建一个vc组件实例作为傀儡,用于总线通信
创建总线
new Vue{
    el:'#app',
    render:h=>h(App),
    beforeCreate(){
        Vue.prototype.$bus = this;//安装全局事件总线
    }
}
使用事件总线：
接收数据
methods(){
    demo(data){}
}
mounted(){
    this.$bus.$on('自定义事件名',this.demo)
}
提供数据
this.$bus.$emit('自定义事件名',数据)
```

### 消息的订阅与发布-实现组件中的通信

```javascript
要使用pubsub-js插件库
订阅消息：消息名
发布消息：消息内容
引入库
import pubsub from 'pubsub-js'

接收数据
mounted(){
    //订阅消息
    this.pubId = pubsub.subscribe('消息名',回调函数(消息名,数据))
}
beforeDestroy(){
    //取消订阅
    pubsub.unsubscribe(this.pubId)
}

提供数据
methods:{
    函数(){
        //发布消息
        pubsub.publish('消息名',数据)
    }
}
```

### mixins:可以把多个组件共用的配置提取成一个混入对象

```
新建一个js文件定义混入,组件和Vue实例的配置都可以定义
{
    data(){},
    methods:{}
}
使用混入,用import引入定义的混入的文件
全局混入:Vue.mixin()
局部混入:mixins:['混入变量']
```

### use:引用插件

```
包含install方法的一个对象,install的第一个参数是Vue,第二个以后的参数是插件使用者传递的参数
自Vue定义插件:
对象.install = function (Vue , options){
    //添加全局过滤器
    //添加全局指令
    //配置全局混入
    //添加实例方法
}
//使用插件
在main.js中先引入定义插件的文件
Vue.use(定义插件名)
```

### scoped:让样式在局部生效,防止样式冲突

```css
<style scoped></style>
```

### $nextTick--下一轮执行

```
当数据改变后,要基于更新后的新Dom进行某些操作时,要在nextTick所指定的回调函数中执行.
该方法会在模板编译完成之后才执行
this.$nextTick(回调函数)
```

### 过度与动画

```
第一种在css中写动画
html
<transition name='动画名' appear>     //动画要用这个标签包起来,appear最开始有效
    <span v-show='isShow'></span>
</transition>
CSS
.动画名-enter-active{}     默认是v-enter-active       //激活时候的动画样式名
.动画名-leave-active{}     默认是v-leave-active       //取消时候的动画样式名

可以引用第三方的动画库
Animate -->使用文档网站：animate.style
把样式的class='animate__animated animate__bounce'中class的内容,放在transition标签中的name的地方
transition标签中加上
enter-avtive-class='粘贴进入的动画名';
leave-avtive-class='粘贴离开的动画名';
```

### 网络请求--axios

```javascript
解决跨越请求
1.cors----------需要后端人员配置(这个配置了所有人都能访问
2.jsonp---------需要前后端一起配置
3.配置代理服务器--使用的情况比较多,(nginx,vue-cli)开启代理服务器

在vue1.0的时代,是用vue-resource(官方不在维护)进行网络请求,现在vue团队把这个插件交给其他团队维护了,它的用法和axios差不多一样

devServer.proxy---vue-cli配置代理服务器
在vue.config.js文件中配置
使用方法一
devServer:{
    proxy:'请求地址+请求地址端口号'(例:http://localhost:5080)
}
1、若public文件夹里面有文件名和服务端请求相冲突，会优先访问public里面的文件
2、这种方式简单,不能配置多个代理、不能灵活的控制是否走代理

使用方法二
devServer:{
    proxy:{
        "/api":{                        //请求前缀(如果请求前面加上这个,那么该请求会走API;如果不加就不会走)
            target:"请求地址",           //配置请求地址
            pathRewrite:{'^/api':''}    //把最终请求数据中的'/api'字符替换掉--正则表达式
            ws:true,                    //用于支持websocket
            changeOrigin:true           //为真时,请求头里面的端口号和服务器一致;否则和前端一致
        },
    }
}
1.配置简单,请求资源时直接发给前端
2.不能配置多个代理,不能灵活的控制请求代理
```

### slot 插槽-组件中使用====>组件间通信方式

```
可用让父组件向子组件指定的位置插入html结构
定义一个插槽
<slot name='插槽名' :变量名='变量值'></slot>

使用插槽
<组件名>
    <template scope='接收插槽传递的变量(是一个对象)-->例如:jieshou'>                      //使用组件里面的数据,就必须用template标签包裹起来,用scope属性使用变量,scope接受的是有个对象,键名为之前插槽定义的变量名
        <标签名 slot='插槽名'>{{jieshou.变量名}}</标签名>
    </template>
</组件名>
```

### vuex-状态管理器--(管理公共数据的)

```javascript
专门在Vue实现集中式状态(数据)管理的一个Vue插件,对vue应用中多个组件的共享状态进行集中式的管理(读/写),
也是组件通信的方式,且适用于任意组件间通信。

使用场景
多个组件使用同一个数据(状态)
来自不同组件的行为需要变更同一数据(状态)

Vuex工作原理
Actions:需要通过请求拿参数时要调用,处理业务逻辑  ↓
Mutations:用户可用直接调用,进行数据操作        ↓
State:管理的数据(状态),管理存储数据

安装
npm i vuex
import Vuex from 'vuex'
import store from './store/index.js'	//自己创建的
new Vue({
    el:'#app',
    render:h=>h(App),
    store:store,
})

使用
在src创建store文件夹里面有个index.js文件

import Vue from ''vue'
import Vuex from 'vuex'
Vue.use(Vuex)
//用于响应组件中的动作
const actions = {//里面的动作名一般小写--处理业务逻辑
    动作名(store实例对象[上下文对象--context],传过来的参数){
        //这里面访问请求拿到需要的参数,数据
        context.commit('操作名',参数)
    },
}

//用于操作数据(state)
const mutations = {//里面的操作名一般大写--进行数据操作
    操作名(state中存储的数据[state],传过来的参数){
        console.log(state.变量名);
    }
}

//用于存储数据
const state = {//管理存储数据
    变量名:变量值,
}

//相当于计算属性，获取数据时候执行，必须有返回值，平常可以不用使用
const getters = {
    变量名(state数据){
        return state.变量名 * 10  //操作数据,对数据进行加工
    }
}

//创建并暴露Store
export default new Vuex.Store({
    actions:actions,
    mutations:mutations,
    state:state,
    getters:getters,    //加工数据,调用方法,$store.getters.变量名
})

调用
this.$store.state.变量名 -- 读取变量值
this.$store.dispatch('动作名',参数)--直接访问actions的方法
this.$store.commit('操作名',参数)--直接访问mutations的方法

mapState的使用--使用mapState简写的方式拿到Vuex管理的state数据
mapGetters-----同上
mapMutations---同上
mapActions-----同上
import {mapState,mapGetters,mapMutations,mapActions} from 'vuex'
computed:{//借助mapState生成计算属性,从state中读取数据---下面是为了简写
    //这里用...的用意是:把另一个对象穿插到computed(计算属性)对象中---(对象写法)
    ...mapState({
        别名:state对应数据的变量名,
    }),

    //数组里面的字符必须在state里面存在--(数组写法)
    ...mapState(['对应的state变量名']),

    //数组里面的字符必须在getters里面存在--同样它也有数组的写法
    ...mapGetters(['对应的getters变量名']),

    //调用--this.别名 或者 this.对应的state变量名
}
methods:{
    //使用这种方式创建简写调用vuex的mutations方法,调用的地方必须要写参数;否则mapMutations生成的函数会自带一个参数,从而发生意想不到的报错
    //同样它也有数组的写法
    ...mapMutations({//对应commit
        别名:mutations对应的方法名,
    })

    //同上--简写vuex的actions里面的方法
    ...mapActions({//对应dispatch
         别名:actions对应的方法名,
    })

    //调用--<div @click = '别名(参数)'></div>
}

vuex的模块化管理
这部分的代码可以可以分离出一个单独的js文件后面导入进来
const 模块名1 = {//用模块化的方式,一定要开启命名空间
    namespaced:true,//开启命名空间
    actions:{},
    mutations:{},
    state:{},
    getters:{},
}
export default new Vuex.Store({
    modules:{
        别名1:模块名1,
        别名2:模块名2,
        ...
    }
})

调用参数与方法---一定要选择对应的模块别名
computed:{
    //1.便捷方式--读取state参数
    ...mapState('模块别名',['state参数名'])
    //2.传统方式--读取state参数
    函数(){
        this.$store.state.模块别名.state参数名
    }

    //1.便捷方式--读取getters函数
    ...mapGetters('模块别名',['getters对应函数名'])
    //2.传统方式--读取getters函数
    函数(){
        this.$store.getters['模块别名/getters对应函数名']
    }
}
methods:{
    //mapMutations的方式和mapActions差不多一样

    //1.便捷方式--读取mutations函数
    ...mapActions('模块别名',['actions方法名'])
    //2.传统方式--读取mutations函数
    函数(){
        this.$store.commit('模块别名/mutations对应函数名',参数)
    }
}
```

### Vue 路由

```javascript
安装vue-router
应用Vue.use(VueRouter)
创建router文件夹--index.js

//引入插件
import VueRouter from 'vue-router'
//引入组件
import 组件 from 组件所在文件夹
//创建并暴露一个路由器
export defult new VueRouter({
    mode:'history',//路由模式--默认hash模式
    routes:[//路由规则--一级路由前要加斜杆(/)--二级路由不加斜杆(/)Vue自动加了
        {
            name:'路径名(自定义的)'
            path:'/url路径',
            component:组件,
            children[
                {
                    name:'路径名(自定义的)'
                    path:'url子路径',
                    component:组件,
                    meta:{自定义参数名:自定义参数值},
                    beforeEnter(to,from,next){//独享路由守卫只有前置没有后置,某个路由单独的守卫
                        //设置跳转页面前的操作
                    },
                },
                {
                    name:'路径名(自定义的)'
                    path:'url子路径/:参数1/参数2',//params传参时,所用到的占位符
                    component:组件,
                    //第一种写法:值为对象,该对象中的所有key-value都会以props(就是一个组件接收另一个组件传递值的那个属性)的形式传给该组件
                    //使用比较少，因为传递的值都是死数据
                    //props:{
                    //    键名1:值1,
                    //    键名2:值2,
                    //}
                    //第二种写法:值为布尔值,若布尔值为真,就会把该路由组件收到的所有params参数,以props的形式传给该组件
                    //props:true
                    //第三种写法:值为函数--会得到一个$route参数.它可以访问到路由里面的数据;从而进行传值
                    props($route){
                        return{
                            键名1:$route.query.参数1,
                            键名2:$route.query.参数2,
                        }
                    }
                }
            ]
        }
    ]
})
//全局前置_路由守卫
router.beforeEach((to,from,next)=>{//在每一次跳转页面之前(初始化的时候)都会帮忙调用一个函数
    //to:去往的router信息
    //from:来自的router信息
    //next():放行
    //这里可以获取权限然后通过next()放行
})
//全局后置_路由守卫
router.afterEach((to,from)=>{//在每一次跳转页面之后(初始化的时候)都会帮忙调用一个函数
    //to:去往的router信息
    //from:来自的router信息
    //设置跳转页面后的一些功能
})
//组件内路由--两个生命钩子
beforeRouteEnter(to,from,next){//通过路由规则--进入该组件时调用
    next()//要放行
}
beforeRouteLeave(to,from,next){//通过路由规则--离开该组件时调用
    next()//要放行
}


调用
//引入路由器
import router from 配置路由器的文件
new Vue({
    el:'#app',
    router:router,//引用路由器
})

//页面标签
1.一级路由
<router-link to = '/配置url路径'></router-link>

2.二级路由
<router-link to = '/一级路由路径/二级路由路径'></router-link>

3.1路由传参--query参数--字符串写法--和路由配置里面的无关
<router-link to = '/配置url路径?参数1=值1&参数2=值2'></router-link>

3.2路由传参--query参数--对象写法--和路由配置里面的无关
<router-link :to = "{
    path:'配置url路径',
    query:{
        参数1:值1,
        参数2:值2,
    }
}"></router-link>
调用：this.$route.query.参数1

4.使用路径名跳转--路径过长时,可以简化写法
<router-link :to = "{
    name:'路径名',
}"></router-link>

5.1路由传参--params参数--字符串写法--和路由配置里面的有关--使用时一定要在路由配置里面加占位符
<router-link to = '/配置url路径/参数1/参数2'></router-link>

5.2路由传参--params参数--对象写法--和路由配置里面的有关--这种写法必须使用(路径名),不能直接用(url路径)
<router-link :to = "{
    name:'路径名',
    params:{
        参数1:值1,
        参数2:值2,
    }
}"></router-link>
调用：this.$route.params.参数1

//指定组件的呈现位置
<router-view></router-view>
//用keep-alive标签包裹的router-view标签，可以让组件切换后不销毁组件(达到缓存效果)
//include,可以指定不销毁的组件;如果不写，默认不销毁组件
<keep-alive include='组件名' include="['组件1','组件2']">
    <router-view></router-view>
</keep-alive>

//编程式导航
methods:{
    push(){//有浏览历史
        this.$router.push({
            name:'路径名',
            query:query参数,
            params:params参数,
        })
    },
    replace(){//无痕浏览
        this.$router.replace({
            name:'路径名',
            query:query参数,
            params:params参数,
        })
    },
    back(){//回退
        this.$router.back();
    },
    forward(){//前进
        this.$router.forward();
    },
    go(){//前进或后退指定步数
        this.$router.go(x);
    }
}

//路由生命周期钩子
activated(){}//组件激活
deactivated(){}//组件取消激活

//hash模式与history模式
1.默认开启hash工作模式
2.解决改为history模式后,请求报错问题
3.在 node.js服务器 中引入下列插件
npm i connect-history-api-fallback
const history = require('connect-history-api-fallback')
app.use(history)

hash模式：
    地址中永远带着#号
    对于url来说,#号后面的就是hash值
history模式:
    兼容性和hash模式相比略差
    应用线上时,需要后端人员支持,解决刷新页面服务端404的问题
```
