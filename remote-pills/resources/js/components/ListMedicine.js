import React, { useState } from 'react';
import {Link, useHistory} from 'react-router-dom';
import api from '../api';
import Header from './layouts/Header';
import Footer from './layouts/Footer';

export  default function ListMedicine(){

   

    return(
        <div className="templatemo-flex-row">
	  
        <div className="templatemo-content col-1 light-gray-bg">
        
         <Header />
          <div className="templatemo-flex-row flex-content-row " style={{ marginTop:'100px' }}>
              <div className="col-1">				 
              
              <div className="panel panel-default templatemo-content-widget  no-padding templatemo-overflow-hidden">
               <div className="panel-heading templatemo-position-relative">
				 <div className="media">
                  <div className="media-left">
 <img className="media-object "  width="90" height="90" alt="image" /> 
                  </div>
                  <div className="media-body">
                    <h2 className="media-heading text-uppercase"><font color="3275BB">
                      Title
                    </font></h2>
					
                    <p>Info</p>  
                  </div>        
                </div>                 
                  </div>          
              </div>
  
                 
  
       </div>                       
            </div> 
        
                     
             <Footer />
          </div>
        </div>

    )

}
