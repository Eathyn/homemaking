import { observable, action } from 'mobx-miniprogram'
import Tim from '../model/tim'
import TIM from 'tim-wx-sdk-ws'

export const timStore = observable({
  sdkReady: false,
  messageList: [],
  _targetUserId: null,
  intoView: 0,

  login: action(function() {
    this._runListener()
    Tim.getInstance().login()
  }),

  logout: action(function() {
    Tim.getInstance().logout()
  }),

  pushMessage: action(function(message) {
    this.messageList = this.messageList.concat([message])
    this.intoView = this.messageList.length - 1
  }),

  setTargetUserId: action(function(targetUserId) {
    this._targetUserId = targetUserId
  }),

  // 主动拉取最新消息列表
  getMessageList: action(async function() {
    if (!this._targetUserId) {
      throw Error('未指定用户目标ID')
    }
    this.messageList = await Tim.getInstance().reset().getMessageList(this._targetUserId)
    this.intoView = this.messageList.length - 1
    await Tim.getInstance().setMessageRead(this._targetUserId)
  }),

  _runListener() {
    const sdk = Tim.getInstance().getSDK()
    sdk.on(TIM.EVENT.SDK_READY, this._handleSDKReady, this)
    sdk.on(TIM.EVENT.SDK_NOT_READY, this._handleSDKNotReady, this)
    sdk.on(TIM.EVENT.KICKED_OUT, this._handleSDKNotReady, this)
    sdk.on(TIM.EVENT.MESSAGE_RECEIVED, this._handleMessageReceived, this)
  },

  _handleSDKReady() {
    this.sdkReady = true
  },

  _handleSDKNotReady() {
    this.sdkReady = false
  },

  async _handleMessageReceived(evt) {
    if (!this._targetUserId) {
      return
    }
    const currentConversationMessage = evt.data
      .filter((item) => item.from === this._targetUserId)
    if (currentConversationMessage.length) {
      this.messageList = this.messageList.concat(currentConversationMessage)
      this.intoView = this.messageList.length - 1
      await Tim.getInstance().setMessageRead(this._targetUserId)
    }
  },
})
