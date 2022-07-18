import behavior from '../behavior'

Component({
  behaviors: [behavior],
  methods: {
    handlePay() {
      this.triggerEvent('pay')
    },

    handleRefund() {
      this.triggerEvent('refund')
    },

    handleRating() {
      this.triggerEvent('rating')
    },
  }
})
