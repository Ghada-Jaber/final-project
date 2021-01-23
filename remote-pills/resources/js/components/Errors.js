import React, {useState, useEffect} from 'react';



 export default{
    hasErrorFor: (field) => {

    return !!errors[field]
   },

    renderErrorFor: (field) =>{
      if (hasErrorFor(field)) {
          return (
              <span style={{ color: '#D7425C' }}>
                  <strong>{errors[field][0]}</strong>
              </span>
          )
      }
  }

}