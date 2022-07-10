import Service from '../../model/service'
import Category from '../../model/category'
import { throttle } from '../../utils/utils'
import Tim from '../../model/tim'
import cache from '../../enum/cache'
import { setTabBarBadge } from '../../utils/wx'

const service = new Service()

Page({
  data: {
    tabs: ['全部服务', '在提供', '正在找'],
    categoryList: [],
    tabIndex: 0,
    categoryId: 0,
    loading: true,
  },

  async onLoad() {
    await this._getServiceList()
    await this._getCategoryListWithAll()
    this.setData({
      loading: false,
    })
  },

  onShow() {
    const unreadCount = wx.getStorageSync(cache.UNREAD_COUNT)
    setTabBarBadge(unreadCount)
  },

  async onPullDownRefresh() {
    await this._getServiceList()
    wx.stopPullDownRefresh()
  },

  async onReachBottom() {
    if (!service.hasMoreData) {
      return
    }
    const serviceList = await service.getServiceList()
    this.setData({ serviceList })
  },

  async _getServiceList() {
    const serviceList = await service.reset().getServiceList(this.data.categoryId, this.data.tabIndex)
    this.setData({ serviceList })
  },

  async _getCategoryList() {
    const categoryList = await Category.getCategoryList()
    this.setData({ categoryList })
  },

  async _getCategoryListWithAll() {
    const categoryList = await Category.getCategoryListWithAll()
    this.setData({ categoryList })
  },

  handleTabChange(evt) {
    this.data.tabIndex = evt.detail.index
    this._getServiceList()
  },

  handleCategoryChange: throttle(
    function (evt) {
      const { id: categoryId } = evt.currentTarget.dataset
      if (this.data.categoryId === categoryId) {
        return
      }
      this.data.categoryId = categoryId
      this._getServiceList()
    },
  ),

  handleSelectService(evt) {
    const service = evt.currentTarget.dataset.service
    wx.navigateTo({
      url: `/pages/service-detail/service-detail?service_id=${service.id}`
    })
  },
});
