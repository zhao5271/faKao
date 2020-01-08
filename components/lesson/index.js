// components/lesson/index.js
import { Cart } from '../../models/Cart'

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    lesson:Object
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    onGotoLessonDetail (event) {
      const id = event.currentTarget.id
      wx.navigateTo({
        url: `/pages/lessonDetail/lessonDetail?id=${id}`
      })
    },
  }
})
