import { throttle } from '../../utils/utils'

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
  },
  methods: {
    handleTabChange: throttle(
      function (evt) {
        const { index } = evt.currentTarget.dataset
        if (index === this.data.currentTabIndex) {
          return
        }
        this.setData({
          currentTabIndex: index,
        })
        this.triggerEvent('change', { index })
      },
    ),

    handleTouchMove(evt) {
      const direction = evt.direction // 0/-1/1
      const currentTabIndex = this.data.currentTabIndex
      const targetTabIndex = currentTabIndex + direction

      if (targetTabIndex < 0 || targetTabIndex > this.data.tabs.length - 1) {
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
