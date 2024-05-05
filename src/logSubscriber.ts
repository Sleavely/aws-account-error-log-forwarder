// const {
//   DISCORD_WEBHOOK_URL = '',
// } = process.env

export const handler = async (event: AWSLambda.CloudWatchLogsEvent): Promise<void> => {
  // lets figre out what the event structure looks like
  console.log(JSON.stringify(event, null, 2))

  // const content = 'testing!'
  // await fetch(DISCORD_WEBHOOK_URL, {
  //   method: 'POST',
  //   body: JSON.stringify({
  //     content,
  //   }),
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  // })
}
