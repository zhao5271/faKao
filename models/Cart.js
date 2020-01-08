import { Http } from '../utils/http'

class Cart {
  static async addCart (uid,lessonData) {
    return await Http.request2({
      url:`api/cart/add`,
      data:{
        uid,
        product_id:lessonData.id,
        image: lessonData.image,
        price: lessonData.price,
        title: lessonData.store_name
      },
      method:'POST'
    })
  }

  static async getList (uid) {
    return await Http.request2({
      url:`api/cart/list?uid=${uid}`
    })
  }

  static async delItem (cartId) {
    return await Http.request2({
      url: `api/cart/del?id=${cartId}`,
      method:'POST'
    })
  }
}

export {
  Cart
}
