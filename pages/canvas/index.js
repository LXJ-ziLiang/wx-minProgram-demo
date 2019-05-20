// pages/canvas/index.js
const app = getApp()
const Canvas_require = require("canvasSeq.js");


Page({

  /**
   * 页面的初始数据
   */
  data: {
    BASE_PATH: app.globalData.BATH_PATH,

    Window_height: 0, // 页面高度
    Window_width: 0, // 页面宽度
    canvas_w: 0, // canvas 宽度
    canvas_h: 0, // canvas 高度 

    loadingProgress : 0 ,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.setNavigationBarTitle({
      title: 'Demo',
    });

    //  动态设置页面的高度
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          Window_height: res.windowHeight,
          Window_width: res.windowWidth,
        });

      },
    });
    this.CanvasSeq();

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
  /**
   *  序列帧 
   */
  CanvasSeq: function () {
    var that = this ;
    var canvas = Canvas_require.canvasSeq.initial({
      canvasId: "temp_seq", // canvasID
      BathPath: app.globalData.BATH_PATH + "images/p3/", // 序列帧 地址
      TotalNumb: 79, // image数量
      fileType: "jpg", // 图片格式 JPG / PNG 
      isLoop: true, // 是否循环 一旦设置control 此设置无效
      frame : 10 ,

      canvas_width: 675, // canvas 图片宽度 = canvas 宽度 px
      canvas_height: 380, // canvas 图片高度 = canvas 高度 px
      window_w: this.data.Window_width, // 当前显示器 宽度
      org_w: 750, // 原本 父级 大小
    });

    // 获取到 canvas 动态宽高
    var canvasSize = canvas.GetSize();
    this.setData({
      canvas_w: canvasSize.w,
      canvas_h: canvasSize.h,
    })
    // 监听 序列帧 下载进度
    canvas.onLoadingProgress = function (progress){
      //  console.log("progress:", progress);
      that.setData({
        loadingProgress: progress,
      });
    };
    // 开始播放序列帧
    canvas.start();
  },



})