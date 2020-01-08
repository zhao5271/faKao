// pages/newsDetail/newsDetail.js
import { News } from '../../models/news'
import * as WxParse from '../../wxParse/wxParse'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:Number  // 文章id
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    this.data.id = Number.parseInt(options.id)
    await this.getDetail()
  },

//  获取新闻详情页数据
  async getDetail () {
    const newsDetail = await News.getDetail(this.data.id)
    const content = newsDetail.content
    const time = newsDetail.add_time.split(" ")

    this.setData({
      newsDetail,
      content,
      time: time[0]
    })
    WxParse.wxParse("content","html",content,this)
  }

})
