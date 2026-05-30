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
