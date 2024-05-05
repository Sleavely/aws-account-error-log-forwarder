import { gunzip } from 'zlib'

export const unzipLogdata = async (
  data: AWSLambda.CloudWatchLogsEvent['awslogs']['data'],
): Promise<unknown> => {
  return await new Promise((resolve, reject) => {
    gunzip(Buffer.from(data, 'base64'), (err, res) => {
      if (err) { reject(err); return }
      resolve(JSON.parse(res.toString('utf8')))
    })
  })
}
