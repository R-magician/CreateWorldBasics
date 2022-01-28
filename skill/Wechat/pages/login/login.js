import {$tip,$check,$req} from "../../utils/common-function.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone:'17623196002',//手机号码
    password:'qq19980623',//密码
  },
  
  //登录
  async login(){
      let {phone,password} = this.data;
      if(!$check(phone, "请输入手机号")) return;
      //基本的验证手机号的正则表达式
      let phoneReg = /^1(3|4|5|6|7|8|9)\d{9}$/;
      if(!$check(phoneReg.test(phone), "手机号格式错误")) return;
      if(!$check(password, "密码不能为空")) return;
      let res = await $req('/login/cellphone',{phone,password,isLogin:true});
      if(res.code===200){
        $tip("登录成功");
        //将用户的信息存储到本地
        wx.setStorageSync('userInfo', JSON.stringify(res.profile));
        wx.reLaunch({
          url: '/pages/personal/personal',
        })
      }else{
        $tip(res.msg);
      }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})