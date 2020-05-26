const api = require('../../api/index.js')
const app = getApp();
Page({
	data: {
		authorization:"",
		tipsModal:false,
		CustomBar:app.globalData.CustomBar,//自定义高度
	},
	
	onLoad: function() {
	},
	onShow() {
		let autho=wx.getStorageSync('authorization');
		this.setData({
			authorization:autho
		})
	},
	smBind() {
		let authorization=this.data.authorization;
		
		if(authorization){
			//说明已经登录了
			wx.navigateTo({
				url: "/pages/smlr/index"
			})
		}else{
			//说明还没有登录
			this.setData({
				tipsModal:true
			})
		}
	},
	hideModal(){
		this.setData({
			tipsModal:false
		})
	},
	toLogin(){
		this.hideModal();
		wx.navigateTo({
			url: "/pages/loginName/index"
		})
	}
})
