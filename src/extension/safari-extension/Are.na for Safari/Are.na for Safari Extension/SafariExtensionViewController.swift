//
//  SafariExtensionViewController.swift
//  Are.na for Safari Extension
//
//  Created by Charles Broskoski on 1/19/20.
//  Copyright © 2020 When It Changed Inc. All rights reserved.
//

import SafariServices
import WebKit

class SafariExtensionViewController: SFSafariExtensionViewController, WKScriptMessageHandler, WKNavigationDelegate {
    var webView: WKWebView!
    var initedWebView: Bool = false
    var popoverOpenCount: Int = 0

    static let shared: SafariExtensionViewController = {
        let shared = SafariExtensionViewController()
        shared.preferredContentSize = NSSize(width: 375, height: 600)
        return shared
    }()

    func initWebView() {
        if initedWebView {
            return
        }
        let version = Bundle.main.infoDictionary?["CFBundleShortVersionString"] as? String
        initedWebView = true
        let parentHeight = SafariExtensionViewController.shared.preferredContentSize.height
        let parentWidth = SafariExtensionViewController.shared.preferredContentSize.width
        let webViewConfig = WKWebViewConfiguration()
        let bundleURL = Bundle.main.resourceURL!.absoluteURL
        let html = Bundle.main.url(forResource: "index", withExtension: "html")
        let url = URL(string: "\(html?.absoluteString ?? "Something")?appVersion=\(version!)")
        webViewConfig.preferences.setValue(true, forKey: "allowFileAccessFromFileURLs")
        webViewConfig.preferences.setValue(true, forKey: "developerExtrasEnabled")
        webViewConfig.userContentController.add(self, name: "arenaApp")
        webView = WKWebView(frame: CGRect(x: 0, y: 0, width: parentWidth, height: parentHeight),
                            configuration: webViewConfig)
        webView.navigationDelegate = self
        webView.allowsLinkPreview = false
        webView.loadFileURL(url!, allowingReadAccessTo: bundleURL)
        webView.alphaValue = 0.0
        webView.uiDelegate = self
        view.addSubview(webView)
    }

