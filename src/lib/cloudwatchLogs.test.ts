import { describe, expect, test } from 'vitest'
import { getLogStreamConsoleUrl, unzipLogdata } from './cloudwatchLogs'

const sampleEvent = (): AWSLambda.CloudWatchLogsEvent => ({
  awslogs: { data: 'H4sIAAAAAAAA/42SXWvbMBSG/0o47NJuZFmyLd+Fzi2FrCnYK2xVKZItJ2K2ZWQ5IYT892I7G7sZDHSj857nfLycC7RqGMReFedeQQpfN8Xm41uW55vHDDwwp05ZSIEkhIYxiSOaIPCgMftHa8YeUliL07BuRCsrsR7Kg6rGRllf6qbR3d4XvfYrdVyQ3FklWkgBI0zWiE7v7ct2U2R58V4LSaMkFATFjISUSFrWMkoQYzKK6hKDB8Moh9Lq3mnTPejGKTtA+gaiLM3YOf9vuZ5lvzeNLs9+b00F7/MM2VF1bsIuoCtIIUwwCROaEIJiEocJDqM4xCwmCaURimKMWEADREMcxTTCAQ1YGCEUgAdOt2pwou0hDeKAsCBkOMQMe78tvW3qI+ojWgQ4pUlKwjvM8E/ulCCUIcl8UYfIJ5LWvqQS+1WkKJaxZBJJ7p6eH3bcXTg06qgaDikHZa2xHDwOuloC/1NpyrdmdGpG1iclD8b8Wg/O6l7NaqvcwSwVX3Z5scSGPYf0wsGd+4XMZyDX+0640apXZXWtSzF5nv0ZzIrTgt2MmMlns7p1XfXi3BhRrU5iWPXWHHWlqjsOV4/DQYlK2RlYApPL0z+YFu7crIhe74VTJ3Fe2qlW6E5306yYsYR5HOqxK6eh5vx/3uVt8dbY85wY4ITDlXdwffdgOZ7tZDyksLm/331/Lj622Wu2/XjZbZ/uf8D1E6Sr2GY/AwAA' },
})

describe('unzipLogdata()', () => {
  test('does its job', async () => {
    const { awslogs: { data } } = sampleEvent()

    const unzippedLogData = await unzipLogdata(data)
    expect(unzippedLogData).toMatchObject({
      logGroup: expect.any(String),
      logStream: expect.any(String),
      logEvents: expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(String),
          message: expect.any(String),
          timestamp: expect.any(Number),
        }),
      ]),
    })
    expect(unzippedLogData.logEvents[0].message).toMatch(/\t(INFO|WARN(ING)?|ERROR)\t/)
  })
})
describe('getLogStreamConsoleUrl()', () => {
  test('works as expected', async () => {
    const expected = 'https://console.aws.amazon.com/cloudwatch/home#logsV2:log-groups/log-group/$252Faws$252Flambda$252Fscheduler-billing-api-dev/log-events/2024$252F05$252F05$252F$255B$2524LATEST$255Dfab5683a40794354b5cfb68099b66fc2'

    const output = getLogStreamConsoleUrl(await unzipLogdata(sampleEvent().awslogs.data))
    expect(output).toBe(expected)
  })
})
