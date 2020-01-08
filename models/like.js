import { Http } from '../utils/http'

class Like {
  static async addLike (uid,lessonData) {
    return await Http.request2({
      url: `/api/collect/add`,
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
      url: `/api/collect/user?uid=${uid}`
    })
  }

  static async delItem (likeId) {
    return await Http.request2({
      url: `api/collect/del?id=${likeId}`,
      method:'POST'
    })
  }

  static async getIsLike (pid, uid) {
    return await Http.request2({
      url: `api/collect/isAdd`,
      data:{
        product_id: pid,
        uid: uid,
      },
      method: 'POST'
    })
  }
}

export {
  Like
}
