import Modal from 'react/components/UI/Modal';
import NewChannelForm from 'react/components/NewChannelForm';

export const openNewChannelModal = () => {
  const modal = new Modal(NewChannelForm);
  modal.open();
}

export default (el) => {
  if (!el) return;

  el.addEventListener('click', (e) => {
    e.preventDefault();
    openNewChannelModal();
  });
};
