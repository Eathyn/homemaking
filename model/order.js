import Http from '../utils/http'

class Order {
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
}

export default Order
