// import React, {useState, useEffect} from 'react';
// import {Link, useHistory} from 'react-router-dom';
// import api from '../../api';
// import Header from './../layouts/Header';
// import Footer from './../layouts/Footer';

// export  default function Map(){
//   // const [map, setMap] = useState('');
//   // const [service, setService] = useState('');
//   // const [infowindow, setinfowindow] = useState('');

//   const [latitude, setLatitude] = useState('');
//   const [longitude, setLongitude] = useState('');

//     useEffect(() => {
  

//       const script = document.createElement("script");
//       script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyBp6txXqL4CpgictG68veqo6MmEb89yFE4&callback=initMap&libraries=places&v=weekly";
//       script.defer;

//        document.body.appendChild(script);

     
        
//      },[]);

//      function getLocation() {
//       if (navigator.geolocation) {
//         navigator.geolocation.getCurrentPosition(showPosition);
//         initMap();
      
//       } else { 
//         console.log("Geolocation is not supported by this browser.");
//       }
//     }
    
//     function showPosition(position) {
//       setLatitude(position.coords.latitude); 
//       setLongitude(position.coords.longitude);
//       console.log(position.coords.latitude)
//     }

//     function initMap() {
//       // The location of Uluru
//       const uluru = { lat: 33.874001, lng: 35.5089 };
//       // The map, centered at Uluru
//       const map = new google.maps.Map(document.getElementById("map"), {
//         zoom: 15,
//         center: uluru,
//       });
//       // The marker, positioned at Uluru
//       const marker = new google.maps.Marker({
//         position: uluru,
//         map: map,
//       });
//     }

//     //  function initMap() {
//     //   let map;
//     //   let service;
//     //   let infowindow;
//     //    const sydney = new google.maps.LatLng(latitude, longitude);
//     //    infowindow = new google.maps.InfoWindow();
//     //    map = new google.maps.Map(document.getElementById("map"), {
//     //      center: sydney,
//     //      zoom: 15,
//     //    });
//     //    const request = {
//     //      query: "Museum of Contemporary Art Australia",
//     //      fields: ["name", "geometry"],
//     //    };
//     //    service = new google.maps.places.PlacesService(map);
//     //    service.findPlaceFromQuery(request, (results, status) => {
//     //      if (status === google.maps.places.PlacesServiceStatus.OK) {
//     //        for (let i = 0; i < results.length; i++) {
//     //          createMarker(results[i]);
//     //        }
//     //        map.setCenter(results[0].geometry.location);
//     //      }
//     //    });
//     //  }
     
//     //  function createMarker(place) {
//     //    const marker = new google.maps.Marker({
//     //      map,
//     //      position: place.geometry.location,
//     //    });
//     //    google.maps.event.addListener(marker, "click", () => {
//     //      infowindow.setContent(place.name);
//     //      infowindow.open(map);
//     //    });
//     //  }

//     return(
//         <div className="templatemo-flex-row">
	  
//         <div className="templatemo-content col-1 light-gray-bg">
        
//          <Header />
//           <div className="templatemo-flex-row flex-content-row " style={{ marginTop:'100px' }}>
//               <div className="col-1">	
//               <div className="container">
//               <div id="map" ></div>
//               </div>
//        </div>                       
//             </div>      
//              <Footer />
//           </div>
//         </div>

//     )

// }
