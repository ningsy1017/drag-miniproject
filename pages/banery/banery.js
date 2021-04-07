// pages/banery/banery.js
let {
  windowWidth,
  windowHeight,
  screenWidth,
  pixelRatio
} = wx.getSystemInfoSync();
let ratio = screenWidth/750
let back = wx.getBackgroundAudioManager();
let startX = 0     // 获取手指初始坐标
let startY = 0 
let x = 0
let y = 0
let old_left = 0   // 获得盒子原来的位置
let old_top = 0
let new_left = 0   // 获得盒子原来的位置
let new_top = 0
let cSys = {} // 当前系统配置
let oldReact = [] // 拖拽元素宽高
let defaultH = 100 // 缺省高度
let defaultW = 100 // 缺省宽度

import Dialog from '../../miniprogram_npm/vant-weapp/dialog/dialog';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    showImg:false,
    defaultUrl:'http://i2.tiimg.com/735650/12183143c4a7f29b.png',
    online:true,
    showReset:false,
    old_left:310,
    old_top:300,
    new_left:10,
    new_top:74,
    x_old:'',
    y_old:'',
    x_new:'',
    y_new:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(windowHeight,windowWidth,pixelRatio,screenWidth)
    
    // this.backmusic()
  //   var innerAudioContext = wx.createInnerAudioContext()
  //   innerAudioContext.src='../pages/images/audio.mp3';
  //   innerAudioContext.onPlay(() => {
  //     console.log('开始播放')
  // })

  // innerAudioContext.onError((res) => {
  //     console.error(res)

  // })

  // innerAudioContext.play();
    this.setData({
      status:1,
      x_old:windowWidth-210,
      y_old:windowHeight-420,
      x_new:windowWidth-340,
      y_new:windowHeight-160
    });
    const query = wx.createSelectorQuery().in(this)
    query.select('.duster-img-old').boundingClientRect(res => {
      cSys = wx.getSystemInfoSync()
      oldReact = [res.width, res.height]
      const top = Math.floor(cSys.windowHeight - oldReact[1] - defaultH)
      const left = Math.floor(cSys.windowWidth - oldReact[0] - defaultW)
      console.log(top,left)
      this.setData({
        top,
        left
      })
    }).exec();
    
  },
 

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.dialog = this.selectComponent("#dialog");
    
  },
  showDialog(){
    this.dialog.showDialog();
  },
  closeImg(){
    this.setData({
      showImg:false
    })
  },
  //取消事件 
  _cancelEvent() {
    console.log('你点击了取消');
    this.dialog.hideDialog();
  }, 
  //确认事件 
  _confirmEvent() {
    console.log('你点击了确定');
    this.dialog.hideDialog();
  },
  backmusic: function () {
    player();
    function player() {
      back.title = "罗密欧与朱丽叶 ";   // 必须要有一个title
      back.src = "../pages/images/audio.mp3";
      back.onEnded(() => {
        player();  // 音乐循环播放
      })
      back.onError((err)=>{
        console.log(err)
      })
    }
 },
  resetStart(){
    this.setData({
      status:1,
      showReset:false,
      x_old:windowWidth-210,
      y_old:windowHeight-420,
      x_new:windowWidth-340,
      y_new:windowHeight-160
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },
  /**
   * 旧电池拖动
   */
    onTouchStart (e) {
      // 获取手指初始坐标
      startX = e.changedTouches[0].pageX;
      startY = e.changedTouches[0].pageY;
      x = e.currentTarget.offsetLeft;
      y = e.currentTarget.offsetTop;
      console.log(x/pixelRatio)
      console.log( e.changedTouches[0])
    },
    /**
     * 旧电池拖动
     * @param {*} e 
     */
    onTouchmoveOld (e) {
      // 计算手指的移动距离：手指移动之后的坐标减去手指初始的坐标
      const moveX = e.changedTouches[0].pageX - startX;
      const moveY = e.changedTouches[0].pageY - startY;
      // 移动盒子 盒子原来的位置 + 手指移动的距离
      // const top = Math.floor(Math.min(Math.max(0, y + moveY), cSys.windowHeight - oldReact[1]))
      // const left = Math.floor(Math.min(Math.max(0, x + moveX), cSys.windowWidth - oldReact[0]))
      const top = y + moveY;
      const left = x + moveX;
      if(top<0 || left<0){
        return false;
      }
      this.setData({
        old_left:left/ratio,
        old_top:top/ratio
      })
    },
    /**
     * 新电池拖动
     */
    onTouchmoveNew(e){
      const moveX = e.changedTouches[0].pageX - startX;
      const moveY = e.changedTouches[0].pageY - startY;
      const top = y + moveY;
      const left = x + moveX;
      if(top<0 || left<0){
        return false;
      }
      this.setData({
        new_left:left/ratio,
        new_top:top/ratio
      })
    },
     /**
     * 判断拖拽区域函数
     * @params {}
     */
    drageFun(currentX,currentY,targetObj){

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