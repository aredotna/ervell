# Centralizes configuration for currently running split tests
# Duplicated from https://github.com/artsy/force/tree/master/components/split_test
#
# eg.
# header_design:
#   key: 'header_design'
#   outcomes:
#     old: 8
#     new: 2
#   dimension: 'dimension1' # Optional GA dimension
#   scope: 'local' # Optionally disable global initialization
#
# Note: if there are no running tests
# this should export empty Object
# module.exports = {}

module.exports =
  # Set up so we can slowly activate new_homepage_buckets
  # as we are comfortable with the load and performance
  after_onboarding:
    key: 'after_onboarding'
    outcomes:
      explore: 5
      profile: 5
    dimension: 'dimension3'
