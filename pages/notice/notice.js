// pages/notice/notice.js
Page({
  data: {
    systemnotification:""
  },
  backtocenter: function () {
    console.log(getCurrentPages() )
    wx.navigateBack({});
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    wx.request({
      url: "https://hotpotman.tech/notice/all",
      method: "POST",
      success: function (res) {
        console.log(res);
        that.setData({
          systemnotification:res.data.data
        })
      }
    })
  }
})