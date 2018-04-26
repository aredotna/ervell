loggedOutNav = require '../../../components/logged_out_nav/client/index.coffee'
{ mountWithApolloProvider } = require '../../../react/apollo/index.js'
{ default: ExperimentsCarousel } = require '../../../react/components/ExperimentsCarousel/index.js'
{ CURRENT_PATH } = require('sharify').data

module.exports = ->
  if CURRENT_PATH is '/experiments'
    mountWithApolloProvider ExperimentsCarousel, {}, $('.js-experiments-carousel')


  $html = $('html, body')
  $el = $('.js-about')
  $links = $el.find('a[href]')
  $sections = $el.find('.js-section[id]')

  loggedOutNav
    $sections: $sections

  scrollToId = (id) ->
    $target = $sections.filter("[id='#{id}']")

    offset = if ($page = $('.js-page')).length
      parseInt($page.css('margin-top'), 10) +
      parseInt($page.css('padding-top'), 10)
    else
      0

    yPos = $target.offset().top - offset

    $html.animate scrollTop: yPos, 'fast'

  $links
    .on 'click', (e) ->
      e.preventDefault()

      id = $(this).attr('href').split('#').pop()

      scrollToId id

  return unless location.hash

  # Prevent default anchor jump
  setTimeout (-> window.scrollTo(0, 0)), 1

  id = location.hash.substring(1)

  scrollToId id
