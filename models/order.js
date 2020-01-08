import { Http } from '../utils/http'

class Order {
  static async getList (uid) {
    return await Http.request2({
      url: `/api/admin/order/list?uid=${uid}`,
      method: 'POST'
    })
  }
}

export {
  Order
}
