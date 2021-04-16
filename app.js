// app.js
App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: function (res) {
        var code = res.code;//发送给服务器的code
        wx.getUserInfo({
          success: function (res) {
            var userNick = res.userInfo.nickName; //用户昵称
            var avataUrl = res.userInfo.avatarUrl;//用户头像地址
            if (code) {
              wx.request({
                url: 'http://hotpotman.tech/user/register',
                data: {
                  code: code,
                  nick: userNick,
                  avaurl: avataUrl,
                },
                header: {
                  'content-type': 'application/json'
                },
                success: function (res) {
                  console.log('获取到的用户openid为：' + res.data.openid);
                  //可以把openid保存到本地缓存，方便以后调用
                  wx.setStorageSync('openid', res.data.openid);
                }
              })
            }
            else {
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
  globalData: {
    userInfo: null
  }
})
