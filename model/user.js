import Token from './token'
import Http from '../utils/http'
import Cache from '../enum/cache'

class User {
  static getUserInfoByLocal() {
    return wx.getStorageSync(Cache.USER_INFO)
  }

  static async login() {
    const token = await Token.getToken()
    wx.setStorageSync(Cache.TOKEN, token)
  }

  static async updateUserInfo(userInfo) {
    const { nickName, avatarUrl } = userInfo
    const data= await Http.request({
      url: 'v1/user',
      data: {
        nickname: nickName,
        avatar: avatarUrl,
      },
      method: 'PUT',
    })
    wx.setStorageSync(Cache.USER_INFO, data)
  }
}

export default User
