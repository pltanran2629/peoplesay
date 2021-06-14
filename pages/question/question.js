// pages/question/question.js
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

  },
  backtocenter: function () {
    console.log(getCurrentPages())
    wx.navigateBack({});
  },
  handleContact(e) {
    console.log(e.detail.path)
    console.log(e.detail.query)
  }
})