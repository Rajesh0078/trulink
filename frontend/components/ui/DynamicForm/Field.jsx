import React from 'react'
import String from './String/String'

const Field = ({ field }) => {

  switch (field.type) {
    case 'string':
      return <String fieldProp={field} />
    default:
      return 'No type sent'
  }
}

export default Field