import Http from './http'
import wxToPromise from './wx'
import ApiConfig from '../config/api'

class FileUploader extends Http {
  static async upload(filePath, key = 'file') {
    let res = null
    try {
      res = await wxToPromise('uploadFile', {
        url: `${ApiConfig.baseUrl}/v1/file`,
        filePath: filePath,
        name: key,
      })
    } catch (err) {
      FileUploader._showError(-1)
      throw new Error(err.errMsg)
    }

    const serverData = JSON.parse(res.data)
    if (res.statusCode !== 201) {
      const { error_code: errorCode, message } = serverData
      FileUploader._showError(errorCode, message)
      throw new Error(serverData.message)
    }
    return serverData.data
  }
}

export default FileUploader
