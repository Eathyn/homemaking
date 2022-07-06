import { createStoreBindings } from 'mobx-miniprogram-bindings'
import { timStore } from '../../store/tim'

Page({
  data: {
    targetUserId: null,
    service: null,
  },
  onLoad(options) {
    this.storeBindings = createStoreBindings(this, {
      store: timStore,
      fields: ['sdkReady'],
    })
    const { targetUserId, service } = options
    this.setData({
      // targetUserId,
      targetUserId: 'user-007', // 测试
      service,
    })
  },

  onUnload() {
    this.storeBindings.destroyStoreBindings()
  },

  handleLogin() {
    wx.navigateTo({
      url: '/pages/login/login',
    })
  },
})
