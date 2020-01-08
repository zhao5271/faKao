import { Http } from '../utils/http'

class Lesson {
  static async getLesson (id) {
    return await Http.request({
      url: `/api/product/detail/${id}`
    })
  }


}

export {
  Lesson
}
