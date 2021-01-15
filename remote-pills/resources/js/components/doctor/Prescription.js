import React, {Component, useState, useEffect} from 'react';
import axios from 'axios';
import {Link, useHistory} from 'react-router-dom';
import api from '../../api';
import Header from '../layouts/Header';
import Footer from '../layouts/Footer';
import ReactDOM from 'react-dom';


export  default function Prescription(){

  const [prescription, setPresciption] = useState([]);

      
  const history = useHistory();

  

  useEffect(() => {
    api.getAskPrescription().then(response => {
      console.log(response.data)
        setPresciption(response.data)
      })
 },[]);


//  useEffect(() => {

// console.log(currentPage)
  
// },[currentPage]);



function handleReservationChange(event){
  if(event.target.checked){
    setReservation(1)
}else{
    setReservation(0)
}
}

 function  handlePageClick(data) {
  const page = data.selected >= 0 ? data.selected + 1 : 0;

  setCurrentPage(2)

  fetchMedicine();
}

 

 function fetchMedicine(id){
    // const newUrl =
    //   window.location.protocol +
    //   '//' +
    //   window.location.host +
    //   window.location.pathname +
    //   '?page=' +
    //   currentPage;
    // window.history.pushState({ path: newUrl }, '', newUrl);

    // const response = axios.post(newUrl);
  // Progress.show();
    api.getAllMedicineAvailable(id).then(response => {
      console.log(response.data)
      setMedicine(response.data);
      
      // setMedicine(response.data.data);
      // setCurrentPage(response.data.current_page);
      // setPageCount(response.data.last_page);
      
      // window.scrollTo(0, 0);
      // // Progress.hide();
  }) .catch(error => {
    // Progress.hide();
    console.log(error)
    //history.push('/');
  })

}


function getQueryStringValue(key) {
  const value = decodeURIComponent(
    window.location.search.replace(
      new RegExp(
        '^(?:.*[&\\?]' +
          encodeURIComponent(key).replace(/[\.\+\*]/g, '\\$&') +
          '(?:\\=([^&]*))?)?.*$',
        'i'
      ),
      '$1'
    )
  );
  return value ? value : null;
}

function handleReferenceChange(event){
  var reference = event.target.value;
  alert(reference)
  if(reference == 'getNameOrderAsc'){
    api.getOrderMedicineByNameAsc().then(response => {
      setMedicine(response.data);
  }) .catch(error => {
    console.log(error)
  })
  }

  if(reference == 'getNameOrderDesc'){
    api.getOrderMedicineByNameDesc().then(response => {
      setMedicine(response.data);
  }) .catch(error => {
    console.log(error)
  })
  }

  if(reference == 'getPriceOrderAsc'){
    api.getOrderMedicineByPriceAsc().then(response => {
      setMedicine(response.data);
  }) .catch(error => {
    console.log(error)
  })
  }

  if(reference == 'getPriceOrderDesc'){
    api.getOrderMedicineByPriceDesc().then(response => {
      setMedicine(response.data);
  }) .catch(error => {
    console.log(error)
  })
  }

}


function handleQuantityChange(event){
  setQuantity(event.target.value);
}


function  askPrescription(event, name){
  event.preventDefault();

  const patient = {
    name: name,
    description : description
  }

  api.askPrescription(patient)
  .then(response => {
    alert('ask done')
  })
  .catch(error => {
     // setErrors(error.response.data.errors)
  })
}


function addToCart(event, medicine_id, pharmacy_id, price){
  event.preventDefault();

  const addtocart = {
    pharmacy_id: pharmacy_id,
    quantity: quantity,
    price: price,
    reservation: reservation
}

api.addToCart(medicine_id, addtocart)
.then(response => {
  alert('add done')
})
.catch(error => {
   // setErrors(error.response.data.errors)
})
}

function handleDescriptionChange(event){
  setDescription(event.target.value)
}


function renderPrescription(){
  return prescription.map(prescription => {
      return(
       
        <div key={prescription.id}
        className="templatemo-content-widget no-padding white-bg col-sm-6 
        col-lg-4 text-center item mb-4">
        <h3>
          {prescription.patient.name}
        </h3>
        <p style={{ overflowY:'auto', width:'100%', height: '100px', whiteSpace: 'pre-line' }}>
        {prescription.description}</p>
         <a className="btn btn-primary"
         href={`/prescription/${prescription.id}`}>Prescripe</a>
         <br/><br/>
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
      {prescription.length > 0 ? renderPrescription() : 'no data'}
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
