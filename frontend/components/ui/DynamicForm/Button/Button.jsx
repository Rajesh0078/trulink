import React from 'react';

const Button = ({ fieldProps }) => {
  return (
    <button
      type={fieldProps.type}
      className={`cursor-pointer ${fieldProps.btnClass}`}
      onClick={fieldProps.onClick}
    >
      <span className={fieldProps.labelClass}>{fieldProps.label || 'Submit'}</span>
    </button>
  )
}

export default Button