const app=getApp();
const request=require("../../utils/requests");
Page({
  data:{
    bookList:[],//小说列表数据
    page:1,//当前页数据
    total_page: null //页面总页数
  },

  //获取书单列表接口
  getNovelList: function(){
    var that = this;
    wx.request({
      url: 'http://www.test.com/api/book/list',
      method: "get",
      data: {page:that.data.page},
      dataType: "json",
      success: function(res){
        if(res.data.code == 2000){
          that.setData({
            page: res.data.data.page,
            total_page: res.data.data.total_page
          })

          //如果是第一页
          if(that.data.page == 1){
            that.setData({
              bookList:res.data.data.list
            })
          }else{
            wx.showToast({
              title: '加载中',
              icon: "loading",
              duration: 4000
            });
            that.setData({
              bookList: that.data.bookList.concat(res.data.data.list)
            })
          }
        }
      }
    })
  },
  //下拉刷新
  onPullDownRefresh: function(){
    this.setData({
      page: 1
    });
    this.getNovelList();
  },
  //上拉刷新
  onReachBottom: function(){

    console.log(this.data.page);
    //当前页最后一页的时候
    if(this.data.page >= this.data.total_page){
      wx.showToast({
        title: '没有更多记录',
        icon:'warn',
        duration:3000
      })
      return false;
    }
    //当前页面加1
    this.setData({
      page: this.data.page+1
    });

    this.getNovelList();
  },
  onLoad:function(options){
    this.getNovelList();
  },
  onUnload:function(){
    // 页面关闭
  }

  
})