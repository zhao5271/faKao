import { Http } from '../utils/http'

class User {
  static async postInfo(data) {
    return await Http.request({
      url: `api/wechat/wxLogin`,
      data,
      method: 'POST'
    })
  }
}

export {
  User
}
