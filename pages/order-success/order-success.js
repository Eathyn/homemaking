import roleType from '../../enum/role-type'
import orderStatus from '../../enum/order-status'

Page({
  data: {},

  onLoad(options) {

  },

  handleCheckOrder() {
    wx.navigateTo({
      url: `/pages/my-order/my-order?role=${roleType.CONSUMER}&status=${orderStatus.UNAPPROVED}`
    })
  },

  handleNavToHome() {
    wx.switchTab({
      url: '/pages/home/home'
    })
  }
})
