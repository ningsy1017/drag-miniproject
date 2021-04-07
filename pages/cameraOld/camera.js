// pages/camera/caera.js
let {
  windowWidth,
  windowHeight
} = wx.getSystemInfoSync()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    online:true,
    x:'',
    y:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      x:windowWidth-100,
      y:windowHeight-115
    });
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  },
  getPosition(evt){
    let {x,y} = evt.detail;
    let tvElement = null;
    let dusterElement=null;
    const tvQuery = wx.createSelectorQuery();
    const dusterQuery = wx.createSelectorQuery();
    tvQuery.select('.telev').boundingClientRect();
    dusterQuery.select('.duster-img').boundingClientRect();
    tvQuery.exec((res)=>{
        tvElement = res[0];
    })
    dusterQuery.exec((res)=>{
      dusterElement = res[0];
        if(y+dusterElement.height+50<tvElement.height && (x+dusterElement.width<(tvElement.left+tvElement.width))){
          if(y>200) return
          if(this.data.online){
                wx.showToast({
                  title: '触电了',
                  duration: 1000,
                  type:"info",
                  mask:true
              })
          }else{
            wx.showToast({
                title: '非常棒',
                duration: 1000,
                type:"info",
                mask:true
            })
          }
       }
    })
  },
  changeStatus(evt){
    let status = evt.currentTarget.dataset.status;
      this.setData({
        online:JSON.parse(status)
      })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})