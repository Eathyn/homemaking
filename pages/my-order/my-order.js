import roleType from '../../enum/role-type'
import Order from '../../model/order'
import { getEventParam } from '../../utils/utils'

const order = new Order()

Page({
  data: {
    tabs: ['全部订单', '待处理', '待支付', '待确认', '待评价'],
    active: 0,
    role: null,
    status: null, // -1:全部  0:待同意 1:待支付 2:待确认 3:待评价
    roleType,
  },
  
  onLoad: function(options) {
    const role = parseInt(options.role)
    const status = parseInt(options.status)
    this.setData({
      active: status + 1,
      role,
    })
    // v1/order/my 接口，查询所有全部时传空字符串
    this.data.status = status < 0 ? '' : status
    this.data.role = role
  },
  
  onShow() {
    this._getOrderList()
  },
  
  async onPullDownRefresh() {
    await this._getOrderList()
    this.stopPullDownRefresh()
  },

  async onReachBottom() {
    if (!order.hasMoreData) {
      return
    }
    const orderList = await order.getMyOrderList(this.data.role, this.data.status)
    this.setData({
      orderList,
    })
  },
  
  async _getOrderList() {
    const orderList = await order.reset().getMyOrderList(this.data.role, this.data.status)
    this.setData({ orderList })
  },
  
  async handleTabChange(evt) {
    const index = getEventParam(evt, 'index')
    this.data.status = index < 1 ? '' : index - 1
    await this._getOrderList()
  },
  
  handleScrollToTop() {
    wx.pageScrollTo({ scrollTop: 0 })
  },
  
  handleNavDetail(evt) {
    const order = getEventParam(evt, 'order')
    wx.navigateTo({
      url: `/pages/order-detail/order-detail?role=${this.data.role}&order=${JSON.stringify(order)}`
    })
  },
  
  handleChat(evt) {
    const order = getEventParam(evt, 'order')
    const targetUserId = order[this.data.role === roleType.PUBLISHER ? 'consumer' : 'publisher'].id
    wx.navigateTo({
      url: `/pages/conversation/conversation?targetUserId=${targetUserId}&service=${JSON.stringify(order.service_snap)}`
    })
  },
  
  handleRefund(evt) {
    const order = getEventParam(evt, 'order')
    wx.navigateTo({
      url: `/pages/refund/refund?order=${JSON.stringify(order)}`
    })
  },
})
