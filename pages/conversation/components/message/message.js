import { formatTime } from '../../../../utils/date'
import TIM from 'tim-wx-sdk-ws'

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
  methods: {}
})
