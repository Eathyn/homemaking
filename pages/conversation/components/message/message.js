import { formatTime } from '../../../../utils/date'
import TIM from 'tim-wx-sdk-ws'
import { getDataSet, getEventParam } from '../../../../utils/utils'

Component({
  properties: {
    message: Object,
  },
  observers: {
    'message': function(message) {
      message.time = formatTime(message.time)
      this.setData({
        _message: message,
      })
    }
  },
  data: {
    TIM: TIM,
    _message: Object,
    flowEnum: {
      IN: 'in',
      OUT: 'out',
    },
  },
  methods: {
    handleSend(evt) {
      const service = getEventParam(evt, 'service')
      this.triggerEvent('send', { service })
    },
    handleSelect(evt) {
      const service = getEventParam(evt, 'service')
      this.triggerEvent('select', { service })
    },
    async handlePreview(evt) {
      const url = getDataSet(evt, 'image')
      await wx.previewImage({
        urls: [url],
        current: url,
      })
    },
  }
})
