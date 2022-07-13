import cache from '../../enum/cache'
import { setTabBarBadge } from '../../utils/wx'
import Token from '../../model/token'
import User from '../../model/user'
import {
  appointWithMeGrid,
  myAppointGrid,
  myProvideGird,
  mySeekGrid,
} from '../../config/grid'
import Order from '../../model/order'
import Service from '../../model/service'
import roleType from '../../enum/role-type'
import serviceType from '../../enum/service-type'

Page({
  data: {
    userInfo: {
      nickname: '点击授权登陆',
      avatar: '../../images/logo.png',
    },
    appointWithMeGrid: appointWithMeGrid,
    myAppointGrid: myAppointGrid,
    myProvideGird: myProvideGird,
    mySeekGrid: mySeekGrid,
    appointWithMeStatus: null,
    myAppointStatus: null,
    provideServiceStatus: null,
    seekServiceStatus: null
  },

  async onShow() {
    const unreadCount = wx.getStorageSync(cache.UNREAD_COUNT)
    await setTabBarBadge(unreadCount)
    const verifyToken = await Token.verifyToken()
    if (verifyToken.valid) {
      const userInfo = User.getUserInfoByLocal()
      this.setData({
        userInfo,
      })
      this._getOrderStatus()
      this._getServiceStatus()
    }
  },

  handleToLogin() {
    wx.navigateTo({
      url: '/pages/login/login',
    })  
  },

  // 获取"预约我的"和"我的预约"数据
  async _getOrderStatus() {
    /* 优化
    * appointWithMeStatus 和 myAppointStatus 不存在依赖关系
    * 把 await 放到 setData 中可以提高速度
    * */
    const appointWithMeStatus = Order.getOrderStatus(roleType.PUBLISHER)
    const myAppointStatus = Order.getOrderStatus(roleType.CONSUMER)
    this.setData({
      appointWithMeStatus: await appointWithMeStatus,
      myAppointStatus: await myAppointStatus,
    })
  },
  
  // 获取"我在提供"和"正在找"数据
  async _getServiceStatus() {
    const provideServiceStatus = Service.getServiceStatus(serviceType.PROVIDE)
    const seekServiceStatus = Service.getServiceStatus(serviceType.SEEK)
    this.setData({
      provideServiceStatus: await provideServiceStatus,
      seekServiceStatus: await seekServiceStatus,
    })
  },
})
