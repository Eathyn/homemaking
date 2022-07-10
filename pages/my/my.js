import cache from '../../enum/cache'
import { setTabBarBadge } from '../../utils/wx'

Page({
  data: {},

  onShow() {
    const unreadCount = wx.getStorageSync(cache.UNREAD_COUNT)
    setTabBarBadge(unreadCount)
  },
});
