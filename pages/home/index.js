const api = require('../../api/index.js')
Page({
	data: {
		cardCur: 0,
		swiperList: [{
			id: 0,
			type: 'image',
			url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg'
		}, {
			id: 1,
			type: 'image',
			url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84001.jpg',
		}, {
			id: 2,
			type: 'image',
			url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big39000.jpg'
		}, {
			id: 3,
			type: 'image',
			url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg'
		}, {
			id: 4,
			type: 'image',
			url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big25011.jpg'
		}, {
			id: 5,
			type: 'image',
			url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big21016.jpg'
		}, {
			id: 6,
			type: 'image',
			url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big99008.jpg'
		}],
		itemList:[
			{
				url:'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg',
				bt:'商品标题',
				ms:'商品描述商品描述商品描述商品描述商品描述商品描述',
				price:'10.00'
			},
			{
				url:'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg',
				bt:'商品标题',
				ms:'商品描述商品描述商品描述商品描述商品描述商品描述',
				price:'10.00'
			}
		],
		
	},
	bindGoods() {

		wx.navigateTo({
			url: "/pages/details/index?categoryId=wqeqwe"
		})
	},
	DotStyle(e) {
		this.setData({
			DotStyle: e.detail.value
		})
	},
	onLoad: function() {

	},
	onShow() {
		// console.log(11111)
		// api.loginReq({})
	},
	handleDetails() {
		wx.navigateTo({
			url: "/pages/goods-details/index?categoryId=wqeqwe"
		})
	},

})
