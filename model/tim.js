import TIM from 'tim-wx-sdk-ws'
import TIMUploadPlugin from 'tim-upload-plugin'
import timConfig from '../config/tim'

class Tim {
  static instance = null
  _SDKInstance = null

  constructor() {
    const tim = TIM.create(timConfig.options)
    tim.setLogLevel(timConfig.logLevel)
    tim.registerPlugin({
      'tim-upload-plugin': TIMUploadPlugin
    })
    this._SDKInstance = tim
  }

  static getInstance() {
    if (!Tim.instance) {
      Tim.instance = new Tim()
    }
    return Tim.instance
  }

  getSDK() {
    return this._SDKInstance
  }
}

export default Tim
