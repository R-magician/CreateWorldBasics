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
mongoose.connect('mongodb://账号:密码@localhost:端口号/数据库?authSource=admin')

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


13.42分钟
```
