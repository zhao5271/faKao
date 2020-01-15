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
    this.initWatched()
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
  },
  // 获取缓存中存储的 已观看的视频 的id数组
  initWatched () {
    if (!wx.getStorageSync('watchedArr')) {
      console.log("不存在")
      return
    }
    let watchedArr = wx.getStorageSync('watchedArr')

    let category = this.data.category
    // 遍历渲染，已经观看的课程的状态
    category.forEach(e => {
      e.categoryVoList.forEach(item => {
        if (watchedArr.includes(item.id)) {
          item.watched = 1
        }
      })
    })
    this.initSelected()
    this.setData({
      category
    })
    console.log(this.data)
  },

  initSelected () {
    const selectId = wx.getStorageSync('selected');
    if (!selectId) {
      return
    }
    this.data.category.selectId = selectId;
  }
})
