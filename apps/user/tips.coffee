module.exports = [
  {
    id: 'tip_welcome',
    class: 'Tip',
    base_class: 'Block',
    content: '<h1>Welcome to Are.na</h1><br><br><a href="/getting-started">Getting started</a><br><a href="/about/faqs">FAQs</a><br><a href="/are-na/feedback">Feedback</a>',
  },
  {
    id: 'tip_channel',
    class: 'Tip',
    base_class: 'Block',
    content: '<h1>Create your first channel</h1>',
    sub_content: '<a href="#" class="trigger-mediator" data-trigger="new:channel">&plus; New channel</a>'
  },
  {
    id: 'tip_friends',
    class: 'Tip',
    base_class: 'Block',
    content: '<h1>Find existing contacts via Twitter</h1>',
    sub_content: '<a href="/tools/find-friends">Connect Twitter account &rarr;</a>'
  },
  {
    id: 'tip_explore',
    class: 'Tip',
    base_class: 'Block',
    content: '<h1>Explore what other Are.na users are connecting</h1>',
    sub_content: '<a href="/explore">Are.na / Explore &rarr;</a>'
  },
  {
    id: 'tip_bookmarklet',
    class: 'Tip',
    base_class: 'Block',
    content: '<h1>Add blocks easily while browsing the web</h1>',
    sub_content: '<a href="/tools/bookmarklet">Install the bookmarklet &rarr;</a>'
  },
]