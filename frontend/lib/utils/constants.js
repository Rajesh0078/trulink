import { GiRadarSweep } from 'react-icons/gi';
import { MdOutlineFeaturedPlayList } from 'react-icons/md';

export const showTypes = [
  { name: 'Radar', key: 'radar', icon: GiRadarSweep },
  { name: 'List', key: 'list', icon: MdOutlineFeaturedPlayList }
];
export const genderTypes = [
  { name: 'Male', key: 'male' },
  { name: 'Female', key: 'female' },
  { name: 'All', key: 'all' }
];

export const interests = [
  { key: 'music', name: '🎵 Music', active: true },
  { key: 'gaming', name: '🎮 Gaming', active: true },
  { key: 'books', name: '📚 Books', active: false },
  { key: 'fitness', name: '🏃 Fitness', active: true },
  { key: 'cooking', name: '🍳 Cooking', active: false },
  { key: 'art', name: '🎨 Art', active: false },
  { key: 'travel', name: '✈️ Travel', active: false },
  { key: 'photography', name: '📸 Photography', active: false },
  { key: 'nature', name: '🌿 Nature', active: false },
  { key: 'movies', name: '🎬 Movies', active: false }
];

export const colSpanMapRes = {
  1: 'col-span-12 sm:col-span-1',
  2: 'col-span-12 sm:col-span-2',
  3: 'col-span-12 sm:col-span-3',
  4: 'col-span-12 sm:col-span-4',
  5: 'col-span-12 sm:col-span-5',
  6: 'col-span-12 sm:col-span-6',
  7: 'col-span-12 sm:col-span-7',
  8: 'col-span-12 sm:col-span-8',
  9: 'col-span-12 sm:col-span-9',
  10: 'col-span-12 sm:col-span-10',
  11: 'col-span-12 sm:col-span-11',
  12: 'col-span-12 sm:col-span-12'
};

export const colSpanMap = {
  1: 'col-span-1',
  2: 'col-span-2',
  3: 'col-span-3',
  4: 'col-span-4',
  5: 'col-span-5',
  6: 'col-span-6',
  7: 'col-span-7',
  8: 'col-span-8',
  9: 'col-span-9',
  10: 'col-span-10',
  11: 'col-span-11',
  12: 'col-span-12'
};

export const GENDER_OPTIONS = [
  { label: 'Male', key: 'male' },
  { label: 'Female', key: 'female' },
  { label: 'Prefer not to say', key: 'others' }
];

export const ACTIVITY_ACTIONS = {
  USER_REGISTERED: 'USER_REGISTERED',
  PROFILE_UPDATED: 'PROFILE_UPDATED',
  PROFILE_PHOTO_ADDED: 'PROFILE_PHOTO_ADDED',
  INTEREST_ADDED: 'INTEREST_ADDED',
  FRIEND_REQUEST_SENT: 'FRIEND_REQUEST_SENT',
  FRIEND_REQUEST_ACCEPTED: 'FRIEND_REQUEST_ACCEPTED',
  USER_BLOCKED: 'USER_BLOCKED',
  MATCH_CREATED: 'MATCH_CREATED',
  SUBSCRIPTION_PURCHASED: 'SUBSCRIPTION_PURCHASED'
};
