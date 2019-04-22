module.exports = class AsyncSerialQueue
  end: Promise.resolve()

  enqueue: (op) ->
    thunk = null
    promise = new Promise (resolve, reject) ->
      thunk = ->
        if op.length > 0
          op resolve, reject
        else
          res = op()

          if res and res.then
            res.then(resolve).catch reject

          else
            resolve()

    @end.then(thunk).catch thunk
    @end = promise
