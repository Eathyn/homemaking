import serviceType from '../../../../enum/service-type'
import behavior from '../behavior'

Component({
  behaviors: [
    behavior,
  ],
  properties: {},
  data: {
    serviceTypeEnum: serviceType,
  },
  methods: {
    handleChat(evt) {
      this.triggerEvent('chat')
    },

    handleOrder(evt) {
      this.triggerEvent('order')
    },
  },
})
