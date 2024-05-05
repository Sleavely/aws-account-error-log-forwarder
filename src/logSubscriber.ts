import { getLogStreamConsoleUrl, unzipLogdata } from './lib/cloudwatchLogs'
import { discordWebhook } from './lib/discord'

const {
  DISCORD_WEBHOOK_URL = '',
} = process.env

const extractLogEventMessage = (input: string): string => {
  try {
    // If we can find the tab-delimited loglevel produced by AWS Lambda we'll strip that and anything preceeding it,
    // retaining only the output from the application itself
    const rightOfNativeLevel = input.replace(/^.*?\t(INFO|WARN(ING)?|ERROR)\t/, '').trim()
    try {
      // If the app printed JSON data we format it
      return '```json\n' + JSON.stringify(JSON.parse(rightOfNativeLevel), null, 2) + '\n```'
    } catch (err) {
      return '```\n' + rightOfNativeLevel + '\n```'
    }
  } catch (err) {
    return '```\n' + input + '\n```'
  }
}

export const handler = async (event: AWSLambda.CloudWatchLogsEvent): Promise<void> => {
  const log = await unzipLogdata(event.awslogs.data)

  await log.logEvents.reduce(async (previousPromise, logEvent) => {
    await previousPromise
    const messageMarkdown = extractLogEventMessage(logEvent.message)

    const content = `${messageMarkdown}\n${getLogStreamConsoleUrl(log)}`
    await discordWebhook(DISCORD_WEBHOOK_URL, {
      content,
    })
  }, Promise.resolve())
}
