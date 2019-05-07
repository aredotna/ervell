moment = require 'moment'

module.exports =
  DEFAULT_DATE_FORMAT: 'YYYY-MM-DD'

  date: (attr) ->
    moment(@get(attr))

  formatDate: (attr, form = @DEFAULT_DATE_FORMAT) ->
    @date(attr).format(form)
