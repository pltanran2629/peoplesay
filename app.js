// app.js
App({
  onLaunch() {
    wx.cloud.init({
      env: "wubh576-1gmqw25u1d0f40a5",
      traceUser: true
    })
    if (!wx.cloud) {
      console.error('云环境失败')
    } else {
      wx.cloud.init({
        traceUser: true,
      })
    }
    // 展示本地存储能力
    // const logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)
    // // 登录
    // wx.login({
    //   success: function (res) {
    //     var code = res.code; //发送给服务器的code
    //     console.log("code:"+code)
    //     wx.getUserInfo({
    //       success: function (res) {
    //         var userNick = res.userInfo.nickName; //用户昵称
    //         var avataUrl = res.userInfo.avatarUrl; //用户头像地址
    //         if (code) {
    //           wx.request({
    //             method: "POST",
    //             url: 'https://hotpotman.tech/user/login',
    //             data: {
    //               code: code,
    //               username: userNick,
    //               photo: avataUrl,
    //             },
    //             header: {
    //               'content-type': 'application/json'
    //             },
    //             success: function (res) {
    //               console.log(res);
    //               console.log('获取到的用户openid为：' + res.data.data.openId);
    //               //可以把openid保存到本地缓存，方便以后调用
    //               wx.setStorageSync('openid', res.data.data.openId);
    //               wx.setStorageSync('token', res.data.data.token);
    //               wx.setStorageSync('usertype', res.data.data.userStatus);

    //             }
    //           })
    //         } 
    //         else {
    //           console.log("获取用户登录态失败！");
    //         }
    //       }
    //     })
    //   },
    //   fail: function (error) {
    //     console.log('login failed ' + error);
    //   }
    // })
    wx.setBackgroundFetchToken({
        token: wx.getStorageSync('token')
      }),
      wx.getBackgroundFetchData({
        fetchType: 'pre',
        success(res) {
          console.log(res.fetchedData) // 缓存数据
          console.log(res.timeStamp) // 客户端拿到缓存数据的时间戳
          console.log(res.path) // 页面路径
          console.log(res.query) // query 参数
          console.log(res.scene) // 场景值
        }
      })
  },
  globalData: {
    userInfo: null
  },

})