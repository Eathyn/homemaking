Component({
  options: {
    multipleSlots: true,
  },
  properties: {
    tabs: {
      type: Array,
      value: [],
    },
  },
  data: {
    currentTabIndex: 0,
    touchStartClientX: 0,
  },
  methods: {
    handleTabChange(e) {
      const { index } = e.currentTarget.dataset
      this.triggerEvent('change', { index })
      this.setData({
        currentTabIndex: index,
      })
    },
    handleTouchStart(evt) {
      this.setData({
        touchStartClientX: evt.changedTouches[0].clientX
      })
    },
    handleTouchEnd(evt) {
      const { touchStartClientX, currentTabIndex } = this.data
      const touchEndClientX = evt.changedTouches[0].clientX
      const clientXDiff = touchStartClientX - touchEndClientX
      if (clientXDiff > 0 && currentTabIndex < 2) {
        this.setData({
          currentTabIndex: currentTabIndex + 1
        })
        return
      }
      if (clientXDiff < 0 && currentTabIndex > 0) {
        this.setData({
          currentTabIndex: currentTabIndex - 1
        })
      }
    },
  },
});
