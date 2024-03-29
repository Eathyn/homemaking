import { getEventParam } from '../../utils/utils'
import Rating from '../../model/rating'

Page({
  data: {
    formData: {
      score: 0,
      content: '',
    },
    rules: [
      {
        name: 'score',
        rules: [
          { required: true, message: '请为该服务评分' },
        ],
      },
      {
        name: 'content',
        rules: [
          { required: true, message: '评价内容不能为空' },
          { minlength: 10, message: '评价内容不能少于 10 个字' },
        ],
      },
    ],
    illustration: [],
  },
  
  onLoad(options) {
    const order = JSON.parse(options.order)
    this.setData({
      order,
    })
  },

  handleRating(evt) {
    const score = getEventParam(evt, 'rating')
    this.setData({
      ['formData.score']: score,
    })
  },

  handleInputChange(evt) {
    const value = getEventParam(evt, 'value')
    this.setData({
      ['formData.content']: value,
    })
  },

  handleUploadSuccess(evt) {
    this.data.illustration = getEventParam(evt, 'files')
  },

  handleUploadDelete(evt) {
    const deleteIndex = this.data.illustration.findIndex((item) => item.key === evt.detail.item.key)
    this.data.illustration.splice(deleteIndex, 1)
  },

  handleSubmit() {
    this.selectComponent('#form').validate(async (valid, errors) => {
      if (!valid) {
        const errMsg = errors.map((error) => error.message)
        this.setData({
          error: errMsg.join(';')
        })
        return
      }
      
      wx.showLoading({
        title: '正在提交',
        mask: true,
      })
      const illustration = this.data.illustration.map((item) => item.url)
      const { order, formData } = this.data
      await Rating.createRating(order.id, formData.score, formData.content, illustration)
      wx.hideLoading()
      this.getOpenerEventChannel().emit('rating')
      await wx.showModal({
        title: '提示',
        content: '评价成功，点击确定返回订单详情',
        showCancel: false
      })
      wx.navigateBack()
    })
  },
})
