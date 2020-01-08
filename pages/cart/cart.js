// pages/cart/cart.js
import { Cart } from '../../models/Cart'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    icon:'/imgs/icon.png',
    iconSelect:'/imgs/iconSelect.png',
    isCheckAll: false,
    totalPrice: 0,
    cart: Array,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    console.log(options)
    await this.initCartList()
    console.log(this.data.cart)
  },
  // 单选
  onChangeTap (event) {
    const index = event.detail.key
    const cart = this.changeChecked(this.data.cart, index)
    this.setData({
      cart,
      isSelect:!this.data.isSelect
    })
    this.autoSelcetAll()
    this.countTotal()
  },

  onSelcetAll (event) {
    const isCheckAll = event.detail.checked
    const cart = this.checkAll(this.data.cart, isCheckAll)
    this.setData({
      isCheckAll,
      cart
    })
    this.countTotal()
  },
  // 单选
  changeChecked (cart, index) {
    cart[index].isChecked = !cart[index].isChecked
    return cart
  },
  //全选
  checkAll (cart, isCheckAll) {
    for (let i = 0; i < cart.length; i++) {
      cart[i].isChecked = isCheckAll
    }
    return cart
  },
  // 点击全选计算总价
  countTotal () {
    let totalPrice = 0
    if (!this.data.isCheckAll) {
      totalPrice = 0
    }
    this.data.cart.forEach(item => {
      if (item.isChecked) {
        totalPrice += item.price
      }
    })
    this.setData({
      totalPrice
    })
  },
  // 自动计算是否全选
  autoSelcetAll () {
    let count = 0
    let isCheckAll = false
    this.data.cart.forEach(item => {
      if(item.isChecked){
        count ++
      }
    })
    if (count === this.data.cart.length) {
      isCheckAll = true
    }
    this.setData({
      isCheckAll
    })
  },

  // 跳转到课程详情页
  onGotoDetail (event) {
    const lessonId = event.currentTarget.dataset.lessonId
    wx.navigateTo({
      url: `/pages/lessonDetail/lessonDetail?id=${lessonId}`
    })
  },
//  从接口中获取购物车列表数据
  async initCartList () {
    const cartList = await Cart.getList(wx.getStorageSync('uid'))
    cartList.data.forEach(item => {
      item.isChecked = false
    })
    this.setData({
      cart:cartList.data
    })
  },
//  长按删除购物车产品
  onLongpress (event) {
    const cartId = event.currentTarget.dataset.cartId
    wx.lin.showDialog({
      type:"confirm",
      title:"提示",
      content: "确定从购物车中删除该课程吗",
      success: (res) => {
        if (res.confirm) {
          const resData = Cart.delItem(cartId)
          console.log(resData)
          wx.redirectTo({
            url: '/pages/cart/cart'
          })
        }
      }
    })
  }
})
