const { Logger } = require('../lib/Logger')
const { config } = require('../config')
const { S3Client, PutObjectCommand  } = require("@aws-sdk/client-s3")
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner")

const AWS_REGION = config.aws.region
const AWS_ACCESS_KEY_ID = config.aws.accessId
const AWS_SECRET_ACCESS_KEY = config.aws.secretKey

class AWSS3Client extends Logger {
  constructor() {
    super('S3Client')
  }

  /**
   * Get Presigned url to upload file
   * @param {*} bucketName S3 bucket name
   * @param {*} key file key ex. <path>/fileName
   * @returns 
   */
  async getPreSignedUrl(bucketName, key) {
    try {
      const s3Client = new S3Client({
        region: AWS_REGION,
        credentials: {
          accessKeyId: AWS_ACCESS_KEY_ID,
          secretAccessKey: AWS_SECRET_ACCESS_KEY
        }
      })
      const params = {
        Bucket: bucketName,
        Key:  key
      };
  
      const command = new PutObjectCommand(params)
      const presignedUrl = await getSignedUrl(s3Client, command, { expiresIn: 60 })
      this._logInfo('Get presigned url succeeded!!')
      return presignedUrl
    } catch (err) {
      this._logErr("Get presigned url failed.", err)
      return false
    }
  }
}


module.exports = new AWSS3Client()