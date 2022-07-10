import { createStoreBindings } from 'mobx-miniprogram-bindings'
import { timStore } from '../../store/tim'
import { getDataSet } from '../../utils/utils'
import cache from '../../enum/cache'
import { setTabBarBadge } from '../../utils/wx'

Page({
  data: {
    conversationList: [],
    updateConversionList: false,
  },
  onLoad() {
    this.storeBindings = createStoreBindings(this, {
      store: timStore,
      fields: ['sdkReady', 'conversationList'],
      actions: ['getConversationList'],
    })
  },
  async onShow() {
    if (this.data.updateConversionList) {
      await this.getConversationList()
      this.data.updateConversionList = false
    }
    const unreadCount = wx.getStorageSync(cache.UNREAD_COUNT)
    setTabBarBadge(unreadCount)
  },
  onUnload() {
    // 避免内存泄露
    this.storeBindings.destroyStoreBindings()
  },

  handleToLogin() {
    wx.navigateTo({
      url: '/pages/login/login'
    })
  },

  handleSelect(evt) {
    this.data.updateConversionList = true
    const item = getDataSet(evt, 'item')
    wx.navigateTo({
      // service 不需要，所以传空字符串
      url: `/pages/conversation/conversation?targetUserId=${item.userProfile.userID}&service=`,
      events: {
        sendMessage: () => {
          this.data.updateConversionList = false
        }
      }
    })
  },
})
