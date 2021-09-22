import React from 'react'
import { storiesOf } from '@storybook/react'

import Grid from 'v2/components/UI/Grid'
import { KonnectableInner } from 'v2/components/Cell/components/Konnectable'
import FullBlock from 'v2/components/FullBlock'

const html =
  '<h1>H1</h1>\n\n<h2>H2</h2>\n\n<h3>H3</h3>\n\n<h4>H4</h4>\n\n<h5>H5</h5>\n\n<h6>H6</h6>\n\n<hr>\n\n<h2>This Is An H2 Title</h2>\n\n<p>Emphasis, aka italics, with <em>asterisks</em> or <em>underscores</em><br>\nStrong emphasis, aka bold, with <strong>asterisks</strong> or <strong>underscores</strong>.<br>\nCombined emphasis with <strong>asterisks and <em>underscores</em></strong>.</p>\n\n<hr>\n\n<p>Strikethrough uses two tildes. <del>Scratch this.</del></p>\n\n<hr>\n\n<ol>\n<li>First ordered list item, <mark>highlighted</mark></li>\n<li>Another item\n\n<ul>\n<li>Unordered sub-list. </li>\n</ul></li>\n<li>Actual numbers don&#39;t matter, just that it&#39;s a number\n\n<ol>\n<li>Ordered sub-list</li>\n</ol></li>\n<li>And another item.\nYou can have properly indented paragraphs within list items. Notice the blank line above, and the leading spaces (at least one, but we&#39;ll use three here to also align the raw Markdown).</li>\n</ol>\n\n<p>To have a line break without a paragraph, you will need to use two trailing spaces.<br>\n   Note that this line is separate, but within the same paragraph.⋅⋅</p>\n\n<ul>\n<li>Unordered list can use asterisks</li>\n</ul>\n\n<hr>\n\n<ul>\n<li>Unordered list can use asterisks</li>\n</ul>\n\n<hr>\n\n<p><a href="https://www.google.com" target="_blank" rel="nofollow noopener">I&#39;m an inline-style link</a></p>\n\n<hr>\n\n<p>Inline <code>code just</code> has back-ticks around it.</p>\n\n<pre><code class="javascript">export default user =&gt; {\n  if (!user) return null\n\n  const initials = user.username\n    .split(&#39; &#39;)\n    .slice(0, 4)\n    .map(name =&gt; name[0])\n    .join(&#39;&#39;)\n\n  const avatar = user.avatar_image &amp;&amp; user.avatar_image.display\n\n  const name = `${user.first_name} ${user.last_name}`\n\n  const hide_notification_count = user.hide_notification_count || false\n\n  return {\n    id: user.id,\n    initials,\n    avatar,\n    name,\n    slug: user.slug,\n    authentication_token: user.authentication_token,\n    is_premium: user.is_premium,\n    hide_notification_count,\n  }\n}\n</code></pre>\n\n<hr>\n\n<blockquote>\n<p>Blockquotes are very handy in email to emulate reply text.<br>\nThis line is part of the same quote.</p>\n</blockquote>'

const block = {
  __typename: 'Text',
  id: 666,
  title: 'Test',
  content: html,
  counts: {
    comments: 0,
  },
  can: {
    manage: false,
  },
  user: {
    __typename: 'User',
    name: 'Charles Broskosi',
  },
}

storiesOf('BlockText', module)
  .add('Grid', () => (
    <Grid>
      <KonnectableInner konnectable={block} />
    </Grid>
  ))
  .add('Lightbox', () => {
    return <FullBlock block={block} />
  })
