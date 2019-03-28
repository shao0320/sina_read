// pages/chapter/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    novel_id: 0,//小说id
    chapter_list: [] //章节列表
  },
  //获取章节列表的函数
  chapterList: function(){
    var that=this;
    wx.request({
      url: 'http://www.test.com/api/chapter/list/'+that.data.novel_id,
      method: "post",
      data: {},
      dataType: "json",
      success: function(res){
        console.log(res);
        if(res.data.code == 2000){
          that.setData({
            chapter_list: res.data.data
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    this.setData({
      novel_id: options.novel_id
    });
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 10000
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // 页面渲染完成
    wx.hideToast();

    this.chapterList();
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