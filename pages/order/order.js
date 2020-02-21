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
  async initDetail (id) {
    const res = await Order.getDetail(id)
    console.log(res);
    const time = res.data.updateTime.split("T");
    const date = time[0];
    const dateTime = time[1].split(".")[0]
    this.setData({
      data: res.data,
      date,
      dateTime
    })
  }
})
