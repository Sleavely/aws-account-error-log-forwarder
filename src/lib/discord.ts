interface WebhookEmbed {
  title?: string
  description?: string
  url?: string
  /**
   * ISO8601 timestamp
   */
  timestamp?: string
  color?: number

  footer?: {
    text: string
    /**
     * url of footer icon (only supports http(s) and attachments)
     */
    icon_url?: string
    proxy_icon_url?: string
  }
}

/**
 * @see https://discord.com/developers/docs/resources/webhook#execute-webhook
 */
interface WebhookPayload {
  /**
   * up to 2000 characters
   */
  content: string

  /**
   * Override default webhook username
   */
  username?: string

  /**
   * Override default webhook avatar
   */
  avatar_url?: string

  /**
   * `true` if this is a TTS message
   */
  tts?: boolean

  /**
   * Up to 10 embedded `rich` objects
   * @see https://discord.com/developers/docs/resources/channel#embed-object
   */
  embeds?: WebhookEmbed[]

  /**
   * Bitfield message flags.
   * Only SUPPRESS_EMBEDS and SUPPRESS_NOTIFICATIONS can be set
   * @see https://discord.com/developers/docs/resources/channel#message-object-message-flags
   */
  flags?: number
}

export const discordWebhook = async (
  webhookUrl: string,
  webhookParams: WebhookPayload,
): Promise<unknown> => {
  if (webhookParams.content.length > 2000) {
    const truncationMessage = '...\n\n[message truncated]'
    webhookParams.content = webhookParams.content.slice(0, -truncationMessage.length) + truncationMessage
  }
  return await fetch(webhookUrl, {
    method: 'POST',
    body: JSON.stringify(webhookParams),
    headers: {
      'Content-Type': 'application/json',
    },
  })
}
