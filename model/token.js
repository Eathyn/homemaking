import Http from '../utils/http'
import ApiConfig from '../config/api'
import cache from '../enum/cache'

class Token {
  static async getToken() {
    const data = await Http.request({
      url: 'v1/token',
      data: {
        i_code: ApiConfig.iCode,
        order_no: ApiConfig.orderNo,
      },
      method: 'POST',
    })
    return data.token
  }

  static async verifyToken() {
    const token = wx.getStorageSync(cache.TOKEN)
    return Http.request({
      url: 'v1/token/verify',
      data: { token },
      method: 'POST'
    })
  }
}

export default Token
