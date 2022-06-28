import ServiceStatus from '../../enum/service-status'

Page({
  data: {
    type: 0,
  },

  onLoad: function(options) {
    this.data.type = options.type
  },

  handleCheckService() {
    wx.redirectTo({
      url: `/pages/my-service/index?type=${this.data.type}&status=${ServiceStatus.PENDING}`
    })
  },

  handleNavToHome() {
    wx.switchTab({
      url: '/pages/home/home'
    })
  },
})
