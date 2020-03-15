// pages/newsDetail/newsDetail.js
import { NewsData } from '../../models/NewsData'

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
    console.log(options)
    await this.getDetail(options.id)
  },

//  获取新闻详情页数据
  async getDetail (id) {
    const newsDetail = await NewsData.getDetail(id);
    let time = newsDetail.data.updateTime.split("T")[0];
    this.setData({
      newsDetail: newsDetail.data,
      time
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
