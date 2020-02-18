// pages/news/NewsData.js
import { NewsData } from '../../models/NewsData'
import {BannerData} from "../../models/BannerData";

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
    await this.getNewsCategory()
    await this.initNewsList()
  },

  goDetail (event) {
    const id =
    console.log(event)
  },

//  获取新闻列表数据
  async initNewsList () {
    const newsList = await NewsData.getList(this.data.newsCategory[0].id);
    this.setData({
      newsList: newsList.data.list
    })
  },
//  获取新闻列表banner图
  async initBanner () {
    const banners = await BannerData.getNewsBanner();
    this.setData({
      banners:banners.data
    })
  },
//  获取新闻分类
  async getNewsCategory() {
    const newsCategory = await NewsData.getCategory();
    console.log(newsCategory);
    this.setData({
      newsCategory: newsCategory.data
    })
  },

  //  点击segment选项卡，加载数据
  async onSegChange(e) {
    const newsList = await NewsData.getList(e.detail.activeKey)
    this.setData({
      newsList: newsList.data.list
    })
  },
  // 跳转到 新闻详情页
  onGotoDetail(event) {
    wx.navigateTo({
      url:`/pages/newsDetail/newsDetail?id=${event.detail.id}`
    })
  }
})
