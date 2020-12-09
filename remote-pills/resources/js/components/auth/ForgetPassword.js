import React, { useState } from 'react';
import {Link, useHistory} from 'react-router-dom';
// import api from '../api';
// import CookieService from '../Service/CookieService';

export  default function ForgetPassword(){

    return(
       
		<div className="templatemo-content-widget templatemo-login-widget  no-padding ">
			
        <form action="<?php echo $_SERVER['PHP_SELF'];?>" className="templatemo-login-form" method="post">
            <div className="form-group">
                <div className="input-group">
                    <div className="input-group-addon"><i className="fa fa-user fa-fw"></i></div>	        		
                      <input type="text" className="form-control"  name="username" placeholder="Username" required />           
                  </div>	
            </div>
            <div className="form-group">
                <div className="input-group">
                    <div className="input-group-addon"><i className="fa fa-key fa-fw"></i></div>	        		
                      <input type="password" className="form-control" name="password" placeholder="New Passwrod" required />           
                  </div>	
            </div>	          	
              <div className="form-group">
            <div className="input-group">
                    <div className="input-group-addon"><i className="fa fa-key fa-fw"></i></div>	        		
                      <input type="password" className="form-control" name="secret" placeholder="Secret Sentence" required />           
                  </div>	
                          
            </div>
            <div className="form-group">
                <input type="submit" className="templatemo-blue-button width-100" value="Change My Pass!" name="forgetpassword" />
            </div>
            


        </form>
        
        
    </div>
    


    )

}
