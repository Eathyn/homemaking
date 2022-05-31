import Service from '../../model/service'
import Category from '../../model/category'

const service = new Service()

Page({
  data: {
    tabs: ['全部服务', '在提供', '正在找'],
    currentTabIndex: 0,
    categoryList: [],
  },

  onLoad: function (options) {
    this._getServiceList()
    this._getCategoryListWithAll()
  },

  async onPullDownRefresh() {
    const serviceList = await service.reset().getServiceList()
    this.setData({ serviceList })
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
    const serviceList = await service.getServiceList()
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

  handleCategoryChange(evt) {
    const { id } = evt.currentTarget.dataset
  }
});
