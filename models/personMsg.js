import { Http } from '../utils/http'

class PersonMsg {
  static async addMsg (data) {
    return await Http.request({
      url: `/userInfo/add`,
      data,
      method: 'POST'
    })
  }

  static async getMsg (uid) {
    return await Http.request({
      url: `/userInfo/detail/${uid}`,
    })
  }

  static async updateMsg(data) {
    return await Http.request({
      url: `/userInfo/update`,
      data,
      method:"PUT"
    })
  }
}

export {
  PersonMsg
}
