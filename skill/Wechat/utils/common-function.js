export {$tip,$req,$check}

/**
 * 1、封装功能函数
 *    1.功能点明确
 *    2.函数内部应该保留固定代码
 *    3.将动态的数据抽取成形参,由使用者根据情况传入
 *    4.一个良好的功能函数应该设置形参的默认值
 * 2、封装功能组件
 *    1.功能点明确
 *    2.组件内部保留静态的代码
 *    3.将动态的数据抽取成props参数,由使用者根据条件传入
 *    4.一个良好的组件应该设置组件的必要性及对应的数据类型
 */
import config from "./config"
function $req(url,data={},load=false,loadObj={}) {
  if(load){wx.showLoading(loadObj)}
  return new Promise((resolve,reject)=>{
    wx.request({
      url:config.host+url,
      data,
      method:"GET",
      header:{
        // 设置请求时候的cookie
        cookie:wx.getStorageSync('cookies')?wx.getStorageSync('cookies').find(e => e.indexOf('MUSIC_U') !==-1):'',
      },
      success:(res)=>{
        if(load){wx.hideLoading()}
        if(data.isLogin){
          // 登录后保存 cookies
          wx.setStorage({
            key:"cookies",
            data:res.cookies
          })
        }
        resolve(res.data)
      },
      fail:(err)=>{
        if(load){wx.hideLoading()}
        console.log('请求失败：',err);
        reject(err)
      }
    })
  })
}

/**
 * @param {*} title //提示文字
 * @param {*} icon //提示类型
 * @param {*} obj //showToast的其他参数
 */
function $tip(title='',icon='error',obj={}) {
  let obj1 = {title,icon}
  let obj2 = {...obj1,...obj}
  wx.showToast(obj2)
}

/**
 * @param {*} value //判断值
 * @param {*} title //提示消息
 * @param {*} obj //提示消息参数
 *  if (!$check(url, "参数错误")) return;
 */
function $check(value,title='',obj={}) {
  if(!value || value=='' || value==0 || value == undefined || value == null){
    let obj1 ={title,...obj}
    $tip('','error',obj1);
    return false
  }
  return true
}