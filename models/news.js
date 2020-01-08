import { Http } from '../utils/http'

class News {

  static async getDetail (id) {
    return await Http.request({
      url: `api/article/details/${id}`
    })
  }

  static async getList () {
    return await Http.request({
      url: `api/article/list/1`
    })
  }

  static async getBanner () {
    return await Http.request({
      url: `api/article/banner/list`
    })
  }
}

export {
  News
}
