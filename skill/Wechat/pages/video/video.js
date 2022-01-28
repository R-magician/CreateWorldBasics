import {
  $tip,
  $check,
  $req
} from "../../utils/common-function.js"
let timeout;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    videoList: [],
  },

  //更换视频列表
  hypf() {
    this.getVideoList();
  },
  //获取视频列表
  async getVideoList() {
    this.setData({
      videoList: []
    })
    //id-- 58100:现场   60100:翻唱   1101:舞蹈  58101:听BGM
    let vList = await $req("/video/group", {
      id: 59101
    }, true,{mask:true});
    vList = vList.datas
    for (let i = 0; i < vList.length; i++) {
      vList[i].id = i;
      //获取视频详情
      vList[i].urlObj = await $req("/video/url", {
        id: vList[i].data.vid
      }, true,{mask:true})
      vList[i].urlObj = vList[i].urlObj.urls
    }
    this.setData({
      videoList: vList
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getVideoList()
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