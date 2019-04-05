import Modal from 'react/components/UI/Modal';
import ModalFullscreenDialog from 'react/components/UI/ModalFullscreenDialog';
import ModalBlockLightbox from 'react/components/ModalBlockLightbox';

export default ({ id, context, onClose }) => {
  // Filter out Channels, Groups, Users and duplicates; return just IDs
  const ids = [
    ...new Set(context.filter(k =>
      k.__typename !== 'Channel' &&
        k.__typename !== 'Group' &&
        k.__typename !== 'User')
      .map(k => k.id)),
  ];

  new Modal(ModalBlockLightbox, { id, ids, onClose }, { Dialog: ModalFullscreenDialog })
    .open();
};
