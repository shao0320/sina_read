// pages/read/index.js
let wxparse = require('../../wxParse/wxParse.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:0,
    prev_id: 0,
    next_id:0,
    chapter_info: {},
    novel_id: 0
  },
  //章节信息
  chapterInfo: function () {
    var that = this;
    wx.request({
      url: 'http://www.test.com/api/chapter/info/' + that.data.id,
      method: "post",
      data: {},
      dataType: "json",
      success: function (res) {
        console.log(res.data.data);
        //return false;
        if(res.data.code == 2000){
          that.setData({
            prev_id: res.data.data.prev_id,
            next_id: res.data.data.next_id,
            chapter_info: res.data.data.info,
            novel_id: res.data.data.info.novel_id
          });
          console.log(that.data);
          wxparse.wxParse('chapter_content','html',that.data.chapter_info.content, that);//解析html
        }
      }
    })
  },

  //更新小说页面的点击次数
  novelRead: function () {
    var that = this;
    console.log(this.data.novel_id);
    wx.request({
      url: 'http://www.test.com/api/novel/read/' + that.data.novel_id,
      method: "post",
      data: {},
      dataType: "json",
      success: function (res) {
        console.log(res.data);
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    this.setData({
      id: options.id,
      novel_id: options.novel_id,
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.chapterInfo();
    this.novelRead();
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