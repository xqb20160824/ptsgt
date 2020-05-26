Page({
	data: {
		canIUse: wx.canIUse('button.open-type.getUserInfo'),
		code: '', //用户code,
		phoneAuth: false,
		userId: null, //用户信息,判断是否登录的唯一依据
		listItems: [{
		      text: "三方授权",
		      url: "/pages/threewayBinding/index"
		    }, {
		      text: "关于我们",
		      url: "/pages/aboutUs/index"
		      }, {
		        text: "联系我们",
		        url: "/pages/contact/index"
		      }],
			  userPhone:'',
		isLogin:false
	},
	onShow: function() {
		//判断当前用户是否已经登录
		// wx.setStorageSync('authorization', data.value);
		let authorization=wx.getStorageSync('authorization');
		console.log("authorization:"+authorization);
		
		//如果有userId,获取用户昵称和头像
		if(authorization){
			// let userInfo=wx.getStorageSync('userInfo');
			// console.log(userInfo)
			// this.setData({
			// 	userId,
			// 	userInfo
			// })
			this.setData({
				isLogin:true
			})	
		}
	},
	aa() {
		console.log(1)
		wx.navigateTo({
		  url: "/pages/loginName/index"
		})
	},
	

})
