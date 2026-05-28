import React from 'react';

const TitleCard = ({ title = '', desc = '' }) => {
  return (
    <div>
      <div className="text-2xl font-semibold">{title || 'Title'}</div>
      <div className="text-sm text-text-2">{desc || 'No desc provided'}</div>
    </div>
  );
};

export default TitleCard;
