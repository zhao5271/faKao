// pages/pay/pay.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  //  前往支付
  toCreatePay () {
    const orderId = this.createOrderId();
    const openid = wx.getStorageSync("openid")
    console.log(openid)
    wx.request({
      url: 'http://smoothwater.natapp1.cc/pay/mini_pay',
      data:{
        openid,
        amount: 0.01
      },
      method:'GET',
      success (res) {
        const data = res.data;
        wx.requestPayment({
            timeStamp: data.timeStamp,
            nonceStr: data.nonceStr,
            package: data.package,
            signType: data.signType,
            paySign: data.paySign,
            success:function(res){
              console.log(res)
              console.log("支付成功")
            },
            fail:function(res){
              console.log(res)
              console.log("支付失败")
            },
            complete:function(res){
              console.log('支付完成')
            }
          })
      }
    })
  },

  // 生成订单编号
  createOrderId () {
    let currDate = new Date();
    return Date.parse(currDate);
  }
})
