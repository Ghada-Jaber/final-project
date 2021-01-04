import React, {Component, useState, useEffect} from 'react';
import axios from 'axios';
import {Link, useHistory} from 'react-router-dom';
import api from '../../api';
import Header from '../layouts/Header';
import Footer from '../layouts/Footer';
import ReactDOM from 'react-dom';

export  default function Buy(props){

  const [medicine, setMedicine] = useState([]);

  const [city, setCity] = useState([]);
	const [cityId, setCityId] = useState('');
	const [street, setStreet] = useState([]);
  const [streetId, setStreetId] = useState('');
  

  const [quantity, setQuantity] = useState('');
  const [reservation, setReservation] = useState(0);


  const[description, setDescription] = useState('');

      
  const history = useHistory();

  

  useEffect(() => {

    api.getCity(props.props.street.city.country.id).then(res => {
        setCityId(props.props.street.city.id)
      
      
        setCity(res.data);
        api.getStreet(props.props.street.city.id).then(re => {
          if(re.data.length ==0){
            setStreetId('0')
          }else{
            setStreetId(props.props.street.id)
          }
          setStreet(re.data)

          fetchMedicine(props.props.street.id);
        })
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


function renderMedicine(){
  return medicine.map(pharmacy => {
      return(
        <section key={pharmacy.id}>
        <div 
        className={`templatemo-content-widget no-padding white-bg col-sm-6 col-lg-4 text-center item mb-4
        colorhover ${pharmacy.prescription == 1 ? 'orange-bg' : ''}`} >
        <br/>
        <a href={"/user/medicine/show/"+pharmacy.id} key={pharmacy.id}> 
        <img src={`${pharmacy.image}`} width="350px" height="200px" alt="Image"/>
        <h3 className="text-dark">{pharmacy.name}</h3>
        </a>

        {pharmacy.prescription == 0 ? <div className="table-responsive" style={{ overflow:'auto', height:'100px'}}>
                <table className="table">
                <thead >
                    <tr >
                      <td><b>Pharmacy</b></td>
                      <td><b>Price</b></td>
                      <td><b>Quantity</b></td>
                      <td><b>Reservation</b></td>
                      <td><b>Add</b></td>
                      </tr>
                    </thead>
                  <tbody>
                  {pharmacy[0].map(namepharmacy=>{
             return(
               <tr key={namepharmacy.id}>
               <td> {namepharmacy.name} </td><td>{namepharmacy.price}</td>
               <td>
               <input type="number" style={{ width:'70px'}} className="form-control"
          onChange={handleQuantityChange}
        />
               </td>
               <td>
               <input type="checkbox" style={{ display:'block' }}
          onChange={handleReservationChange}
        />
               </td>
               <td>
               <a onClick={(event)=> addToCart(event, pharmacy.id, namepharmacy.id, namepharmacy.price)}
                    className="btn btn-primary"
                        title="Add to cart">
                        <i className="fa fa-plus fa-fw"></i>
                     </a>
               </td>
               </tr>
             )
          })}
                                   
                  </tbody>
                </table>
              </div> : 
           

              <div  className="form-group" style={{ padding: '5px'}}>
	        		<div className="input-group">
		        		<div className="input-group-addon">
                <button onClick={(event) => askPrescription(event, pharmacy.name)}
               className="btn btn-danger">Ask Prescription</button></div>	        		
                <textarea  onChange={handleDescriptionChange}
              placeholder="write your description this medicine need prescription"
               className="form-control"></textarea>
                                   
		          	</div>
                <br/>	  
	        	</div>

              
              }
      
         
      </div>
      </section>
    
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


  function renderCity(){
    return  city.map(city => {
        return(
            <option key={city.id} value={city.id}>
                {city.name}
            </option>
        )
    })
}

function renderStreet(){
    return  street.map(street => {
        return(
            <option key={street.id} value={street.id} >
                {street.name}
            </option>
        )
    })
}

function handleCityChange(event){
  setCityId(event.target.value);
  let city_id = event.target.value;

  api.getStreet(city_id).then(response => {
    
          setStreetId(response.data[0].id)
          setStreet(response.data)
          fetchMedicine(response.data[0].id);
      }) .catch(error => {
          setStreet([])
      })
}

function handleStreetChange(event){
  setStreetId(event.target.value);
  fetchMedicine(event.target.value);

}

  function filterFunction(event){
    var search = event.target.value;
    var filter, option, i;
     filter = search.toUpperCase();
     var div = document.getElementById("showSearch");
     option = div.getElementsByTagName("section");
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
          <div className="templatemo-flex-row flex-content-row " >
              <div className="col-1">		
      <div className="container"  >
        <div className="row" style={{  display: 'flex'}}>

       
        <div className="search" style={{ marginRight:'10px' }}>   		
		              	<input type="text" className="form-control"
						   placeholder="Serach"  
               onChange={filterFunction}
               />   
               </div>

				<div className="form-group" style={{ marginRight:'10px' }}>
	        		<div className="input-group">
		        		<div className="input-group-addon"><i className="fa fa-building fa-fw"></i></div>	        		
		              	<select className="form-control"  value={cityId} 
                    onChange={handleCityChange}
              > 
						  <optgroup label="select city" >
							{ city.length >0 ? renderCity() : '' }

							</optgroup>
                        					
                         </select>						
		          	</div>	
	        	</div>

				<div className="form-group">
	        		<div className="input-group">
		        		<div className="input-group-addon"><i className="fa fa-street-view fa-fw"></i></div>	        		
		              	<select className="form-control"  
						value={streetId} 
						  required onChange={handleStreetChange}
              > 
						  <optgroup label="select street">
							  { city.length >0 ? renderStreet() : '' }
							</optgroup>
                        					
                         </select>						
		          	</div>	
	        	</div>

       
            </div>

            <div style={{ marginTop:'10px' }} >
        </div>
  
    <div className="row">
        <div id="showSearch">
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
