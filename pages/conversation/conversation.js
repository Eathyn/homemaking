// import { createStoreBindings } from 'mobx-miniprogram-bindings'
import Tim from '../../model/tim'


Page({
  data: {
    storeBindings: null,
  },

  onLoad: function(options) {
    // this.storeBindings = createStoreBindings(this, {
    //   store: timStore,
    //   fields: ['sdkReady'],
    //   actions: ['pushMessage', 'resetMessage', 'getConversationList']
    // })
    // const targetUserId = options.targetUserId
    // this.setData({
    //   targetUserId,
    //   service: options.service ? JSON.parse(options.service) : null
    // })

    const userId = 250000
    Tim.getInstance().login()
    Tim.getInstance().getMessageList(userId)
  },
})
