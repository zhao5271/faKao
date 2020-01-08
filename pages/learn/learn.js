// pages/learn/learn.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    src: "http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400",
    poster:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1577160631959&di=840a28d81bec01c11f3198019cd5458b&imgtype=0&src=http%3A%2F%2Fimg.redocn.com%2Fsheji%2F20150612%2Flansekeji30miaodaojishishipin_4503106.jpg",
    catalog:[
      {
        chapter:{
          title:'第一章'
        },
        selectShow:false,
        section:[
          {
            title:'1-1  课程讲解',
            url:''
          },
          {
            title:'1-2  课程讲解',
            url:''
          },
          {
            title:'1-3  课程讲解',
            url:''
          }
        ]
      },
      {
        chapter:{
          title:'第二章'
        },
        selectShow:false,
        section:[
          {
            title:'2-1  课程讲解',
            url:''
          },
          {
            title:'2-2  课程讲解',
            url:''
          },
          {
            title:'2-3  课程讲解',
            url:''
          },
          {
            title:'2-4  课程讲解',
            url:''
          },
          {
            title:'2-5  课程讲解',
            url:''
          }
        ]
      },
      {
        chapter:{
          title:'第三章'
        },
        selectShow:false,
        section:[
          {
            title:'3-1  课程讲解',
            url:''
          },
          {
            title:'3-2  课程讲解',
            url:''
          },
          {
            title:'3-3  课程讲解',
            url:''
          },
          {
            title:'3-1  课程讲解',
            url:''
          },
          {
            title:'3-2  课程讲解',
            url:''
          },
          {
            title:'3-3  课程讲解',
            url:''
          },
          {
            title:'3-4  课程讲解',
            url:''
          },
          {
            title:'3-5  课程讲解',
            url:''
          },
          {
            title:'3-6  课程讲解',
            url:''
          },
          {
            title:'3-7  课程讲解',
            url:''
          },
          {
            title:'3-8  课程讲解',
            url:''
          },
          {
            title:'3-9  课程讲解',
            url:''
          }
        ]
      }
    ]
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function (res) {
    this.videoContext = wx.createVideoContext('myVideo')
  },
  inputValue: '',

  bindInputBlur: function (e) {
    this.inputValue = e.detail.value
  },
})
