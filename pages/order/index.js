//index.js
//获取应用实例
const app = getApp()
const {getCurrentDayOrderList} = require('../../api/index')
Page({
	data: {
		CustomBar: app.globalData.CustomBar,
		TabCur: 0,
		scrollLeft: 0,
		statusType: [{
			txt: "全部",
			orderStatus: "0",
		}, {
			txt: "待取货",
			orderStatus: "10",
		}, {
			txt: "待还件",
			orderStatus: "30",
		}, {
			txt: "已完成",
			orderStatus: "30",
		}],
		orderList:[
			
		],
		loadingStatus: false,
		pageIndex: 1,
		pageSize: 10,
		loadBar: {
		  Loading: false,
		  more: true
		},
		search:"",//查找的内容
		isLogin:false,
		orderColumn:"createDateTime",
		orderType:"desc",
		imageurl0:"/images/select01.png",
		imageurl1:"/images/select02.png",
		imageurl2:"/images/select03.png",
		listData:[
			1,2,3,4,45,50,5,8,3,87,8
		],
		CustomBar:app.globalData.CustomBar,
	},
	onRefresh:function(e){
		var callback = e.detail;
		var self = this;
		self.setData({
		  pageIndex: 1
		});
		this.dataLayer(function () {
			callback.success();
		});
	},
	onLoadMore: function (e) {
		var callback = e.detail;
		// setTimeout(function () {
		// 	callback.fail();
		// }, 3000)
		
		var self = this;
			
		var pageIndex = self.data.pageIndex;
		self.setData({
		  pageIndex: ++pageIndex
		})
			
		let pageSize = self.data.pageSize;
		let dataList = self.data.orderList;
		if (dataList.length < pageSize) {
		  console.log("数量太小，不需要上拉")
		  return false;
		}
		this.dataLayer(function () {
			  if (!isData) {
			    // 没有数据应减回去
			    self.setData({
			      pageIndex: --pageIndex
			    })
			  }
			callback.fail();
		})	
		// this.dataLayer(function(isData) {
		//   if (!isData) {
		//     // 没有数据应减回去
		//     self.setData({
		//       pageIndex: --pageIndex
		//     })
		//   }
		// });
	},
	onShow: function() {
		let authorization=wx.getStorageSync('authorization');
		if(authorization){
			this.setData({
				isLogin:true
			})	
		};
		// 获取订单列表
		this.setData({
		  pageIndex: 1,
		});
		//初始化请求数据
		this.dataLayer();
	},
	tabSelect(e) {
		this.setData({
			TabCur: e.currentTarget.dataset.id,
			scrollLeft: (e.currentTarget.dataset.id - 1) * 60
		})
	},
	handleLogin(){
		wx.navigateTo({
			url: "/pages/login/index"
		});
	},
	dataLayer(callback){
		var self = this;
		var pageSize = self.data.pageSize;
		var pageIndex = self.data.pageIndex;
		let statusType = self.data.statusType;
		let statusType1 = self.data.statusType1;
		let statusTypeAll = statusType.concat(statusType1);
	
		let currentType = self.data.currentType;
		let search=self.data.search;
		// let totalDays=self.data.totalDays;
		let orderColumn=self.data.orderColumn;
		let orderType=self.data.orderType;
		let postData = {
		  pageSize: pageSize,
		  pageIndex: pageIndex,
		  search: search,
		  orderColumn,
		  orderType
		};
		var loadBar = self.data.loadBar || {};
		    loadBar.Loading = true; // 加载中
		    self.setData({
		      loadBar: loadBar
		    });
		getCurrentDayOrderList(postData).then((res)=>{
			wx.stopPullDownRefresh();
			loadBar.Loading = false; // 加载完毕
			self.setData({
				loadBar: loadBar,
				loadingStatus: false
			  })
			  let data = res.data;
			  let rows = data.itemList || [];
				// rows = formatData.formatOrderList(rows);
				let isData = (pageSize >= rows.length) ? true : false;
			  //总数
			  let records = data.count || 10;
				if (!rows.length) {
					if (pageIndex > 1) {
					  isData = false;
					}
				  }
				if (!!callback) {
				  callback(isData);
				};
				if(pageIndex > 1){
					let dataList = self.data.orderList;
					let newRows = dataList.concat(rows);
					loadBar.more = !(records <= newRows.length); // 判断是否还有数据
					self.setData({
					  loadBar: loadBar,
					  orderList: newRows
					});
				}else{
					loadBar.more = !(records <= rows.length); // 判断是否还有数据
					self.setData({
					  orderList: rows,
					  loadBar: loadBar
					});
				}
		}).catch(()=>{
			self.setData({
				loadingStatus: false
			  })
		})	
			
	},
	
	  /**
	  上拉加载
	 
	  **/
	  onReachBottom: function() {
	    var self = this;
	
	    var pageIndex = self.data.pageIndex;
	    self.setData({
	      pageIndex: ++pageIndex
	    })
	
	    let pageSize = self.data.pageSize;
	    let dataList = self.data.orderList;
	    if (dataList.length < pageSize) {
	      console.log("数量太小，不需要上拉")
	      return false;
	    }
	
	    this.dataLayer(function(isData) {
	      if (!isData) {
	        // 没有数据应减回去
	        self.setData({
	          pageIndex: --pageIndex
	        })
	      }
	    });
	
	
	  },
	  handleSeeDetails(e){
		  //查看详情
		  let item=e.currentTarget.dataset.item;
		  item=JSON.stringify(item)
		  wx.navigateTo({
		  	url: "/pages/order-details/index?item="+item
		  })
	  },
	  handlePx(e){
		  let index=e.currentTarget.dataset['index'];
		  let oldOrderColumn=this.data.orderColumn;
		  let orderType=this.data.orderType;
			if(oldOrderColumn==index){
				//说明点击的是同一个只是改变排序方式
				if(orderType=="desc"){
					this.setData({
						orderType:'asc'
					})
				}else{
					this.setData({
						orderType:'desc'
					})
				}
			}else{
				//说明类型重新选择的
				this.setData({
					orderColumn:index
				})
			}
		  this.dataLayer();
	  }
})
