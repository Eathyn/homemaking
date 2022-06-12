import Http from '../utils/http'
import ApiConfig from '../config/api'

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
}

export default Token
