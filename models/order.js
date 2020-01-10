import { Http } from '../utils/http'
import { promisic } from '../miniprogram_npm/lin-ui/utils/util'

class Order {
  static async getList (uid) {
    return await Http.request2({
      url: `/api/admin/order/list?uid=${uid}`,
      method: 'POST'
    })
  }

  static async getStatus (uid, pid) {
    const res = await promisic(wx.request)({
      url: `http://smoothwater.natapp1.cc/order/status?uid=${uid}&pid=${pid}`,
      method: 'GET',
    })
    return res.data
  }

  static async getDetail (pid) {
    const uid = wx.getStorageSync('uid');
    const res = await promisic(wx.request)({
      url: `http://smoothwater.natapp1.cc/order/detail?uid=${uid}&pid=${pid}`,
      method: 'GET',
    })
    return res.data
  }
}

export {
  Order
}
