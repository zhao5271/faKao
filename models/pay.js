import { promisic } from '../miniprogram_npm/lin-ui/utils/util'
import { config } from '../config/config'
import {Http} from "../utils/http";

function successPay (data) {
  wx.requestPayment({
    timeStamp: data.timeStamp,
    nonceStr: data.nonceStr,
    package: data.package,
    signType: data.signType,
    paySign: data.paySign,
    success: async function (res) {
      console.log('支付成功')
      Pay.notify();
    },
    fail: function (res) {
      console.log('支付失败')
    },
    complete: function (res) {
      wx.switchTab('/pages/my/my')
    }
  })
}

class Pay {
  static async create(data) {
    console.log(data)
    const uid = wx.getStorageSync('uid')
    const amount = data.data.price // 产品的价格
    const productId = data.data.id
    const image = data.data.img
    const productName = data.data.title

    const res = await Http.request({
      url: "/pay/mini_pay",
      data: {
        uid,
        productId,
        image,
        amount,
        productName
      }
    })
    successPay(res)
  }

  static async overPay(productId) {
    const uid = wx.getStorageSync('uid')
    const res = await Http.request({
      url: `/pay/over_pay`,
      data: {
        uid,
        productId,
      },
    })
    successPay(res)
  }
}

export {
  Pay
}
