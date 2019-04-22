_ = require 'underscore'
Q = require 'bluebird-q'
Qs = require 'qs'

module.exports =
  fetchUntilEnd: (options = {}, responseKey = 'channels') ->
    dfd = Q.defer()

    { success, error } = options # Pull out original success and error callbacks

    { per } = options.data = _.defaults options.data, per: 20

    options.remove = false

    options.error = =>
      dfd.reject arguments...
      error? arguments...

    options.success = (collection, response, opts) =>
      total = parseInt(
        # Count for ES endpoints
        response.length or
        # Fallback
        0
      )

      if response[responseKey].length >= total # Return if already at the end or no total
        dfd.resolve this
        success? this
      else

        options.data = Qs.parse options.data
        remaining = Math.ceil(total / per) - 1

        Q.allSettled(_.times(remaining, (n) =>
          data = options.data
          @options.page = n + 2

          @fetch
            cache: false
            remove: false
            merge: true
            data: data

        )).then(=>
          dfd.resolve this
          success? this, response, opts
        , =>
          dfd.reject this
          error? this, response, opts
        ).done()

    @fetch options
    dfd.promise