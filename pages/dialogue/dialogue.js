// pages/dialogue/dialogue.js
var target = 0;
Page({
  data: {
    poetnameall: "",
    introduct: false
  },
  topoetpage: function (event) {
    var poetid = event.currentTarget.dataset.poetid;
    wx.setStorageSync('poetid', poetid);
    wx.navigateTo({
      url: '../poetpage/poetpage',
    })
  },
  onLoad: function (options) {
    var that = this;
    wx.request({
      url: 'https://hotpotman.tech/poet/all',
      method: "GET",
      success: function (res) {
        console.log(res.data.data);
        that.setData({
          poetnameall: res.data.data
        })
      }
    })
    if (wx.getStorageSync('usertype') == 0) {
      if (target == 0) {
        that.setData({
          introduct: true
        })
        target++;
      }
    }
  },
  iknow() {
    var that = this
    that.setData({
      introduct: false
    })
  },
  inputpoetname: function (e) {
    var that = this
    wx.request({
      url: 'https://hotpotman.tech/poet/search_poet',
      method: "GET",
      data: {
        name: e.detail.value
      },
      success: function (res) {
        console.log(res.data.data)
        that.setData({
          poetnameall: res.data.data
        })
      }
    })
  }
})