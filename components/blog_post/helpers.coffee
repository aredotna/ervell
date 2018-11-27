moment = require 'moment'
module.exports = {
  formatDate: (date) ->
    return moment(date).format('LL');
}