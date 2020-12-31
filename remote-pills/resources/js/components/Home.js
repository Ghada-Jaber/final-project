import React, {useState, useEffect} from 'react';
import {Link, useHistory} from 'react-router-dom';
import api from '../api';
import CookieService from '../Service/CookieService';
import Header from './layouts/Header';
import Footer from './layouts/Footer';

export  default function Home(){

  useEffect(() => {

    const css = document.createElement("link");
    css.href ="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css";
    const script = document.createElement("script");
    script.src = "https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js";
    script.async = true;

    const boot = document.createElement("script");
    boot.src = "https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js";
    
    

    document.body.appendChild(css);
     document.body.appendChild(script);
     document.body.appendChild(boot);


 },[]);
   

    return(
        <div className="templatemo-flex-row">
	  
        <div className="templatemo-content col-1 light-gray-bg">
        
         <Header />
          <div className="templatemo-flex-row flex-content-row " style={{ marginTop:'100px' }}>
              <div className="col-1">	

              <div className="container">
  <div id="myCarousel" className="carousel slide" data-ride="carousel">
    <ol className="carousel-indicators">
      <li data-target="#myCarousel" data-slide-to="0" className="active"></li>
      <li data-target="#myCarousel" data-slide-to="1"></li>
      <li data-target="#myCarousel" data-slide-to="2"></li>
    </ol>
    <div className="carousel-inner">
      <div className="item active">
        <img src="./images/hero_1.jpg" alt="Los Angeles" style={{ width: '100%', height:'500px' }}/>
      </div>

      <div className="item">
        <img src="./images/bg_2.jpg" alt="Chicago" style={{ width: '100%', height:'500px'  }}/>
      </div>
    
      <div className="item">
        <img src="./images/bg_3.jpg" alt="New york" style={{ width: '100%', height:'500px'  }}/>
      </div>
    </div>
    <a className="left carousel-control" href="#myCarousel" data-slide="prev">
      <span className="glyphicon glyphicon-chevron-left"></span>
      <span className="sr-only">Previous</span>
    </a>
    <a className="right carousel-control" href="#myCarousel" data-slide="next">
      <span className="glyphicon glyphicon-chevron-right"></span>
      <span className="sr-only">Next</span>
    </a>
  </div>
</div>	 
              
              {/* <div className="panel panel-default templatemo-content-widget  no-padding templatemo-overflow-hidden">
               <div className="panel-heading templatemo-position-relative">
				 <div className="media">
                  <div className="media-left">
 <img className="media-object "  width="90" height="90" alt="image" /> 
                  </div>
                  <div className="media-body">
                    <h2 className="media-heading text-uppercase"><font color="3275BB">
                      Title
                    </font></h2>
					
                    <p>Info</p>  
                   
                  </div>        
                </div>                 
                  </div>          
              </div> */}
  
                 
  
       </div>                       
            </div> 
                     
             <Footer />
          </div>

          
        </div>

    )

}
