Base = require './base.coffee'

module.exports = class FeedItem extends Base

  initialize: ->
    super
    if @has('user')
      @set "user_url", "/users/#{@get('user')?.slug}"

    for thing in ['parent', 'target', 'item']
      obj = @get("#{thing}")
      if obj?
        @set "#{thing}_url", "/#{obj.slug}"
        switch @get("#{thing}_type")
          when "channel"
            @set "#{thing}_readable", obj.title
            @set "#{thing}_url", "/#{obj.slug}"
          when "user"
            @set "#{thing}_readable", obj.username
            @set "#{thing}_url", "/users/#{obj.slug}"
          when "block"
            type = @get("#{thing}").class.toLowerCase()
            type = "embed" if type is "media"
            n = if type is "image" or type is "embed" or type is "attachment" then "n" else ""

            @set "#{thing}_readable", "a#{n} #{type}"
            @set "#{thing}_url", "/show/#{obj.id}"
          when "comment"
            @set "#{thing}_readable", @get('target_readable')
            @set "#{thing}_url", "/show/#{@get('target').id}"

        switch @get('action')

          when 'replied to'
            @set 'action', 'commented on'

          when 'published'
            @set 'action', 'created'

          when 'added'
            @set 'action', 'connected'
