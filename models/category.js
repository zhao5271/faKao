import { promisic } from '../miniprogram_npm/lin-ui/utils/util'
import {Http} from "../utils/http";

class Category {

  static async getClassByPid (pid) {
    return await Http.request({
      url:`/lesson/list/${pid}`
    })
  }

}

export {
  Category
}
