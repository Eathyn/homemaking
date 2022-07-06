import { createStoreBindings } from 'mobx-miniprogram-bindings'
import { timStore } from '../../store/tim'

Page({
  data: {},
  onLoad() {
    this.storeBindings = createStoreBindings(this, {
      store: timStore,
      fields: ['sdkReady'],
    })
  },

  onUnload() {
    this.storeBindings.destroyStoreBindings()
  },
})
