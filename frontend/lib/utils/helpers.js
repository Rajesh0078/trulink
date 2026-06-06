import {
  MdBlock,
  MdEdit,
  MdFavorite,
  MdPeople,
  MdPerson,
  MdPhotoCamera,
  MdStars,
  MdWorkspacePremium
} from 'react-icons/md';

import { ACTIVITY_ACTIONS } from './constants';

export const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

export const formatTime = (date) => {
  const now = new Date();
  const activityDate = new Date(date);

  const diffMs = now - activityDate;

  const seconds = Math.floor(diffMs / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (seconds < 60) {
    return 'Just now';
  }

  if (minutes < 60) {
    return `${minutes} min${minutes > 1 ? 's' : ''} ago`;
  }

  if (hours < 24) {
    return `${hours} hr${hours > 1 ? 's' : ''} ago`;
  }

  if (days === 1) {
    return 'Yesterday';
  }

  if (days < 7) {
    return `${days} days ago`;
  }

  return activityDate.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });
};

export const ACTIVITY_CONFIG = {
  [ACTIVITY_ACTIONS.USER_REGISTERED]: {
    icon: MdPerson,
    color: 'text-green-400 bg-green-400/10'
  },

  [ACTIVITY_ACTIONS.PROFILE_UPDATED]: {
    icon: MdEdit,
    color: 'text-blue-400 bg-blue-400/10'
  },

  [ACTIVITY_ACTIONS.PROFILE_PHOTO_ADDED]: {
    icon: MdPhotoCamera,
    color: 'text-purple-400 bg-purple-400/10'
  },

  [ACTIVITY_ACTIONS.INTEREST_ADDED]: {
    icon: MdStars,
    color: 'text-yellow-400 bg-yellow-400/10'
  },

  [ACTIVITY_ACTIONS.FRIEND_REQUEST_SENT]: {
    icon: MdPeople,
    color: 'text-cyan-400 bg-cyan-400/10'
  },

  [ACTIVITY_ACTIONS.FRIEND_REQUEST_ACCEPTED]: {
    icon: MdFavorite,
    color: 'text-pink-400 bg-pink-400/10'
  },

  [ACTIVITY_ACTIONS.USER_BLOCKED]: {
    icon: MdBlock,
    color: 'text-red-400 bg-red-400/10'
  },

  [ACTIVITY_ACTIONS.MATCH_CREATED]: {
    icon: MdFavorite,
    color: 'text-rose-400 bg-rose-400/10'
  },

  [ACTIVITY_ACTIONS.SUBSCRIPTION_PURCHASED]: {
    icon: MdWorkspacePremium,
    color: 'text-amber-400 bg-amber-400/10'
  }
};
