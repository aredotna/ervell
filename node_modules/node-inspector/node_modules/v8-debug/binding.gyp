{
  'targets': [
    {
      'target_name': 'debug',
      'win_delay_load_hook': 'true',
      'sources': [
        'src/debug.cc',
      ],
      'include_dirs' : [
        "<!(node -e \"require('nan')\")"
      ]
    },
    {
      "target_name": "action_after_build",
      "type": "none",
      "dependencies": [ "<(module_name)" ],
      "copies": [
        {
          "files": [ "<(PRODUCT_DIR)/<(module_name).node" ],
          "destination": "<(module_path)"
        }
      ]
    }
  ]
}
