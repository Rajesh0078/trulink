import React from 'react';

import CheckBox from './Boolean/CheckBox';
import Button from './Button/Button';
import String from './String/String';

const Field = ({ field }) => {
  switch (field.type) {
    case 'string':
      return <String fieldProp={field} />;
    case 'boolean':
      return <CheckBox fieldProp={field} />;
    case 'button':
      return <Button fieldProps={field} />;
    default:
      return 'No type sent';
  }
};

export default Field;
