const app = getApp()
var indexinteresting = [];
var target = 0;
Page({
  data: {
    poetinteresting: [],
    swiperIndex: 0,
    nowclientX: "",
    numswiper: 0,
    introduct: false,
    inindex1: false,
    inindex2: false
  },
  main() {
    console.log(111)
    wx.loadFontFace({
      family: 'stylefont',
      source: 'https://7775-wubh576-1gmqw25u1d0f40a5-1305563425.tcb.qcloud.la/fontindex.ttf?sign=c33e6a77e6172784cd8d23976b67795c&t=1622818930',
    })
    wx.loadFontFace({
      family: 'kaiti',
      source: 'https://7775-wubh576-1gmqw25u1d0f40a5-1305563425.tcb.qcloud.la/kaiti.TTF?sign=0e865f562168729e884fbb713532923c&t=1622818967',
    })
    wx.loadFontFace({
      family: 'poem',
      source: 'https://7775-wubh576-1gmqw25u1d0f40a5-1305563425.tcb.qcloud.la/timetravel%20(1).ttf?sign=612b1d917ac2c689f10c56d1d08fcb8d&t=1622818985',
    })
  },
  bindchange(e) {
    // console.log(e.detail.current)
    this.setData({
      swiperIndex: e.detail.current,
      numswiper: e.detail.current
    })
    console.log(indexinteresting)
    console.log(e.detail.current)
    if (e.detail.current == 5 * indexinteresting.length - 1) {
      this.onloadfive();
    }
  },
  onLoad() {
    var that = this;
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    // 登录
    wx.login({
      success: function (res) {
        var code = res.code; //发送给服务器的code
        console.log("code:" + code)
        wx.getUserInfo({
          success: function (res) {
            var userNick = res.userInfo.nickName; //用户昵称
            var avataUrl = res.userInfo.avatarUrl; //用户头像地址
            if (code) {
              wx.request({
                method: "POST",
                url: 'https://hotpotman.tech/user/login',
                data: {
                  code: code,
                  username: userNick,
                  photo: avataUrl,
                },
                header: {
                  'content-type': 'application/json'
                },
                success: function (res) {
                  console.log(res);
                  console.log('获取到的用户openid为：' + res.data.data.openId);
                  //可以把openid保存到本地缓存，方便以后调用
                  wx.setStorageSync('openid', res.data.data.openId);
                  wx.setStorageSync('token', res.data.data.token);
                  wx.setStorageSync('usertype', res.data.data.userStatus);

                  if (wx.getStorageSync('usertype') == 0) {
                    if (target == 0) {
                      that.setData({
                        introduct: true,
                        inindex1: true,
                        inindex2: false
                      })
                      target++;
                    }
                  }
                  that.onloadfive();
                }
              })
            } else {
              console.log("获取用户登录态失败！");
            }
          }
        })
      },
      fail: function (error) {
        console.log('login failed ' + error);
      }
    })

  },
  iknow() {
    var self = this;
    self.setData({
      inindex1: false,
      inindex2: true
    })
  },
  iknow1() {
    var self = this;
    self.setData({
      introduct: false
    })
  },
  onloadfive() {
    var that = this;
    wx.request({
      url: 'https://hotpotman.tech/poetStory/selectFive',
      method: "GET",
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        indexinteresting.push(res.data.data)
        console.log(indexinteresting)
        that.setData({
          poetinteresting: that.data.poetinteresting.concat(res.data.data)
        })
      }
    })
  },
  tointerestingthing: function (event) {
    console.log(event);
    var storyid = event.currentTarget.dataset.storyid;
    console.log(storyid)
    wx.setStorageSync('storyid', storyid);
    wx.navigateTo({
      url: '../interestingthing/interestingthing',
    })
  },
  onShareAppMessage() {
    const promise = new Promise(resolve => {
      setTimeout(() => {
        resolve({
          title: '听听古人在说什么'
        })
      }, 2000)
    })
    return {
      title: '听听古人在说什么',
      path: '/pages/index/index',
      promise
    }
  }
})