import React, { useState } from 'react';
import {Link, useHistory} from 'react-router-dom';
// import api from '../api';
// import CookieService from '../Service/CookieService';

export  default function SignIn(){

    return(
        <i>
        <div className="templatemo-content-widget templatemo-login-widget no-padding">
	
	        <form  className="templatemo-login-form" method="post">
	        	<div className="form-group">
	        		<div className="input-group">
		        		<div className="input-group-addon"><i className="fa fa-user fa-fw"></i></div>	        		
		              	<input type="text" className="form-control"  name="username" placeholder="Username" required />           
		          	</div>	
	        	</div>
	        	<div className="form-group">
	        		<div className="input-group">
		        		<div className="input-group-addon"><i className="fa fa-key fa-fw"></i></div>	        		
		              	<input type="password" className="form-control" name="password" placeholder="Passwrod" required />           
		          	</div>	
	        	</div>	          	
	          	<div className="form-group">
				    			    
				</div>
				<div className="form-group">
					<input type="submit" className="templatemo-blue-button width-100" value="Sign In" name="submit" />
				</div>
				
				
				
				
	        </form>
		</div>
		<div className="templatemo-content-widget templatemo-login-widget templatemo-register-widget white-bg">
			<p>Not a registered user yet? <strong><a data-toggle="collapse" data-parent="#accordion" href="#signup">Sign up now!</a></strong><br />
			<a data-toggle="collapse" data-parent="#accordion" href="#forpass" className="blue-text">Forget Password!</a></p>
		</div>

        </i>

    )

}
