import { Http } from '../utils/http'

class PersonMsg {
  static async addMsg (uid, personMsg) {
    return await Http.request2({
      url: `api/comment/add_comment`,
      data: {
        uid,
        name: personMsg.name,
        sex: personMsg.sex,
        year: personMsg.year,
        tel: personMsg.tel,
        email: personMsg.email,
        major: personMsg.major,
        education: personMsg.education,
        job: personMsg.job,
        hobby: personMsg.hobby,
        graduation: personMsg.graduation
      },
      method: 'POST'
    })
  }

  static async getMsg (uid) {
    return await Http.request2({
      url: `api/comment/get_comment?uid=${uid}`,
      method: 'POST'
    })
  }
}

export {
  PersonMsg
}
