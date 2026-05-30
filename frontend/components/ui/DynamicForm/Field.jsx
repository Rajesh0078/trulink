import React from 'react';

import Boolean from './Boolean/Boolean';
import Button from './Button/Button';
import Selection from './Selection/Selection';
import String from './String/String';

const Field = ({ field }) => {
  switch (field.type) {
    case 'string':
      return <String fieldProp={field} />;
    case 'boolean':
      return <Boolean fieldProp={field} />;
    case 'select':
      return <Selection fieldProp={field} />;
    case 'button':
      return <Button fieldProps={field} />;
    default:
      return 'No type sent';
  }
};

export default Field;
