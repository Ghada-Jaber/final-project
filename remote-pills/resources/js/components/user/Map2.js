import React, {useState, useEffect} from 'react';
import {Link, useHistory} from 'react-router-dom';
import api from '../../api';
import Header from './../layouts/Header';
import Footer from './../layouts/Footer';

export  default function Map(){

    useEffect(() => {
        initMap();
     },[]);


    function initMap() {
        // The location of Uluru
        const uluru = { lat: 33.888630, lng: 35.495480 };
        // The map, centered at Uluru
        const map = new google.maps.Map(document.getElementById("map"), {
          zoom: 4,
          center: uluru,
        });
        // The marker, positioned at Uluru
        const marker = new google.maps.Marker({
          position: uluru,
          map: map,
        });
      }

    return(
        <div className="templatemo-flex-row">
	  
        <div className="templatemo-content col-1 light-gray-bg">
        
         <Header />
          <div className="templatemo-flex-row flex-content-row " style={{ marginTop:'100px' }}>
              <div className="col-1">	
              <div className="container">
              <div id="map" ></div>
              </div>
       </div>                       
            </div>      
             <Footer />
          </div>
        </div>

    )

}
