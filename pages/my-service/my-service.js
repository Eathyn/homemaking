import Service from '../../model/service'
import { getDataSet, getEventParam } from '../../utils/utils'

const service = new Service()

Page({
  data: {
    tabs: ['全部服务', '待审核', '待发布', '已发布'],
    serviceList: [],
    active: 0,
  },

  onLoad: function(options) {
    const status = parseInt(options.status)
    const type = parseInt(options.type)
    this.setData({
      active: status + 1
    })
    this.data.status = status < 0 ? '' : status
    this.data.type = type
    this._getServiceList()
  },
  
  async onPullDownRefresh() {
    await this._getServiceList()
    wx.stopPullDownRefresh()
  },

  async onReachBottom() {
    if (!service.hasMoreData) {
      return
    }
    const { type, status } = this.data
    const serviceList = await service.getMyService(type, status)
    this.setData({
      serviceList,
    })
  },
  
  async _getServiceList() {
    const { type, status } = this.data
    const serviceList = await service.reset().getMyService(type, status)
    this.setData({
      serviceList,
    })
  },
  
  handleTabChange(evt) {
    const index = getEventParam(evt, 'index')
    this.data.status = index < 1 ? '' : index - 1
    this._getServiceList()
  },

  handleScrollToTop() {
    wx.pageScrollTo({
      scrollTop: 0,
    })
  },

  handleSelect(evt) {
    const service = getDataSet(evt, 'service')
    wx.navigateTo({
      url: `/pages/service-detail/service-detail?service_id=${service.id}`
    })
  },
})
