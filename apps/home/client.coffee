ImageView = require '../../components/image/view.coffee'
modalize = require '../../components/modalize/index.coffee'

openImageView = (e) ->
  e.preventDefault()
  e.stopPropagation()
  src = $(e.currentTarget).attr('href')
  view = new ImageView src: src
  @modal = modalize view, className: 'modalize image-modal'
  @modal.open() 

module.exports = ->
  $('.home--splash__image').click (e) ->
    $('html,body').animate { scrollTop: $("#features").offset().top - 100 }, 250
  
  if $('body').hasClass 'is-mobile'
    $('a.image-view').on 'tap', openImageView
  else
    $('a.image-view').on 'click',openImageView

  $('.home--splash__image__scroller').imagesLoaded ->
    $('.home--splash__image__scroller').addClass 'visible'
    
    height = $('.home--splash__image__placeholder').height()
    
    $(".home--splash__image__scroller")
      .css(
        'top': 'auto'
        'transform' : 'translateY(' + -height + 'px)'
      )
      .animate(
        { bottom: 0 }
        , 120000, 'linear'
      )