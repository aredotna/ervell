#
# minimal js for about page
#

$ ->
  require('../lib/vendor/waypoints.coffee')

  $('.static--title--top').waypoint
    handler: (direction) ->
      id = $(this).attr 'id'
      $(".static__menu a.is-active").removeClass 'is-active'
      $(".static__menu a[data-section=#{id}]").addClass 'is-active'

  $('.static__menu a').click (e)->
    e.preventDefault()
    $('body').scrollTo $(this).data 'section'