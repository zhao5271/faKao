import { promisic } from '../miniprogram_npm/lin-ui/utils/util'
import { config } from '../config/config'

class Http{
  static async request ({ url, data, method = 'GET' }) {
    const res = await promisic(wx.request)({
      data,
      method,
      url: `${config.apiBaseUrl}${url}`
    })
    return res.data.data
  }

  static async request2 ({ url, data, method = 'GET' }) {
    const res = await promisic(wx.request)({
      data,
      method,
      url: `${config.apiBaseUrl}${url}`
    })
    return res.data
  }
}

export {
  Http
}
