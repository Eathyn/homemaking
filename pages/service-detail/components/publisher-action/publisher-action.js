import serviceStatus from '../../../../enum/service-status'
import serviceAction from '../../../../enum/service-action'
import behavior from '../behavior'
import { getDataSet } from '../../../../utils/utils'

Component({
  behaviors: [
    behavior,
  ],
  properties: {},
  data: {
    serviceStatusEnum: serviceStatus,
    serviceActionEnum: serviceAction,
  },
  methods: {
    handleUpdateStatus(evt) {
      const action = getDataSet(evt, 'action')
      this.triggerEvent('update', { action })
    },
    handleEditService(evt) {
      this.triggerEvent('edit')
    },
  },
})
