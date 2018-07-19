# Centralizes configuration for currently running split tests
# Duplicated from https://github.com/artsy/force/tree/master/components/split_test
#
# eg.
# header_design:
#   key: 'header_design'
#   outcomes:
#     old: 80
#     new: 20
#   dimension: 'dimension1' # Optional GA dimension
#   scope: 'local' # Optionally disable global initialization
#
# Note: if there are no running tests
# this should export empty Object
# module.exports = {}

module.exports = 
  explore_link:
    key: 'explore_link'
    outcomes: 
      explore: 50
      examples: 50
    dimension: 'dimension8'
