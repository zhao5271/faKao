import { promisic } from '../miniprogram_npm/lin-ui/utils/util'
import { config } from '../config/config'

function successPay (data) {
  wx.requestPayment({
    timeStamp: data.timeStamp,
    nonceStr: data.nonceStr,
    package: data.package,
    signType: data.signType,
    paySign: data.paySign,
    success: function (res) {
      console.log(res)
      console.log('支付成功')
    },
    fail: function (res) {
      console.log(res)
      console.log('支付失败')
    },
    complete: function (res) {
      wx.switchTab('/pages/my/my')
    }
  })
}

class Pay {
  static create (data) {
    const openid = wx.getStorageSync('openid')
    const uid = wx.getStorageSync('uid')
    const amount = 0.01 // 产品的价格
    const productId = data.productId
    const title = data.title
    const image = data.image
    const description = data.description

    wx.request({
      url: 'http://smoothwater.natapp1.cc/pay/mini_pay',
      data: {
        openid,
        uid,
        productId,
        title,
        image,
        description,
        amount
      },
      method: 'GET',
      success (res) {
        successPay(res.data)
      }
    })
  }

  static overPay (productId) {
    const openid = wx.getStorageSync('openid')
    const uid = wx.getStorageSync('uid')
    wx.request({
      url: 'http://smoothwater.natapp1.cc/pay/over_pay',
      data: {
        openid,
        uid,
        productId,
      },
      method: 'GET',
      success (res) {
        successPay(res.data)
      }
    })
  }
}

export {
  Pay
}
