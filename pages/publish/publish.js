import { getEventParam } from '../../utils/utils'
import Service from '../../model/service'
import cache from '../../enum/cache'
import { setTabBarBadge } from '../../utils/wx'

Page({
  data: {
    formData: {
      type: null,
      title: '',
      category_id: null,
      cover_image: null,
      description: '',
      designated_place: false,
      begin_date: '',
      end_date: '',
      price: ''
    }
  },

  onShow() {
    const unreadCount = wx.getStorageSync(cache.UNREAD_COUNT)
    setTabBarBadge(unreadCount)
  },

  async handleSubmit(evt) {
    const res = await wx.showModal({
      title: '提示',
      content: '是否确认申请发布该服务？',
      showCancel: true
    })
    if (!res.confirm) {
      return
    }

    wx.showLoading({
      title: '正在发布....',
      mask: true
    })

    const formData = getEventParam(evt, 'formData')
    try {
      await Service.publishService(formData)
      this._resetForm()
      wx.navigateTo({
        url: `/pages/publisher-success/publisher-success?type=${formData.type}`
      })
    } catch (err) {
      console.error(err)
    }

    wx.hideLoading()
  },

  _resetForm() {
    const formData = {
      type: null,
      title: '',
      category_id: null,
      cover_image: null,
      description: '',
      designated_place: false,
      begin_date: '',
      end_date: '',
      price: ''
    }
    this.setData({
      formData
    })
  }
})
