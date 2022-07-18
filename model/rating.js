import Http from '../utils/http'
import Base from './base'

class Rating extends Base {
  async getServiceRatingList(serviceId) {
    if (!this.hasMoreData) {
      return this.data
    }
    const serviceRatingList = await Http.request({
      url: 'v1/rating/service',
      data: {
        page: this.page,
        count: this.count,
        service_id: serviceId,
      }
    })
    this.data = this.data.concat(serviceRatingList.data)
    this.hasMoreData = this.page !== serviceRatingList.last_page
    this.page++
    return this.data
  }

  static async getRatingByOrderId(orderId) {
    return Http.request({
      url: 'v1/rating/order',
      data: {
        order_id: orderId,
      },
    })
  }
  
  static async createRating(order_id, score, content, illustration) {
    return Http.request({
      url: 'v1/rating',
      data: {
        order_id, score, content, illustration
      },
      method: 'POST'
    })
  }
}

export default Rating
