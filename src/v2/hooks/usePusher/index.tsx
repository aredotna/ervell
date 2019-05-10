import { useEffect, useState } from 'react'

import { initPusherClient } from 'v2/util/initPusherClient'

export function normalizePayloads(payloads) {
  return [
    ...new Map(payloads.map((obj: any) => [JSON.stringify(obj), obj])).values(),
  ]
}

interface PusherHook {
  socketId: string
  onCreated?: (payload: any) => any
  onUpdated?: (payload: any) => any
  parsePayload?: (payload: any) => any
}

export const usePusher = ({
  socketId,
  onCreated = () => {},
  onUpdated = () => {},
  parsePayload = () => {},
}: PusherHook): any[] => {
  const [payloads, setPayloads] = useState([])

  useEffect(() => {
    const socket = initPusherClient()
    const channel = socket.subscribe(socketId)

    channel.bind(
      'created',
      (payload): void => {
        const parsed = parsePayload(payload)
        setPayloads(prevPayloads =>
          normalizePayloads([parsed, ...prevPayloads])
        )
        onCreated(parsed)
      }
    )

    channel.bind(
      'updated',
      (payload): void => {
        const parsed = parsePayload(payload)
        setPayloads(prevPayloads =>
          normalizePayloads([...prevPayloads, parsed])
        )
        onUpdated(parsed)
      }
    )

    return () => {
      socket.unsubscribe(socketId)
    }
  }, [onCreated, onUpdated, parsePayload, socketId])

  return payloads
}