    func webView(_ webView: WKWebView, didFinish _: WKNavigation!) {
        if #available(OSXApplicationExtension 10.12, *) {
            NSAnimationContext.runAnimationGroup({ _ in
                NSAnimationContext.current.duration = 0.35
                webView.animator().alphaValue = 1.0
            })
        } else {
            // Fallback on earlier versions
        }
    }

    override func viewDidLoad() {
        super.viewDidLoad()
        let backgroundColor = NSColor(red: (39 / 255.0), green: (42 / 255.0), blue: (46 / 255.0), alpha: 1.0)
        view.setValue(backgroundColor, forKey: "backgroundColor")
        initWebView()
    }

    func userContentController(_: WKUserContentController, didReceive message: WKScriptMessage) {
        NSLog("MESSAGE RECEIVED \(message.name)  \(message.body)")
        
        if message.name != "arenaApp" {
            return
        }
        let messageBody = message.body as! String

        let m: AppMessage? = jsonDeserialize(json: messageBody)
        
        if m == nil {
            return
        }
        
        let command = m!.action
        // print(command)
        if command == "storage_get" {
            let obj = UserDefaults.standard.string(forKey: m!.data!)
            m!.responseData = obj
            replyMessage(message: m!)
        } else if command == "storage_save" {
            let data: StorageData? = jsonDeserialize(json: m!.data)
            if data?.obj == nil {
                UserDefaults.standard.removeObject(forKey: data!.key)
            } else {
                UserDefaults.standard.set(data?.obj, forKey: data!.key)
            }
            replyMessage(message: m!)
        } else if command == "storage_remove" {
            UserDefaults.standard.removeObject(forKey: m!.data!)
            replyMessage(message: m!)
        } else if command == "getLocaleStrings" {
            let language = m!.data ?? "en"
            let bundleURL = Bundle.main.resourceURL!.absoluteURL
            let messagesUrl = bundleURL.appendingPathComponent("app/_locales/\(language)/messages.json")
            do {
                let json = try String(contentsOf: messagesUrl, encoding: .utf8)
                webView.evaluateJavaScript("window.arenaLocaleStrings = \(json);", completionHandler: nil)
            } catch {}
            replyMessage(message: m!)
        } else if command == "tabs_query" {
            let options: TabQueryOptions? = jsonDeserialize(json: m!.data)
            if options?.currentWindow ?? false {
                SFSafariApplication.getActiveWindow { win in
                    processWindowsForTabs(wins: [win!], options: options, complete: { tabs in
                        m!.responseData = jsonSerialize(obj: tabs)
                        self.replyMessage(message: m!)
                    })
                }
            } else {
                SFSafariApplication.getAllWindows { wins in
                    processWindowsForTabs(wins: wins, options: options, complete: { tabs in
                        m!.responseData = jsonSerialize(obj: tabs)
                        self.replyMessage(message: m!)
                    })
                }
            }
        } else if command == "tabs_message" {
            let tabMsg: TabMessage? = jsonDeserialize(json: m!.data)
            SFSafariApplication.getAllWindows { wins in
                var theWin: SFSafariWindow?
                var winIndex = 0
                for win in wins {
                    if tabMsg?.tab.windowId == winIndex {
                        theWin = win
                        break
                    }
                    winIndex = winIndex + 1
                }
                var theTab: SFSafariTab?
                theWin?.getAllTabs { tabs in
                    var tabIndex = 0
                    for tab in tabs {
                        if tabMsg?.tab.index == tabIndex {
                            theTab = tab
                            break
                        }
                        tabIndex = tabIndex + 1
                    }
                    theTab?.getActivePage { activePage in
                        activePage?.dispatchMessageToScript(withName: "arena", userInfo: ["msg": tabMsg!.obj])
                    }
                }
            }
        } else if command == "close" {
            dismissPopover()
            replyMessage(message: m!)
        } else if command == "showPopover" {
            SFSafariApplication.getActiveWindow { win in
                win?.getToolbarItem(completionHandler: { item in
                    item?.showPopover()
                })
            }
        } else if command == "isPopoverOpen" {
            m!.responseData = popoverOpenCount > 0 ? "true" : "false"
            replyMessage(message: m!)
        } else if command == "createNewTab" {
            if m!.data != nil {
                SFSafariApplication.getActiveWindow { win in
                    win?.openTab(with: URL(string: m!.data!)!, makeActiveIfPossible: true, completionHandler: { _ in
                        // Tab opened
                    })
                }
            }
        } else if command == "reloadExtension" {
            webView?.reload()
            replyMessage(message: m!)
        } else if command == "copyToClipboard" {
            let pasteboard = NSPasteboard.general
            pasteboard.declareTypes([NSPasteboard.PasteboardType.string], owner: nil)
            pasteboard.setString(m!.data ?? "", forType: NSPasteboard.PasteboardType.string)
            replyMessage(message: m!)
        } else if command == "readFromClipboard" {
            let pasteboard = NSPasteboard.general
            m?.responseData = pasteboard.pasteboardItems?.first?.string(forType: .string)
            replyMessage(message: m!)
        } else if command == "downloadFile" {
            if m!.data != nil {
                if let dlMsg: DownloadFileMessage = jsonDeserialize(json: m!.data) {
                    var data: Data?
                    if dlMsg.blobOptions?.type == "text/plain" {
                        data = dlMsg.blobData?.data(using: .utf8)
                    } else {
                        data = Data(base64Encoded: dlMsg.blobData!)
                    }
                    if data != nil {
                        let panel = NSSavePanel()
                        panel.canCreateDirectories = true
                        panel.nameFieldStringValue = dlMsg.fileName
                        panel.begin { response in
                            if response == NSApplication.ModalResponse.OK {
                                if let url = panel.url {
                                    do {
                                        let fileManager = FileManager.default
                                        if !fileManager.fileExists(atPath: url.absoluteString) {
                                            fileManager.createFile(atPath: url.absoluteString, contents: Data(),
                                                                   attributes: nil)
                                        }
                                        try data!.write(to: url)
                                    } catch {
                                        print(error)
                                    }
                                }
                            }
                        }
                    }
                }
            }
        } else if command == "getAppPath" {
            SFSafariExtension.getBaseURI(completionHandler: { uri in
                if uri != nil {
                    m!.responseData = uri!.absoluteString
                    self.replyMessage(message: m!)
                }
            })
        }
    }

    func replyMessage(message: AppMessage) {
        if webView == nil {
            return
        }
        let json = (jsonSerialize(obj: message) ?? "null")
        webView.evaluateJavaScript("window.arenaSafariAppMessageReceiver(\(json));", completionHandler: nil)
    }
}

