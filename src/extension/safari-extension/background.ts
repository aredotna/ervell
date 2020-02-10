declare const window: any

export class SafariApp {
  static init() {
    if (window.arenaSafariAppInited) {
      return
    }
    window.arenaSafariAppInited = true
    if (window.safariAppExtension) {
      window.arenaSafariAppRequests = new Map<
        string,
        { resolve: (value?: unknown) => void; timeoutDate: Date }
      >()

      window.arenaSafariAppMessageListeners = new Map<
        string,
        (message: any, sender: any, response: any) => void
      >()

      window.arenaSafariAppMessageReceiver = (message: any) => {
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
      window.webkit.messageHandlers.arenaApp.postMessage(
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
        window.arenaSafariAppRequests.set(messageId, {
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
    window.arenaSafariAppMessageListeners.set(name, callback)
  }

  static sendMessageToListeners(message: any, sender: any, response: any) {
    window.arenaSafariAppMessageListeners.forEach((f: any) =>
      f(message, sender, response)
    )
  }

  private static receiveMessageFromApp(message: any) {
    if (message == null) {
      return
    }
    if (
      (message.id == null || message.id === '') &&
      message.command === 'app_message'
    ) {
      try {
        let msg = JSON.parse(message.data)

        if (message.action === 'currentPage') {
          msg = {
            action: 'currentPage',
            value: msg[0],
          }
        }

        if (message.action === 'drop') {
          msg = {
            action: 'drop',
            value: msg,
          }
        }

        if (msg.action === 'reloadPopup') {
          return window.location.reload()
        }

        SafariApp.sendMessageToListeners(
          { data: msg },
          {
            id: 'app_message',
            tab: message.senderTab,
          },
          null
        )
      } catch (e) {
        console.info('Error caught in safari background', e)
      }
    } else if (
      message.id != null &&
      (window as any).arenaSafariAppRequests.has(message.id)
    ) {
      const p = (window as any).arenaSafariAppRequests.get(message.id)
      p.resolve(message.responseData)
      window.arenaSafariAppRequests.delete(message.id)
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
      window.arenaSafariAppRequests.delete(id)
    })
  }
}

document.addEventListener('DOMContentLoaded', () => {
  SafariApp.init()
})
