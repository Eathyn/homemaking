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

  },

  handleTabChange(evt) {
    const { index } = evt.currentTarget.dataset
    this.setData({
      currentTabIndex: index,
    })
  },

  handleCategoryChange(evt) {
    const { id } = evt.currentTarget.dataset
  }
});
