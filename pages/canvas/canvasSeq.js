
var app = getApp() ;
/**
 *  canvas 序列帧 
 */
var canvasSeq = {
  initial: function (userOptions){
    var final = {} ;
    var delta_w = 1 ; // canvas 动态 缩放比例
    var __ctx ; 

    var temp_arr = []; // 暂时 原图片地址 列表
    var images = []; // 下载后的本地图片 列表 
    var counts = 0; // 记录下载次数 

    var __isCanDraw = false ; // 当图片下载好后才能 开始序列帧 
    var __isLoadingEnded = false ; // 是否loading 结束
    
    var __isTurn = false ; // 是否改变当前方向 
    var __dir = 1 ; // 序列帧方向 >0 正 <0 负
    var seqInter ; // 定时器
    var option = {
        canvasId : "", // canvasID
        BathPath : "", // 序列帧 地址 文件夹
        TotalNumb:0, // 序列帧 数量 下标从1 开始
        fileType :"", // 图片格式 JPG / PNG 
        isLoop:true , // 是否循环
        frame : 10 , // 一秒多少帧

        canvas_width :0, // canvas 图片宽度 = canvas 宽度
        canvas_height :0 , // canvas 图片高度 = canvas 高度
        window_w :0, // 当前显示器 宽度
        org_w : 750 , // 原本 父级 大小

    }

    // 动态适配 canvas 宽度 并返回
    function resizeWindow()
    {
      // canvas 宽 高
      var res_w ,res_h ;
      var parm = {
        w:0,
        h:0,
      }
      parm.w = option.canvas_width * delta_w;
      parm.h = option.canvas_height / option.canvas_width * parm.w ;
      return parm ;
    }

    // 数据初始化 
    function updateOption() {
      for (var key in userOptions) {
        option[key] = userOptions[key];
      }

    }
    // 初始化 
    function canvasStarted()
    {
      // 数据初始化
      updateOption();
      // 计算 delta width
      delta_w = option.window_w / option.org_w;
      // 初始化 canvas CTX 
      __ctx = wx.createCanvasContext(option.canvasId, this) ;
      //  下载所有序列帧
      downloadImages();
      // temp 下载完成 画序列帧
      drawCanvas();
    }


    // 事先下载所有的序列帧
    function downloadImages()
    {
        for (var i = 1; i <= option.TotalNumb; i++) {
          var tempPath = option.BathPath + i + "." + option.fileType;
          // console.log("地址 ：", tempPath);
          temp_arr.push(tempPath);
        }
      tempdownload();
    }
    
    function tempdownload()
    {

      var downLoadTask = wx.downloadFile({
        url: temp_arr[counts],
        success: function (res) {
          if (res.statusCode == 200 )
          {
            images.push(res.tempFilePath);
            // 画第一帧 
            if (counts == 1) {
              __ctx.clearRect(0, 0, option.canvas_width * delta_w, option.canvas_height * delta_w);
              __ctx.drawImage(images[0], 0 * delta_w, 0 * delta_w, option.canvas_width * delta_w, option.canvas_height * delta_w);
              __ctx.draw();
            }
          }

        }
      })
      // 进度监听
      downLoadTask.onProgressUpdate((res) => {
        if (res.progress == 100) {

          counts++;
          // console.log("loading", counts, "张图片");

          // 监听进度
          var percent = Math.ceil(counts / option.TotalNumb * 100);
          final.onLoadingProgress(percent);

          if (counts == option.TotalNumb) {
            console.log("下载完成");
            __isLoadingEnded = true ;
            return ;
          }
          else
          {
            tempdownload();
          }
        }
      })
    }
    // 画序列
    function drawCanvas ()
    {
      final.index = 0 ;
      seqInter = setInterval(function(){
        if (!__isLoadingEnded) return ;
        if (!__isCanDraw) return ;
        // control
        final.control();

        __ctx.clearRect(0, 0, option.canvas_width * delta_w, option.canvas_height * delta_w);
        __ctx.drawImage(images[final.index], 0 * delta_w, 0 * delta_w, option.canvas_width * delta_w, option.canvas_height * delta_w);
        __ctx.draw();
        // 当反向回到原点 默认 恢复正方向

        final.index == 0 && __dir < 0 ? final.isTurn() : "" ;
        //  改变方向
        if (__isTurn)
        {  
          __isTurn = false ;
          __dir = __dir * -1 ;
        }
        __dir > 0 ? final.index++ : final.index--;

      }, 1000 / option.frame );



    }
    // 初始化 调用
    canvasStarted() ;

    /**
     *  外部调用
     */

    // 获取到 canvas 动态宽高
    final.GetSize = function(){
     var res = resizeWindow();
     return res ;
    }
    // 获取 图片 loading 进度 
    final.onLoadingProgress = function (percent) {
      console.log("loading ：" + percent + "%");
      return percent;
    }


    // 序列帧控制
    final.control = function (){
      if (option.isLoop) {
        // if (final.index == images.length) final.index = 0;
        if (final.index == images.length - 1  ) {
          final.isTurn();
        }

      }
      else {
        if (final.index == images.length) {
          clearInterval(seqInter);
        }
      }

    }
    // 开始 序列帧
    final.start = function () {
      __isCanDraw = true;
    }
    // 暂停序列帧 
    final.pause = function(){
      __isCanDraw = false;

    }
    // 关闭 循环
    final.distroy = function (){
      clearInterval(seqInter);
    }
    // 是否反向
    final.isTurn = function (){
      __isTurn = true ;
    }
    return final ;
  }

}



module.exports = {
  canvasSeq: canvasSeq ,

}






