loggedOutNav = require '../../../components/logged_out_nav/client/index.coffee'

module.exports = ->
  $html = $('html, body')
  $el = $('.js-about')
  $links = $el.find('a[href*=#]')
  $sections = $el.find('.js-section[id]')

  loggedOutNav
    $sections: $sections

  $links
    .on 'click', (e) ->
      e.preventDefault()
      id = $(this).attr('href').split('#').pop()
      $target = $sections.filter("[id='#{id}']")
      yPos = $target.offset().top
      $html.animate scrollTop: yPos, 'fast'
