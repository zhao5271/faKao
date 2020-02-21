import { Http } from '../utils/http'
import { promisic } from '../miniprogram_npm/lin-ui/utils/util'

class Order {
  static async getList (uid) {
    return await Http.request({
      url: `/order/list/${uid}`,
    })
  }

  static async getStatus (userId, productId) {
    return await Http.request({
      url: `/order/status`,
      data:{
         userId,
        productId,
      }
    })
  }

  static async getDetail (orderNo) {
    return await Http.request({
      url: `/order/detail/${orderNo}`
    })
  }
}

export {
  Order
}
