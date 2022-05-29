import Service from '../../model/service'

const service = new Service()

Page({
  data: {
    tabs: ['全部服务', '在提供', '正在找'],
    currentTabIndex: 0,
    categoryList: [
      {
        id: 1,
        name: '保洁',
      },
      {
        id: 2,
        name: '汽修',
      },
      {
        id: 3,
        name: '疏通',
      },
    ],
  },

  onLoad: function (options) {
    this._getServiceList()
  },

  async _getServiceList() {
    const serviceList = await service.getServiceList(1, 10)
  },

  handleCategoryChange(evt) {
    const { id } = evt.currentTarget.dataset
  }
});
