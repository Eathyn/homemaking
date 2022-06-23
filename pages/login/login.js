import User from '../../model/user'

Page({
  data: {},

  onLoad: function(options) {

  },

  async handleLogin(evt) {
    const res = await wx.getUserProfile({
      desc: '完善用户信息',
    })
    wx.showLoading({
      title: '正在授权',
      mask: true,
    })
    try {
      await User.login()
      await User.updateUserInfo(res.userInfo)
      const events = this.getOpenerEventChannel()
      console.log('events: ', events)
      events.emit('login')
      wx.navigateBack()
    } catch (err) {
      wx.showModal({
        title: '注意',
        content: '登录失败，请稍后重试',
        showCancel: false,
      })
      console.error(err)
    }
    wx.hideLoading()
  },

  handleToHome() {
    wx.switchTab({
      url: '/pages/home/home'
    })
  },
})
