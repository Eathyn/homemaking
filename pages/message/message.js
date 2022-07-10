import { createStoreBindings } from 'mobx-miniprogram-bindings'
import { timStore } from '../../store/tim'

Page({
  data: {
    conversationList: [],
  },
  onLoad() {
    this.storeBindings = createStoreBindings(this, {
      store: timStore,
      fields: ['sdkReady', 'conversationList'],
      actions: ['getConversationList'],
    })
  },
  onUnload() {
    // 避免内存泄露
    this.storeBindings.destroyStoreBindings()
  },

  }
});
