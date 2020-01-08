// pages/lessons/lessons.js
import { Order } from '../../models/order'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    payedClass:Array, // 已付款课程
    noPayClass:Array, // 未付款课程
    allClass:Array, // 所有课程
    classes: Array,
    defaultRootId: 0,
    roots:[
      {
        id: 0,
        name:'全部课程'
      },
      {
        id: 1,
        name:'已付款'
      },
      {
        id: 2,
        name:'未付款'
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    await this.initAllClass()
  },

//  前往支付页面
  onPayOrder (event) {
    wx.navigateTo({
      url: "/pages/pay/pay"
    })
  },
//  前往课程观看页面
  onGotoLearn (event) {
    wx.navigateTo({
      url: `/pages/learn/learn`
    })
  },
//  查看订单详情
  onGotoOrder (event) {
    wx.navigateTo({
      url: "/pages/order/order"
    })
  },
//  进去课程详情页
  onGotoDetail (event) {
    console.log(event)
    const id = Number.parseInt(event.currentTarget.dataset.lessonId)
    wx.navigateTo({
      url: `/pages/lessonDetail/lessonDetail?id=${id}`
    })
  },
//  加载所有课程
  async initAllClass () {
    const uid = wx.getStorageSync('uid')
    const res = await Order.getList(uid)
    let payedClass = []
    let noPayClass = []
    res.data.forEach(item => {
      if(item.status == 1){
        payedClass.push(item)
      }else if(item.status == 0){
        noPayClass.push(item)
      }
    })
    this.setData({
      payedClass,
      noPayClass,
      allClass: res.data,
      Classes: res.data
    })
    console.log(res.data)
  },

//  点击segment选项卡，加载数据
  onSegChange (event) {
    const rootId = event.detail.activeKey
    let Classes = []
    if(rootId == 0){
      Classes = this.data.allClass
    }else if (rootId == 1) {
      Classes = this.data.payedClass
    }else if (rootId == 2) {
      Classes = this.data.noPayClass
    }
    this.setData({ Classes })
  }
})
