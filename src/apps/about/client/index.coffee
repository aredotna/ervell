loggedOutNav = require '../../../components/logged_out_nav/client/index.coffee'
slides = require './experiments.coffee'
{ mountWithApolloProvider } = require '../../../v2/apollo/index'
{ default: GroupsPage } = require '../../../v2/pages/about/GroupsPage/index.js'
{ default: DescriptiveCarousel } = require '../../../v2/components/DescriptiveCarousel/index.js'
{ CURRENT_PATH } = require('sharify').data

module.exports = ->
  if CURRENT_PATH is '/experiments'
    mountWithApolloProvider DescriptiveCarousel, { slides }, $('.js-experiments-carousel')

  if CURRENT_PATH is '/education'
    mountWithApolloProvider EducationPage, { }, $('#apolloMount')

  if CURRENT_PATH is '/getting-started-with-groups'
    mountWithApolloProvider GroupsPage, { }, $('#apolloMount')


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
  # setTimeout (-> window.scrollTo(0, 0)), 1

  # id = location.hash.substring(1)

  # scrollToId id
