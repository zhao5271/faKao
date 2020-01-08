class Store {
   // 获取缓存数据
   static getItem(key,module_name){
     if (module_name) {
       let val = this.getItem(module_name)
       return val ? val[key] : ''
     } else {
       return wx.getStorageSync(key)
     }
   }

//  存储到缓存数据
  static setItem (key, value, module_name) {
    if (module_name) {
      let module_name_info = this.getItem(module_name)
      module_name_info[key] = value
      wx.setStorageSync(module_name, module_name_info)
    } else {
      wx.setStorageSync(key, value)
    }
  }

//  删除指定缓存，或清空缓存
  static clear (key) {
     key ? wx.removeStorageSync(key) : wx.clearStorageSync()
  }
}

export {
  Store
}
