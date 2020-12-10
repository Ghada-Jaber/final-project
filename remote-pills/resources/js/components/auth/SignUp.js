import React, {useState, useEffect} from 'react';
import {Link, useHistory} from 'react-router-dom';
import api from './../../api';
// import CookieService from '../Service/CookieService';

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
	
	const [errors, setErrors] = useState([]);

    useEffect(() => {
        fetchCountry();

     },[]);

     function fetchCountry(){
        api.getCountry().then(response => {
			setCountry(response.data);
			setCountryId(response.data[0].id);
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
	}
	

	function handleCreateNewUser (event) {
        event.preventDefault();
        const fd = new FormData();
        fd.append('image', img);
        fd.append('name', name);
        fd.append('email', email);
        fd.append('password', password);
        fd.append('confirm_password', confirm_password);

        api.register(fd, {headers:{'Accept': "application/json",  'Content-Type': "multipart/form-data"}})
            .then(response => {
                const options = {Path: "/",Expires: response.data.expires, Secure: true};
                CookieService.set('access_token', response.data.access, options);

                console.log(response.data);
                // history.push('/projects');
                // window.location.reload();
            }) .catch(error => {
                setErrors(error.response.data.errors);
            })
    }

    return(
        <div >
		<div className="templatemo-content-widget templatemo-login-widget no-padding "  style={{ height: '240px', overflowY: 'scroll', overflowX: 'hidden' }}>

	        <form className="templatemo-login-form" encType="multipart/form-data" onSubmit={() => handleCreateNewUser()}>
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
		              	<input type="text" className="form-control" placeholder="Username" 
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
                            {renderCountry()}
							</optgroup>
                        					
                         </select>						
		          	</div>	
	        	</div>

				<div className="form-group">
	        		<div className="input-group">
		        		<div className="input-group-addon"><i className="fa fa-building fa-fw"></i></div>	        		
		              	<select className="form-control"   
						//   value={countryId} 
						  required onChange={handleCountryChange}> 
						  <optgroup label="select city">
                            <option>s</option>
							</optgroup>
                        					
                         </select>						
		          	</div>	
	        	</div>

				<div className="form-group">
	        		<div className="input-group">
		        		<div className="input-group-addon"><i className="fa fa-street-view fa-fw"></i></div>	        		
		              	<select className="form-control"  
						//   value={countryId} 
						  required onChange={handleCountryChange}> 
						  <optgroup label="select street">
                            <option>s</option>
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
					<input type="submit" className="templatemo-blue-button width-100" value="Sign Up" name="signup" />
				</div>
				
	        </form>
			
		</div>
</div>

 
	

    )

}
