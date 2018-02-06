import Mousetrap from 'mousetrap';
import mediator from '../../lib/mediator.coffee'

export default () => {
  Mousetrap.bind('right', () => {
    mediator.trigger('lightbox:slide:next');
  });

  Mousetrap.bind('left', () => {
    mediator.trigger('lightbox:slide:prev');
  });

  Mousetrap.bind('esc', () => {
    mediator.trigger('lightbox:close');
  });

  Mousetrap.bind('l', () => {
    if (!mediator.shared.current_user.isPremium()) return;
    mediator.shared.state.set({ view_mode: 'list' });
    window.location.reload();
  });

  Mousetrap.bind('g', () => {
    if (!mediator.shared.current_user.isPremium()) return;
    mediator.shared.state.set({ view_mode: 'grid' });
    window.location.reload();
  });
};
