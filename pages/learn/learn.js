// pages/learn/learn.js
import { Category } from '../../models/category'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    src:"https://videocdn.taobao.com/oss/ali-video/d6bc4ae3eb3c866bee9903d47d1210c6/video.mp4",
    poster:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1577160631959&di=840a28d81bec01c11f3198019cd5458b&imgtype=0&src=http%3A%2F%2Fimg.redocn.com%2Fsheji%2F20150612%2Flansekeji30miaodaojishishipin_4503106.jpg",
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    console.log(options)
    this.setData({
      lessonId: options.id,
      url: options.url,
      title: options.title
    })
    await this.initClassData(options.id)

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

  // 获取课程的所有章与节
  async initClassData () {
    const res = await Category.getClassByPid(this.data.lessonId)
    this.setData({
      category: res.data.categoryVoList
    })
  }
})
