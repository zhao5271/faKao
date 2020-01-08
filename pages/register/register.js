// pages/register/register.js
import { PersonMsg } from '../../models/personMsg'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isWrited:false, // 判断是否写入个人信息
    personMsg: Object, // 个人信息
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.initInfo()
    this.isLogin()
  },
  onShow: async function () {
    this.initInfo()
    if (!this.data.userInfo) {
      return
    }
    await this.getPersonMsg()
  },
  // 获取form 中的数据
  getFormMsg(event){
    const formMsg = event.detail.value;
    this.data.formMsg = formMsg
  },

  // 从数据库中 ， 读取用户信息
  async getPersonMsg () {
    const res = await PersonMsg.getMsg(Number.parseInt(this.data.uid))
    this.setData({
      personMsg: res.data
    })
  },

  // 向数据库中插入 用户信息
  async addPersonMsg () {
    const data = await PersonMsg.addMsg(this.data.uid, this.data.personMsg)
    console.log(data)
    if (data.status == 200) {
      wx.lin.showToast({
        title: '信息提交成功~',
        icon: 'success',
      })
    } else {
      wx.lin.showToast({
        title: '信息提交失败，请联系管理员',
        icon: 'error',
      })
    }
  },

  // 判断用户是否登录
  isLogin () {
    if(!this.data.uid){
      this.toLogin()
    }
  },
  //  初始化登录用户数据
  initInfo () {
    this.data.uid = wx.getStorageSync('uid')
    const userInfo = wx.getStorageSync('userInfo')
    this.setData({ userInfo })
  },
//  提示用户前往个人中心登录
  toLogin () {
    wx.lin.showDialog({
      type: 'alert',
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
})
