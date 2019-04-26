import Mousetrap from 'mousetrap'
import mediator from '../../lib/mediator.coffee'

export const bind = () => {
  Mousetrap.bind('right', () => {
    mediator.trigger('lightbox:slide:next')
  })

  Mousetrap.bind('left', () => {
    mediator.trigger('lightbox:slide:prev')
  })

  Mousetrap.bind('esc', () => {
    mediator.trigger('lightbox:close')
  })
}

export const unbind = () => {
  Mousetrap.unbind(['right', 'left', 'esc'])
}
