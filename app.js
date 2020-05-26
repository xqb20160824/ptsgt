//app.js
App({
	onLaunch: function() {
		// 展示本地存储能力
		var logs = wx.getStorageSync('logs') || []
		logs.unshift(Date.now())
		wx.setStorageSync('logs', logs)
		
		wx.getSystemInfo({
			success: e => {
				this.globalData.StatusBar = e.statusBarHeight;
				let capsule = wx.getMenuButtonBoundingClientRect();
				if (capsule) {
					this.globalData.Custom = capsule;
					this.globalData.CustomBar = capsule.bottom + capsule.top - e.statusBarHeight;
				} else {
					this.globalData.CustomBar = e.statusBarHeight + 50;
				}
			}
		})
		//检测cookie是否存在并检测是否过期
		this.checkCookie();

		// 登录
		// wx.login({
		// 	success: res => {
		// 		// 发送 res.code 到后台换取 openId, sessionKey, unionId
		// 		let code = res.code;
		// 		console.log(res.code)
		// 	}
		// })
		// 获取用户信息
		wx.getSetting({
			success: res => {
				if (res.authSetting['scope.userInfo']) {
					// 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
					wx.getUserInfo({
						success: res => {
							// 可以将 res 发送给后台解码出 unionId
							this.globalData.userInfo = res.userInfo

							// 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
							// 所以此处加入 callback 以防止这种情况
							if (this.userInfoReadyCallback) {
								this.userInfoReadyCallback(res)
							}
						}
					})
				}
			}
		})

		
		// 检测新版本
		this.updataApp();
	},
	updataApp: function() {
		if (wx.canIUse('getUpdateManager')) {
			const updateManager = wx.getUpdateManager()
			updateManager.onCheckForUpdate(function(res) {
				if (res.hasUpdate) { // 请求完新版本信息的回调
					updateManager.onUpdateReady(function() {
						wx.showModal({
							title: '更新提示',
							showCancel: false,
							content: '新版本已经准备好，是否重启应用？',
							success: function(res) {
								if (res.confirm) { // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
									updateManager.applyUpdate()
								}
							}
						})
					})
					updateManager.onUpdateFailed(function() {
						wx.showModal({ // 新的版本下载失败
							title: '已经有新版本了哟~',
							content: '新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~',
						})
					})
				}
			})
		} else {
			wx.showModal({ // 如果希望用户在最新版本的客户端上体验您的小程序，可以这样子提示
				title: '提示',
				content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
			})
		}
	},
	checkCookie() {
		let userId = wx.getStorageSync('userId');
		if (userId) {
			//如果存在cookie,检测是否过去
			this._checkWXSession() //检查用户的登录态在微信服务端是否过期
		}
	},
	_checkWXSession() {
		wx.checkSession({
			success: () => {},
			fail: () => {
				//cookie过期
				wx.setStorageSync('userPhone', '')
			}
		})
	},
	globalData: {
		userInfo: null
	}
})
