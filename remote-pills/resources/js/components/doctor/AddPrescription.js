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

  const [id, setMedicineId] = useState('');

  const [quantity, setQuantity] = useState('');

  const [medicine, setMedicine] = useState([]);
  const [errors, setErrors] = useState([]);

      
  const history = useHistory();


 const[array, setArray]= useState('');

 
  

  useEffect(() => {
    api.getAddPrescription(props.match.params.id).then(response => {
    
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
  // Declare variables
var input, filter, table, tr, th, td, i ;
input = document.getElementById("myInput");
filter = search.toUpperCase();
table = document.getElementById("myTable");
tr = table.getElementsByTagName("tr"),
th = table.getElementsByTagName("th");

// Loop through all table rows, and hide those who don't match the        search query
for (i = 1; i < tr.length; i++) {
          tr[i].style.display = "none";
          for(var j=0; j<th.length; j++){
      td = tr[i].getElementsByTagName("td")[j];      
      if (td) {
        var txtValue = td.textContent || td.innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
              tr[i].style.display = "";
              break;
          }
      }
      }
  }
 }
 

   function hasErrorFor (field) {
    return !!errors[field]
}

function renderErrorFor (field) {
    if (hasErrorFor(field)) {
        return (
            <span style={{ color: '#D7425C' }}>
                <strong>{errors[field][0]}</strong>
            </span>
        )
    }
}

function handleMedicineChange(event){
  setMedicineId(event.target.value);
}

function renderMedicine(){
  return medicine.map((medicine, i) => {
      return(
        <tr key={medicine.id}>
        <td>{medicine.id}</td>
                  <td>
                  
                  <img src={medicine.image} width="100px" height="100px"/></td>
                  <td>{medicine.name}</td>
                  <td style={{ width: '100px'}}>
                  <input type="number" id={`input${i}`} className="form-control" /></td>
                  <td >
                  <a onClick={()=> addArray(i)}
                              className="btn btn-primary"
                                 title="Edit">
                                 <i className="fa fa-plus fa-fw"></i>
                              </a>
                          </td>
                </tr>
        )
      })
  }


  function goBack(){
    history.goBack();
}


 function renderInfo(){
     return(
         <>
         <label><u>patient name : </u></label> <span>{name}</span> <br/>
        <label><u>description :</u></label> <p>{prescription.description}</p>
         </>
     )
 }




 function addArray(n) {
  let text = "";
   var input = document.getElementById("input"+n).value;
  n = n+1;
  var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
  table = document.getElementById("myTable");

  rows = table.rows[n].cells;
  x = rows[0];

 text = text+ x.innerHTML+ ", "+input+"/";

  setArray(array+""+text)
     
  console.log(text)
}

function sendPrescription(){
 const send ={
   array: array
 }

 api.sendPrescription(send, props.match.params.id).then(response => {
  console.log(response.data)
  alert('give prescription done')
  window.location.href = "/prescription";
})
}
    return(
        <div className="templatemo-flex-row">
	  
        <div className="templatemo-content col-1 light-gray-bg">
        
         <Header />
         <div className="templatemo-flex-row flex-content-row " style={{ marginTop:'100px' }}>
              <div className="col-1">		
             
              <div className="templatemo-content-widget no-padding">
              <a className='btn btn-primary' onClick={goBack}>
                    <i className="fa fa-arrow-left"></i>
                </a>  
                <br /> <br />
              {renderInfo()}
            <div className="panel panel-default table-responsive"
            style={{ overflowY:'auto', height:'200px'}}>
            <table id="myTable" className="table table-striped table-bordered templatemo-user-table tbodyscroll"
             cellSpacing="0" width="100%">
             <caption>
             <div className="row" style={{  display: 'flex', float:'left'}}> 
              
           
        <div className="search" style={{ marginLeft:'10px' , marginRight:'10px' }}>  	        		
		              	<input type="text" className="form-control"
						   placeholder="Search" 
                           onChange={filterFunction} 
               /> 
                 
               </div>
               </div>   
               </caption>
                <thead>
                  <tr>
                  <th>
                    #</th>
                    <th>
                    Medicine image</th>
                    <th>Name</th>
                    <th>Quantity</th>
                    <td>Add</td>
                  </tr>
                </thead>
                <tbody>

                {medicine.length > 0 ? renderMedicine() : 
                <tr><td colSpan="7" style={{ textAlign:'center' }} >no data</td></tr>}
                </tbody>
              </table>    
            </div> 
                {array} <br/>
                <button className="btn btn-primary"
                onClick={()=> sendPrescription()}>Confirm</button> 
                                 
          </div> 
       </div>                       
            </div>      
             <Footer />
          </div>
        </div>

    )

}
