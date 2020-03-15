// pages/like/LikeData.js
import { LikeData } from '../../models/LikeData'

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
    await this.initLikeList()
  },
//  前往支付页面
  onPayOrder (event) {
    wx.navigateTo({
      url: "/pages/pay/pay"
    })
  },

//  进入课程详情
  onGotoDetail (event) {
    const lessonId = event.currentTarget.dataset.lessonId
    wx.navigateTo({
      url: `/pages/lessonDetail/lessonDetail?id=${lessonId}`
    })
  },
//  获取收藏课程列表
  async initLikeList () {
    const uid = wx.getStorageSync('uid');
    const res = await LikeData.getList(uid)
    this.setData({
      list: res
    })
  },
  //  长按删除收藏的课程
  onLongpress (event) {
    const likeId = event.currentTarget.dataset.likeId
    console.log(event)
    wx.lin.showDialog({
      type:"confirm",
      title:"提示",
      content: "确定从收藏中删除该课程吗",
      success: (res) => {
        if (res.confirm) {
          const resData = LikeData.delItem(likeId)
          wx.redirectTo({
            url: '/pages/like/like'
          })
        }
      }
    })
  }
})
