// pages/register/register.js
import { PersonMsg } from '../../models/personMsg'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    personMsg: {}, // 个人信息
    formMsg:{}, // 存放页面中的表单信息
    isAdd: false, // 判断是插入个人信息还是修改个人信息
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
  // 提交用户信息
  getFormMsg(event){
    // 获取表格中的用户信息
    const formMsg = event.detail.value;
    formMsg.sex == "男"?formMsg.sex=1:formMsg.sex=0;
    formMsg.userId = this.data.uid;
    console.log(formMsg);
    // 提交信息的时候，判断是新增用户信息，还是修改用户信息
    if (this.data.isAdd) {
      this.addPersonMsg(formMsg);
    } else {
      this.updatePersonMsg(formMsg);
    }
  },

  // 从数据库中 ， 读取用户信息
  async getPersonMsg () {
    const res = await PersonMsg.getMsg(Number.parseInt(this.data.uid));
    if (res.status == -1) {
      this.data.isAdd = true;
      return;
    }
    this.setData({
      personMsg: res.data
    });
  },

  // 向数据库中插入 用户信息
  async addPersonMsg (formMsg) {
    const data = await PersonMsg.addMsg(formMsg)
    console.log(data)
    if (data.status == 0) {
      wx.lin.showToast({
        title: '信息新增成功~',
        icon: 'success',
      })
    } else {
      wx.lin.showToast({
        title: '信息新增失败，请联系管理员',
        icon: 'error',
      })
    }
  },

  // 修改用户信息
  async updatePersonMsg(formMsg) {
    formMsg.id = this.data.personMsg.id;
    const data = await PersonMsg.updateMsg(formMsg);
    if (data.status == 0) {
      wx.lin.showToast({
        title: '信息修改成功~',
        icon: 'success',
      })
    } else {
      wx.lin.showToast({
        title: '信息修改失败，请联系管理员',
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
