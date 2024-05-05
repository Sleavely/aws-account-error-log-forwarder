import { gunzip } from 'zlib'

export const unzipLogdata = async (
  data: AWSLambda.CloudWatchLogsEvent['awslogs']['data'],
): Promise<AWSLambda.CloudWatchLogsDecodedData> => {
  return await new Promise((resolve, reject) => {
    gunzip(Buffer.from(data, 'base64'), (err, res) => {
      if (err) { reject(err); return }
      resolve(JSON.parse(res.toString('utf8')))
    })
  })
}

/**
 * Constructs a URL that can be used to link to a log stream
 */
export const getLogStreamConsoleUrl = (log: AWSLambda.CloudWatchLogsDecodedData): string => {
  const encodedLogGroup = encodeURIComponent(encodeURIComponent(log.logGroup)).replaceAll('%', '$')
  const encodedLogStream = encodeURIComponent(encodeURIComponent(log.logStream)).replaceAll('%', '$')
  return `https://console.aws.amazon.com/cloudwatch/home#logsV2:log-groups/log-group/${encodedLogGroup}/log-events/${encodedLogStream}`
}
