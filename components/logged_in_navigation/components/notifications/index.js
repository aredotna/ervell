import axios from 'axios';
import React from 'react';
import Backbone from 'backbone';
import sharify from 'sharify';

import NotificationsBadgeView from 'components/logged_in_navigation/components/notifications/view.coffee';

import { mountWithApolloProvider } from 'react/apollo';
import unmount from 'react/util/unmount';

import Overlay from 'react/components/UI/Overlay';
import NotificationsDropdown from 'react/components/NotificationsDropdown';

const { API_URL, CURRENT_USER } = sharify.data;

const STATE = {
  isOpened: false,
};

const OverlaidNotificationsDropdown = ({ targetEl, onClose, onCompleted }) => (
  <Overlay
    onClose={onClose}
    targetEl={() => targetEl}
    alignToY="bottom"
    alignToX="right"
    anchorY="top"
    anchorX="right"
    offsetY={0}
    offsetX={10}
  >
    <NotificationsDropdown onCompleted={onCompleted} />
  </Overlay>
);

export default (targetEl) => {
  if (!targetEl) return;

  // Setup legacy view for badge
  const badgeState = new Backbone.Model({ unread_count: 0 });

  axios({
    method: 'GET',
    url: `${API_URL}/notifications/unread_count`,
    headers: { 'X-AUTH-TOKEN': CURRENT_USER.authentication_token },
  }).then(({ data: { unread_count } }) => {
    badgeState.set('unread_count', unread_count);

    const badgeView = new NotificationsBadgeView({ el: targetEl, state: badgeState });
    badgeView.render();
  });

  const markAsRead = () => {
    badgeState.set('unread_count', 0);

    return axios({
      method: 'POST',
      url: `${API_URL}/notifications/clear`,
      headers: { 'X-AUTH-TOKEN': CURRENT_USER.authentication_token },
    });
  };

  // Setup click/rendering for NotificaionsDropdown
  const notificationsEl = document.createElement('div');

  const close = () => {
    unmount(notificationsEl);

    notificationsEl.parentNode && notificationsEl.parentNode.removeChild(notificationsEl);

    setTimeout(() => STATE.isOpened = false, 0);
  };

  targetEl.addEventListener('click', (e) => {
    e.preventDefault();

    if (STATE.isOpened) return;

    mountWithApolloProvider(OverlaidNotificationsDropdown, {
      targetEl,
      onClose: close,
      onCompleted: markAsRead,
    }, notificationsEl);

    STATE.isOpened = true;
  });
};
