import { observable, action } from 'mobx-miniprogram'
import Tim from '../model/tim'
import TIM from 'tim-wx-sdk-ws'

export const timStore = observable({
  sdkReady: false,
  messageList: [],
  _targetUserId: null,
  intoView: 0,
  isCompleted: false,

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

  scrollMessageList: action(async function() {
    const messageList = await Tim.getInstance().getMessageList(this._targetUserId)
    this.intoView = messageList.length - 2
    this.isCompleted = Tim.getInstance().isCompleted
    /**
     * tips
     * 1. MobX 中属性的值是 Array 的时候，他是一个被包装过的 Array，并非原生 Array，它是一个响应式对象
     * 2. 经过包装的 Array 同样具备大多数原生 Array 所具备的方法。
     * 3. 想把响应式的对象数组变成普通数组，可以调用slice()函数遍历所有对象元素生成一个新的普通数组
     */
    this.messageList = messageList.concat(this.messageList.slice())
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
