import React, {Component, useState, useEffect} from 'react';
import axios from 'axios';
import {Link, useHistory} from 'react-router-dom';
import api from '../../api';
import Header from '../layouts/Header';
import Footer from '../layouts/Footer';
import ReactDOM from 'react-dom';


export  default function AddPrescription(props){

  const [prescription, setPresciption] = useState([]);
  const [name, setName] = useState('');

  const [medicine, setMedicine] = useState([]);

      
  const history = useHistory();

  

  useEffect(() => {
    api.getAddPrescription(props.match.params.id).then(response => {
      console.log(response.data)
        setPresciption(response.data)
        setName(response.data.patient.name)
      })

      api.getMedicineAvailable().then(response => {
        console.log(response.data)
        setMedicine(response.data)
        })
 },[]);


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
 

 function fetchMedicine(id){
    api.getAllMedicineAvailable(id).then(response => {
      console.log(response.data)
      setMedicine(response.data);
  }) .catch(error => {
    // Progress.hide();
    console.log(error)
    //history.push('/');
  })

}

 function renderInfo(){
     return(
         <>
         <label>patient :</label> <span>{name}</span> <br/>
        <label>description :</label> <p>{prescription.description}</p>
         </>
     )
 }
    return(
        <div className="templatemo-flex-row">
	  
        <div className="templatemo-content col-1 light-gray-bg">
        
         <Header />
          <div className="templatemo-flex-row flex-content-row " >
              <div className="col-1">		
      <div className="container"  >
            <div style={{ marginTop:'10px' }} >
        </div>
  
    <div className="row">
   
       {renderInfo()}

       <div className="search" style={{ marginRight:'10px' }}>   		
		              	<input type="text" className="form-control"
						   placeholder="Serach"  
               onChange={filterFunction}
               />   
               </div>

       <div id="showSearch">
      {/* {renderMedicine()} */}
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
