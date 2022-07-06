import { storeBindingsBehavior } from 'mobx-miniprogram-bindings'
import { timStore } from '../../../../store/tim'

Component({
  behaviors: [storeBindingsBehavior],
  properties: {
    targetUserId: String,
    service: Object,
  },
  data: {},
  storeBindings: {
    store: timStore,
    fields: ['messageList'],
    actions: ['getMessageList', 'setTargetUserId'],
  },
  lifetimes: {
    attached() {
      this.setTargetUserId(this.data.targetUserId)
      this.getMessageList()
    }
  },
  methods: {}
})
