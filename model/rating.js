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
}

export default Rating
