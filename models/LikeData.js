import { Http } from '../utils/http'

class LikeData {
  static async addLike (likeData) {
    return await Http.request({
      url: `/like/add`,
      data: likeData,
      method:'POST'
    })
  }

  static async getList (uid) {
    return await Http.request({
      url: `/like/list/${uid}`
    })
  }

  static async delItem (likeId) {
    return await Http.request({
      url: `/like/del/${likeId}`,
      method:'DELETE'
    })
  }

  // 查看是否收藏， 获取用户id，产品id，查询 my_like 表，看看是否有数据
  static async getIsLike (userId,productId) {
    return await Http.request({
      url: `/like/isLike`,
      data:{
        userId,
        productId
      }
    })
  }
}

export {
  LikeData
}
