//index.js
//获取应用实例
const app = getApp()
const utils = require('../../utils/util.js');
const {cancleOrder} = require('../../api/index')
Page({
	data: {
		item:null
	},
	onLoad: function (options) {
		//订单详情
	  var item = options.item;
	  item=JSON.parse(item)
	  console.log(item)
	  if(item){
		  let price=item.price/100;
		  let totalPrice=item.totalPrice/100;
		  item.price=utils.toFixed(price,2);
		  item.totalPrice=utils.toFixed(totalPrice,2);
		  this.setData({
		  	item
		  })
	  }
	},
	onShow: function() {
	},
	cancleOrder(){
		//取消订单
		let orderId=this.data.item._id;
		cancleOrder({
			orderId
		}).then((res)=>{
			wx.navigateBack()
		})
	}
	
})
