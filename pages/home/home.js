Page({
  data: {
    tabs: ['全部服务', '在提供', '正在找'],
    currentTabIndex: 0,
  },
  onLoad: function (options) {

  },

  handleTabChange(evt) {
    const { index } = evt.currentTarget.dataset
    this.setData({
      currentTabIndex: index,
    })
  }
});
