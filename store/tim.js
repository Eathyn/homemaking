import { observable, action } from 'mobx-miniprogram'
import Tim from '../model/tim'
import TIM from 'tim-wx-sdk-ws'

export const timStore = observable({
  sdkReady: false,
  messageList: [],
  _targetUserId: null,

  login: action(function() {
    this._runListener()
    Tim.getInstance().login()
  }),

  logout: action(function() {
    Tim.getInstance().logout()
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
      await Tim.getInstance().setMessageRead(this._targetUserId)
    }
  },
})
