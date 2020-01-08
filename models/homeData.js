import { Http } from '../utils/http'

class HomeData {
  static async getBanner () {
    const indexData = await Http.request({
      url: `api/index`
    })
    return indexData.banner
  }

  static async getClasses () {
    const indexData = await Http.request({
      url: `api/index`
    })
    return indexData.info.bastList
  }
}

export {
  HomeData
}
