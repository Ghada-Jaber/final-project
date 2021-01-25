import React, {Component, useState, useEffect} from 'react';
import {Link, useHistory} from 'react-router-dom';
import api from '../../api';
import Header from '../layouts/Header';
import Footer from '../layouts/Footer';

export  default function Buy(props){

  const [medicine, setMedicine] = useState([]);

  const [city, setCity] = useState([]);
	const [cityId, setCityId] = useState('');
	const [street, setStreet] = useState([]);
  const [streetId, setStreetId] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [reservation, setReservation] = useState(0);
  const[description, setDescription] = useState('');

  const [errors, setErrors] = useState([]);

      
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


  function handleReservationChange(event){
    if(event.target.checked){
      setReservation(1)
    }else{
        setReservation(0)
    }
  }

  function fetchMedicine(id){
    api.getAllMedicineAvailable(id).then(response => {
      setMedicine(response.data);
     
    }) .catch(error => {
    })
  }


  function handleQuantityChange(event){
    if(event.target.value > 0){
    setQuantity(event.target.value);
    }else{
      // no negative number
    }
  }


  function  askPrescription(event, name){
    event.preventDefault();

    const patient = {
      name: name,
      description : description
    }

    api.askPrescription(patient)
    .then(response => {
    })
    .catch(error => {
      setErrors(error.response.data.errors)
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
    })
    .catch(error => {
    })
  }

  function handleDescriptionChange(event){
    setDescription(event.target.value)
  }


  function renderMedicine(){
    return medicine.map(pharmacy => {
      return(
        <section key={pharmacy.id}>
        {pharmacy[0].length > 0 ? 
          <div 
          className={`templatemo-content-widget no-padding white-bg col-sm-6 col-lg-4 text-center item mb-4
          colorhover ${pharmacy.prescription == 1 ? 'pres-bg' : ''}`} >
            <br/>
            <a href={"/user/medicine/show/"+pharmacy.id} key={pharmacy.id}> 
            <img src={`${pharmacy.image}`} width="80%" height="200px" alt="Image"
            style={{ mixBlendMode: 'multiply', objectFit: 'contain'  }}/>
            <h3 className="text-dark">{pharmacy.name}</h3>
            </a>

            {pharmacy.prescription == 0 ? 
            <div className="table-responsive" style={{ overflow:'auto', height:'100px'}}>
              <table className="table">
                <thead >
                  <tr >
                    <td><b>Pharmacy</b></td>
                    <td><b>Price</b></td>
                    <td><b>Quantity</b></td>
                    <td><b>Reserve</b></td>
                    <td><b>Add</b></td>
                  </tr>
                </thead>
                <tbody>
                  {pharmacy[0].map(namepharmacy=>{
                   return(
                    <tr key={namepharmacy.id} >
                    <td style={{  verticalAlign: 'middle'}}> 
                    {namepharmacy.name} </td>
                    <td style={{  verticalAlign: 'middle'}}>{namepharmacy.price} $</td>
                    <td style={{  verticalAlign: 'middle'}}>
                    <input type="number" style={{ width:'70px'}} className="form-control"
                    defaultValue={0} onChange={handleQuantityChange} />
                    </td>
                    <td style={{  verticalAlign: 'middle'}} >
                      <div style={{marginTop:'5px'}}></div>
                      <input type="checkbox"  style={{display:'block', marginLeft:'20px'}}
                      onChange={handleReservationChange}/> 
                    </td>
                    <td style={{  verticalAlign: 'middle'}} >
                    <a data-toggle="modal" data-target="#myModal"
                    onClick={(event)=> addToCart(event, pharmacy.id, namepharmacy.id, namepharmacy.price)}
                      className="btn btn-primary" title="Add to cart">
                      <i className="fa fa-plus fa-fw"></i>
                    </a>
                    </td>
                   </tr>
                   )
                  })}
                                   
                </tbody>
              </table>
            </div> : 
           
            <>
              <div style={{ marginTop:'32px'}}></div>
              <div  className={`form-group ${hasErrorFor('description') ? 'has-error' : ''}`} style={{ padding: '5px'}}>
                <div className="input-group">
                          
                  <textarea  onChange={handleDescriptionChange}
                  placeholder="What you are feeling ?"
                  className="form-control"></textarea>
                  <div className="input-group-addon">
                    <button data-toggle="modal" data-target="#myModal2"
                      onClick={(event) => askPrescription(event, pharmacy.name)}
                    className="btn btn-danger">Ask for Prescription</button>
                  </div>	  
                                    
                </div>
                 
                {renderErrorFor('description')}  
	        	 </div>
            </>
              
            }
          </div>
       : ''}
        
       </section>
    
      )
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
        <div className="templatemo-flex-row flex-content-row " style={{ marginTop:'100px' }}>
          <div className="col-1">		
            <div className="container"  >
              <div className="row" style={{  display: 'flex'}}>
               <div className="search" style={{marginLeft:'10px', marginRight:'10px' }}>   		
                  <input type="text" className="form-control"
                  placeholder="Search"  
                  onChange={filterFunction}/>   
               </div>

				        <div className="form-group" style={{ marginRight:'10px' }}>
	        		    <div className="input-group">
		        		    <div className="input-group-addon">
                      <i className="fa fa-building fa-fw"></i>
                    </div>	        		
                    <select className="form-control selectbuy"  value={cityId} 
                    onChange={handleCityChange} > 
                      <optgroup label="select city" >
                      { city.length >0 ? renderCity() : '' }

                      </optgroup>
                    </select>						
		          	  </div>	
	        	    </div>

				        <div className="form-group">
	        		    <div className="input-group">
		        		    <div className="input-group-addon">
                      <i className="fa fa-street-view fa-fw"></i>
                    </div>	        		
		              	<select className="form-control selectbuy"  
						          value={streetId}  onChange={handleStreetChange}> 
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
                  {medicine.length> 0 ? renderMedicine() : 'no data'}
                </div>
             </div>  
             <div className="modal fade" id="myModal" role="dialog">
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <a  data-dismiss="modal">
                       <i className="fa fa-times"></i>
                      </a>
                      <h4 className="modal-title">Item Added To Cart</h4>
                    </div>
                  </div>
      
                </div>
              </div> 

              <div className="modal fade" id="myModal2" role="dialog">
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <button type="button" className="close" data-dismiss="modal">&times;</button>
                      <h4 className="modal-title">Your request has been sent successfully</h4>
                    </div>
                  </div>
      
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
