// pages/lessonDetail/lessonDetail.js
import { Lesson } from '../../models/lesson'
import * as WxParse from '../../wxParse/wxParse'
import { Like } from '../../models/like'
import { Cart } from '../../models/Cart'
import { Order } from '../../models/order'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: Number, // 课程详情id
    lessonData: Object, // 课程信息
    isLike: false, // 课程是否被收藏
    likeId: Number, // 收藏课程的收藏id
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    this.initUid()
    this.setData({
      id: Number.parseInt(options.id)
    })
    await this.getDetail()
    await this.initIsLike()
    await this.initStatus()
  },

//  初始化商品详情数据
  async getDetail () {
    const lessonData = await Lesson.getLesson(this.data.id)
    const description = lessonData.storeInfo.description
    this.setData({
      lessonData: lessonData.storeInfo,
      description
    })
    WxParse.wxParse('content', 'html', description, this)
  },

//  添加到购物车
  async addCart () {
    if (!this.data.uid) {
      this.toLogin()
      return
    }
    const data = await Cart.addCart(this.data.uid, this.data.lessonData)
    wx.lin.showDialog({
      type: 'confirm',
      title: '提示',
      content: `${data.msg}是否前往我的购物车查看`,
      success: (res) => {
        if (res.confirm) {
          wx.navigateTo({
            url: '/pages/cart/cart'
          })
        }
      }
    })
  },
//  初始化用户uid
  initUid () {
    this.data.uid = wx.getStorageSync('uid')
  },
//  提示用户前往个人中心登录
  toLogin () {
    wx.lin.showDialog({
      type: 'confirm',
      title: '提示',
      content: '请前往个人中心登录',
      success: (res) => {
        if (res.confirm) {
          wx.switchTab({
            url: '/pages/my/my'
          })
        }
      }
    })
  },
//  初始化课程的收藏状态
  async initIsLike () {
    const data = await Like.getIsLike(this.data.lessonData.id, this.data.uid)
    if (data) {
      this.setData({ isLike: true })
      this.data.likeId = data.id
    } else {
      this.setData({ isLike: false })
    }
  },

//  添加收藏
  async addLike () {
    if (!this.data.uid) {
      this.toLogin()
      return
    }
    const data = await Like.addLike(this.data.uid, this.data.lessonData)
    wx.lin.showDialog({
      type: 'confirm',
      title: '提示',
      content: `${data.msg}是否前往我的收藏查看`,
      success: (res) => {
        if (res.confirm) {
          wx.navigateTo({
            url: '/pages/like/like'
          })
        }else if (res.cancel) {
          this.refresh()
        }
      }
    })
  },

  // 取消课程收藏
  delLike () {
    var that = this
    wx.lin.showDialog({
      type: 'confirm',
      title: '提示',
      content: '是否取消收藏该课程',
      success: (res) => {
        if (res.confirm) {
          const data = Like.delItem(this.data.likeId)
          that.setData({ isLike: false })
        }
      },
    })
  },
  // 跳转到支付页面
  onGotoPay (event) {
    console.log(this.data.lessonData)
    const productId = this.data.lessonData.id
    const status = this.data.status
    if (!this.data.uid) {
      this.toLogin()
      return
    }
    wx.navigateTo({
      url: `/pages/pay/pay?productId=${productId}&status=${status}`
    })
  },
  // 刷新，重新加载页面
  refresh () {
    var that = this;
    wx.redirectTo({
      url: `/pages/lessonDetail/lessonDetail?id=${that.data.id}`
    })
  },
  // 获取课程的支付状态
  async initStatus () {
    const res = await Order.getStatus(this.data.uid, this.data.id)
    console.log(res)
    this.setData({
      status: res.data
    })
    console.log(this.data.status);
  },
  // 进入课程观看页面
  onGotoLearn () {
    wx.navigateTo({
      url:`/pages/learn/learn?id=${this.data.id}`
    })
  },

})
