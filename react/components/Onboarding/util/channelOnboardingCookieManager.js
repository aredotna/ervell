import Cookies from 'cookies-js';

const channelOnboardingCookieName = channelId => `channel-onboarding-${channelId}`;

// Sets onboarding cookie for given channel id
export const setChannelOnboardingCookie = (channelId) => {
  if (!channelId) { return; }

  Cookies.set(channelOnboardingCookieName(channelId), true);
};

// Attempts to find onboarding cookie for given channel id
export const getChannelOnboardingCookie = (channelId) => {
  if (!channelId) { return; }

  return Cookies.get(channelOnboardingCookieName(channelId));
};

// Attempts to expire onboarding cookie for given channel id
export const expireChannelOnboardingCookie = (channelId) => {
  if (!channelId) { return; }

  Cookies.expire(channelOnboardingCookieName(channelId));
};

export default {
  setChannelOnboardingCookie,
  getChannelOnboardingCookie,
  expireChannelOnboardingCookie,
};
