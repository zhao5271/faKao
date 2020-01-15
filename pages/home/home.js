// pages/home/home.js
import { HomeData } from '../../models/homeData'
import { Store } from '../../utils/store'

Page({

  /**
   * 页面的初始数据
   */
  data: {},
  // 进入新闻详情页
  onGotoNewsDetail (event) {
    const id = Number.parseInt(event.currentTarget.id)
    wx.navigateTo({
      url: `/pages/newsDetail/newsDetail?id=${id}`
    })
  },
  //进入课程详情页
  onGotoLessonDetail (event) {
    wx.navigateTo({
      url: '/pages/lessonDetail/lessonDetail'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    await this.initIndexData()
    Store.clear("uid")
    Store.clear("openid")
    Store.clear("code")
    Store.clear("userInfo")
  },

//   初始化首页的所有数据
  async initIndexData () {
    const banners = await HomeData.getBanner()
    const classes = await HomeData.getClasses()
    this.setData({
      banners,
      classes
    })
  }
})
