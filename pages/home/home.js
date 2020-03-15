// pages/home/home.js
import { Store } from '../../utils/store'
import {BannerData} from "../../models/BannerData";
import {LessonData} from "../../models/LessonData";
import {NewsData} from "../../models/NewsData";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    banners: [], // 轮播图信息
    lessones: [], // 课程列表信息
    recommendNews: [] // 推荐新闻
  },


  //进入课程详情页
  onGotoLessonDetail (event) {
    wx.navigateTo({
      url: '/pages/lessonDetail/lessonDetail'
    })
  },
  toLesson(event) {
    const id = Number.parseInt(event.currentTarget.id)
    wx.navigateTo({
      url: `/pages/lessonDetail/lessonDetail?id=${id}`
    })
  },
  // 进入新闻详情
  onGotoNewsDetail (event) {
    const id = Number.parseInt(event.currentTarget.id)
    wx.navigateTo({
      url: `/pages/newsDetail/newsDetail?id=${id}`
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    Store.clear("uid")
    Store.clear("userInfo")
    await this.initIndexData()
    await this.initRecommendNews()
  },

//   初始化首页的所有数据
  async initIndexData () {
    const banners = await BannerData.getIndexBanner()
    const lessones = await LessonData.getList()
    this.setData({
      banners:banners.data,
      lessones:lessones.data.list
    })
  },

  // 获取首页的推荐新闻信息
  async initRecommendNews() {
    this.setData({
      recommendNews : await NewsData.getRecommendNews()
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
