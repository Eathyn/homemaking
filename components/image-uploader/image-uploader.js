import { getEventParam } from '../../utils/utils'
import FileUploader from '../../utils/file-uploader'

Component({
  properties: {
    // 默认展示的图片文件
    files: {
      type: Array,
      value: []
    },
    // 最大上传图片数量
    maxCount: {
      type: Number,
      value: 1
    },
    // 单个图片文件大小限制，单位 MB
    size: {
      type: Number,
      value: 2
    },
    // 可选图片大小类型，original：原图，compressed：压缩图
    // 默认都可以
    sizeType: {
      type: Array,
      value: ['original', 'compressed']
    },
    // 可选图片来源，album: 从相册选图, camera：使用相机
    // 默认都可以
    sourceType: {
      type: Array,
      value: ['album', 'camera']
    },
  },
  observers: {
    files(newValue) {
      if (newValue.length === 0) {
        return
      }
      const _files = []
      newValue.forEach((item, index) => {
        const file = {
          id: item.id,
          key: index.toString(),
          path: item.path,
          status: this.data.uploadStatusEnum.SUCCESS,
          error: '',
        }
        _files.push(file)
      })
      this.setData({
        _files,
      })
    }
  },
  data: {
    uploadStatusEnum: {
      ERROR: 0,
      UPLOADING: 1,
      SUCCESS: 2,
    },
    _files: [],
  },
  methods: {
    handlePreview(evt) {
      const index = getEventParam(evt, 'index')
      const urls = this.data._files.map((item) => item.path)
      wx.previewImage({
        urls,
        current: urls[index],
      })
    },

    handleDelete(evt) {
      const index = getEventParam(evt, 'index')
      const deleted = this.data._files.splice(index, 1)
      // 需要数据绑定
      this.setData({
        _files: this.data._files,
      })
      this.triggerEvent('delete', { index, item: deleted[0] })
    },

    async handleChooseImage() {
      const res = await wx.chooseMedia({
        mediaType: ['image'],
        count: this.data.maxCount,
        sourceType: this.data.sourceType,
        sizeType: this.data.sizeType,
      })
      this.triggerEvent('choose', { files: res.tempFiles })
      const _files = this._filesFilter(res.tempFiles)
      this.setData({
        _files,
      })
      const uploadTask = _files.filter((item) => item.status === this.data.uploadStatusEnum.UPLOADING)
      await this._executeUpload(uploadTask)
    },

    _filesFilter(tempFiles) {
      const res = []
      tempFiles.forEach((item, index) => {
        let error = ''
        if (item.size > (1024 * 1024 * this.data.size)) {
          error = `图片大小不能超过${this.data.size}M`
          this.triggerEvent('validatefail', { item, error })
        }
        const length = this.data._files.length
        res.push({
          id: null,
          key: `${index}${length}`, // 如果没有 length 那么 key 可能会重复。例如用户多次选择 每次选择一张图片
          path: item.tempFilePath,
          status: error ? this.data.uploadStatusEnum.ERROR : this.data.uploadStatusEnum.UPLOADING,
          error: error,
        })
      })
      // 用户可能多次选择 每次选择一张图片 因此需要把之前选择的和本次选择的进行合并
      return this.data._files.concat(res)
    },

    async _executeUpload(updateTask) {
      const success = []
      for (const file of updateTask) {
        try {
          const res = await FileUploader.upload(file.path, file.key)
          const { id, path } = res[0]
          file.id = id
          file.url = path
          file.status = this.data.uploadStatusEnum.SUCCESS
          this.data._files[file.key] = file
          success.push(file)
        } catch (error) {
          file.status = this.data.uploadStatusEnum.ERROR
          file.error = error
          this.triggerEvent('uploadfail', { file, error })
        }
      }
      this.setData({
        _files: this.data._files,
      })
      if (success.length) {
        this.triggerEvent('uploadsuccess', { files: success })
      }
    },
  },
})
