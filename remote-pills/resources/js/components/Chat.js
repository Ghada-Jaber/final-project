import React, { useState } from 'react';
import {Link, useHistory} from 'react-router-dom';
import api from '../api';
import Header from './layouts/Header';
import Footer from './layouts/Footer';

export  default function Chat(){
    const [pharmacy, setPharmacy] = useState([]);

    function functionalert(id){
        if (document.getElementById(id).style.display ==""){
           
   document.getElementById(id).style.display="none";} 
   else{
   document.getElementById(id).style.display = "";
   } 
   for(i=0; i<pharmacy.length; i++){
            
        if(pharmacy[i].id!=id){
        
            if (document.getElementById(aru[i]).style.display==""){
     document.getElementById(aru[i]).style.display="none";
   }	
          }	 
   }
   
   }
   

    return(
        <div className="templatemo-flex-row">
	  
        <div className="templatemo-content col-1 light-gray-bg">
        
         <Header />
          <div className="templatemo-flex-row flex-content-row " style={{ marginTop:'100px' }}>
              <div className="col-1">				 
              <div className="bg-light py-3">
      <div className="container">
        <div className="row">
          <div className="col-md-12 mb-0">
          <a href="/home">Home</a> 
          <span className="mx-2 mb-0">/</span> 
          <strong className="text-black">Store</strong></div>
        </div>
      </div>
    </div>
	<div id="left">
    <ul >
    <div className="panel panel-default templatemo-content-widget  no-padding templatemo-overflow-hidden" >
    <div style={{ float:'right' }}>
<a > 
{/* onclick="functionalert($l[0])" */}
<span className="badge" style={{ backgroundColor:'red' }}>
name person message you</span></a>

		   </div> 

           <div id="id pharmacy id" style= {{ float:'right' }}>   {/* display:none; */}
           <div class=" templatemo-content-widget  no-padding templatemo-overflow-hidden "
           style={{ width:'300px'}} >
                <div class="panel-heading">
                name person message you
                </div>
                <div className="msg_container_base" style= {{ backgroundImage:'url(/images/chat.jpg)' }}>
                <div className="row msg_container " >
						<img  src="./images/userimage/NoImage.png" width="40" height="40" alt="" />
                        <div style={{ marginRight: '10px'}}></div>
                         <div className="messages msg_receive ">
                                <p>message recieved</p>
                                <time >time</time>
                            </div>
                    </div>

                    <div className="row msg_container " >
					<div className="messages msg_sent ml-auto">
                                <p>messgae send</p>
                                <time >time</time>
                            </div>
                            <div style={{ marginRight: '10px'}}></div>
						<img  src="./images/userimage/NoImage.png" width="40" height="40" alt="" />
                        
                    </div>

                    <div class="row msg_container">
                        <div class="col-md-3 col-xs-3">
						<img  src="./images/userimage/NoImage.png" width="40" height="40" alt="" />
                        
                        </div>
                         <div class="messages msg_receive">
                                <p>message recieved</p>
                                <time >time</time>
                            </div>
                    </div>
                </div>

                <div class="panel-footer">
                    <div class="input-group">
					<form action='insertclientchat.php' method='post' id='myformidparmacy' >
                    <div style={{ display:'flex' }}>
                     <input id="chat" style={{ float:'left' }} type="text" name="message" 
                     class="form-control input-sm chat_input" 
                     placeholder="Write your message here..." /> &nbsp;
						
                        <button class="btn btn-primary btn-sm" id='insertidpharmacy'>
                        <i className="fa fa-paper-plane fa-fw"></i></button>
                        </div>
					</form>	
						<p id='resultidpharmacy'></p>
                    </div>
                </div>
                </div>
           </div>

          <a >
          {/* onclick="functionalert($l[0])" */}
				 <div class="media">
                  <div class="media-left">
<img class="media-object " src="./images/userimage/NoImage.png" width="90" height="90" alt="" />

                  </div>
                  <div class="media-body">
                    <h2 class="media-heading text-uppercase"><font color="cc0000">
                    name person</font></h2>
					
                    <p>location</p>  
                  </div>        
                </div>  
             </a>

     </div>

    </ul>
    </div>
       </div>                       
            </div>      
             <Footer />
          </div>
        </div>

    )

}
