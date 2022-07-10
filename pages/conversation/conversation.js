import { createStoreBindings } from 'mobx-miniprogram-bindings'
import { timStore } from '../../store/tim'
import Tim from "../../model/tim";

Page({
  data: {
    targetUserId: null,
    service: null,
    isSent: false,
  },
  onLoad(options) {
    this.storeBindings = createStoreBindings(this, {
      store: timStore,
      fields: ['sdkReady'],
      actions: ['pushMessage', 'resetMessage', 'getConversationList'],
    })
    const { targetUserId, service } = options
    this.setData({
      // targetUserId,
      targetUserId: 'user-007', // 测试
      service: service ? JSON.parse(service) : null,
    })
  },

  onUnload() {
    if (!this.data.isSent) {
      this.getConversationList()
    }
    this.resetMessage()
    this.storeBindings.destroyStoreBindings()
  },

  handleLogin() {
    wx.navigateTo({
      url: '/pages/login/login',
    })
  },

  handleSendMessage(evt) {
    const { type, content } = evt.detail
    const message = Tim.getInstance().createMessage(type, content, this.data.targetUserId)
    this.pushMessage(message)
    Tim.getInstance().sendMessage(message)
    // this.getOpenerEventChannel().emit('sendMessage')
    this.data.isSent = true
  },
})
