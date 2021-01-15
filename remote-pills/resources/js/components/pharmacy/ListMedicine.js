import React, {Component, useState, useEffect} from 'react';
import axios from 'axios';
import {Link, useHistory} from 'react-router-dom';
import api from '../../api';
import Header from '../layouts/Header';
import Footer from '../layouts/Footer';
import ReactDOM from 'react-dom';

export  default function ListMedicine(){

  const [medicine, setMedicine] = useState([]);

      
  const history = useHistory();

  

  useEffect(() => {

    fetchMedicine();
 
    
 },[]);




 function  handlePageClick(data) {
  const page = data.selected >= 0 ? data.selected + 1 : 0;

  setCurrentPage(2)

  fetchMedicine();
}

 

 function fetchMedicine(){
    api.getMedicine().then(response => {
      console.log(response.data)
      setMedicine(response.data);
  }) .catch(error => {
    console.log(error)
  })

}



function handleReferenceChange(event){
  var reference = event.target.value;
  if(reference == 'getNameOrderAsc'){
    api.getOrderMedicineByNameAsc().then(response => {
      console.log(response.data)
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


function renderMedicine(){
  return medicine.map(medicine => {
      return(
        <a href={"/medicine/show/"+medicine.medicine.id} key={medicine.id}> 
        <div className="colorhover test templatemo-content-widget no-padding white-bg col-sm-6 col-lg-4 text-center item mb-4" >
        <br/>
        <img src={`${medicine.medicine.image}`} width="70%" height="200px" alt="Image"
          style={{ mixBlendMode: 'multiply', objectFit: 'contain' }}
        />
       
        <h3 className="text-dark">{medicine.medicine.name}</h3>
        <p className="price">
        <i className="fa fa-money fa-fw"></i> {medicine.price}
        
        </p>
      </div>
      </a>
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

        <div style={{ marginLeft:'10px', marginRight:'10px' }}>
          <a className='btn btn-primary' title='Add Medicine' href='/medicine/add'>
          <i className="fa fa-plus"></i>
                </a> 
                </div>  

       
        <div className="search" style={{ marginRight:'10px' }}>   		
		              	<input type="text" className="form-control"
						   placeholder="Serach"  
               onChange={filterFunction}
               />   
               </div>
                
            <select className="form-control" style={{ width: '200px'}}
            onChange={handleReferenceChange}>
            <optgroup label="Filter by Reference" >
              <option value="getAll">Choose</option>
              {/* <option value="getNameOrderAsc">Name, A to Z</option>
              <option value="getNameOrderDesc">Name, Z to A</option> */}
              {/* <div className="dropdown-divider"></div> */}
              <option value="getPriceOrderAsc">Price, low to high</option>
              <option value="getPriceOrderDesc">Price, high to low</option>
            </optgroup>
            </select>
            </div>

            <div style={{ marginTop:'10px' }} >
        </div>
  
    <div className="row">
        <div id="showSearch" >
      {renderMedicine()}
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
