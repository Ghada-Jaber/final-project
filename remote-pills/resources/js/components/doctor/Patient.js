import React, {Component, useState, useEffect} from 'react';
import axios from 'axios';
import {Link, useHistory} from 'react-router-dom';
import api from '../../api';
import Header from '../layouts/Header';
import Footer from '../layouts/Footer';
import ReactDOM from 'react-dom';


export  default function Patient(){

  const [prescription, setPresciption] = useState([]);

      
  const history = useHistory();

  

  useEffect(() => {
    api.getPatient().then(response => {
      console.log(response.data)
        setPresciption(response.data.doctor)
      })
 },[]);


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




function renderPrescription(){
  return prescription.map(prescription => {
      return(
        <div key={prescription.id}
        className="templatemo-content-widget no-padding white-bg col-sm-6 
        col-lg-4 text-center item mb-4">
        <br/>
        <h3>
          {prescription.patient.name}
        </h3>
       <div className="table-responsive" style={{ overflow:'auto', height:'100px'}}>
                <table className="table">
                <thead >
                    <tr >
                      <td><b>medicine</b></td>
                      <td><b>Quantity</b></td>
                      </tr>
                    </thead>
                  <tbody>
                  {prescription.prescription.map(pres=>{
             return(
               <tr key={pres.id}>
               <td> {pres.medicine.name} </td>
               <td>{pres.quantity}</td>
              
               
               </tr>
             )
          })}
                                   
                  </tbody>
                </table>
              </div> 
      </div>
     
    
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
						   placeholder="Serach"  
               onChange={filterFunction}
               />   
               </div>

       
            </div>

            <div style={{ marginTop:'10px' }} >
        </div>
  
    <div className="row">
    {/* <Progress.Component
					style={{ background: '#99999978', height: '5px' }}
					thumbStyle={{ background: '#5900b3', height: '5px' }}
				/> */}
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
