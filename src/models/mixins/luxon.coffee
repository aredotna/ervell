{ DateTime } =  require 'luxon'

module.exports =
  DEFAULT_DATE_FORMAT: 'YYYY-MM-DD'

  date: (attr) ->
    DateTime.fromSQL(@get(attr))

  formatDate: (attr, form = @DEFAULT_DATE_FORMAT) ->
    DateTime.fromSQL(@get(attr)).format(form)
