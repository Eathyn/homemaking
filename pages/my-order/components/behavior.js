import orderStatus from '../../../enum/order-status'

const behavior = Behavior({
  properties: {
    order: Object,
  },
  
  data: {
    orderStatus,
  },
  
  methods: {
    handleNavToOrderDetail() {
      this.triggerEvent('nav-detail', { order: this.data.order })
    },
    
    handleNavToRefund() {
      this.triggerEvent('refund', { order: this.data.order })
    },
    
    handleToChat() {
      this.triggerEvent('chat', { order: this.data.order })
    },
  },
})

export default behavior
