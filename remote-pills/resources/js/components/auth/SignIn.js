import React, { useState } from 'react';
import {Link, useHistory} from 'react-router-dom';
import api from '../../api';
import CookieService from '../../Service/CookieService';
import logo from '../../../images/logo.png';


import firebase from "firebase/app";

// Add the Firebase services that you want to use
import "firebase/auth";
import "firebase/firestore";

import "firebaseui";
import config from '../firebase/config';

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
        if (hasErrorFor('message')) {
            return (
                <span style={{ color: '#D7425C' }}>
                    <strong>{field}</strong>
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
     

        if (!firebase.apps.length) {
            firebase.initializeApp(config);
        }else {
        firebase.app(); // if already initialized
        }

        firebase.auth().signInWithEmailAndPassword(email, password)
        .then((auth) => {
            auth.user.getIdToken().then(function(accessToken) {
            if(auth.additionalUserInfo.isNewUser == false){

                  const login = {
                    Firebasetoken : accessToken,
                    email: email,
                    password: password,
                    remember_token: remember
                }
            api.firebaseLogin(login).then(response => {
                const options = {Path: "/",Expires: response.data.expires_at, Secure: true};
                CookieService.set('access_token', response.data.access_token, options);
    
                history.push('/')
               
                window.location.reload();
              }
            );

            }     
          })
        }).catch((error) => {
            if(email =='' || password==''){
                setErrors(error)
            }else{
                alert('incorrect username or password');
            }
            
            //console.log(error.message)
            
        })

        // api.checkLogin(login)
        //     .then(response => {

        //         console.log(response);

        //         const options = {Path: "/",Expires: response.data.expires, Secure: true};
        //         CookieService.set('access_token', response.data.access, options);

        //         history.push('/')
        //         window.location.reload();
        //     })
        //     .catch(error => {
        //         console.log(error.response.data.errors);
        //         if(email=='' || password==''){
        //         setErrors(error.response.data.errors)
        //         }else{
        //             alert('incorrect username or password');
        //         }
        //     })
    }

    function displayFormSignIn(){
        document.getElementById("signin").style.display="none";
      }

    return( 
        <div  id="signin" className="logincontainer">
        
        <br/>
        <div className="templatemo-content-widget templatemo-login-widget white-bg">
        <a onClick={() => displayFormSignIn()} ><i className="fa fa-times"></i></a>
	
	        <form  className="templatemo-login-form" onSubmit={handleLogin}>
            
	        	<div  className={`form-group ${hasErrorFor('message') ? 'has-error' : ''}`} >
	        		<div className="input-group">
		        		<div className="input-group-addon"><i className="fa fa-user fa-fw"></i></div>	        		
		              	<input type="email" className="form-control" 
						   placeholder="Username" 
						   value={email} onChange={handleEmailChange} />
                                   
		          	</div>	
                      {renderErrorFor('email field is required')}     
	        	</div>
	        	<div className={`form-group ${hasErrorFor('message') ? 'has-error' : ''}`} >
	        		<div className="input-group">
		        		<div className="input-group-addon"><i className="fa fa-key fa-fw"></i></div>	        		
		              	<input type="password" className="form-control" name="password"
						   placeholder="Passwrod" value={password}
                                onChange={handlePasswordChange} />   
		          	</div>	
                      {renderErrorFor('password field is required')}      
	        	</div>	          	
				<div className="form-group">
				    <div className="checkbox squaredTwo">
				        <input type="checkbox" className="logincheckbox" id="c1" name="cc"  defaultChecked={false}
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
