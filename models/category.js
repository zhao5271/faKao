import { promisic } from '../miniprogram_npm/lin-ui/utils/util'

class Category {

  static async getClassByPid (pid) {
    const res = await promisic(wx.request)({
      url: `http://smoothwater.natapp1.cc/categories/${pid}`
    })
    return res.data
  }

}

export {
  Category
}
