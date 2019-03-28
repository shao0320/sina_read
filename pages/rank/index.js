const app=getApp();
const request=require("../../utils/requests");
Page({
  data:{
    read_rank: []//阅读榜单数据
  },

  //获取阅读榜单接口数据
  getReadRank:function(){
    var that=this;

    wx.request({
      url: 'http://www.test.com/api/read/rank',
      method: "post",
      data: {num: 8},
      dataType: "json",
      success: function(res){
        if(res.data.code == 2000){
          that.setData({
            read_rank: res.data.data
          })
        }
      }
    })
   
  },

 
  
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    this.getReadRank();//获取阅读排行
    
  },
   

  
})