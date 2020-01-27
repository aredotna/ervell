export class SafariApp {
  static init() {
    if ((window as any).arenaSafariAppInited) {
      return
    }
    ;(window as any).arenaSafariAppInited = true
    if (window.safariAppExtension) {
      ;(window as any).arenaSafariAppRequests = new Map<
        string,
        { resolve: (value?: unknown) => void; timeoutDate: Date }
      >()
      ;(window as any).arenaSafariAppMessageListeners = new Map<
        string,
        (message: any, sender: any, response: any) => void
      >()
      ;(window as any).arenaSafariAppMessageReceiver = (message: any) => {
        SafariApp.receiveMessageFromApp(message)
      }
      setInterval(() => SafariApp.cleanupOldRequests(), 5 * 60000) // every 5 mins
    }
  }

  static sendMessageToApp(
    command: string,
    data: any = null,
    resolveNow = false
  ): Promise<any> {
    if (!window.safariAppExtension) {
      return Promise.resolve(null)
    }
    return new Promise(resolve => {
      const now = new Date()
      const messageId =
        now.getTime().toString() +
        '_' +
        Math.floor(Math.random() * Number.MAX_SAFE_INTEGER)
      ;(window as any).webkit.messageHandlers.arenaApp.postMessage(
        JSON.stringify({
          id: messageId,
          command: command,
          data: data,
          responseData: null,
        })
      )
      if (resolveNow) {
        resolve()
      } else {
        ;(window as any).arenaSafariAppRequests.set(messageId, {
          resolve: resolve,
          timeoutDate: new Date(now.getTime() + 5 * 60000),
        })
      }
    })
  }

  static addMessageListener(
    name: string,
    callback: (message: any, sender: any, response: any) => void
  ) {
    ;(window as any).arenaSafariAppMessageListeners.set(name, callback)
  }

  static sendMessageToListeners(message: any, sender: any, response: any) {
    ;(window as any).arenaSafariAppMessageListeners.forEach((f: any) =>
      f(message, sender, response)
    )
    new CustomEvent('message', message)
  }

  private static receiveMessageFromApp(message: any) {
    console.log('recieved message', message)
    if (message == null) {
      return
    }
    if (
      (message.id == null || message.id === '') &&
      message.command === 'app_message'
    ) {
      try {
        const msg = JSON.parse(message.data)
        console.log('msg data', msg)
        SafariApp.sendMessageToListeners(
          msg,
          {
            id: 'app_message',
            tab: message.senderTab,
          },
          null
        )
      } catch {
        console.info('Error caught')
      }
    } else if (
      message.id != null &&
      (window as any).arenaSafariAppRequests.has(message.id)
    ) {
      const p = (window as any).arenaSafariAppRequests.get(message.id)
      p.resolve(message.responseData)
      ;(window as any).arenaSafariAppRequests.delete(message.id)
    }
  }

  private static cleanupOldRequests() {
    const removeIds: string[] = []
    ;((window as any).arenaSafariAppRequests as Map<
      string,
      { resolve: (value?: unknown) => void; timeoutDate: Date }
    >).forEach((v, key) => {
      if (v.timeoutDate < new Date()) {
        removeIds.push(key)
      }
    })
    removeIds.forEach(id => {
      ;(window as any).arenaSafariAppRequests.delete(id)
    })
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.webkit.messageHandlers.arenaApp.postMessage('hey from arenaApp')

  SafariApp.init()
})
