import {$req} from "../../utils/common-function.js"
let starY = 0;//启始坐标
let moveY = 0;//移动坐标
let moveDistance = 0;//手指移动的距离
Page({

  /**
   * 页面的初始数据
   */
  data: {
    coverTransform:"translateY(0rpx)",
    coverTransition:"",
    userInfo:{},
    recentPlayList:[],//获取用户听歌排行记录
    rankingType:1//排行类型--1:周,0:总
  },

  startM(event){
    this.setData({
      coverTransition:'',
    })
    //获取手指的起始坐标
    starY = event.touches[0].clientY;
  },
  moveM(event){
    //获取手指的末端坐标
    moveY = event.touches[0].clientY;
    moveDistance = moveY - starY;
    if(moveDistance<=0){
      return;
    }
    if(moveDistance>=80){
      moveDistance=80;
    }
    this.setData({
      coverTransform:`translateY(${moveDistance}rpx)`,
    })
  },
  endM(){
  this.setData({
      coverTransform:`translateY(0rpx)`,
      coverTransition:'transform 1s linear',
    })
  },

   // 跳转登录页面
  tologin(){
    wx.navigateTo({
      url: '/pages/login/login',
    })
  },
  //切换排行
  checkB(e){
    if(e.target.id=='zou'){
      this.setData({rankingType:1,})
    }
    if(e.target.id=='zong'){
      this.setData({rankingType:0,})
    }
    if(e.target.id=='zong'||e.target.id=='zou'){
      this.setData({ recentPlayList:[]})
      this.getUserPlayList(this.data.userInfo.userId);
    }
    
  },

  // 获取用户听歌排行
  async getUserPlayList(uid){
    let type = this.data.rankingType
    let recentPlayList = await $req("/user/record",{uid,type});
    let str = type?'weekData':'allData';
    recentPlayList = recentPlayList[str].map(e=>{
      e.id = e.song.id
      return e;
    })
    this.setData({
      recentPlayList:recentPlayList,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //读取用户基本信息
    let userInfo = wx.getStorageSync('userInfo');
    if(userInfo){
      //有用户数据,更新userInfo数据
      this.setData({
        userInfo:JSON.parse(userInfo),
      })
      this.getUserPlayList(this.data.userInfo.userId);
    }
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