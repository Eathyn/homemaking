import Http from '../utils/http'
import Base from './base'

class Order extends Base {
  static createOrder(serviceId, address) {
    return Http.request({
      url: 'v1/order',
      data: {
        service_id: serviceId,
        address,
      },
      method: 'POST',
    })
  }

  /**
   * 获取订单状态统计
   * @param role 角色类型 (1:发布者 2:消费者)
   */
  static getOrderStatus(role) {
    return Http.request({
      url: `v1/order/count?role=${role}`,
    })
  }
  
  static updateOrderStatus(orderId, action) {
    return Http.request({
      url: `v1/order/${orderId}`,
      data: {
        action,
      },
      method: 'POST',
    })
  }
  
  static getOrderById(orderId) {
    return Http.request({
      url: `v1/order/${orderId}`
    })
  }
  
  async getMyOrderList(role, status) {
    if (!this.hasMoreData) {
      return this.data
    }
    const orderList = await Http.request({
      url: 'v1/order/my',
      data: {
        page: this.page,
        count: this.count,
        role,
        status,
      }
    })
    this.data = this.data.concat(orderList.data)
    this.hasMoreData = this.page !== orderList.last_page
    this.page++
    return this.data
  }
}

export default Order
