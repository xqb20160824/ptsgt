// pages/serviceAgreement/index.js
const WxParse = require('../../wxParse/wxParse.js');
// const WXAPI = require('../../wxapi/main')
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.contactUs();
  },
  contactUs() {
    let that = this;
    let docsContent="描述"
    WxParse.wxParse('article', 'html', docsContent, that, 5);
    return;
    // WXAPI.contactUs({
    // }).then(function (result) {
    //   let docsContent = result.params.contact[0].docsContent;
    //   WxParse.wxParse('article', 'html', docsContent, that, 5);
    // })

  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})