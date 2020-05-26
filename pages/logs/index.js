//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
	  PageCur: 'basics',
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  NavChange(e) {
	  this.setData({
		PageCur: e.currentTarget.dataset.cur
	  })
	},
  onLoad: function () {
    
  },
  onShareAppMessage() {
      return {
        title: 'ColorUI-高颜值的小程序UI组件库',
        imageUrl: '/images/share.jpg',
        path: '/pages/index/index'
      }
    },
 
})
