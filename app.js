//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId

      }
    })
    // 获取用户信息 判断是否授权
    wx.getSetting({
      success: res => {
        // 判断用户是否授权个人信息获取
        if (res.authSetting['scope.userInfo']) {
            // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
            wx.getUserInfo({
              success: res => {
                // 可以将 res 发送给后台解码出 unionId
                this.globalData.userInfo = res.userInfo

                // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                // 所以此处加入 callback 以防止这种情况
                if (this.userInfoReadyCallback) {
                  this.userInfoReadyCallback(res)
                }

              }
            });
        }
        else
        {
          // 没有授权个人信息 回调  
          if (this.goToAuth)
          {
              this.goToAuth(res);
          }
        }


      }
    })
  },

  globalData: {
    userInfo: null,
    // 根目录
    BATH_PATH: "https://public.geek-in.net/resource/a20190517canvas/",
    // BATH_PATH : "../../",

    //  分享标题：
    __shareTitle :{
      defaultTitle:"如果这都不中奖，你怕不是非洲来的？",

    },

    // 分享图片：
    __shareImg : {

      defaultImg: "http://public.geek-in.net/resource/a20180803playHeart/images/share1.jpg",

    }


  }
})