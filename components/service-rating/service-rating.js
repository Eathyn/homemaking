Component({
  properties: {
    rating: Object,
  },
  data: {},
  methods: {
    handlePreview(evt) {
      const { index } = evt.currentTarget.dataset
      wx.previewImage({
        urls: this.data.rating.illustration,
        current: this.data.rating.illustration[index],
      })
    },
  }
})
