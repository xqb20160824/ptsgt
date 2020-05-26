
// const request=require("./../utils/request");
import request from './../utils/request';
module.exports = {
	
	//登录接口
  loginReq:(data)=>{
    return request({
      url:"/api/users/applogin",
      method: 'post',
      data,
      flag:'login'
    })
  },
  //检查设备是否是完好的
  scanningVerification:(data)=>{
    return request({
      url:"/api/Devices/ScanningVerification",
      method: 'post',
      data
    })
  },
  //下单
  placeOrder:(data)=>{
    return request({
      url:"/api/orders/PlaceOrder",
      method: 'post',
      data
    })
  },
  
  //获取当日订单列表
  getCurrentDayOrderList:(data)=>{
	  return request({
	    url:"/api/orders/CurrentDayOrderList",
	    method: 'post',
	    data,
	    flag:'login'
	  })
	},
	//取消订单
	cancleOrder:(data)=>{
		  return request({
		    url:"/api/orders/CancelOrder",
		    method: 'post',
		    data
		  })
		}
}
