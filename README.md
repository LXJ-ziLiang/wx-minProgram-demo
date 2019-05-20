# wx-minProgram-demo
微信小程序 插件 序列帧 3d透视轮播 

1.canvas 下 canvasSeq.js 为canvas 序列帧插件 

    var canvas = Canvas_require.canvasSeq.initial({
      canvasId: "temp_seq", // canvasID
      BathPath: app.globalData.BATH_PATH + "images/p3/", // 序列帧 地址
      TotalNumb: 79, // image数量
      fileType: "jpg", // 图片格式 JPG / PNG 
      isLoop: true, // 是否循环 一旦设置control 此设置无效
      frame : 10 , // 一秒 帧速率

      canvas_width: 675, // canvas 图片宽度 = canvas 宽度 px 动态适配canvas 大小
      canvas_height: 380, // canvas 图片高度 = canvas 高度 px
      window_w: this.data.Window_width, // 当前显示器 宽度
      org_w: 750, // 原本 父级 大小
    });
    // 序列帧开始
    canvas.start() ;
    // 暂停序列帧
    canvas.pause();
    // 序列帧销毁
    canvas.distroy();
    // 序列帧 反向
    canvas.isTurn（）;
    
    ps : 小程序 默认最大并发为10 所以 下载图片我是串行 下载
         pc 上跑 会有闪屏 真机实测 没有闪屏
         
 2.Index 文件下 为3d透视轮播
    
