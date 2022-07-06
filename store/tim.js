import { observable, action } from 'mobx-miniprogram'
import Tim from '../model/tim'
import TIM from 'tim-wx-sdk-ws'

export const timStore = observable({
  sdkReady: false,

  login: action(function() {
    this._runListener()
    Tim.getInstance().login()
  }),

  _runListener() {
    const sdk = Tim.getInstance().getSDK()
    sdk.on(TIM.EVENT.SDK_READY, this._handleSDKReady, this)
    sdk.on(TIM.EVENT.SDK_NOT_READY, this._handleSDKNotReady, this)
    sdk.on(TIM.EVENT.KICKEDOUT, this._handleSDKNotReady, this)
  },
  _handleSDKReady() {
    this.sdkReady = true
  },
  _handleSDKNotReady() {
    this.sdkReady = false
  },
})
