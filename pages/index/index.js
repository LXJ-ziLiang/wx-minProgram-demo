//index.js
//获取应用实例
const app = getApp()


Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),

    BASE_PATH: app.globalData.BATH_PATH ,

    Window_height: 0, // 页面高度
    Window_width: 0, // 页面宽度
    canvas_w : 0, // canvas 宽度
    canvas_h : 0, // canvas 高度 

    // 轮播图
    loopContainer : [
      app.globalData.BATH_PATH + "images/temp/themeBg1.png" ,
      app.globalData.BATH_PATH + "images/temp/themeBg2.png" ,
      app.globalData.BATH_PATH + "images/temp/themeBg3.png" ,
      app.globalData.BATH_PATH + "images/temp/themeBg4.png" ,
      app.globalData.BATH_PATH + "images/temp/themeBg5.png" ,
      app.globalData.BATH_PATH + "images/temp/themeBg6.png" ,
      app.globalData.BATH_PATH + "images/temp/themeBg7.png" ,
      app.globalData.BATH_PATH + "images/temp/themeBg1.png" ,
    ],

    cur_theme: 0, // 当前 左边第一个 中间卡片 - 2 
    __curSeq:[0,1,2,3,4],// 当前 card 顺序
  }, 
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },

  onLoad: function () {
    var that = this;
    wx.setNavigationBarTitle({
      title: 'Demo',
    });

    //  动态设置页面的高度
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          Window_height: res.windowHeight,
          Window_width : res.windowWidth ,
        });

      },
    });


    // 用户未授权 回调
    app.goToAuth = res => {
      this.ShowAuthPost();
    }


  },

  /**
   *  轮播 切换 调用
   */
  swipeChange: function(event){
    var curIndex = event.detail.current ;

    var curOrder = [];

    for (var i = 0 ; i < 5 ; i ++)
    {
      if (curIndex == 8)
      {
        curIndex = 0 ;
      }
      curOrder.push(curIndex);
      curIndex++;

    }
    console.log("order :",curOrder)
    this.setData({
      cur_theme: event.detail.current  ,
      __curSeq: curOrder ,
    })

  },
  
  swipeAnimFinish: function (event){

  },
  /**
 * 生命周期函数--监听页面初次渲染完成
 */
  onReady: function () {

  },

  /**
 * 生命周期函数--监听页面显示
 */
  onShow: function () {

  },
  // 获取用户信息
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },

  /**
   * 显示 授权遮罩
   */
  ShowAuthPost : function()
  {

  },

  /**
   *  用户分享
   */
  onShareAppMessage : function (res){

    // 分享标题
    var __shareTile = app.globalData.__shareTile.defaultTitle ; 
    // 分享图片
    var __shareImg = app.globalData.__shareImg.defaultImg ;
    // 分享地址
    var __path = "/pages/index/index";

    return {
      title: __shareTile ,
      path: __path ,
      imageUrl: __shareImg ,
      success : function (res)
      {
          // 分享成功回调

      }

    }
  }

})
