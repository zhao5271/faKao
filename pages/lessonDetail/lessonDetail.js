// pages/lessonDetail/lessonDetail.js
import { Lesson } from '../../models/lesson'
import * as WxParse from '../../wxParse/wxParse'
import { Like } from '../../models/like'
import { Cart } from '../../models/Cart'

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
        }
      }
    })
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
    // const uid = wx.getStorageSync('uid')
    const data = await Like.getIsLike(this.data.lessonData.id, this.data.uid)
    if (data) {
      this.setData({ isLike: true })
      this.data.likeId = data.id
    } else {
      this.setData({ isLike: false })
    }
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
      }
    })
  },
  // 跳转到支付页面
  onGotoPay (event) {
    console.log(event)
    if (!this.data.uid) {
      this.toLogin()
      return
    }
    wx.navigateTo({
      url: '/pages/pay/pay'
    })
  },
})
