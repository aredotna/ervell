//
//  ViewController.swift
//  Are.na for Safari
//
//  Created by Charles Broskoski on 1/19/20.
//  Copyright © 2020 When It Changed Inc. All rights reserved.
//

import Cocoa
import SafariServices.SFSafariApplication

class ViewController: NSViewController {

    @IBOutlet var appNameLabel: NSTextField!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        self.view.window?.title = "Are.na for Safari"
    }
    
    override func viewDidAppear() {
        super.viewDidAppear()
        self.view.window?.title = "Are.na for Safari"
    }
    
    @IBAction func openSafariExtensionPreferences(_ sender: AnyObject?) {
        SFSafariApplication.showPreferencesForExtension(withIdentifier: "arena.Are-na-for-Safari.Extension") { error in
            if let _ = error {
                print(error)
                // Insert code to inform the user that something went wrong.

            }
        }
    }

}
