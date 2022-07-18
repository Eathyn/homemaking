import { getDataSet } from '../../utils/utils'

Component({
  properties: {
    count: {
      type: Number,
      value: 5,
    },
    selected: {
      type: Number,
      value: 0,
    },
    size: {
      type: String,
      value: '40',
    },
    defaultColor: {
      type: String,
      value: '#888888',
    },
    selectedColor: {
      type: String,
      value: '#f3d066',
    },
    icon: {
      type: String,
      value: 'star',
    },
  },
  data: {
    currentIndex: -1,
  },
  methods: {
    handleSelect(evt) {
      // 只显示 不可输入
      if (this.data.selected > 0) {
        return
      }
      
      const index = getDataSet(evt, 'index')
      this.setData({
        currentIndex: index
      })
      const score = index + 1
      this.triggerEvent('rating', { rating: score })
    },
  },
});
