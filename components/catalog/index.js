// components/catalog/index.js
import { Store } from '../../utils/store'
import method from '../../miniprogram_npm/lin-ui/common/async-validator/validator/method'

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    data: Object
  },

  /**
   * 组件的初始数据
   */
  data: {
    nowText:"请选择",
    boultAnimation:{}, //右边箭头动画
    height: 0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 下拉列表是否显示
    selectToggle (e) {
      let animation = wx.createAnimation({
        timingFunction:"ease"
      })

      if (this.data.selected) {
        animation.rotate(0).step();
      }else{
        animation.rotate(90).step();
      }
      const selectedId = wx.getStorageSync("selectedId")
      this.setData({
        selected: !this.data.selected,
        boultAnimation:animation.export(),
        selectedId
      })
    },

    onGotoLearn (e) {
      let id = Math.floor(e.currentTarget.dataset.lessonId/100)
      const url = e.currentTarget.dataset.url
      const title = e.currentTarget.dataset.title
      let productId = e.currentTarget.dataset.productId
      this.addWatched(productId)
      this.setSelect (productId)
      wx.redirectTo({
        url: `/pages/learn/learn?id=${id}&url=${url}&title=${title}`
      })
    },


    // 向缓存中添加 已经观看过的视频的id
    addWatched (productId) {
      if (!wx.getStorageSync('watchedArr')) {
        console.log("不存在")
        let watchedArr = []
        watchedArr.push(productId)
        wx.setStorageSync("watchedArr", watchedArr)
      }
      let watchedArr = wx.getStorageSync('watchedArr')
      // 数组去重
      if (!watchedArr.includes(productId)) {
        watchedArr.push(productId)
      }
      wx.setStorageSync("watchedArr", watchedArr)
    },

    // 修改 当前选中的课程 的状态
    setSelect (productId) {
      wx.setStorageSync("selectedId",productId)
    }
  },
})
