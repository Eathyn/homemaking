Component({
  relations: {
    '../grid/grid': {
      type: 'parent',
    },
  },
  properties: {
    showBadge: Boolean,
    badgeCount: Number,
    icon: String,
    iconSize: {
      type: String,
      value: '50',
    },
    text: String,
  },
  methods: {
    handleSelect() {
      this.triggerEvent(
        'select',
        { cell: this.data.cell },
        { bubbles: true, composed: true },
      )
    },
  },
})
