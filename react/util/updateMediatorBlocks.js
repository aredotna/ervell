import mediator from 'lib/mediator.coffee';
import Blocks from 'collections/blocks.coffee';

export default ({ blocks }) => {
  mediator.shared.blocks = new Blocks(blocks.map(k => ({
    id: k.id,
    class: k.__typename,
    base_class: 'Block',
    unloaded: true,
  })));
};
