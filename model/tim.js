import TIM from 'tim-wx-sdk-ws'
import TIMUploadPlugin from 'tim-upload-plugin'
import timConfig from '../config/tim'

class Tim {
  constructor() {
    const tim = TIM.create(timConfig.options)
    tim.setLogLevel(timConfig.logLevel)
    tim.registerPlugin({
      'tim-upload-plugin': TIMUploadPlugin
    })
  }
}

export default Tim
