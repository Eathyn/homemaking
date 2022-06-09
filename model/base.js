class Base {
  page = 1
  count = 10
  data = []
  hasMoreData = true

  reset() {
    this.page = 1
    this.count = 10
    this.data = []
    this.hasMoreData = true
    return this
  }
}

export default Base
