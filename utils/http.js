import ApiConfig from '../config/api'
import exceptionMessage from '../config/exception-message'
import wxToPromise from './wx'
import Cache from '../enum/cache'
import User from '../model/user'
import { createStoreBindings } from 'mobx-miniprogram-bindings'
import { timStore } from '../store/tim'

class Http {
  static async request({ url, data, method = 'GET', reFetch = true }) {
    let res = null

    try {
      res = await wxToPromise('request', {
        url: `${ApiConfig.baseUrl}${url}`,
        data,
        method,
        header: {
          token: wx.getStorageSync(Cache.TOKEN),
        },
      })
    } catch (e) {
      Http._showError(-1)
      throw new Error(e.errMsg)
    }

    if (res.statusCode < 400) {
      return res.data.data
    }

    if (res.statusCode === 401) {
      this.storeBindings = createStoreBindings(this, {
        store: timStore,
        fields: ['sdkReady'],
        actions: { timLogout: 'logout' },
      })
      if (res.data.error_code === 10001) {
        if (this.sdkReady) {
          this.timLogout()
        }
        wx.navigateTo({
          url: '/pages/login/login',
        })
        throw Error('请求为携带令牌')
      }
      if (reFetch) {
        return await Http.reFetch({ url, data, method, reFetch })
      }
      if (this.sdkReady) {
        this.timLogout()
      }
    }

    Http._showError(res.data.error_code, res.data.message)
    const error = Http._generateMessage(res.data.message)
    throw new Error(error)
  }

  static _showError(errorCode, message) {
    const errorMessage = exceptionMessage[errorCode]
    let title = errorMessage || message || '未知异常'
    title = Http._generateMessage(title)
    wx.showToast({
      title,
      icon: 'none',
      duration: 3000,
    })
  }

  static _generateMessage(message) {
    return typeof message === 'object'
        ? Object.values(message).join(';')
        : message
  }

  static async reFetch(data) {
    await User.login()
    data.reFetch = false
    return await Http.request(data)
  }
}

export default Http
