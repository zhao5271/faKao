// pages/lessonDetail/lessonDetail.js
import { LessonData } from '../../models/LessonData'
import { LikeData } from '../../models/LikeData'
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
    const lessonData = await LessonData.getDetail(this.data.id)
    this.setData({
      lessonData:lessonData.data
    })
  },

//  添加到购物车
/*  async addCart () {
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
  },*/
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
    const res = await LikeData.getIsLike(this.data.uid,this.data.lessonData.id)
    console.log(res)
    if (res.status != -1) {
      this.setData({ isLike: true })
      this.data.likeId = res.data.id
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
    let likeData = {};
    likeData.userId = this.data.uid;
    likeData.productId = this.data.lessonData.id;
    likeData.productName = this.data.lessonData.title;
    likeData.productImg = this.data.lessonData.img;
    likeData.productPrice = this.data.lessonData.price;

    const data = await LikeData.addLike(likeData)
    console.log(data);
    wx.lin.showDialog({
      type: 'confirm',
      title: '提示',
      content: `添加收藏${data.msg}，是否查看`,
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
          const data = LikeData.delItem(this.data.likeId)
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
    if (res.status == -1) {
      this.setData({status: 0});
    } else {
      this.setData({status: res.data});
    }
  },
  // 进入课程观看页面
  onGotoLearn () {
    wx.navigateTo({
      url:`/pages/learn/learn?id=${this.data.id}`
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
