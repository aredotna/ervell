import mediator from 'lib/mediator.coffee';
import modalize from 'components/modalize/index.coffee';
import Block from 'models/block.coffee';
import Blocks from 'collections/blocks.coffee';
import LightBoxBlockView from 'apps/block/client/view.coffee';

export default ({ id, context }) => {
  const currentHref = window.location.href;
  const currentTitle = document.title;

  const blockModel = new Block({ id });
  const lightBoxView = new LightBoxBlockView({ model: blockModel });
  const modal = modalize(lightBoxView);

  mediator.shared.blocks = new Blocks(context.map(k => ({
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
  });
};
