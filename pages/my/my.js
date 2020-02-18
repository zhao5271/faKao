// pages/my/my.js
import { User } from '../../models/user'
import { config } from '../../config/config'
import { Like } from '../../models/like'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: Object,
    openid: String,
    isLogin: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    await this.initOpenid()
  },

// 获取openid
  async initOpenid () {
    var that = this
    await wx.login({
      success (res) {
        if (res.code) {
          wx.setStorageSync("code", res.code)
          wx.request({
            url: `https://api.weixin.qq.com/sns/jscode2session`,
            data: {
              appid: config.appId,
              secret: config.AppSecret,
              js_code: res.code,
              grant_type: 'authorization_code'
            },
            success (res) {
              that.data.openid = res.data.openid
              //将获取到的openid存储到缓存中
              wx.setStorageSync('openid', res.data.openid)
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
  },
//    发送 用户数据
  async initUserData () {
    const data = await User.postInfo({
      headimgurl: this.data.userInfo.avatarUrl,
      sex: this.data.userInfo.gender,
      nickname: this.data.userInfo.nickName,
      openid: this.data.openid
    })
    wx.setStorageSync('uid', data.uid)
    wx.setStorageSync('userInfo', this.data.userInfo)
  },
// 用户登录
  onGotUserInfo (event) {
    const userInfo = wx.getStorageSync("userInfo")
    if (userInfo) {
      wx.lin.showToast({
        title: '请勿重复登录',
        icon: 'error',
        mark: true
      })
      return
    }
    wx.showLoading({
      title: '登陆中'
    })
    var that = this
    wx.getSetting({
      success (res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success: async function (res) {
              that.setData({
                userInfo: res.userInfo
              })
              await that.initUserData()
              wx.hideLoading()
            }
          })
        }
      },
      fail (error) {
        console.log('调用失败')
      }
    })
  },

  // 进入个人课程页面
  onGotoClasses (event) {
    if(!this.isLogin()){
      return
    }
    wx.navigateTo({
      url: '/pages/myClass/myClass'
    })
  },
  //  进入个人收藏页面
  onGotoLike (event) {
    if(!this.isLogin()){
      return
    }
    wx.navigateTo({
      url: "/pages/like/like"
    })
  },

  // 登录校验
  isLogin () {
    const uid = wx.getStorageSync("uid")
    if (!uid) {
        wx.lin.showToast({
          title: '请登录！',
          icon: 'error',
          mark: true
        })
        return false
    }
    return true
  }
})

