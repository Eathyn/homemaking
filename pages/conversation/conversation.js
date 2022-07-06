import { createStoreBindings } from 'mobx-miniprogram-bindings'
import { timStore } from '../../store/tim'
import Tim from '../../model/tim'
import TIM from 'tim-wx-sdk-ws'

Page({
  data: {
    // storeBindings: null,
  },

  onLoad: function(options) {
    createStoreBindings(this, {
      store: timStore,
      fields: ['sdkReady'],
      actions: ['login'],
    })
    // this.login()
    // const targetUserId = options.targetUserId
    // this.setData({
    //   targetUserId,
    //   service: options.service ? JSON.parse(options.service) : null
    // })
  },
})
