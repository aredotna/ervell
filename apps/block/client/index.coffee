
module.exports =
  initBlockPage: ->
    $('.tab--container__nav__item').on 'click', (e)->
      e.preventDefault()

      $('.tab--container__nav__item.is-active, .tab-content.is-active').removeClass 'is-active'
      tab = $(e.currentTarget).data 'tab'
      $(e.currentTarget).addClass 'is-active'
      $("#tab-#{tab}").addClass 'is-active'
