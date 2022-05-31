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

  async _getServiceList() {
    const serviceList = await service.getServiceList(1, 10)
    this.setData({
      serviceList: serviceList.data
    })
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
