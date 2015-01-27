#
# minimal js for about page
#

$ ->
  require('../lib/vendor/waypoints.js')

  $('.static--title--top').waypoint
    handler: (direction) ->
      id = $(this.element).attr 'id'
      $(".static__menu a.is-active").removeClass 'is-active'
      $(".static__menu a[data-section=#{id}]").addClass 'is-active'

  $('.static__menu a').click (e)->
    e.preventDefault()
    section = $(this).data 'section'
    $("html, body").animate { scrollTop: $("##{section}").offset().top + 1}, 300