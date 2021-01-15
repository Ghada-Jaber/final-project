import React, {Component, useState, useEffect} from 'react';
import axios from 'axios';
import {Link, useHistory} from 'react-router-dom';
import api from '../../api';
import Header from '../layouts/Header';
import Footer from '../layouts/Footer';
import ReactDOM from 'react-dom';
export  default function Doctor(){

  const [prescription, setPresciption] = useState([]);

      
  const history = useHistory();

  

  useEffect(() => {
    api.getPrescription().then(response => {
      console.log(response.data)
        setPresciption(response.data)
      })
 },[]);

function handleReservationChange(event){
  if(event.target.checked){
    setReservation(1)
}else{
    setReservation(0)
}
}


function renderPrescription(){
  return prescription.map(prescription => {
      return(
        <>
        {prescription.doctor_id !=null ? 
          
          <a href={`doctor/prescription/${prescription.id}`} key={prescription.id}>
        <div 
        className="templatemo-content-widget no-padding white-bg col-sm-6 
        col-lg-4 text-center item mb-4
        colorhover">
        <br/>
        <h3>
        <u>Doctor:</u> {prescription.doctor.name}
        </h3>
        <p style={{ overflowY:'auto', width:'100%', height: '100px', whiteSpace: 'pre-line' }}>
        {prescription.description}</p>
         
      </div>
      </a>: 
      <div 
        className="templatemo-content-widget no-padding white-bg col-sm-6 
        col-lg-4 text-center item mb-4">
        <br/>
        <h3>
         No prescription yet
        </h3>
        <p style={{ overflowY:'auto', width:'100%', height: '100px', whiteSpace: 'pre-line' }}>
        {prescription.description}</p>
         
      </div>}
        </>
    
        )
      })
  }


  function handleSearchChange(event){
    var searchByName = event.target.value;

    const search = {
      name: searchByName
  }

    api.getMedicineByName({search}).then(response => {
      setMedicine(response.data);
  }) .catch(error => {
    console.log(error)
  })

  }






  function filterFunction(event){
    var search = event.target.value;
    var filter, option, i;
     filter = search.toUpperCase();
     var div = document.getElementById("showSearch");
     option = div.getElementsByTagName("div");
     for (i = 0; i < option.length; i++) {
       var txtValue = option[i].textContent || option[i].innerText;
       if (txtValue.toUpperCase().indexOf(filter) > -1) {
         option[i].style.display = "";
       } else {
         option[i].style.display = "none";
       }
     }
   }

    return(
        <div className="templatemo-flex-row">
	  
        <div className="templatemo-content col-1 light-gray-bg">
        
         <Header />
         <div className="templatemo-flex-row flex-content-row " style={{ marginTop:'100px' }}>
              <div className="col-1">		
      <div className="container"  >
        <div className="row" style={{  display: 'flex'}}>

       
        <div className="search" style={{ marginLeft:'10px', marginRight:'10px' }}>   		
		              	<input type="text" className="form-control"
						   placeholder="Search"  
               onChange={filterFunction}
               />   
               </div>

       
            </div>

            <div style={{ marginTop:'10px' }} >
        </div>
  
    <div className="row">
        <div id="showSearch">
      {renderPrescription()}
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
