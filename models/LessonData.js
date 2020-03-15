import { Http } from '../utils/http'

class LessonData {
  static async getDetail (id) {
    return  await Http.request({
      url: `/product/detail/${id}`
    })
  }

  static async getList() {
    return await Http.request({
      url: `/product/list`
    })
  }
}

export {
  LessonData
}
