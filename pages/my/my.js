import cache from '../../enum/cache'
import { setTabBarBadge } from '../../utils/wx'
import Token from '../../model/token'
import User from '../../model/user'

Page({
  data: {
    userInfo: {
      nickname: '点击授权登陆',
      avatar: '../../images/logo.png',
    },
  },

  async onShow() {
    const unreadCount = wx.getStorageSync(cache.UNREAD_COUNT)
    await setTabBarBadge(unreadCount)
    const verifyToken = await Token.verifyToken()
    if (verifyToken.valid) {
      const userInfo = User.getUserInfoByLocal()
      this.setData({
        userInfo,
      })
    }
  },

  handleToLogin() {
    wx.navigateTo({
      url: '/pages/login/login',
    })  
  },
})
