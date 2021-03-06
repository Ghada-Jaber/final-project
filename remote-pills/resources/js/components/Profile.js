import React, {useState, useEffect} from 'react';
import {Link, useHistory} from 'react-router-dom';
import api from '../api';
import Header from './layouts/Header';
import Footer from './layouts/Footer';
import images from './Themes/Images';
import '../../css/Profile.css';


import firebase from 'firebase';
import config from './firebase/config';


if (!firebase.apps.length) {
  firebase.initializeApp(config);
}else {
firebase.app(); // if already initialized
}

if ("serviceWorker" in navigator) {
navigator.serviceWorker
  .register("./firebase-messaging-sw.js")
  .then(function(registration) {
    console.log("Registration successful, scope is:", registration.scope);
  })
  .catch(function(err) {
    console.log("Service worker registration failed, error:", err);
  });
}

export  default function Profile(props){

  const [country, setCountry] = useState([]);
	const [countryId, setCountryId] = useState('');
	const [city, setCity] = useState([]);
	const [cityId, setCityId] = useState('');
	const [street, setStreet] = useState([]);
  const [streetId, setStreetId] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const[password, setPassword] = useState('');
  const [image, setImage] = useState('');
  const [address, setAddress] = useState('');

  const [newImg, setNImg] = useState('');
  const [birthday, setBirthday] = useState('');
  const [errors, setErrors] = useState([]);
  const[role, setRole] = useState('');
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
        }else{
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
      setId(response.data.id)
      setName(response.data.name)
      setEmail(response.data.email)
      setPassword('****')
      setBirthday(response.data.birthday)
      setImage(response.data.image)
      setAddress(response.data.street.name+", "+response.data.city.name+", "+response.data.country.name)

      setStreetId(response.data.street.id)

      setRole(response.data.roles[0]);
        
    }).catch(error => {
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
        const prefixFiletype = event.target.files[0].type.toString()
        if (prefixFiletype.indexOf('image/') !== 0) {
          alert('This file is not an image')
          return
        }

        const fd = new FormData();
        fd.append('image',event.target.files[0]);
      
        api.changeProfile(fd, {headers:{'Accept': "application/json",  'Content-Type': "multipart/form-data"}})
        .then(response => {
            window.location.reload()
        }) .catch(error => {
            console.log(error)
        })
    } else {
      alert('Something wrong with input file')
    }
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
      document.getElementById('edit').style.display="";
      document.getElementById('save').style.display="none";
      document.getElementById('password').disabled= true;
      document.getElementById('birthday').disabled= true;

      var user = firebase.auth().currentUser;
      if(password != "****"){
          user.updatePassword(password).then(function() {
          }).catch(function(error) {
            console.log(error)
          });
      }
      document.getElementById('edit').style.display="";
      document.getElementById('save').style.display="none";
      document.getElementById('password').disabled= true;
      document.getElementById('birthday').disabled= true;

      document.getElementById('country').disabled= true;
      document.getElementById('city').disabled= true;

      document.getElementById('street').disabled= true;
      document.getElementById('addressgroup').style.display ="none"
    }) .catch(error => {
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
        <div style={{ marginTop:'100px' }}>
          <div className="col-1">		
            <div className="templatemo-content-widget templatemo-login-widget white-bg">
              <div id="spacing"></div>
	              <form  className="templatemo-login-form" >
                  <div class="media margin-bottom-30">
                    <div class="media-left padding-right-25">
                     <a href="#">
                     {image!="" ? 
                     <img class="media-object img-circle templatemo-img-bordered" 
                      style={{    width: '120px', height: '120px'}}
                      src={image} alt="Avatar"/>
                      :

                      <img class="media-object img-circle templatemo-img-bordered" 
                      style={{    width: '120px', height: '120px'}}
                      src={images.ic_default_avatar} alt="Avatar"/>
                     
                     }
                      
                      </a>
                    </div>
                    <div >
                      <h2 className="media-heading bluetext">{name}</h2>
                    </div>        
                  </div>
                  {role != 'ROLE_PHARMACY' ? 
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
                 : ''}

                <a  id="save" onClick= {() => updateInfo()} className='btn btn-primary' 
                style={{ display:'none' }}>
                <i  className="fa fa-save fa-fw"></i>
                </a> 
              
              <a  id="edit" onClick= {() => editInfo()} className='btn btn-primary' >
              <i  className="fa fa-edit fa-fw"></i>
              </a> 
                <br/> <br/>

              <div className="form-group" >
	        		  <div className="input-group">
		        	  	<div className="input-group-addon"><i className="fa fa-envelope-o fa-fw"></i></div>	        		
		              <label className="form-control">{email}</label> 
		          	</div>	   
	        	  </div>
				
              <div className={`form-group ${hasErrorFor('password') ? 'has-error' : ''}`} >
	        		  <div className="input-group">
		        		  <div className="input-group-addon"><i className="fa fa-key fa-fw"></i></div>	        		
		              <input type="password" className="form-control" id="password"
                    placeholder="Passwrod" value={password}
                    onChange={handlePasswordChange} disabled/>   
		          	</div>	
                {renderErrorFor('password')}      
	        	 </div>

              <div className={`form-group ${hasErrorFor('birthday') ? 'has-error' : ''}`} >
                <div className="input-group">
                  <div className="input-group-addon"><i className="fa fa-key fa-fw"></i></div>	
                  <input className="form-control" id="birthday"
                  type="date" value={birthday} 
                  onChange={handleBirthdayChange} 
                  disabled />
                </div>
                  {renderErrorFor('birthday')}
              </div>

              <div className="form-group" >
                <div className="input-group">
                  <div className="input-group-addon"><i className="fa fa-map-marker fa-fw"></i></div>	        		
                    <label className="form-control">{address}</label> 
                </div>	
              </div>

              <div  id="addressgroup" style={{ display:'none'}}>
                <div className="form-group" >
	        		    <div className="input-group">
		        		    <div className="input-group-addon"><i className="fa fa-flag fa-fw"></i></div>	        		
		              	<select className="form-control"   
                      value={countryId} id="country" disabled
                      onChange={handleCountryChange}> 
                      <optgroup label="select country" >
                      { country.length >0 ? renderCountry() : '' }
                      </optgroup>			
                    </select>	
                  </div>
                </div>
                <div className="form-group" >
                  <div className="input-group">
		        		    <div className="input-group-addon"><i className="fa fa-building fa-fw"></i></div>	        		
                    <select className="form-control"   
                      value={cityId} id="city" disabled
                      onChange={handleCityChange}> 
                      <optgroup label="select city">
                      { city.length >0 ? renderCity() : '' }

                      </optgroup> 					
                    </select>	
                  </div>
                </div> 

                <div className="form-group" >
                  <div className="input-group">
                    <div className="input-group-addon"><i className="fa fa-street-view fa-fw"></i></div>	        		
		              	<select className="form-control"   
                    value={streetId} id="street" disabled
                    ronChange={handleStreetChange}> 
                      <optgroup label="select street">
                      { street.length >0 ? renderStreet() : '' }
                      </optgroup> 					
                    </select>						
		          	 </div>	
                </div>
	        	  </div>  
	          </form>
	      	</div>	

        </div>                       
        </div>      
        <Footer />
      </div>
    </div>

  )

}
