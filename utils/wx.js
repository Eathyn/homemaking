export default function wxToPromise(method, options = {}) {
  return new Promise((resolve, reject) => {
    options.success = resolve
    options.fail = err => {
      reject(err)
    }
    wx[method](options)
  })
}

async function setTabBarBadge(unreadCount) {
  try {
    if (unreadCount > 0) {
      await wx.setTabBarBadge({
        index: 2,
        text: unreadCount.toString(),
      })
      wx.setStorageSync(cache.UNREAD_COUNT, unreadCount)
    } else {
      await wx.removeTabBarBadge({
        index: 2,
      })
      wx.setStorageSync(cache.UNREAD_COUNT, 0)
    }
  } catch (e) {
    wx.setStorageSync(cache.UNREAD_COUNT, unreadCount)
    console.log(e)
  }
}

export { wxToPromise, setTabBarBadge }
