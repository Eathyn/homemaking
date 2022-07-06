import { createStoreBindings } from 'mobx-miniprogram-bindings'
import { timStore } from '../../store/tim'

Page({
  data: {},
  onLoad() {
    this.storeBindings = createStoreBindings(this, {
      store: timStore,
      fields: ['sdkReady', 'messageList'],
      actions: ['getMessageList', 'setTargetUserId'],
    })
    this.setTargetUserId('user-007')
    this.getMessageList()
  },

  onUnload() {
    this.storeBindings.destroyStoreBindings()
  },
})
