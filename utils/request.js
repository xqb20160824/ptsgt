// 小程序开发api接口工具包，https://github.com/gooking/wxapi
const CONFIG = '';
var appConfig = getApp();
// const API_BASE_URL = 'http://192.168.0.108:8080'
const utils = require('./../utils/util.js')
const API_BASE_URL = 'https://jsai.top/tgsapi'
var allThat = null;
const request = (options) => {
	let {url,method,data}=options;
	console.log(url)
  var allThat = this;
  let _url = API_BASE_URL + url
  return new Promise((resolve, reject) => {
    //获取存储的tokenData
    // var tpuId = wx.getStorageSync('tpuId');
    var header = {
      'Content-Type': 'application/json'
    };
      var auth = wx.getStorageSync('authorization');
      if (auth) {
        header["Authorization"] = auth;
      };
    
    wx.request({
      url: _url,
      method: method,
      data: data,
      header: header,
      success(respones) {
        // utils.hideLoading();
		let header=respones.header;
		if(header.ReAuthorization){
			wx.setStorageSync('authorization', header.ReAuthorization);
		};	
        var result = respones.data;
        if (result.code == "401" || result.code == "403") {
          wx.setStorageSync('authorization', "");
          wx.navigateTo({
            url: "/pages/loginName/index"
          })
          return false;
        }
        if (result.status == "403" || result.status == "401") {
          //重新授权
          wx.setStorageSync('authorization', "");
          wx.navigateTo({
            url: "/pages/authorize/index"
          })
          return false;
        }
        if (result.code == "200") {
          if (result.status == "1") {
            if (reject) {
              // reject(result);
			  wx.showToast({
			    title: result.message || "服务链接失败",
			    icon: "none",
			    duration: 3000
			  })
            }
          } else if (result.status == "0") {
            //获取头部信息
            let authorization = respones.header.Authorization;
            if (authorization) {
              //本地存储
              wx.setStorageSync('authorization', authorization)
            }
            resolve(result)
          }
        } else {
          // wx.showToast({
          //   title: result.message || "服务链接失败",
          //   icon: "none",
          //   duration: 3000
          //   // image: '../../images/fail.png', //icon路径，不写不显示
          // })
		  utils.showErrorToast(error.errMsg || "服务链接失败")
        }
      },
      fail(error) {
        // utils.hideLoading();
        if (error.errMsg) {
          // wx.showToast({
          //   title: error.errMsg || "服务链接失败",
          //   icon: "none",
          //   duration: 3000
          //   // image: '../../images/fail.png', //icon路径，不写不显示
          // })
		  // utils.showErrorToast(error.errMsg || "服务链接失败")
        }
        reject && reject(error);

      },
      complete(aaa) {
        // 加载完成
      }
    })
  })
}
// export default request;
module.exports = request;