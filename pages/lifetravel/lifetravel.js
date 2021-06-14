// pages/lifetravel/lifetravel.js
var periodarry = new Array();
var periodindex = 0;
var target = 0
Page({
  data: {
    period: "",
    poetimg: "",
    poemquestion: "",
    poemradio: "",
    poetryname: "",
    showcover: false,
    righanwser: false,
    wrongeanwser: false,
    nextquestion: false,
    nexttime: false,
    rightdetail: "",
    choose: false,
    appreciate: "",
    comment: "",
    translate: "",
    disable: false,
    poetrylife: "",
    rightnum: "",
    choosewhat: "",
    currentTab: 0,
    poem: "",
    poetryDynasty: "",
    onepoem: 0,
    showchoseques: true,
    maxlifeid: 0,
    introduct: false
  },
  backtopoetpage() {
    wx.navigateBack({})
  },
  inlife() {
    var that = this;
    that.setData({
      introduct: false
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
    // 获取人生阶段
    wx.request({
        url: 'https://hotpotman.tech/poet/life_sec',
        header: {
          "token": wx.getStorageSync('token')
        },
        data: {
          poetId: wx.getStorageSync('poetid')
        },
        success(res) {
          console.log(res)
          periodarry = res.data.data;
          console.log(periodarry)
          that.setData({
            period: res.data.data
          })
        }
      }),
      // 诗人画像
      wx.request({
        url: 'https://hotpotman.tech/poet/img',
        data: {
          poetId: wx.getStorageSync('poetid'),
          direction: 3
        },
        success(res) {
          console.log(res)
          // var imgstring = res.data.data.poetImg;
          // var imgarr = imgstring.split(".");
          // // console.log(imgarr);
          // var totalsrting = imgarr[0] + "3." + imgarr[1];
          that.setData({
            poetimg: res.data.data.poetImg
          })
        }
      })
    this.havevisited()
  },
  //  tab切换逻辑
  swichNav: function (event) {
    console.log(event)
    var that = this;
    if (this.data.currentTab === event.target.dataset.current) {
      return false;
    } else {
      console.log(event.target.dataset.current)
      that.setData({
        currentTab: event.target.dataset.current
      })
    }
  },
  bindChange: function (e) {
    var that = this;
    that.setData({
      currentTab: e.detail.current
    });
  },
  // 弹窗关闭
  close() {
    var that = this;
    that.setData({
      showcover: false
    })
  },
  // 展示弹窗
  showcover(event) {
    console.log(event)

    var that = this;
    that.setData({
      showchoseques: true
    })
    if (event.currentTarget.dataset.lifeid) {
      wx.setStorageSync('lifeid', event.currentTarget.dataset.lifeid)
      periodindex = event.currentTarget.dataset.index
    }
    if (wx.getStorageSync('havevisited') >= wx.getStorageSync('lifeid')) {
      console.log("成功")
      wx.request({
        url: 'https://hotpotman.tech/poetTour/tour_question',
        method: "GET",
        header: {
          "token": wx.getStorageSync('token')
        },
        data: {
          poetId: wx.getStorageSync('poetid'),
          lifeId: wx.getStorageSync('lifeid')
        },
        success(res) {
          // var onepoem = 0;
          console.log(res.data);
          wx.setStorageSync('rightnum', res.data.data.rightNum);
          wx.setStorageSync('rightpoem', res.data.data.optionList[res.data.data.rightNum]);
          wx.setStorageSync('rightpoemid', res.data.data.poetryId);
          for (let j = 0; j < 2; j++) {
            if (res.data.data.questionList[j] !== null)
              that.setData({
                onepoem: res.data.data.questionList[j].length
              })
          }
          for (let i = 0; i < 4; i++) {
            if (res.data.data.questionList[i] == null) {
              res.data.data.questionList[i] = ""
              for (let k = 0; k < that.data.onepoem; k++) {
                res.data.data.questionList[i] += "_____"
              }
              if (i % 2 === 0) res.data.data.questionList[i] += "，"
              else res.data.data.questionList[i] += "。"
            }
          }
          that.setData({
            rightnum: res.data.data.rightNum,
            poetrylife: res.data.data.lifeName,
            showcover: true,
            poemquestion: res.data.data.questionList,
            poetryname: res.data.data.poetryName,
            poemradio: res.data.data.optionList,
            righanwser: false,
            wrongeanwser: false,
            nextquestion: false,
            nexttime: false,
            rightdetail: "",
            choose: false,
            appreciate: "",
            comment: "",
            context: "",
            translate: "",
            showchoseques: true,
            disable: false
          })
        }
      })
    } else {
      that.setData({
        showcover: true,
        showchoseques: false
      })
    }
  },
  // 选择题作答
  bandleChange(e) {
    var that = this;
    var chosenans = e.detail.value;
    var rightans = wx.getStorageSync('rightnum');
    that.setData({
      choosewhat: chosenans
    })
    if (chosenans == rightans) {
      that.setData({
          righanwser: true,
          nextquestion: true,
          nexttime: true,
          wrongeanwser: false,
          disable: true
        }),
        this.showrightlife();
    } else {
      that.setData({
          wrongeanwser: true,
          righanwser: false,
          nextquestion: true,
          nexttime: false,
          disable: true
        }),
        this.showwrongepoem();
    }
  },
  // 答对了
  showrightlife() {
    var self = this;
    wx.request({
      url: 'https://hotpotman.tech/poetTour/life_desc',
      method: "GET",
      header: {
        "token": wx.getStorageSync('token')
      },
      data: {
        lifeId: wx.getStorageSync('lifeid')
      },
      success(res) {
        console.log(res);
        self.setData({
            rightdetail: res.data.data.lifeDesc,
            appreciate: "",
            comment: "",
            context: "",
            translate: ""
          }),
          self.havevisited();
      }
    })

  },
  // 答题错误，显示诗句的赏析，单个字的注释
  showwrongepoem() {
    var self = this;
    console.log(wx.getStorageSync('rightpoem'))
    wx.request({
      url: 'https://hotpotman.tech/poetTour/poetry_desc',
      header: {
        'content-type': 'application/json',
        "token": wx.getStorageSync('token')
      },
      data: {
        poetryId: wx.getStorageSync('rightpoemid')
      },
      method: "GET",
      success(res) {
        console.log(res.data),
          self.setData({
            poetryDynasty: res.data.data.poetryDynasty,
            poem: res.data.data.poetName,
            appreciate: res.data.data.poetryShangXi,
            comment: res.data.data.poetryAbout,
            context: res.data.data.poetryContent,
            translate: res.data.data.poetryFanYi,
          })
        if (res.data.data.poetryShangXi == null) {
          self.setData({
            appreciate: '暂无收录，完善中...',
          })
        }
        if (res.data.data.poetryAbout == null) {
          self.setData({
            comment: '暂无收录，完善中...',
          })
        }
        if (res.data.data.poetryFanYi == null) {
          self.setData({
            translate: '暂无收录，完善中...',
          })
        }
      }
    })
  },
  // 点击下一阶段
  nextlifetime(event) {
    periodindex++;
    var newlifeid = periodarry[periodindex].lifeId;
    wx.setStorageSync("lifeid", newlifeid);
    this.showcover(event);
  },
  // 解锁请求之前访问过第几阶段
  havevisited() {
    var that = this;
    console.log("执行了")
    wx.request({
      url: 'https://hotpotman.tech/user/tour_cplt',
      header: {
        'token': wx.getStorageSync('token')
      },
      data: {
        poetId: wx.getStorageSync('poetid')
      },
      success(res) {
        console.log(res);
        console.log("请求了")
        wx.setStorageSync('havevisited', res.data.data.lifeId);
        that.setData({
          maxlifeid: res.data.data.lifeId
        })
      }
    })
  }
})