// pages/my/my.js
import { UserData } from '../../models/UserData'
import { config } from '../../config/config'
import { LikeData } from '../../models/LikeData'
import {promisic} from "../../miniprogram_npm/lin-ui/utils/util";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: Object,
    openid: String,
    sessiongKey: String,
    isLogin: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    await this.initOpenid()
  },

// 获取openid
  async initOpenid() {
    const res = await promisic(wx.login)();
    const data = await UserData.getOpenid(res.code);
    const obj = JSON.parse(data.data);
    this.data.openid = obj.openid;
    this.data.sessionKey = obj.session_key;
  },

//  向Java后台发送登陆请求
  async login() {
    let data = {};
    data.sessionKey = this.data.sessionKey;
    data.openid = this.data.openid;
    data.nickname = this.data.userInfo.nickName;
    data.avatar = this.data.userInfo.avatarUrl;

    const res = await UserData.login(data);
    wx.setStorageSync('uid', res.data.id)
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
              await that.login();
              setTimeout(() => {
                wx.lin.showToast({
                  title: '登陆失败！',
                  icon: 'error',
                  mark: true
                })
                wx.hideLoading()
              },8000);
              wx.hideLoading();
            }
          })
        }
      },
      fail (error) {
        wx.hideLoading()
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

