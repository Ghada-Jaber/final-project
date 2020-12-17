import React, {useState, useEffect} from 'react';
import {Link, useHistory} from 'react-router-dom';

export default function Back(){
    const history = useHistory();
    function goBack(){
        history.goBack();
    }
    return (
        <div className="container">
        <div className="row">
          <a className='btn btn-primary' onClick={goBack}>
                    <i class="fa fa-arrow-left"></i>
                </a>  
        </div>

        
      </div>
    )
}
