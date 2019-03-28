const app=getApp();
const request=require("../../utils/requests");
let wxparse = require("../../wxParse/wxParse.js");
Page({
  data:{
     smryHeight:"4.5rem",
     id:0,//小说主键id
     novel_detail: {},
     chapter_id: 0//小说第一章
  },
  extendBox:function(){
    if(this.data.smryHeight=="4.5rem"){
      this.setData({smryHeight:"auto"});
    }else{
      this.setData({smryHeight:"4.5rem"});
    }   
  },

  //获取小说详情的接口数据
  novelDetail:function(){
    var that = this;
    wx.request({
      url: 'http://www.test.com/api/novel/detail/'+that.data.id,
      method: "post",
      data:{},
      dataType: "json",
      success: function(res){
        if(res.data.code == 2000){
          that.setData({
            novel_detail : res.data.data.detail,
            chapter_id: res.data.data.chapter_id
          });
          console.log(that.data.novel_detail.desc);
          wxparse.wxParse('desc', 'html', that.data.novel_detail.desc, that);
        }
        
      }
    })
  },
  //更新小说页面的点击次数
  novelClick: function(){
    var that = this;
    wx.request({
      url: 'http://www.test.com/api/novel/clicks/' + that.data.id,
      method: "post",
      data: {},
      dataType: "json",
      success: function (res) {
        console.log(res.data);
      }
    })
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    //console.log(options);
    this.setData({
      id: options.id
    });
    wx.showToast({
          title: '加载中',
          icon: 'loading',
          duration: 10000
        })
  },
  onReady:function(){
    // 页面渲染完成
    wx.hideToast();

    this.novelDetail();
    this.novelClick();
  },
  onShow:function(){
    // 页面显示
    console.log("显示");
    
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  }
})