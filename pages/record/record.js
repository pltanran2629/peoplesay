
Page({
  data: {
    lifetime: ['您暂时还没有访问记录嗷...'],

  },
  onLoad: function (options) {
    var that = this;
    wx.request({
      url: 'https://hotpotman.tech/user/tour_history',
      header: {
        "token": wx.getStorageSync('token')
      },
      method: "GET",
      success(res) {
        console.log(res);
        that.setData({
          lifetime: res.data.data
        })
      }
    })
  },
  todetail(event){
console.log(event);
wx.setStorageSync('poetid', event.currentTarget.dataset.poetid)
wx.navigateTo({
  url: '../lifetravel/lifetravel',
})
  },
  backtocenter() {
    wx.navigateBack({})
  }
})