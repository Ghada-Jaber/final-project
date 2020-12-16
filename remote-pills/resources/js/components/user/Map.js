import React, {useState, useEffect} from 'react';
import {Link, useHistory} from 'react-router-dom';
import api from '../../api';
import Header from './../layouts/Header';
import Footer from './../layouts/Footer';

export  default function Map(){
  // const [map, setMap] = useState('');
  // const [service, setService] = useState('');
  // const [infowindow, setinfowindow] = useState('');

    useEffect(() => {
        initMap();
     },[]);


     function initMap() {
      let map;
      let service;
      let infowindow;
       const sydney = new google.maps.LatLng(-33.867, 151.195);
       infowindow = new google.maps.InfoWindow();
       map = new google.maps.Map(document.getElementById("map"), {
         center: sydney,
         zoom: 15,
       });
       const request = {
         query: "Museum of Contemporary Art Australia",
         fields: ["name", "geometry"],
       };
       service = new google.maps.places.PlacesService(map);
       service.findPlaceFromQuery(request, (results, status) => {
         if (status === google.maps.places.PlacesServiceStatus.OK) {
           for (let i = 0; i < results.length; i++) {
             createMarker(results[i]);
           }
           map.setCenter(results[0].geometry.location);
         }
       });
     }
     
     function createMarker(place) {
       const marker = new google.maps.Marker({
         map,
         position: place.geometry.location,
       });
       google.maps.event.addListener(marker, "click", () => {
         infowindow.setContent(place.name);
         infowindow.open(map);
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
