import Modal from 'v2/components/UI/Modal';
import NewChannelForm from 'v2/components/NewChannelForm';

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
