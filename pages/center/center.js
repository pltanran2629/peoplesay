// pages/center/center.js
const app = getApp()
Page({
  data: {
    CustomBar: app.globalData.CustomBar,
    icon: [{
      name: 'favor',
      isShow: true
    }, {
      name: 'notice',
      isShow: true
    }, {
      name: 'community',
      isShow: true
    }, {
      name: 'group',
      isShow: true
    }]
  },
  tonotice: function () {
    wx.navigateTo({
      url: '../notice/notice',
    })
  },
  handleContact(e) {
    console.log(e.detail.path)
    console.log(e.detail.query)
  },
  toaboutus(){
    wx.navigateTo({
      url: '../aboutus/aboutus',
    })
  },
  torecord(){
    wx.navigateTo({
      url: '../record/record',
    })
  },
  toquestion(){
    wx.navigateTo({
      url: '../question/question',
    })
  }
})