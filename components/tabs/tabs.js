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
    // direction: -1:后退 0:不动 1:前进
    handleTouchMove({ direction }) {
      const MIN_TAB_INDEX = 0
      const MAX_TAB_INDEX = this.properties.tabs.length - 1
      const { currentTabIndex } = this.data
      let targetTabIndex = currentTabIndex
      if (direction === -1) {
        targetTabIndex--
      }
      if (direction === 1) {
        targetTabIndex++
      }
      if (targetTabIndex < MIN_TAB_INDEX || targetTabIndex > MAX_TAB_INDEX) {
        return
      }
      const customEvent = {
        currentTarget: {
          dataset: {
            index: targetTabIndex,
          }
        }
      }
      this.handleTabChange(customEvent)
    },
  },
});
