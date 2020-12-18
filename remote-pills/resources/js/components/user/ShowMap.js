import React, {useState, useEffect} from 'react';
import {Link, useHistory} from 'react-router-dom';
import api from '../../api';
import Header from '../layouts/Header';
import Footer from '../layouts/Footer';
import { Map, GoogleApiWrapper } from 'google-maps-react';

export  function ShowMap(){
  
  const mapStyles = {
    width: '90%',
    height: '80%'
  };


    return(
        <div className="templatemo-flex-row">
	  
        <div className="templatemo-content col-1 light-gray-bg">
        
         <Header />
          <div className="templatemo-flex-row flex-content-row " style={{ marginTop:'100px' }}>
              <div className="col-1" >	
              <div style={{ display:'flex'}}>
              <div style={{ marginRight:'50px' }}><br/></div>
              <div>
              <Map
        google={google}
        zoom={14}
        style={mapStyles}
        initialCenter={
          {
            lat: -1.2884,
            lng: 36.8233
          }
        }
      />
      </div>
      </div>
       </div>  

       <div style={{ position:'relative', height:'600px'}}></div>
                            
            </div>      
             <Footer />
          </div>
        </div>

    )

}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyBp6txXqL4CpgictG68veqo6MmEb89yFE4'
})(ShowMap);
