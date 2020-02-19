import { Http } from '../utils/http'

class UserData {
  static async postInfo(data) {
    return await Http.request({
      url: `api/wechat/wxLogin`,
      data,
      method: 'POST'
    })
  }

  static async getOpenid(jsCode) {
    return await Http.request({
      url:`/user/openid?jsCode=${jsCode}`
    })
  }

  static async login(data) {
    return await Http.request({
      url: `/user/login`,
      data:data,
      method: "POST"
    })
  }
}

export {
  UserData
}
