import { useEffect, useState } from 'react'

import { initPusherClient } from 'v2/util/initPusherClient'

export function normalizePayloads(payloads) {
  return [
    ...new Map(payloads.map((obj: any) => [JSON.stringify(obj), obj])).values(),
  ]
}

interface PusherHook {
  channel: any
  onCreated?: (payload: any) => any
  onUpdated?: (payload: any) => any
  parsePayload?: (payload: any) => any
}

export const setupPusherChannel = socketId => {
  const socket = initPusherClient()
  const channel = socket && socket.subscribe(socketId)

  return { channel, socket }
}

export const usePusher = ({
  channel,
  onCreated = () => {},
  onUpdated = () => {},
  parsePayload = () => {},
}: PusherHook): any[] => {
  const [payloads, setPayloads] = useState([])

  useEffect(() => {
    channel.bind('created', (payload): void => {
      const parsed = parsePayload(payload)
      setPayloads(prevPayloads => normalizePayloads([parsed, ...prevPayloads]))
      onCreated(parsed)
    })

    channel.bind('updated', (payload): void => {
      const parsed = parsePayload(payload)
      setPayloads(prevPayloads => normalizePayloads([...prevPayloads, parsed]))
      onUpdated(parsed)
    })

    return () => {
      channel.unbind()
    }
  }, [channel, onCreated, onUpdated, parsePayload])

  return payloads
}
