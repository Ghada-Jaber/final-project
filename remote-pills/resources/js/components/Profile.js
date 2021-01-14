import React, {useState, useEffect} from 'react';
import {Link, useHistory} from 'react-router-dom';
import api from '../api';
import Header from './layouts/Header';
import Footer from './layouts/Footer';
import images from './Themes/Images';
import '../../css/Profile.css';

export  default function Profile(props){

  const [country, setCountry] = useState([]);
	const [countryId, setCountryId] = useState('');
	const [city, setCity] = useState([]);
	const [cityId, setCityId] = useState('');
	const [street, setStreet] = useState([]);
  const [streetId, setStreetId] = useState('');
  

    const [pharmacy, setPharmacy] = useState([]);
  const history = useHistory();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const[password, setPassword] = useState('');
    const [image, setImage] = useState('');
    const [address, setAddress] = useState('');

    const [newImg, setNImg] = useState('');
    const [birthday, setBirthday] = useState('');
    const [errors, setErrors] = useState([]);

    const [id, setId] = useState('');


  useEffect(() => {
    fetchCountry();
    details();
   
   

 },[]);

 function fetchCountry(){
  api.getCountry().then(response => {
setCountry(response.data);

api.getCity(response.data[0].id).then(res => {
  if(res.data.length ==0){
   // setCityId('0')
  }else{
   // setCityId(res.data[0].id)
  
  
    setCity(res.data);
    api.getStreet(res.data[0].id).then(re => {
    
      setStreet(re.data)
    })

  }
})
  }) .catch(error => {

  })
}

 let refInput = null;
 let newAvatar = null;
 let photoUrl = null;

 function details(){
  api.details().then(response => {
  console.log(response.data)
    setId(response.data.id)
    setName(response.data.name)
    setEmail(response.data.email)
    setPassword(response.data.password)
    setBirthday(response.data.birthday)
    setImage(response.data.image)
    setAddress(response.data.street.name+", "+response.data.city.name+", "+response.data.country.name)

 setStreetId(response.data.street.id)

    //setAddress(response.data.address)
      
  }).catch(error => {
    //  history.push('/');
  })
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


function onChangeAvatar(event) {
  if (event.target.files && event.target.files[0]) {
      // Check this file is an image?
      const prefixFiletype = event.target.files[0].type.toString()
      if (prefixFiletype.indexOf('image/') !== 0) {
          alert('This file is not an image')
          return
      }

      const fd = new FormData();
      fd.append('image',event.target.files[0]);
    
      api.changeProfile(fd, {headers:{'Accept': "application/json",  'Content-Type': "multipart/form-data"}})
          .then(response => {
              
    
              console.log(response.data);
              window.location.reload()
          }) .catch(error => {
             console.log(error)
          })
  } else {
      alert('Something wrong with input file')
  }
}

function uploadAvatar () {
  
}



function handleProfileChange (event) {
  event.preventDefault();
  const fd = new FormData();
  fd.append('name', name);
  fd.append('image', newImg);



  api.changeProfile(fd, {headers:{'Accept': "application/json",  'Content-Type': "multipart/form-data"}})
  .then(response => {
        console.log(response.data)
      }) .catch(error => {
  console.log(error)
      })
}

function updateInfo(){
  console.log(newImg)

  event.preventDefault();
  
  const profile ={
    password: password,
    birthday: birthday,
    street_id: streetId
  }

  api.changeProfile(profile)
      .then(response => {
          

          console.log(response.data);
  document.getElementById('edit').style.display="";
  document.getElementById('save').style.display="none";
  document.getElementById('password').disabled= true;
  document.getElementById('birthday').disabled= true;

  window.location.reload()
  //       document.getElementById('price').disabled= true;
  //       document.getElementById('mfd').disabled= true;
  //       document.getElementById('exp').disabled= true;
  
  //       setQuantity(response.data.quantity);
  //       setPrice(response.data.price);
  //       setMfd(response.data.MFD);
  //       setExp(response.data.EXP);
  
  //       document.getElementById('edit').style.display="";
  //   document.getElementById('save').style.display="none";
      }) .catch(error => {
         console.log(error)
      })


}


function editInfo(){
    
  document.getElementById('edit').style.display="none";
  document.getElementById('save').style.display="";
  document.getElementById('password').disabled= false;
  document.getElementById('birthday').disabled= false;

  document.getElementById('country').disabled= false;
  document.getElementById('city').disabled= false;

  document.getElementById('street').disabled= false;
  document.getElementById('addressgroup').style.display ="block"

}

function handlePasswordChange(event){
  setPassword(event.target.value)
}


function handleBirthdayChange(event){
  setBirthday(event.target.value)
}
   

function renderCountry(){
  return  country.map(country => {
      return(
          <option key={country.id} value={country.id}
          style={{backgroundImage: `url(country/${country.name}.png)` }}>
              {country.name}
          </option>
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

function handleCountryChange(event){
  setCountryId(event.target.value);
  let country_id = event.target.value;
  api.getCity(country_id).then(response => {
          setCityId(response.data[0].id)
    setCity(response.data)
    let city_id = response.data[0].id;
  api.getStreet(city_id).then(res => {
    
          setStreetId(res.data[0].id)
          setStreet(res.data)
      }) .catch(error => {
          setStreet([])
      })
      }) .catch(error => {
          setCity([])
      })
}

function handleCityChange(event){
  setCityId(event.target.value);
  let city_id = event.target.value;
  api.getStreet(city_id).then(response => {
    
          setStreetId(response.data[0].id)
          setStreet(response.data)
      }) .catch(error => {
          setStreet([])
      })
}
function handleStreetChange(event){
  setStreetId(event.target.value);
}


    return(
        <div className="templatemo-flex-row">
	  
        <div className="templatemo-content col-1 light-gray-bg">
        
         <Header />
          <div style={{ marginTop:'30px' }}>
              <div className="col-1">			
    <div className="templatemo-content-widget  col-2">
              
              <img className="avatar" alt="Avatar" src={image}/>

                <div className="viewWrapInputFile">
                    <img
                        className="imgInputFile"
                        alt="icon gallery"
                        src={images.ic_input_file}
                        onClick={() =>refInput.click()}
                    />
                    <input
                        ref={el => {
                            refInput = el
                        }}
                        accept="image/*"
                        className="viewInputFile"
                        type="file"
                        onChange={onChangeAvatar}
                    />
                </div>
              <div className="media margin-bottom-30">
                
                <div className="media-body">
                  <h2 className="media-heading">{name}</h2>
                </div>        
              </div>
              <div className="table-responsive">
             
              <a  id="save" onClick= {() => updateInfo()} className='btn btn-primary' 
                style={{ display:'none' }}>
                <i  className="fa fa-save fa-fw"></i>
                </a> 
            <a  id="edit" onClick= {() => editInfo()} className='btn btn-primary' >
             <i  className="fa fa-edit fa-fw"></i>
                </a> 

                <br/><br/>
                <table className="table" style={{ width:'50%'}}>
                  <tbody>
                    <tr style={{ width:'10%'}}>
                      <td>email</td>
                      <td>{email}</td>                    
                    </tr> 
                    <tr style={{ width:'10%'}}>
                      <td>password</td>
                      <td>
                      <div className={`form-group ${hasErrorFor('password') ? 'has-error' : ''}`} >
                        <input className="form-control" id="password"
                        type="password" 
                        value='*****'
                        onChange={handlePasswordChange} 
                        disabled
                        />
                        {renderErrorFor('password')}
                        </div>
                      </td>                    
                    </tr>  
                    <tr style={{ width:'10%'}}>
                      <td>birthday</td>
                      <td>
                      <div className={`form-group ${hasErrorFor('birthday') ? 'has-error' : ''}`} >
                        <input className="form-control" id="birthday"
                        type="date" 
                        value={birthday} 
                        onChange={handleBirthdayChange} 
                        disabled
                        />
                        {renderErrorFor('birthday')}
                        </div>
                      </td>                    
                    </tr>  
                    <tr>
                      <td style={{ width:'10%'}}>Address</td>
                      <td>
                      {address}
                      <div className="form-group" id="addressgroup" style={{ display:'none'}}>
	        		<div className="input-group">
		        		<div className="input-group-addon"><i className="fa fa-flag fa-fw"></i></div>	        		
		              	<select className="form-control"   
						 value={countryId} id="country" disabled
						  required onChange={handleCountryChange}> 
						  <optgroup label="select country" >
							{ country.length >0 ? renderCountry() : '' }
							</optgroup>			
                         </select>	
		        		<div className="input-group-addon"><i className="fa fa-building fa-fw"></i></div>	        		
		              	<select className="form-control"   
						value={cityId} id="city" disabled
						  required onChange={handleCityChange}> 
						  <optgroup label="select city">
							{ city.length >0 ? renderCity() : '' }

							</optgroup>
                        					
                </select>	
                <div className="input-group-addon"><i className="fa fa-street-view fa-fw"></i></div>	        		
		              	<select className="form-control"   
						value={streetId} id="street" disabled
            required onChange={handleStreetChange}> 
						  <optgroup label="select street">
							{ street.length >0 ? renderStreet() : '' }

							</optgroup>
                        					
                </select>						
		          	</div>	
	        	</div>
                      </td>                    
                    </tr>                                      
                  </tbody>
                </table>
              </div>             
            
            </div>  
       </div>                       
            </div>      
             <Footer />
          </div>
        </div>

    )

}
