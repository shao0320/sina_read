//index.js

const app=getApp();
// const request=require("../../utils/requests");
// const utils=require("../../utils/util");

Page({
  data: {
    userInfo: {},
    banners:[],
    news_list: [],
    clicks_list: []
  },
  
  //获取首页banner图接口
  bannerList: function(){
    var that = this;
    //console.log(this.banners);
    wx.request({
      url: 'http://www.test.com/api/home/banners',
      data:{num:3},
      method: "post",
      dataType: "json",
      success: function(res){
        if(res.data.code == 2000){
          that.setData({
            banners: res.data.data
          })
        }
      }
    })
  },
  //最新小说
  getNews: function(){
    var that = this;

    wx.request({
      url: 'http://www.test.com/api/home/news',
      data: { num: 3 },
      method: "post",
      dataType: "json",
      success: function (res) {
        if (res.data.code == 2000) {
          that.setData({
            news_list: res.data.data
          })
        }
      }
    })
  },

  //首页点击排行
  getClicks: function(){
    var that = this;

    wx.request({
      url: 'http://www.test.com/api/home/clicks',
      data: { num: 3 },
      method: "post",
      dataType: "json",
      success: function (res) {
        if (res.data.code == 2000) {
          that.setData({
            clicks_list: res.data.data
          })
        }
      }
    })
  },
  //处理滑动图，图片
  goToDetail:function(event){
    wx.switchTab({
      url:'../search/index'
    })
  },
  
  onLoad: function () {
    var that = this;

    wx.showToast({
      title: '努力加载中',
      icon: 'loading',
      duration: 5000
    });

    

    //调用首页banner图接口
    this.bannerList();
    this.getNews();
    this.getClicks();
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })
  }
})
