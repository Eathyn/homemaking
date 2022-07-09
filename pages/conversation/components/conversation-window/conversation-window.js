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
    scrollHeight: 0,
  },
  storeBindings: {
    store: timStore,
    fields: ['messageList', 'intoView', 'isCompleted'],
    actions: ['getMessageList', 'setTargetUserId', 'scrollMessageList'],
  },
  lifetimes: {
    attached() {
      this._setScrollHeight()
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
      const chooseImage = await wx.chooseImage({
        count: 1,
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

    handleScrollToUpper() {
      if (this.data.isCompleted) {
        return
      }
      wx.showLoading({
        title: '正在加载...',
        mask: true,
      })
      this.scrollMessageList()
      // 防止用户过快滑动导致频繁加载
      setTimeout(() => wx.hideLoading(), 1000)
    },

    async _setScrollHeight() {
      const systemInfo = await wx.getSystemInfo()
      const scrollHeight = systemInfo.windowHeight - (systemInfo.screenHeight- systemInfo.safeArea.bottom) - 95
      this.setData({
        scrollHeight,
      })
    },
  },
})
