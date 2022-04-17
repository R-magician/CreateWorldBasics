## mongoose操作MongoDB数据库
教学视频：https://www.bilibili.com/video/BV1Vt411a7G1?spm_id_from=333.337.search-card.all.click
 
## 开始
```
//安装mongoose
npm i mongoose 

//引入mongoose并连接数据库
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/test')
//账号密码登录
mongoose.connect('mongodb://账号:密码@localhost:端口号/数据库?authSource=admin',(err)=>{
    //回调函数监听是否连接成功
})

//定义Schema(表结构-集合-建议和数据库集合同名+Schema)--对数据库表的一个映射
数据库中的Schema，为数据库对象的集合。schema是mongoose里会用到的一种数据模式
每个schema会隐射到mongodb中的一个collection（集合），不具备操作数据库的能力
const UserSchema = mongoose.Schema({
    name:String,
    age:Number,
})

//创建数据模型
最好首字母大写，和数据库表（集合名称对应）
model是由schema生成的模型，可以对数据库操作
mongoose.model 里面可以传入两个参数也可以传入三个参数
mongoose.model(参数1:模型名称(首字母大写),参数2:Schema,参数3:数据库操作的集合名称(可选参数))
两个参数：模型会操作数据库中相同名称(名称+s)的集合(比如:模型名:User对应集合表:Users)
三个参数：模型会默认操作第三个参数定义的集合名称(我建议最好这样整-上面一个感觉不灵活)
mongoose.model('User',UserSchema)
```

## 基本增删改查--用回调函数都是异步(最好用Promise)
```
//增加数据(要实例化Model)
1.实例化Model-----通过实例化User Molde创建增加
let u = new User({
    name:'ciupt',
    age:23
})
2.实例.save()
//执行增加操作--save里面有个回调函数,可以监听，也可以不监听
u.save((err,other)=>{
    console.log(err,other)
})

//更新数据--不需要创建实例,直接用Model操作
Model.updateOne({条件},{name:'CIUPT'},(err,doc)=>{
    console.log(err,doc)
})

//删除数据--不需要创建实例,直接用Model操作
Model.deleteOne({条件},(err,doc)=>{
    console.log(err,doc)
})

//查找数据--不需要创建实例,直接用Model操作
Model.find({条件},(err,doc)=>{
    console.log(err,doc)
})
```

## mongoose 默认值、模块化
```
//Modal实现默认值
let User = mongoose.Schema({
    name:String,
    age:{
        type:Number,//指定类型
        default:18,//指定默认值
    }
})

//模块化
不同的功能分为不同的文件
1.连接数据库一个文件
2.Schema 与数据库表映射一个文件
3.操作的时候直接使用Modal进行操作
```

## 预定义模式修饰符与 setters 自定义修饰符
```
//预定义模式修饰符,可以对我们增加的数据进行一些格式化
//lowercase、uppercase、trim
let User = mongoose.Schema({
    name:String,
    age:{
        type:Number,//指定类型
        default:18,//指定默认值
        trim:true,//添加数据时,去除左右空格
        lowercase:true,//添加数据字母转小写
        uppercase:true,//添加数据字母转大写
    }
})

//自定义修饰符
1.Getters、Setters
2.Setters在设置的时候进行设置，Getters在实例获取数据(不是获取数据库数据)的时候进行设置（不建议使用）
let User = mongoose.Schema({
    name:String,
    age:{
        type:Number,//指定类型
        default:18,//指定默认值
        set(val){
           //增加数据的时候对该字段进行处理
           return val;
        }
    }
})
```

## mongoose 索引，内置的增删改查方法、扩展MongooseModel的静态方法和实例方法
```
//设置索引是为了优化查询速度
1.unique：唯一索引，index:普通索引;二选一
let User = mongoose.Schema({
    age:Number,
    name:{
        type:String,//指定类型
        //普通索引
        index:true,
        //唯一索引
        unique:true,
    }
})
//内置的增删改查方法
https://mongoosejs.com/docs/queries.html

//扩展自己的增删改查方法
let User = mongoose.Schema({
    age:Number
})
1.自定义静态方法--通过Modal调用的方法 
User.statics.findByAge=function(age,cb){
    //通过age进行表查询
    this.find({"age":age},cb(err,doc))
}
调用：User.findByAge(18,()=>{})
2.实例方法--通过实例化Modal调用的方法（基本不用）
User.methods.print=function(){
    //输出this是当前实例化的数据{age:18}
    consloe.log(this)
}
let u = User({age:18})
调用：u.print()
```

## 数据校验
```
//mongooes 提供的数据校验
 required:表示这个数据必须传入
 max:用于Number类型，最大值
 min:用于Number类型，最小值
 enum:用于String类型，枚举类型,要求数据必须满足枚举值---enum:['1','2','3']
 match:用于String类型，增加的数据必须符合match(正则)的规则
 maxlength:用于String类型，最大长度
 minlength:用于String类型，最小长度
 validate:function(dese){//自定义验证器
    return bool类型
 },
 
 let User = mongoose.Schema({
    name:{
        type:String,//指定类型
        required:true,//该字段必须churn
    },
    state:{
        type:string,
        default:'1',
        enum:['1','2','3'],//state的值只能是enum枚举里面的值
    }
})
```


## Mongooes聚合管道
```

```



