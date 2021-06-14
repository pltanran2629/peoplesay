// pages/timetravel/timetravel.js
var lifetimelength = 0;
var lifetimejson;
var lengthsring = [];
var target=0;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    poetimg: "",
    poetanswer: "你想了解我什么，请选择感兴趣的标签",
    lifetime: "",
    tagname: '',
    showwantknow: false,
    askquestion: "好耶",
    iwant: "我想知道",
    swiper: {
      current: 0
    },
    length: [],
    poetryName: "",
    cover: false,
    poemdetail: ['选择查看的古诗呀'],
    poetryDynasty: '',
    poetName: "",
    poetryName: "",
    currentTab: 0,
    appreciate: "",
    comment: "",
    context: "",
    translate: "",
    introduct: false,
    intime1: false,
    intime2: false,
    intime3: false,
    ifshowdetail:false
  },
  backtopoetpage: function () {
    wx.navigateBack({})
  },

  onLoad: function (options) {
    var that = this;
    // 加载时间轴
    wx.request({
        url: 'https://hotpotman.tech/poet/life_sec',
        method: "GET",
        data: {
          poetId: wx.getStorageSync('poetid')
        },
        success(res) {
          lifetimelength = res.data.data.length;
          lifetimejson = res.data.data;
          wx.setStorageSync('lifeid', lifetimejson[0].lifeId)
          that.setData({
            lifetime: res.data.data,
          })
        }
      }),
      //  加载人物画像
      wx.request({
        url: 'https://hotpotman.tech/poet/img',
        data: {
          poetId: wx.getStorageSync('poetid'),
          direction: 2
        },
        success(res) {
          // var imgstring = res.data.data.poetImg;
          // var imgarr = imgstring.split(".");
          // console.log(imgarr);
          // var totalsrting = imgarr[0] + "2." + imgarr[1];
          that.setData({
            poetimg: res.data.data.poetImg
          })
        }
      })
    // 初次加载页面
    wx.request({
      url: 'https://hotpotman.tech/poetTalk/default_tags',
      data: {
        poetId: wx.getStorageSync("poetid"),
      },
      success(res) {
        console.log(res.data.data)
        wx.setStorageSync("newlifeid", res.data.data[3].newLifeId);
        for (let i = 0; i < 3; i++) {
          var itemlength = res.data.data[i].tagName.length;
          console.log(itemlength)
          lengthsring.push(itemlength);
        }
        console.log(lengthsring)
        that.setData({
          tagname: res.data.data,
          length: lengthsring
        })
      }
    }),
    this.showintroduction();
  },
showintroduction(){
  var that=this
    if (wx.getStorageSync('usertype') == 0) {
      if (target == 0) {
        that.setData({
          introduct: true,
          intime1: true,
          intime2: false,
          intime3: false
        })
        target++;
      }
    }
},
  // 指南
  inknow1() {
    var that = this;
    that.setData({
      intime1: false,
      intime2: true
    })
  },
  inknow2() {
    var that = this;
    that.setData({
      intime1: false,
      intime2: false,
      intime3: true
    })
  },
  inknow3() {
    var that = this;
    that.setData({
      introduct: false
    })
  },
  // 切换时间线
  swiperchange(e) {
    var that = this;
    var index = e.detail.current
    var lifeid = lifetimejson[index].lifeId;
    wx.setStorageSync('lifeid', lifeid);
    this.loadtagname();
    that.setData({
      poetanswer: "你想了解我什么，请选择感兴趣的标签",
      showwantknow: false,
      askquestion: "好耶"
    })
  },
  // 关键标签加载
  loadtagname() {
    var that = this
    wx.request({
      url: 'https://hotpotman.tech/poetTalk/tags',
      data: {
        poetId: wx.getStorageSync("poetid"),
        lifeId: wx.getStorageSync("lifeid")
      },
      success(res) {
        console.log(res.data.data);
        wx.setStorageSync("newlifeid", res.data.data[3].newLifeId);
        lengthsring = [];
        for (let i = 0; i < 3; i++) {
          var itemlength = res.data.data[i].tagName.length;
          console.log(itemlength)
          lengthsring.push(itemlength);
        }
        console.log(lengthsring)
        that.setData({
          tagname: res.data.data,
          length: lengthsring
        })
      }
    })
  },
  // 点击对应的标签
  choosetag(event) {
    var that = this
    wx.setStorageSync('tagid', event.currentTarget.dataset.tagid)
    wx.request({
      url: 'https://hotpotman.tech/question/randomOne',
      data: {
        tagId: event.currentTarget.dataset.tagid
      },
      success(res) {
        that.setData({
          // poetanswer: '阁下想和我一起欣赏竹林吗',
          poetanswer: res.data.data,
          showwantknow: true,
          poemdetail: ['选择查看的古诗呀'],
          poetryName: ""
        })
      }
    })
  },
  // 点击我想知道
  iwantknowanswer() {
    var that = this;
    that.setData({
      askquestion: "我想知道"
    })
    wx.request({
      url: 'https://hotpotman.tech/question/answer',
      data: {
        newLifeId: wx.getStorageSync('newlifeid'),
        poetId: wx.getStorageSync('poetid'),
        tagId: wx.getStorageSync('tagid')
      },
      success(res) {
        console.log(res.data.data)
        wx.setStorageSync('rightpoemid', res.data.data.poetryId)
        that.setData({
          poetanswer: res.data.data.poetryContent,
          poetryName: res.data.data.poetryName
        })
      }
    })
  },
  // 不想知道
  idontknow() {
    var that = this;
    that.setData({
      poetanswer: "换个标签试试叭",
      askquestion: "不感兴趣呀",
      poemdetail: ['选择查看的古诗呀'],

    })
  },
  // 打开弹窗
  opencover() {
    var that = this;
    that.setData({
        cover: true
      }),
      wx.request({
        url: 'https://hotpotman.tech/poetTour/poetry_desc',
        data: {
          poetryId: wx.getStorageSync('rightpoemid')
        },
        success(res) {
          console.log(res);
          that.setData({
            ifshowdetail:true,
            poemdetail: res.data.data.poetryContent,
            poetryDynasty: res.data.data.poetryDynasty,
            poetName: res.data.data.poetName,
            appreciate: res.data.data.poetryShangXi,
            comment: res.data.data.poetryAbout,
            translate: res.data.data.poetryFanYi,
            poetryName: res.data.data.poetryName
          })
          if (res.data.data.poetryShangXi == null) {
            that.setData({
              appreciate: '暂无收录，完善中...',
            })
          }
          if (res.data.data.poetryAbout == null) {
            that.setData({
              comment: '暂无收录，完善中...',
            })
          }
          if (res.data.data.poetryFanYi == null) {
            that.setData({
              translate: '暂无收录，完善中...',
            })
          }
        }
      })
  },
  // 关闭弹窗
  closecover() {
    var that = this;
    that.setData({
      cover: false
    })
  },
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
})