import React from 'react';

const TitleCard = ({ title = '', desc = '' }) => {
  return (
    <div>
      <div className="text-xl sm:text-2xl font-semibold">{title || 'Title'}</div>
      <div className="text-xs sm:text-sm text-text-2">{desc || 'No desc provided'}</div>
    </div>
  );
};

export default TitleCard;
