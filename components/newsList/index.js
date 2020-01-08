// components/newsList/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    data: Object,
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  observes:{
    /*'data': function (data) {
      if(!data.add_time){
        return
      }
      const time = data.add_time.split(" ")
      this.properties.time = time[0]
    }*/
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 进入新闻详情页
    onGotoNewsDetail (event) {
      const id = Number.parseInt(event.currentTarget.id)
      this.triggerEvent('gotoDetail',{
        id
      })
    },
  }
})
