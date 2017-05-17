module.exports = [
  {
    id: 'help_message',
    class: 'Tip',
    base_class: 'Block',
    content: '<h1>Welcome to Are.na</h1><br><br><a href="/getting-started">Getting started</a><br><a href="/about/faqs">FAQs</a><br><a href="/are-na/feedback">Feedback</a>',
  },
  {
    id: 'channel_message',
    class: 'Tip',
    base_class: 'Block',
    content: '<h1>Create your first channel</h1>',
    sub_content: '<a href="#" class="trigger-mediator" data-trigger="new:channel">&plus; New channel</a>'
  },
  {
    id: 'find_friends_message',
    class: 'Tip',
    base_class: 'Block',
    content: '<h1>Find existing contacts via Twitter</h1>',
    sub_content: '<a href="/tools/find-friends">Connect Twitter account ➝</a>'
  },
  {
    id: 'explore_message',
    class: 'Tip',
    base_class: 'Block',
    content: '<h1>Explore what other Are.na users are connecting</h1>',
    sub_content: '<a href="/explore">Are.na / Explore ➝</a>'
  },
  {
    id: 'bookmarklet_message',
    class: 'Tip',
    base_class: 'Block',
    content: '<h1>Add blocks easily while browsing the web</h1>',
    sub_content: '<a href="/tools/bookmarklet">Install the bookmarklet ➝</a>'
  },
]