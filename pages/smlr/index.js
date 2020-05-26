//index.js
//获取应用实例
const app = getApp()
import {
	scanningVerification,
	placeOrder
} from '../../api/index.js';
const cwx = require('./../../utils/profunc.js'); //在小程序页面引入该js 文件
const moment = require('../../utils/moment.js')
const utils = require('../../utils/util.js')
Page({
	data: {
		sbNumber: [
		],
		price:0,//单价
		number:0,//台数
		mobilePhone:"",//手机号码
		realName:"",//姓名
		IDCard:"",//身份证
		
		beginDate: "",
		endDate: "",
		totalDays:0,//总的天数
		totalPrice:0,
		access_token:"",
	},
	NavChange(e) {
		this.setData({
			PageCur: e.currentTarget.dataset.cur
		})
	},
	onLoad: function() {
			this.getToken111();
	},
	onShow() {
	},
	getToken111(){
		let that=this;
		let apiKey="lrB3dBYRPk1m7IxwSPzBPwgx";
		let secretKey="3XP1kbVWyyLOOYocTWRZU0vyzO28aHP7";
		wx.request({
		  url: "https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id="+apiKey+"&client_secret="+secretKey+"&",
		  method: "Get",
		  success(respones) {
			  let {access_token}=respones.data;
			  console.log(access_token)
			  that.setData({
				  access_token
				});
		  }
		 })
	},
	aa(){
		console.log(111)
	},
	bindBeginDateChange(e) {
		console.log('picker发送选择改变，携带值为', e.detail.value)
		this.setData({
			beginDate: e.detail.value
		});
		 this.compareDate();
	},
	bindEndDateChange: function(e) {
	    //结束时间
	    console.log('picker发送选择改变，携带值为', e.detail.value)
	    this.setData({
	      endDate: e.detail.value
	    });
		 this.compareDate();
	  },
	  compareDate: function() {
	      let beginDate = this.data.beginDate;
	      let endDate = this.data.endDate;
	      if (beginDate != "" && endDate != "") {
	        let _dateE = moment(endDate);
	        let day = _dateE.differ(beginDate, 'day') + 1;
	        this.setData({
	          totalDays: day
	        });
	        //计算价格
	        // this.count_price();
	      }
	    },
	scanID(){
		//扫描身份证号码
		console.log(111)
		var that = this;
		let access_token=this.data.access_token;
		cwx.OcrIdCard(access_token).then(function(_res){
			var trdata = _res.data.words_result;
			console.log(trdata)
			that.setData({
			  realName: trdata['姓名'].words,
			  IDCard: trdata['公民身份号码'].words,
			  userloc: trdata['住址'].words
			})
		})   
	},
	scanDevice(){
		//扫描设备二维码
		let that=this;
		wx.scanCode({
			success(res) {
				 var result = res.result;
				 // 扫描设备后判断是否是完好的
				 that.handleVerification(result);
			}
		})
	},
	handleVerification(equipmentNum){
		//检查设备是否是完好的
		let that=this;
		
		scanningVerification({
			deviceMAC:equipmentNum
		}).then((res)=>{
			console.log(res)
			let {data}=res;
			//检查成功了之后
			that.addData({
				deviceMAC:data.deviceMAC,
				deviceName:data.deviceName,
				deviceType:data.deviceType
			});
		})
	},
	addData(equipmentNum){
		//添加设备
		let sbNumber=this.data.sbNumber;
		sbNumber.push(equipmentNum);
		let number=sbNumber.length;
		this.setData({
			 sbNumber,
			 number
		});
		//计算价格
		this.jsPrice();
	},
	handlePrice(e){
		let price=e.detail.value;
		this.setData({
			price
		})
		//计算价格
		this.jsPrice();
	},
	handleClose(e){
		 let index=e.currentTarget.dataset.index;
		let sbNumber=this.data.sbNumber;
		sbNumber.splice(index,1);
		console.log(sbNumber);
		let number=sbNumber.length;
		this.setData({
			sbNumber,
			number
		});
		//计算价格
		this.jsPrice();
	},
	jsPrice(){
		let number=this.data.number;
		let price=this.data.price;
		let totalDays=this.data.totalDays;
		let allPrice=number*price*totalDays;
		allPrice=utils.toFixed(allPrice,2)
		this.setData({
			totalPrice:allPrice
		})
	},
	handlePhone(e){
		console.log('手机号', e.detail.value)
		this.setData({
		  mobilePhone: e.detail.value
		});
		
	},
	handleDays(e){
		console.log('天数', e.detail.value)
		this.setData({
		  totalDays: e.detail.value
		});
		
		//计算价格
		this.jsPrice();
	},
	smBind(){
		//录入
		let mobilePhone=this.data.mobilePhone;
		let realName=this.data.realName;
		let IDCard=this.data.IDCard;
		let totalDeviceNum=this.data.number;
		let days=this.data.totalDays;
		//单价
		let price=utils.toFixed(this.data.price*100);
		//总价
		let totalPrice=utils.toFixed(this.data.totalPrice*100);
		//开开始时间
		let startTime=moment().format('YYYY-MM-DD');
		//结束时间
		let endTime=moment().add(days-1, 'day').format('YYYY-MM-DD');
		let orderDeviceList=this.data.sbNumber;
		let data={
			mobilePhone,
			realName,
			IDCard,
			price,
			totalDeviceNum,
			
			totalPrice,
			days,
			startTime,
			endTime,
			orderDeviceList
		};
		console.log(data);
		let that=this;
		// 条件判断
		//设备
		if(orderDeviceList.length==0){
			wx.showToast({
			  title: "请先增加设备" ,
			  icon: "none",
			  duration: 3000
			});	
			return false;
		}
		//单价
		if(!price||price=="0"){
			wx.showToast({
			  title: "请先添加设备单价" ,
			  icon: "none",
			  duration: 3000
			});	
			return false;
		}
		//天数
		if(!days){
			wx.showToast({
			  title: "请先添加租用天数" ,
			  icon: "none",
			  duration: 3000
			});	
			return false;
		}
		//手机号
		if(mobilePhone.length!=11){
			wx.showToast({
			  title: "请输入正确的手机号" ,
			  icon: "none",
			  duration: 3000
			});	
			return false;
		}
		//姓名
		if(!realName){
			wx.showToast({
			  title: "请添加正确的姓名" ,
			  icon: "none",
			  duration: 3000
			});	
			return false;
		}
		//身份证
		if(!IDCard){
			wx.showToast({
			  title: "请添加身份证号码" ,
			  icon: "none",
			  duration: 3000
			});	
			return false;
		}
		placeOrder(data).then((res)=>{
			wx.showToast({
			  title: res.message || "提交成功",
			  icon: "none",
			  duration: 3000
			});
			//成功之后清空一些数据
			that.initData();
		})
	},
	initData(){
		//清空数据
		this.setData({
			sbNumber: [],
			price:0,//单价
			number:0,//台数
			mobilePhone:"",//手机号码
			realName:"",//姓名
			IDCard:"",//身份证
			beginDate: "",
			endDate: "",
			totalDays:0,//总的天数
			totalPrice:0,
		});
		
		
	}
})
