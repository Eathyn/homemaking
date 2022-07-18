Component({
  properties: {
    userInfo: Object,
  },
  
  methods: {
    handleToChat() {
      this.triggerEvent('chat', { targetUserId: this.data.userInfo.id })
    },
  },
})
