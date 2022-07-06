import TIM from 'tim-wx-sdk-ws'
import TIMUploadPlugin from 'tim-upload-plugin'
import timConfig from '../config/tim'
import User from './user'
import genTestUserSig from '../lib/tim/generate-test-usersig'

class Tim {
  /**
   *
   * @type { Tim }
   */
  static instance = null
  _SDKInstance = null
  isCompleted = false
  _messageList = []
  _nextReqMessageID = ''

  constructor() {
    const tim = TIM.create(timConfig.options)
    tim.setLogLevel(timConfig.logLevel)
    tim.registerPlugin({
      'tim-upload-plugin': TIMUploadPlugin
    })
    this._SDKInstance = tim
  }

  static getInstance() {
    if (!Tim.instance) {
      Tim.instance = new Tim()
    }
    return Tim.instance
  }

  /**
   * 获取与某个用户的聊天信息列表
   * @param targetUserId
   * @param count
   * @returns {Promise<*[]>}
   */
  async getMessageList(targetUserId, count = 10) {
    if (this.isCompleted) {
      return this._messageList
    }
    const res = await this._SDKInstance.getMessageList({
      conversationID: `C2C${targetUserId}`,
      nextReqMessageID: this._nextReqMessageID,
      count: count > 15 ? 15 : count
    })
    const { _nextReqMessageID, isCompleted, _messageList } = res.data
    this._nextReqMessageID = _nextReqMessageID
    this.isCompleted = isCompleted
    this._messageList = _messageList
    return this._messageList
  }

  reset() {
    this._nextReqMessageID = ''
    this.isCompleted = false
    this._messageList = []
    return this
  }

  getSDK() {
    return this._SDKInstance
  }

  login() {
    const userInfo = User.getUserInfoByLocal()
    const textUserSig = genTestUserSig(userInfo.id.toString())
    this._SDKInstance.login({
      userID: userInfo.id.toString(),
      userSig: textUserSig.userSig,
    })
  }

  logout() {
    this._SDKInstance.logout()
  }

  // 消息标记为已读
  async setMessageRead(targetUserId) {
    const res = await this._SDKInstance.setMessageRead({
      conversationID: `C2C${targetUserId}`
    })
    return res.data
  }
}

export default Tim
