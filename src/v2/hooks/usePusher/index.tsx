import { useEffect, useState } from 'react'
import Pusher, { Channel } from 'pusher-js'
import sharify from 'sharify'

import { initPusherClient } from 'v2/util/initPusherClient'

export function normalizePayloads(payloads) {
  return [
    ...new Map(payloads.map((obj: any) => [JSON.stringify(obj), obj])).values(),
  ]
}

interface PusherHook {
  channelId: number
  shouldSubscribe?: boolean
  onCreated?: (payload: any) => any
  onUpdated?: (payload: any) => any
  parsePayload?: (payload: any) => any
}

const emptyFn = () => {}

const {
  data: { NODE_ENV },
} = sharify

export const usePusher = ({
  channelId,
  shouldSubscribe = true,
  onCreated = emptyFn,
  onUpdated = emptyFn,
  parsePayload = emptyFn,
}: PusherHook): any[] => {
  const [channel, setChannel] = useState<Channel | false>(false)
  const [payloads, setPayloads] = useState([])

  /**
   * Effect to subscribe and unsubscribe to the channel
   */
  useEffect(() => {
    const pusher: Pusher | false = initPusherClient()
    const channel =
      shouldSubscribe &&
      pusher &&
      pusher.subscribe(`channel-${NODE_ENV}-${channelId}`)

    setChannel(channel)

    return () => {
      channel.unsubscribe()
      channel.disconnect()

      setChannel(false)
    }
  }, [channelId, shouldSubscribe])

  /**
   * Effect to bind and unbind callbacks to the events
   */
  useEffect(() => {
    if (channel) {
      channel.bind('created', (payload): void => {
        const parsed = parsePayload(payload)
        setPayloads(prevPayloads =>
          normalizePayloads([parsed, ...prevPayloads])
        )
        onCreated(parsed)
      })

      channel.bind('updated', (payload): void => {
        const parsed = parsePayload(payload)
        setPayloads(prevPayloads =>
          normalizePayloads([...prevPayloads, parsed])
        )
        onUpdated(parsed)
      })
    }

    return () => {
      if (channel) {
        channel.unbind()
      }
    }
  }, [onCreated, onUpdated, parsePayload, channel])

  return payloads
}
