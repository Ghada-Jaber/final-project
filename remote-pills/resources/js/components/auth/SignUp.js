import React, {useState, useEffect} from 'react';
import {Link, useHistory} from 'react-router-dom';
import api from './../../api';
// import CookieService from '../Service/CookieService';

export  default function SignUp(){

    const [country, setCountry] = useState([]);

    useEffect(() => {
        fetchCountry();

     },[]);

     function fetchCountry(){
        api.getCountry().then(response => {
            setCountry(response.data);
        }) .catch(error => {

        })
    }


    function renderCountry(){
        return  country.map(country => {
            return(
                <option key={country.id} value={country.id}
                style={{backgroundImage: `url(country/${country.name}.png)`,backgroundRepeat: 'no-repeat',
                backgroundPosition:'bottom left', paddingLeft: '20px' }}>
                    {country.name}
                </option>
            )
        })
    }

    return(
        <div >
		<div className="templatemo-content-widget templatemo-login-widget no-padding "  style={{ height: '240px', overflowY: 'scroll', overflowX: 'hidden' }}>

	        <form className="templatemo-login-form" encType="multipart/form-data" method="post">
			<div className="form-group">
	        		<div className="input-group">
		        		<div className="input-group-addon"><i className="fa fa-user fa-fw"></i></div>	        		
		              	<input type="text" className="form-control" placeholder="First Name" name="fname" required />           
		          	</div>	
					
	        	</div>
				<div className="form-group">
	        		<div className="input-group">
		        		<div className="input-group-addon"><i className="fa fa-user fa-fw"></i></div>	        		
		              	<input type="text" className="form-control" placeholder="Last Name" name="lname" required />           
		          	</div>	
					
	        	</div>
	        	<div className="form-group">
	        		<div className="input-group">
		        		<div className="input-group-addon"><i className="fa fa-user fa-fw"></i></div>	        		
		              	<input type="text" className="form-control" placeholder="Username" name="usern" required /> 
				{/* <!--	<input type="text" class="form-control" placeholder="Username" name="usern" required pattern="[A-Za-z]{3}" title="Three letter country code"	 > --> */}
					
		          	</div>	
	        	</div>
	        	<div className="form-group">
	        		<div className="input-group">
		        		<div className="input-group-addon"><i className="fa fa-key fa-fw"></i></div>	        		
		              	<input type="password" className="form-control" placeholder="Password" name="pass" required />           
		          	</div>	
	        	</div>	

          <div className="form-group">
	        		<div className="input-group">
		        		<div className="input-group-addon"><i className="fa fa-key fa-fw"></i></div>	        		
		              	<input type="password" className="form-control" placeholder="Re-Password" name="cpass" required />           
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
		              	<select className="form-control" size="3" name="category"  name="category" required> 
                            {renderCountry()}
                        					
                         </select>						
		          	</div>	
	        	</div>
<div className="form-group">
	        		<div className="input-group">
		        		<div className="input-group-addon"><i className="fa fa-photo fa-fw"></i></div>	        		
		              	<input type="file" className="form-control" name="file"  required />           
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
