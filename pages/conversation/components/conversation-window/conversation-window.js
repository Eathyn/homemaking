import { storeBindingsBehavior } from 'mobx-miniprogram-bindings'
import { timStore } from '../../../../store/tim'
import { getEventParam } from '../../../../utils/utils'
import TIM from 'tim-wx-sdk-ws'

Component({
  behaviors: [storeBindingsBehavior],
  properties: {
    targetUserId: String,
    service: Object,
  },
  data: {
    text: '',
  },
  storeBindings: {
    store: timStore,
    fields: ['messageList'],
    actions: ['getMessageList', 'setTargetUserId'],
  },
  lifetimes: {
    attached() {
      this.setTargetUserId(this.data.targetUserId)
      this.getMessageList()
    }
  },
  methods: {
    handleSendLink(evt) {
      const service = getEventParam(evt, 'service')
      this.triggerEvent('sendmessage', {
        type: TIM.TYPES.MSG_CUSTOM,
        content: service,
      })
    },

    handleSelect() {
      const service = getEventParam(evt, 'service')
      wx.navigateTo({
        url: `/pages/service-detail/service-detail?service_id=${service.id}`,
      })
    },

    async handleSendImage() {
      const chooseImage = await wx.chooseMedia({
        count: 1,
        mediaType: ['image'],
        sizeType: ['compressed'],
      })
      this.triggerEvent('sendmessage', {
        type: TIM.TYPES.MSG_IMAGE,
        content: chooseImage,
      })
    },

    handleInput(evt) {
      this.data.text = getEventParam(evt, 'value')
    },

    handleSend() {
      const text = this.data.text.trim()
      if (text === '') {
        return
      }
      this.triggerEvent('sendmessage', {
        type: TIM.TYPES.MSG_TEXT,
        content: text,
      })
      this.setData({
        text: '',
      })
    },
  },
})
