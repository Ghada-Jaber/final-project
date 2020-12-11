import React, {useState, useEffect} from 'react';
import {Link, useHistory} from 'react-router-dom';
import api from './../../api';
import CookieService from '../../Service/CookieService';

export  default function SignUp(){

	const [country, setCountry] = useState([]);
	const [countryId, setCountryId] = useState('');
	const [city, setCity] = useState([]);
	const [cityId, setCityId] = useState('');
	const [street, setStreet] = useState([]);
	const [streetId, setStreetId] = useState('');
	
	const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirm_password, setConfirmPassword] = useState('');
	const [img,setImg] = useState();
	const [birthday,setBirthday] = useState('');
	const [errors, setErrors] = useState([]);

    useEffect(() => {
        fetchCountry();

     },[]);

     function fetchCountry(){
        api.getCountry().then(response => {
			setCountry(response.data);
			setCountryId(response.data[0].id);
			api.getCity(response.data[0].id).then(res => {
				if(res.data.length ==0){
					setCityId('0')
				}else{
					setCityId(res.data[0].id)
				
				
					setCity(res.data);
					api.getStreet(res.data[0].id).then(re => {
						if(re.data.length ==0){
							setStreetId('0')
						}else{
							setStreetId(re.data[0].id)
						}
						setStreet(re.data)
					})

				}
			})
        }) .catch(error => {
			
        })
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


	function handleNameChange (event) {
		console.log(event.target.value)
        setName(event.target.value)
    }

    function handleEmailChange (event) {
        setEmail(event.target.value)
    }

    function handlePasswordChange (event) {
        setPassword(event.target.value)
    }

    function handleCPasswordChange (event) {
        setConfirmPassword(event.target.value)
	}
	
	function handleImageChange(event){
        setImg(event.target.files[0]);
    }


    function hasErrorFor (field) {
        return !!errors[field]
    }

    function renderErrorFor (field) {
        if (hasErrorFor(field)) {
            return (
                <span style={{ color: 'red' }}> {/*make it in boostrap*/}
                    <strong>{errors[field][0]}</strong>
                </span>
            )
        }
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


	function handleBirthdayChange(event){
		var date = new Date(new Date().getFullYear(),new Date().getMonth() , new Date().getDate())

        var birth = new Date(event.target.value);
        birth.setHours(0);
        birth.setMinutes(0);
        birth.setSeconds(0);

        if (birth < date)
            setBirthday(event.target.value);
        else
			//alert("Cannot choose a date before the current date");
			console.log("here error")
	}
	

	function handleCreateNewUser (event) {
        event.preventDefault();
        const fd = new FormData();
        fd.append('image', img);
        fd.append('name', name);
        fd.append('email', email);
        fd.append('password', password);
		fd.append('confirm_password', confirm_password);
		fd.append('birthday', birthday);
		fd.append('street_id', streetId);

		alert(streetId);
		

        api.register(fd, {headers:{'Accept': "application/json",  'Content-Type': "multipart/form-data"}})
            .then(response => {
                const options = {Path: "/",Expires: response.data.expires, Secure: true};
                CookieService.set('access_token', response.data.access, options);
                history.push('/stuff');
                window.location.reload();
            }) .catch(error => {
				console.log('error')
                setErrors(error.response.data.errors);
            })
    }

    return(
        <div >
		<div className="templatemo-content-widget templatemo-login-widget no-padding "  style={{ height: '240px', overflowY: 'scroll', overflowX: 'hidden' }}>

	        {/* <form className="templatemo-login-form" encType="multipart/form-data" onSubmit={() => handleCreateNewUser()}> */}
			<div className="form-group">
	        		<div className="input-group">
		        		<div className="input-group-addon"><i className="fa fa-user fa-fw"></i></div>	        		
		              	<input type="text" className="form-control" placeholder="Full Name" 
						  name="fname" required 
						  onChange={handleNameChange} value={name}
						  /> 
						  {renderErrorFor('name')}          
		          	</div>	
					
	        	</div>
	        	<div className="form-group">
	        		<div className="input-group">
		        		<div className="input-group-addon"><i className="fa fa-user fa-fw"></i></div>	        		
		              	<input type="email" className="form-control" placeholder="Username" 
						  name="usern" required 
						  onChange={handleEmailChange} value={email}
						  /> 
						  {renderErrorFor('email')}
				{/* <!--	<input type="text" class="form-control" placeholder="Username" name="usern" required pattern="[A-Za-z]{3}" title="Three letter country code"	 > --> */}
					
		          	</div>	
	        	</div>
	        	<div className="form-group">
	        		<div className="input-group">
		        		<div className="input-group-addon"><i className="fa fa-key fa-fw"></i></div>	        		
		              	<input type="password" className="form-control" placeholder="Password"
						   name="pass" required 
						   onChange={handlePasswordChange}
                                        value={password}
						   />  
						   {renderErrorFor('password')}         
		          	</div>	
	        	</div>	

          <div className="form-group">
	        		<div className="input-group">
		        		<div className="input-group-addon"><i className="fa fa-key fa-fw"></i></div>	        		
		              	<input type="password" className="form-control" placeholder="Re-Password" 
						  name="cpass" required 
						  onChange={handleCPasswordChange}
                                        value={confirm_password}
						  /> 

						  {renderErrorFor('confirm_password')}          
		          	</div>	
	        	</div>	

				<div className="form-group">
	        		<div className="input-group">
		        		<div className="input-group-addon"><i className="fa fa-birthday-cake fa-fw"></i></div>	        		
		              	<input type="date" className="form-control" placeholder="birthday" 
						  name="cpass" required 
						  onChange={handleBirthdayChange}
                                        value={birthday}
						  /> 

						  {renderErrorFor('confirm_password')}          
		          	</div>	
	        	</div>	

              <div className="form-group">
	        		<div className="input-group">
		        		<div className="input-group-addon"><i className="fa fa-key fa-fw"></i></div>	        		
		              	<input type="password" className="form-control" placeholder="Secret Sentence" name="secret" required />           
		          	</div>	
	        	</div>				
				
				
				<div className="form-group">
	        		<div className="input-group">
		        		<div className="input-group-addon"><i className="fa fa-flag fa-fw"></i></div>	        		
		              	<select className="form-control select" size="4" 
						  value={countryId} 
						  required onChange={handleCountryChange}> 
						  <optgroup label="select country" style={{ color:'gray' }}>
							{ country.length >0 ? renderCountry() : '' }
							</optgroup>
                        					
                         </select>						
		          	</div>	
	        	</div>

				<div className="form-group">
	        		<div className="input-group">
		        		<div className="input-group-addon"><i className="fa fa-building fa-fw"></i></div>	        		
		              	<select className="form-control"   
						value={cityId} 
						  required onChange={handleCityChange}> 
						  <optgroup label="select city">
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
						  required onChange={handleStreetChange}> 
						  <optgroup label="select street">
							  { city.length >0 ? renderStreet() : '' }
							</optgroup>
                        					
                         </select>						
		          	</div>	
	        	</div>

<div className="form-group">
	        		<div className="input-group">
		        		<div className="input-group-addon"><i className="fa fa-photo fa-fw"></i></div>	        		
		              	<input type="file" className="form-control" name="file"  required 
							   onChange={handleImageChange}
						  />           
		          	</div>	
	        	</div>				
	          	<div className="form-group">
				      
				</div>
				<div className="form-group">
					<button type="submit" className="templatemo-blue-button width-100"
					onClick={(event) => handleCreateNewUser(event)} >
					Sign Up </button>
				</div>
				
	        {/* </form> */}
			
		</div>
</div>

 
	

    )

}
