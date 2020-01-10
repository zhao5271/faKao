// pages/order/order.js
import { Order } from '../../models/order'

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
    await this.initDetail(options.orderId)
  },

  // 初始化订单详情数据
  async initDetail (pid) {
    const res = await Order.getDetail(pid)
    const time = res.data.payTime.split("T");
    const date = time[0];
    const dateTime = time[1].split(".")[0]
    this.setData({
      orderNo: res.data.orderNo,
      image: res.data.image,
      payPrice: res.data.payPrice,
      title: res.data.title,
      date,
      dateTime
    })
    console.log(date)
    console.log(dateTime)
  }
})
