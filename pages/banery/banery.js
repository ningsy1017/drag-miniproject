
let {
  windowWidth,
  windowHeight,
  screenWidth,
  pixelRatio
} = wx.getSystemInfoSync();
let ratio = screenWidth/750
let back = wx.getBackgroundAudioManager();
let audio = wx.createInnerAudioContext()
let startX = 0     // 获取手指初始坐标
let startY = 0 
let x = 0
let y = 0
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
    audioSrc:'../pages/images/audio.mp3',
    showBack:false, // 返回按钮
    showReset:false, // 重玩按钮
    showImg:false,
    status:null,
    backgroundUrl:'',
    online:true,
    old_left:300,
    old_top:360,
    new_left:70,
    new_top:880,
    x_old:'',
    y_old:'',
    x_new:'',
    y_new:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(windowHeight,windowWidth,pixelRatio,screenWidth);
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // this.dialog = this.selectComponent("#dialog");
    // audio.src = '../../pages/images/audio.mp3';
    // audio.obeyMuteSwitch = false
    // audio.play();
    // this.backmusic()

  },
  showDialog(){
    this.dialog.showDialog();
  },
  closeImg(){
    this.setData({
      showImg:false,
      showBack:this.data.status == 1?true:false,
      showReset:this.data.status == 0?true:false
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
      back.src = ".././pages/images/audio.mp3";
      back.onEnded(() => {
        player();  // 音乐循环播放
      })
      back.onError((err)=>{
        console.log(err)
      })
    }
 },
 /**
  * 重新玩
  */
  resetStart(){
    this.setData({
      showReset:false,
      showBack:false,
      status:null,
      backgroundUrl:'https://nfdw.zhongzhenet.com/%E9%BB%98%E8%AE%A4%E8%83%8C%E6%99%AF.png',
      old_left:310,
      old_top:290,
      new_left:70,
      new_top:740,

    })
  },
  /**
   * 返回相机界面
   */
  reback(){
    wx.switchTab({
      url: '/pages/start/start',
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
      let rpxLeft = left/ratio;
      let rpxTop = top/ratio
      this.setData({
        old_left:rpxLeft,
        old_top:rpxTop
      })
     
      if((rpxLeft>220 && rpxLeft<260)&&(rpxTop>260 && rpxTop<300)){
        console.log('成功了')
        this.setData({
          backgroundUrl:'https://nfdw.zhongzhenet.com/%E6%88%90%E5%8A%9F%E5%90%8E%E8%83%8C%E6%99%AF.png',
          status:1,
          showImg:true
        })
      }
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
      let rpxLeft = left/ratio;
      let rpxTop = top/ratio
      this.setData({
        new_left:rpxLeft,
        new_top:rpxTop
      })
      console.log(rpxLeft,rpxTop)
      if((rpxLeft>100&&rpxLeft<150)&&(rpxTop>800&&rpxTop<850)){
        this.setData({
          backgroundUrl:'https://nfdw.zhongzhenet.com/%E6%88%90%E5%8A%9F%E5%90%8E%E8%83%8C%E6%99%AF.png',
          status:0,
          showImg:true
        })
      }
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