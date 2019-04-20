import sharify from 'sharify';
import Pusher from 'pusher-js';

const { data: { PUSHER_KEY } } = sharify;

const isClientSide = typeof window !== 'undefined';

export default () => {
  if (!isClientSide) return null;

  return new Pusher(PUSHER_KEY, {
    wsHost: 'ws.pusherapp.com',
    httpHost: 'sockjs.pusher.com',
    encrypted: true,
  });
};
