const mongoose = require('mongoose')
const baseModel = require('./base-model')
const md5 = require('../util/md5')

//用户表字段类型
const userSchema = new mongoose.Schema({
    ...baseModel,
    username:{
        type:String,//类型
        required:true//必选
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true,
        default:'1234',
        set:value=>md5(value),//对password进行赋值的时候，加密数据
        select:false          //在查询对象的时候不会被查出来
    },
    bio:{
        type:String,
        default:null
    },
    email:{
        type:String,
        default:null
    }
})

module.exports = userSchema