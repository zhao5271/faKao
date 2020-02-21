// pages/home/home.js
import { Store } from '../../utils/store'
import {BannerData} from "../../models/BannerData";
import {LessonData} from "../../models/LessonData";

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
    Store.clear("uid")
    Store.clear("userInfo")
    await this.initIndexData()
  },

//   初始化首页的所有数据
  async initIndexData () {
    const banners = await BannerData.getIndexBanner()
    const lessones = await LessonData.getList()
    this.setData({
      banners:banners.data,
      lessones:lessones.data.list
    })
  }
})