extension SafariExtensionViewController: WKUIDelegate {
    @available(OSXApplicationExtension 10.12, *)
    func webView(_: WKWebView, runOpenPanelWith _: WKOpenPanelParameters, initiatedByFrame _: WKFrameInfo,
                 completionHandler: @escaping ([URL]?) -> Void) {
        let openPanel = NSOpenPanel()
        openPanel.canChooseFiles = true
        openPanel.begin { result in
            if result == NSApplication.ModalResponse.OK && openPanel.url != nil {
                completionHandler([openPanel.url!])
            } else {
                completionHandler(nil)
            }
        }
    }
}

func processWindowsForTabs(wins: [SFSafariWindow], options: TabQueryOptions?, complete: @escaping ([Tab]) -> Void) {
    if wins.count == 0 {
        complete([])
        return
    }
    var newTabs: [Tab] = []
    let winGroup = DispatchGroup()
    for win in wins {
        winGroup.enter()
        win.getActiveTab { activeTab in
            win.getAllTabs { allTabs in
                let tabGroup = DispatchGroup()
                for tab in allTabs {
                    tabGroup.enter()
                    if options?.active ?? false {
                        if activeTab != nil && activeTab == tab {
                            let windowIndex = wins.firstIndex(of: win) ?? -100
                            let tabIndex = allTabs.firstIndex(of: tab) ?? -1
                            makeTabObject(tab: tab, activeTab: activeTab, windowIndex: windowIndex,
                                          tabIndex: tabIndex, complete: { t in
                                              newTabs.append(t)
                                              tabGroup.leave()
                            })
                        } else {
                            tabGroup.leave()
                        }
                    } else {
                        let windowIndex = wins.firstIndex(of: win) ?? -100
                        let tabIndex = allTabs.firstIndex(of: tab) ?? -1
                        makeTabObject(tab: tab, activeTab: activeTab, windowIndex: windowIndex,
                                      tabIndex: tabIndex, complete: { t in
                                          newTabs.append(t)
                                          tabGroup.leave()
                        })
                    }
                }
                tabGroup.notify(queue: .main) {
                    winGroup.leave()
                }
            }
        }
    }
    winGroup.notify(queue: .main) {
        complete(newTabs)
    }
}

func makeTabObject(tab: SFSafariTab, activeTab: SFSafariTab?, windowIndex: Int, tabIndex: Int,
                   complete: @escaping (Tab) -> Void) {
    let t = Tab()
    t.active = activeTab != nil && tab == activeTab
    t.windowId = windowIndex
    t.index = tabIndex
    t.id = "\(windowIndex)_\(tabIndex)"
    tab.getActivePage { page in
        if page == nil {
            complete(t)
        } else {
            page!.getPropertiesWithCompletionHandler({ props in
                t.title = props?.title
                t.url = props?.url?.absoluteString
                complete(t)
            })
        }
    }
}

func jsonSerialize<T: Encodable>(obj: T?) -> String? {
    let encoder = JSONEncoder()
    do {
        let data = try encoder.encode(obj)
        return String(data: data, encoding: .utf8) ?? "null"
    } catch _ {
        return "null"
    }
}

func jsonDeserialize<T: Decodable>(json: String?) -> T? {
    if json == nil {
        return nil
    }
    let decoder = JSONDecoder()
    do {
        let obj = try decoder.decode(T.self, from: json!.data(using: .utf8)!)
        return obj
    } catch _ {
        return nil
    }
}

class AppMessage: Decodable, Encodable {
    init() {
        id = ""
        command = ""
        action = ""
        data = nil
        responseData = nil
        responseError = nil
    }

    var id: String
    var command: String
    var action: String
    var data: String?
    var responseData: String?
    var responseError: Bool?
    var senderTab: Tab?
}

class StorageData: Decodable, Encodable {
    var key: String
    var obj: String?
}

class TabQueryOptions: Decodable, Encodable {
    var currentWindow: Bool?
    var active: Bool?
}

class Tab: Decodable, Encodable {
    init() {
        id = ""
        index = -1
        windowId = -100
        title = ""
        active = false
        url = ""
    }

    var id: String
    var index: Int
    var windowId: Int
    var title: String?
    var active: Bool
    var url: String?
}

class TabMessage: Decodable, Encodable {
    var tab: Tab
    var obj: String
    var options: TabMessageOptions?
}

class TabMessageOptions: Decodable, Encodable {
    var frameId: Int?
}

class DownloadFileMessage: Decodable, Encodable {
    var fileName: String
    var blobData: String?
    var blobOptions: DownloadFileMessageBlobOptions?
}

class DownloadFileMessageBlobOptions: Decodable, Encodable {
    var type: String?
}
