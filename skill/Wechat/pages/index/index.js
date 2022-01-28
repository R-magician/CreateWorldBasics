import {$req} from "../../utils/common-function.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bannerList:[],//轮播图数据
    recommendList:[],//推荐歌单
    topList:[],//排行榜列表
  },

  //切换排行榜触发
  topchage(e) {
    let index = parseInt(e.detail.current)+2;
    if(index >= this.data.topList.length){
      return;
    }
    if(this.data.topList[index].son.length==0){
      this.getOneTop(index)
    }
  },
  
/**
 * 获取单个排行的数据
 * @param {*} index 获取排行榜下标
 */
 async getOneTop(index){
    let topList = this.data.topList;
    let id=topList[index].id;
    let topSon = await $req('/playlist/detail',{id});
    topList[index].son = topSon.playlist.tracks.slice(0,3)
    this.setData({
      topList:topList
    })
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
  onShow: async function () {
    //获取banner数据
    let bannerList = await $req('/banner',{type:1});
    //获取推荐歌单
    let recommend = await $req('/personalized',{limit:10});
    //获取排行榜数据
    let top=[];
    let topdata = await $req('/toplist');
    topdata.list.map(e=>{
      top.push({
        id:e.id,
        name:e.name,
        son:[]
      })
    })
    this.setData({
      bannerList:bannerList.banners,
      recommendList:recommend.result,
      topList:top
    })
    //加载排行榜前三榜
    this.getOneTop(0);
    this.getOneTop(1);
    this.getOneTop(2);
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