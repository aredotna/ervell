import $ from 'jquery';

import mediator from 'lib/mediator.coffee';
import modalize from 'components/modalize/index.coffee';
import Block from 'models/block.coffee';
import Blocks from 'collections/blocks.coffee';
import LightBoxBlockView from 'apps/block/client/view.coffee';
import * as initLightboxKeyboardShortcuts from 'components/layout/initLightboxKeyboardShortcuts';

import initLegacyMediator from 'react/util/initLegacyMediator';

export default ({ id, context }) => {
  // Needed for lightbox on pages without `layout/client.coffee`
  window.$ = $;
  initLegacyMediator();
  initLightboxKeyboardShortcuts.bind();

  const currentHref = window.location.href;
  const currentTitle = document.title;

  const blockModel = new Block({ id });
  const lightBoxView = new LightBoxBlockView({ model: blockModel });
  const modal = modalize(lightBoxView);

  const blocks = context.filter(k => k.__typename !== 'Channel' && k.__typename !== 'Group' && k.__typename !== 'User');

  mediator.shared.blocks = new Blocks(blocks.map(k => ({
    id: k.id,
    class: k.__typename,
    base_class: 'Block',
    unloaded: true,
  })));

  modal.load((done) => {
    mediator.shared.state.set({ lightbox: true });
    return blockModel.fetch()
      .then((response) => {
        window.history.replaceState(null, null, `/block/${id}`);
        done(response);
      });
  });

  modal.view.on('closed', () => {
    mediator.shared.state.set({ lightbox: false });
    window.history.replaceState(null, currentTitle, currentHref);
    initLightboxKeyboardShortcuts.unbind();
  });
};
