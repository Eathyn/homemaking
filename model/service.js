import Http from '../utils/http'
import Base from './base'

class Service extends Base {
  /**
   * 分页获取服务列表
   * @param category_id 分类ID
   * @param type 服务类型
   */
  async getServiceList(category_id = null, type = null) {
    if (!this.hasMoreData) {
      return this.data
    }
    const serviceList = await Http.request({
      url: 'v1/service/list',
      data: {
        page: this.page,
        count: this.count,
        category_id: category_id || '',
        type: type || '',
      },
    })
    this.data = this.data.concat(serviceList.data)
    this.hasMoreData = this.page !== serviceList.last_page
    this.page++
    return this.data
  }
}

export default Service
