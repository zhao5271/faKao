import { Http } from '../utils/http'

class NewsData {

  // 获取新闻文章详情
  static async getDetail (id) {
    return await Http.request({
      url: `/news/detail/${id}`
    })
  }
  // 获取分类下的新闻列表
  static async getList (categoryId) {
    return await Http.request({
      url: `/news/category/${categoryId}`
    })
  }
  // 获取所有新闻分类
  static async getCategory() {
    return await Http.request({
      url: `/newsCategory/list`
    })
  }

}

export {
  NewsData
}
