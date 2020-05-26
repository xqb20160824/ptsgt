const utils = require('./../../utils/util.js')
Page({
	data: {
		canIUse: wx.canIUse('button.open-type.getUserInfo'),
		code: '', //用户code,
		phoneAuth: false,
		userInfo: null, //用户信息
	},

	onLoad: function() {
		//判断当前用户是否已经登录
	},
	bindGetUserInfo(e) {
		let userInfo = e.detail.userInfo;
		wx.setStorageSync('userInfo',userInfo);
		let that=this;
		console.log(userInfo)
		if (userInfo) {
			wx.login({
				success: function(data) {
					console.log('获取登录 Code：' + data.code)
					let code = data.code
					that.setData({
						phoneAuth: true,
						code,
						userInfo
					})
				}
			})
		}
	},
	getPhoneNumber(e){
		// wx.setStorageSync('userId',"xiangqb");
		// this.setData({
		// 	phoneAuth: false,
		// })
		// wx.navigateBack();
		
		// return;
		let that=this;
		wx.login({
			success: function(data) {
				console.log('获取登录 Code：' + data.code)
				let code = data.code
				// that.setData({
				// 	phoneAuth: true,
				// 	code,
				// 	userInfo
				// })
				console.log(utils.formatTime(new Date()))
				console.log('getPhone')
				if (e.detail.errMsg == "getPhoneNumber:ok") {
				    //跳转到获取手机号码授权
				      let encryptedData=e.detail.encryptedData;
				      let iv=e.detail.iv;
				      console.log("encryptedData:"+encryptedData)
				      console.log("iv:"+iv)
					  console.log("code:"+code)
				      that.loginReq(code,encryptedData,iv)
				}else{
				  utils.showErrorToast('获取手机号失败，请重新获取')
				}   
				
			}
		})
	    
	  },
	  loginReq(code,encryptedData,iv){
	      let js_code=code;
		  //保存登录信息userId进缓存
	       wx.setStorageSync('userPhone',"18021038252");
	      
		  wx.navigateBack();
	      return
		  let that=this;
	      WXAPI.loginReq({
	        js_code,
	        encryptedData,
	        iv
	      }).then((function(res){
	            debugger
	          console.log(res)
			  wx.setStorageSync('userId',"xiangqb");
			  that.setData({
			  	phoneAuth: false,
			  })
			  wx.navigateBack();
	      }))
	  
	    },
		hideModal(){
			this.setData({
				phoneAuth: false,
			})
		}

})
