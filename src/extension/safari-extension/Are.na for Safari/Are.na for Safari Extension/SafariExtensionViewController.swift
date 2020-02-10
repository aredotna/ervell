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
    var contextInfo: ContextMenuData = ContextMenuData()

    static let shared: SafariExtensionViewController = {
        let shared = SafariExtensionViewController()
        shared.preferredContentSize = NSSize(width: 375, height: 660)
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
        let url = URL(string: html!.absoluteString)
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
        
        NSLog(messageBody)
        
        let m: AppMessage? = jsonDeserialize(json: messageBody)
        
        if m == nil {
            NSLog("m is nil")
            return
        }
        
        let command = m!.action
        NSLog(command ?? "no command")
        
        switch command {
        case "getCurrentPage":
            if self.contextInfo.id == "" {
                sendCurrentPage()
            }
        case "close":
            dismissPopover()
            contextInfo = ContextMenuData()
            webView?.reload()
            replyMessage(message: m!)
        default:
            NSLog("Unhandled command: \(command ?? "nil command")")
        }
    }

    func replyMessage(message: AppMessage) {
        if webView == nil {
            return
        }
        let json = (jsonSerialize(obj: message) ?? "null")
        webView.evaluateJavaScript("window.arenaSafariAppMessageReceiver(\(json));", completionHandler: nil)
    }
    
    func sendCurrentPage() {
        let options = TabQueryOptions()
        options.active = true
        SFSafariApplication.getActiveWindow { win in
            if (win != nil) {
                processWindowsForTabs(wins: [win!], options: options, complete: { tabs in
                    let response = AppMessage()
                    response.command = "app_message"
                    response.action = "currentPage"
                    response.data = jsonSerialize(obj: tabs)
                    
                    print(self.contextInfo)
                    print("sending current page")
                    self.replyMessage(message: response)
                })
            }
        }
    }
    
    func sendContextMenuData(contextInfo: ContextMenuData) {
        let options = TabQueryOptions()
        options.active = true
        SFSafariApplication.getActiveWindow { win in
            processWindowsForTabs(wins: [win!], options: options, complete: { tabs in
                let response = AppMessage()
                response.command = "app_message"
                response.action = "drop"
                response.data = jsonSerialize(obj: contextInfo)
                self.replyMessage(message: response)
            })
        }
    }
    
    func openPopover() {
        SFSafariApplication.getActiveWindow { (window) in
            window?.getToolbarItem(completionHandler: { (item) in
                item?.showPopover()
            })
        }
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

func makeTabObject(tab: SFSafariTab, activeTab: SFSafariTab?, windowIndex: Int?, tabIndex: Int?,
                   complete: @escaping (Tab) -> Void) {
    let t = Tab()
    t.active = activeTab != nil && tab == activeTab
    t.windowId = windowIndex ?? 0
    t.index = tabIndex!
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

    var id: String?
    var command: String?
    var action: String?
    var data: String?
    var responseData: String?
    var responseError: Bool?
    var senderTab: Tab?
}

class ContextMenuData: Decodable, Encodable {
    init() {
        id = ""
        type = ""
        value = ""
        
    }

    var id: String?
    var type: String?
    var value: String?
    var original_source_url: String?
    var original_source_title: String?
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
