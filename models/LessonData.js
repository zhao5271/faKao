import { Http } from '../utils/http'

class LessonData {
  static async getDetail (id) {
    return  await Http.request({
      url: `/product/${id}`
    })
  }

  static async getList() {
    return await Http.request({
      url: `/product`
    })
  }
}

export {
  LessonData
}
