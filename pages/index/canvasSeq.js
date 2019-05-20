
var app = getApp() ;
/**
 *  canvas 序列帧 
 */
var canvasSeq = {
  initial: function (userOptions){
    var final = {} ;
    var delta_w = 1 ; // canvas 动态 缩放比例
    var __ctx ; 

    var option = {
        canvasId : "", // canvasID
        BathPath : "", // 序列帧 地址
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
      // // 动态计算 canvas 宽高
      // resizeWindow();
      __ctx = wx.createCanvasContext(option.canvasId, this) ;
      // 画图
      drawCanvas();
    }
    // 画序列
    function drawCanvas ()
    {
      console.log(__ctx)
      console.log(option.BathPath) ;

      // __ctx.drawImage(option.BathPath, 0 * delta_w, 0 * delta_w, option.canvas_width * delta_w, option.canvas_height * delta_w);

      wx.downloadFile({
        url: option.BathPath,
        success(res) {
          console.log(res)

          var url = res.tempFilePath;
          // console.log("图片下载", that.data[saveUrl]);
          __ctx.drawImage(url, 0 * delta_w, 0 * delta_w, option.canvas_width * delta_w, option.canvas_height * delta_w);
          __ctx.draw();
        }
      });
    }
    // 初始化 调用
    canvasStarted() ;

    /**
     *  外部调用
     */

    final.GetSize = function(){
     var res = resizeWindow();
     return res ;
    }

    return final ;
  }

}



module.exports = {
  canvasSeq: canvasSeq ,

}






