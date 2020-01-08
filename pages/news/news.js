// pages/news/news.js
import { News } from '../../models/news'

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    await this.initBanner()
    await this.initNewsList()
  },

  goDetail (event) {
    const id =
    console.log(event)
  },
  // 进入新闻详情页
 /* onGotoDetail (event) {
    const id = event.detail.id
    wx.navigateTo({
      url:`/pages/newsDetail/newsDetail?id=${id}`
    })
  },*/
//  获取新闻列表数据
  async initNewsList () {
    const newsList = await News.getList()
    this.setData({
      newsList
    })
  },
//  获取新闻列表banner图
  async initBanner () {
    const data = await News.getBanner()
    if (!data) {
      return
    }
    let banners = []
    data.forEach(item => {
      banners.push(item.image_input[0])
    })
    this.setData({
      banners
    })
  }
})
