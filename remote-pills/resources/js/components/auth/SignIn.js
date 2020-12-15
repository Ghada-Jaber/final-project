import React, { useState } from 'react';
import {Link, useHistory} from 'react-router-dom';
import api from '../../api';
import CookieService from '../../Service/CookieService';
import logo from '../../../images/logo.png';

export  default function SignIn(){
	const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [remember, setRemember] = useState(0);
	const [errors, setErrors] = useState([]);
    const history = useHistory();
    
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

    function handleEmailChange (event) {
        setEmail(event.target.value)
    }

    function handlePasswordChange (event) {
        setPassword(event.target.value)
    }

    function handleRememberChange (event) {
        if(event.target.checked){
            setRemember(1)
        }else{
            setRemember(0)
        }
    }

    function handleLogin (event) {
        event.preventDefault();
        const login = {
            email: email,
            password: password,
            remember_token: remember
        }
        api.checkLogin(login)
            .then(response => {

                console.log(response);

                const options = {Path: "/",Expires: response.data.expires, Secure: true};
                CookieService.set('access_token', response.data.access, options);

                history.push('/medicine')
                window.location.reload();
            })
            .catch(error => {
                console.log(error.response.data.errors);
                if(email=='' || password==''){
                setErrors(error.response.data.errors)
                }else{
                    alert('incorrect username or password');
                }
            })
    }

    return( 
        <div className="logincontainer">
        
        <br/>
        <div className="templatemo-content-widget templatemo-login-widget white-bg">
	
	        <form  className="templatemo-login-form" onSubmit={handleLogin}>
	        	<div  className={`form-group ${hasErrorFor('email') ? 'has-error' : ''}`} >
	        		<div className="input-group">
		        		<div className="input-group-addon"><i className="fa fa-user fa-fw"></i></div>	        		
		              	<input type="email" className="form-control" 
						   placeholder="Username" 
						   value={email} onChange={handleEmailChange} />
                                   
		          	</div>	
                      {renderErrorFor('email')}     
	        	</div>
	        	<div className={`form-group ${hasErrorFor('password') ? 'has-error' : ''}`} >
	        		<div className="input-group">
		        		<div className="input-group-addon"><i className="fa fa-key fa-fw"></i></div>	        		
		              	<input type="password" className="form-control" name="password"
						   placeholder="Passwrod" value={password}
                                onChange={handlePasswordChange} />   
		          	</div>	
                      {renderErrorFor('password')}      
	        	</div>	          	
				<div className="form-group">
				    <div className="checkbox squaredTwo">
				        <input type="checkbox" id="c1" name="cc"  defaultChecked={false}
                                onChange={handleRememberChange}/>
						<label htmlFor="c1"><span></span>Remember me</label>
				    </div>				    
				</div>
				<div className="form-group">
					<input type="submit" className="templatemo-blue-button width-100" value="Sign In" name="submit" />
				</div>
				
				
				
				
	        </form>
		</div>
		<div className="templatemo-content-widget templatemo-login-widget templatemo-register-widget white-bg">
			<p>Not a registered user yet? <strong>
            <a  href="signup" >Sign up now!</a></strong><br />
			<a  href="forpass">Forget Password!</a></p>
		</div>

        </div>

    )

}
