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

  static getServiceById(serviceId) {
    return Http.request({
      url: `v1/service/${serviceId}`,
    })
  }

  static updateServiceStatus(serviceId, action) {
    return Http.request({
      url: `v1/service/${serviceId}`,
      data: {
        action,
      },
      method: 'POST',
    })
  }

  static editService(serviceId, formData) {
    return Http.request({
      url: `v1/service/${serviceId}`,
      data: formData,
      method: 'PUT',
    })
  }

  static publishService(formData) {
    return Http.request({
      url: '/v1/service',
      data: formData,
      method: 'POST',
    })
  }

  /**
   * 获取服务状态统计
   * @param type 服务类型 (1:在提供 2:正在找)
   * @returns {Promise<*|undefined>}
   */
  static getServiceStatus(type) {
    return Http.request({
      url: `v1/service/count?type=${type}`
    })
  }
  
  async getMyService(type, status) {
    if (!this.hasMoreData) {
      return
    }
    const serviceList = await Http.request({
      url: 'v1/service/my',
      data: {
        page: this.page,
        count: this.count,
        type,
        status,
      },
    })
    this.data = this.data.concat(serviceList.data)
    this.hasMoreData = this.page !== serviceList.last_page
    this.page++
    return this.data
  }
}

export default Service
