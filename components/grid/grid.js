import { getEventParam } from '../../utils/utils'

Component({
  relations: {
    '../grid-item/grid-item': {
      type: 'child',
    },
  },
  options: {
    multipleSlots: true,
  },
  properties: {
    rowNum: {
      type: Number,
      value: 3,
    },
    title: String,
    extend: String,
    extendCell: Object,
  },
  lifetimes: {
    ready() {
      this.getGridItems()
    },
  },
  methods: {
    getGridItems() {
      const items = this.getRelationNodes('../grid-item/grid-item')
      const gridItems = items.map((item, index) => (index))
      this.setData({
        gridItems,
      })
    },

    handleSelect(evt) {
      const cell = getEventParam(evt, 'cell')
      this.triggerEvent('itemtap', { cell })
    },

    handleExtend() {
      this.triggerEvent('extendtap', { cell: this.data.extendCell })
    },
  }
})
