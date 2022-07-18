import orderStatus from "../../../enum/order-status"
import orderAction from '../../../enum/order-action'
import { getDataSet } from '../../../utils/utils'

const behavior = Behavior({
  properties: {
    order: Object,
  },
  
  data: {
    orderStatus,
    orderAction,
  },
  
  methods: {
    handleUpdateOrderStatus(evt) {
      const action = getDataSet(evt, 'action')
      this.triggerEvent('update-status', { action })
    },
  }
})

export default behavior
