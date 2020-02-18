// pages/pay/pay.js
import { Pay } from '../../models/pay'
import { LessonData } from '../../models/LessonData'
import * as WxParse from '../../wxParse/wxParse'

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
    this.data.productId = options.productId
    this.setData({
      status: options.status // 判断订单是否支付
    })
    await this.getDetail()
  },
  //  初始化商品详情数据
  async getDetail () {
    const lessonData = await LessonData.getLesson(this.data.productId)
    this.setData({
      image: lessonData.storeInfo.image,
      title: lessonData.storeInfo.store_name,
      description: "测试",
      price: lessonData.storeInfo.price
    })
    console.log(this.data)
  },


  //  前往支付
  async toCreatePay () {
    const data = this.data
    wx.showLoading({
      title: '支付请求发起中...',
      mask: true
    })
    setTimeout(()=>{
      wx.hideLoading()
      wx.lin.showToast({
        title: '支付请求超时！',
        icon: 'error'
      })
    },3000)
    const res = await Pay.create(data);
  },

  // 完成 未付款
  async toOverPay () {
    wx.showLoading({
      title: '支付请求发起中...',
      mask: true
    })
    setTimeout(() => {
      wx.hideLoading()
      wx.lin.showToast({
        title: '支付请求超时！',
        icon: 'error'
      })
    }, 3000)
    const res = await Pay.overPay(this.data.productId);
  }
})
