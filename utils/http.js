import ApiConfig from '../config/api'
import exceptionMessage from '../config/exception-message'
import wxToPromise from './wx'

class Http {
  static async request({ url, data, method = 'GET' }) {
    const res = await wxToPromise('request', {
      url: `${ApiConfig.baseUrl}${url}`,
      data,
      method,
    })
    if (res.statusCode < 400) {
      return res.data.data
    }
    if (res.statusCode === 401) {
      // TODO 令牌异常
      return
    }
    Http._showError(res.data.error_code, res.data.message)
  }

  static _showError(errorCode, message) {
    const errorMessage = exceptionMessage[errorCode]
    let title = errorMessage || message || '未知异常'
    title = typeof title === 'object' ? Object.values(title).join(';') : title
    wx.showToast({
      title,
      icon: 'none',
      duration: 3000,
    })
  }
}

export default Http
