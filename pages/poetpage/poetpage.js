// pages/poetpage/poetpage.js
var target = 0;
Page({
  data: {
    poetimg: "",
    introduct: false
  },
  backtodialog: function () {
    wx.navigateBack({});
  },
  topagetimetravel: function () {
    wx.navigateTo({
      url: '../timetravel/timetravel',
    })
  },
  topagelifetravel() {
    wx.navigateTo({
      url: '../lifetravel/lifetravel',
    })
  },
  onLoad: function (options) {
    var that = this;
    if (wx.getStorageSync('usertype') == 0) {
      if (target == 0) {
        that.setData({
          introduct: true
        })
        target++;
      }
    }
    wx.request({
      url: 'https://hotpotman.tech/poet/img',
      data: {
        poetId: wx.getStorageSync('poetid'),
        direction: 1
      },
      method: "get",
      success(res) {
        console.log(res)
        // var imgstring = res.data.data.poetImg;
        // var imgarr = imgstring.split(".");
        // console.log(imgarr);
        // var totalsrting = imgarr[0] + "1." + imgarr[1];
        // console.log(totalsrting)
        that.setData({
          poetimg: res.data.data.poetImg
        })
      }
    })

  },
  iknow() {
    var that = this;
    that.setData({
      introduct: false
    })
  }
})