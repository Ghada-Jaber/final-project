import React, {useState, useEffect} from 'react';
import {Link, useHistory} from 'react-router-dom';
import api from '../../api';
import Header from '../layouts/Header';
import Footer from '../layouts/Footer';
import Back from '../Back';

export  default function AddMedicine(props){
    const [medicine, setMedicine] = useState([]);

    const [id, setMedicineId] = useState('');

    const [quantity, setQuantity] = useState(0);
    const [price, setPrice] = useState(0);
    const [mfd, setMfd] = useState('');
    const [exp, setExp] = useState('');
    const [errors, setErrors] = useState([]);

  const history = useHistory();

  useEffect(() => {
    api.getAllAvailableMedicine().then(response => {
      console.log(response.data)
        setMedicineId(response.data[0].id)
        setMedicine(response.data);
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

  function renderMedicine(){
    return  medicine.map(medicine => {
        return(
            <option key={medicine.id} value={medicine.id}
            // style={{backgroundImage: `url(../images/medicine/${medicine.image})` }}
            >
                {medicine.name}
            </option>
        )
    })
}


function handleMedicineChange(event){
  setMedicineId(event.target.value);
}


function handleQuantityChange(event){
  setQuantity(event.target.value);
  
  
}


function handlePriceChange(event){
  setPrice(event.target.value);
}


function handleMfdChange(event){
  var d = new Date(new Date().getFullYear(),new Date().getMonth() , new Date().getDate())

  var start_date = new Date(event.target.value);
  start_date.setHours(0);
  start_date.setMinutes(0);
  start_date.setSeconds(0);

  if (start_date <= d)
  setMfd(event.target.value);
  else
     alert('Cannot choose a date afer the current date');
     //console.log("Cannot choose a date afer the current date");
  
}


function handleExpChange(event){
  if(mfd != '') {
  var d = new Date(new Date().getFullYear(),new Date().getMonth() , new Date().getDate());

  var mfd_date = new Date(mfd);
  mfd_date.setHours(0);
  mfd_date.setMinutes(0);
  mfd_date.setSeconds(0);

  var start_date = new Date(event.target.value);
  start_date.setHours(0);
  start_date.setMinutes(0);
  start_date.setSeconds(0);

  if (start_date >= d){
    if(start_date> mfd_date){
  setExp(event.target.value);
  }else{
  alert('Choose a exp date after the mfd date');
  //console.log("Choose a exp date after the mfd date");
  }
   } else{
     alert('Cannot choose a date before the current date');
     // console.log("Cannot choose a date before the current date");
   }
}
else {
  alert('You have to choose mfd date first');
 // console.log("You have to choose mfd date first");
}
}
   
function handleAddMedicine(event) {
  event.preventDefault();
  const medicine = {
      medicine_id: id,
      quantity: quantity,
      price: price,
      MFD: mfd,
      EXP:exp
  }
  api.addMedicine(medicine)
      .then(response => {
        alert("add success");
        setQuantity('');
        setPrice('');
        setExp('');
        setMfd('');
        history.push('/medicine')
      })
      .catch(error => {
        setErrors(error.response.data.errors)
      })
}


function filterFunction(event){
 var search = event.target.value;
 var filter, option, i;
  filter = search.toUpperCase();
  var div = document.getElementById("searchMed");
  option = div.getElementsByTagName("option");
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
              <div className="templatemo-content-widget templatemo-login-widget white-bg">
              <Back  />
              <br/>
              <div className="form-group">
          <div className="search" style={{ marginRight:'10px' }}>  	      		
		              	<input type="text" className="search form-control"
						   placeholder="Search"  
               id="myInput" onChange={filterFunction}

               /> 
               </div>
               </div> 
                 
          <div className="form-group">

<select className="form-control select" size="4"  id="searchMed"
 value={id} 
   required onChange={handleMedicineChange}
                > 
    <optgroup label="select medicine" >
    { medicine.length >0 ? renderMedicine() : '' }
    </optgroup>				
  </select>	
  </div>

  <div  className={`form-group ${hasErrorFor('quantity') ? 'has-error' : ''}`} >
	        		<div className="input-group">
		        		<div className="input-group-addon">Quantity</div>	        		
		              	<input type="number" className="form-control"
                       value={quantity} 
						          required onChange={handleQuantityChange}
                    />      
		          	</div>	
                {renderErrorFor('quantity')}    
	        	</div>	

            <div  className={`form-group ${hasErrorFor('price') ? 'has-error' : ''}`} >
	        		<div className="input-group">
		        		<div className="input-group-addon">Price</div>	        		
		              	<input type="number" className="form-control" 
                       value={price} 
						           onChange={handlePriceChange}
                    />      
		          	</div>
                {renderErrorFor('price')}   	
	        	</div>

            <div  className={`form-group ${hasErrorFor('MFD') ? 'has-error' : ''}`} >
	        		<div className="input-group">
		        		<div className="input-group-addon">MFD</div>	        		
		              	<input type="date" className="form-control"
                     value={mfd} 
						          required onChange={handleMfdChange}
                       />      
		          	</div>	
                {renderErrorFor('MFD')}  
	        	</div>	

            <div  className={`form-group ${hasErrorFor('EXP') ? 'has-error' : ''}`} >
	        		<div className="input-group">
		        		<div className="input-group-addon">EXP</div>	        		
		              	<input type="date" className="form-control" 
                       value={exp} 
						          required onChange={handleExpChange}
                    />      
		          	</div>	
                {renderErrorFor('EXP')} 
	        	</div>
  
            <div className="form-group">
					<button type="submit" className="templatemo-blue-button width-100"
          onClick={(event) => handleAddMedicine(event)}
					 >
					Add </button>
				</div>

              </div>

       </div>                       
            </div>      
             <Footer />
          </div>
        </div>

    )

}
