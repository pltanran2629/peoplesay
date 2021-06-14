
Page({
  data: {
    interestingthingdetail: ""
  },
  onLoad: function (options) {
    var that = this;
    var storyid = wx.getStorageSync('storyid');
    wx.request({
      url: 'https://hotpotman.tech/poetStory/detail',
      method: "get",
      data: {
        storyId: storyid
      },
      success: function (res) {
        console.log(res);
        that.setData({
          interestingthingdetail: res.data.data[0]
        })
      }
    })
    // wx.loadFontFace({
    //   family: 'stylefont',
    //   source: 'url("http://bluemsum.tech:8082/font/fontindex.ttf")',
    // }),
    // wx.loadFontFace({
    //   family: 'kaiti',
    //   source: 'url("http://bluemsum.tech:8082/font/kaiti.TTF")',
    // })
  },
  backtoindex:function(){
    wx.navigateBack({})
  }
})