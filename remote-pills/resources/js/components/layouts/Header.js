import React, {useState, useEffect} from 'react';
import {Link, useHistory } from 'react-router-dom';
import SignIn from '../auth/SignIn';
import SignUp from '../auth/SignUp';
import ForgetPassword from '../auth/ForgetPassword';
import api from '../../api';
import CookieService from '../../Service/CookieService';
import logo from '../../../images/logo.png';




import $ from 'jquery';


import firebase from 'firebase';
import config from '../firebase/config';


// import no from '../../../../storage/app/uploads/userimage/NoImage.png';
// import styles from './../../../css/templatemo-style.css';
// import s2 from './../../../css/font-awesome.min.css';
// import classNames from 'classnames/bind';
// const cx = classNames.bind(styles);
//<div className={ cx('widget-item-container') }>
export default function Header(props){
  const cookie = CookieService.get('access_token');
  const [page, setCurrentPage] = useState('');
  const history = useHistory();
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
    const [image, setImage] = useState('');
    const [greeting, setGreeting] = useState('');


    var roles = 'ROLE_NORMALUSER';


    // const test = require('../../../../storage/app/uploads/userimage/NoImage.png');
    // require.context(directory, useSubdirectories = true, regExp = /^\.\/.*$/, mode = 'sync')

  useEffect(() => {
    // console.log(window.location.origin)
    setCurrentPage(window.location.pathname); 
    var d = new Date();
    var t = d.getHours();

    if(t<12)
    {
      setGreeting("Good Morning"); 
    }
    else if(t<18){
      setGreeting("Good Afternoon"); 
    }
    else
    {
      setGreeting("Good Evening"); 
    }

    const script = document.createElement("script");
    script.src = "https://www.gstatic.com/firebasejs/7.14.6/firebase-app.js";
    script.async = true;

    const boot = document.createElement("script");
    boot.src = "https://www.gstatic.com/firebasejs/7.14.6/firebase-messaging.js";

    document.body.appendChild(script);
    document.body.appendChild(boot);

    if (!firebase.apps.length) {
      firebase.initializeApp(config);
  }else {
    firebase.app(); // if already initialized
  }
    const messaging = firebase.messaging();
    messaging.usePublicVapidKey("BGvosei8DMRjMBui54X_u43QtHf4k11Ia30F-O9coBaBX2NSgw5cug0DrAP695hLfArJwPpQ6gMRpGLuR8DT6ME");
    messaging.requestPermission()
    .then(function(){
       
        return messaging.getToken();
    })
    .then(token =>{
      storeNotification(token);
    });

    messaging.onMessage((payload) => {
      console.log('Message received. ', payload);
      play(payload.notification);
      var notify_input = document.getElementById('notification_count');
       var notify_count = parseInt(notify_input.innerHTML);
       notify_count = notify_count +1;
       notify_input.innerHTML = notify_count;
       var noteTitle = payload.notification.title;
       var noteData = JSON.parse(payload.data.fcmapp);
        var ul = document.getElementById("notification_list");
        var li = `
        <a uid="${noteData.id}" 
        href="jaavascript:;" class="dropdown-item text-white">
        <span>${noteData.message}</span> 
        <sub>${noteData.created_at}</sub>
        </a>
        `;
       $("#notification_list").prepend(li);
      });
    
    details();

 },[]);

 function play(n) {
  options = {
  'body' : n.body,
  'icon' : n.icon,
  'silent' : 'false',
  'sound' : 'inflicted.ogg'
  }
  var notification = new Notification(n.title, options);
  }

  function storeNotification(token){
    const data ={
      fcm_token: token,
      
      _token:'{{csrf_token()}}'
   }
   api.sendNotification(data).then(response => {
      console.log(response.data)
    }).catch(error =>{
        console.log(error)
    })
   }


 function details(){
  api.details().then(response => {
      setName(response.data.name)
      setImage(response.data.image)
      setRole(response.data.roles[0])
  

      
  }).catch(error => {
    if(error.response.status == 401) {
      history.push('/')
  }

 

  })
}


function handleLogout() {
  api.logout().then((response) => {
      CookieService.remove('access_token');
      firebase.auth().signOut()
        .then(function() {
            // Sign-out successful.
        }, function(error) {
               // An error happened. 
        });

      history.push('/');
      window.location.reload();
  });
}


 


  function displayFormSignIn(){
    if (document.getElementById("signin").style.display ==""){
      document.getElementById("signin").style.display="none";} 
      else{
      document.getElementById("signin").style.display = "";
      if (document.getElementById("signup").style.display==""||document.getElementById("forgetpass").style.display==""){
        document.getElementById("signup").style.display="none";
        document.getElementById("forgetpass").style.display="none";
      }
      }
  }

  function displayFormSignUp(){
    if (document.getElementById("signup").style.display ==""){
      document.getElementById("signup").style.display="none";} 
      else{
      document.getElementById("signup").style.display = "";
      if (document.getElementById("signin").style.display==""||document.getElementById("forgetpass").style.display==""){
        document.getElementById("signin").style.display="none";
        document.getElementById("forgetpass").style.display="none";
      }
      }
}


  function displayFormForgetPass(){
    if (document.getElementById("forgetpass").style.display ==""){
      document.getElementById("forgetpass").style.display="none";} 
      else{
      document.getElementById("forgetpass").style.display = "";
      if (document.getElementById("signin").style.display==""||document.getElementById("signup").style.display==""){
        document.getElementById("signin").style.display="none";
        document.getElementById("signup").style.display="none";
      }
      }
}

function admin(){
return(
  <ul className="nav navbar-nav" >
  <li className="dropdown">
                    <a className="dropdown-toggle" data-toggle="dropdown" href="#"><i className="fa fa-bar-chart fa-fw"></i>
                    Manage Users<span className="caret"></span></a>
                    <ul className="dropdown-menu">
                    <li><a href="/manageDoctor">Doctor</a></li>
                    <li><a href="/managePharmacy">Pharmacy</a></li>
                    <li><a href="/manageUser">User</a></li>
                       
                     
                    </ul>
                  </li>
                  <li className= {`${(page =='/manageMedicine') ? 'active' : '' }`}>
  <a href="manageMedicine"><i className="fa fa-medkit fa-fw"></i>manage medicine</a></li>
                  </ul>
)
}

function doctor(){
  return(
    <ul className="nav navbar-nav" >
    <li className= {`${(page =='/medicine') ? 'active' : '' }`}>
    <a href="patient"><i className="fa fa-medkit fa-fw"></i>Patient</a></li>
    </ul>
  )
  }

function pharmacy(){
return(
  <ul className="nav navbar-nav" >
  <li className= {`${(page =='/medicine') ? 'active' : '' }`}>
  <a href="/medicine"><i className="fa fa-medkit fa-fw"></i>Medicine</a></li>
  <li className= {`${(page =='/customer') ? 'active' : '' }`}>
  <a href="/customer"><i className="fa fa-medkit fa-fw"></i>Customer</a></li>
  </ul>
)
}

function user(){
return(
  <ul className="nav navbar-nav" >
  <li className= {`${(page =='/buy') ? 'active' : '' }`}>
                      <a href="/buy"><i className="fa fa-medkit fa-fw"></i>Medicine</a></li>

  <li className= {`${(page =='/doctor') ? 'active' : '' }`}>
                      <a href="/doctor"><i className="fa fa-user-md fa-fw"></i>Doctor</a></li>

                      
  <li className= {`${(page =='/cart') ? 'active' : '' }`}>
                      <a href="/cart"><i className="fa fa-shopping-bag fa-fw"></i>Cart</a></li>

                      <li className= {`${(page =='/map') ? 'active' : '' }`}>
                      <a href="/map"><i className="fa fa-map-marker fa-fw"></i>Map</a></li>
                      
                      </ul>
)
}

function auth(){
  return (
    <i> 

{role == 'ROLE_ADMIN' ? admin() : ''}

{role == 'ROLE_DOCTOR' ? doctor() : ''}

{role == 'ROLE_PHARMACY' ? pharmacy() : ''}

{role == 'ROLE_NORMALUSER' ? user() : ''}
                    
                      
                     
     
  <ul className="nav navbar-nav navbar-right">

      <div className="panel-group" id="accordion">
			  <div className="panel panel-default  offset-0" style={{ padding: '5px'}} >

        {/* <img src={require(test)} width="50px" height="50px" className="img"/> &nbsp;          */}
        
        
        <img src= {image} 
        width="50px" height="50px" className="img"/>&nbsp;
{/* <img src={require('../../../../storage/app/' + image)} width="50px" height="50px" className="img"/> &nbsp; */}
{/* class="media-object img-circle templatemo-img-bordered" */}
{greeting}
        <li className="nav-item dropdown">
                    <a id="navbarDropdown" className="nav-link dropdown-toggle"
                    role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        {name}
                    </a>
                    <div className="dropdown-menu dropdown-menu-right"
                    style={{ fontSize:'17px',paddingLeft:'5px' }}
                     aria-labelledby="navbarDropdown">
                         <a className="dropdown-item" href="/profile" >
                         <i className="fa fa-id-badge fa-fw"></i>Profile</a><br/>
                        <a className="dropdown-item" onClick= {() => handleLogout()}>
                        <i className="fa fa-sign-out fa-fw"></i>Logout</a>
                    </div>
                </li>
			  </div>
			  </div>
  </ul>

  <ul className="nav navbar-nav navbar-right" >
  {/* <a href="cart.html" class="icons-btn d-inline-block bag">
              <span class="icon-shopping-bag"></span>
              
            </a> */}

            <li >

<a   href="/chat"
  className="icons-btn" style={{ position: 'relative', marginRight: '20px', marginTop: '10px' }}>
                        <i className="fa fa-comments fa-fw"></i><sup className="badge badge-success notification-count">2</sup>
                    </a>
</li>
    <li className="nav-item dropdown">


                    <a id="navbarDropdown" className="nav-link dropdown-toggle"
                    role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" 
                    className="icons-btn" style={{ position: 'relative', marginRight: '20px', marginTop: '10px' }}>
                        <i className="fa fa-bell fa-fw"></i>
                        <sup className="badge badge-primary notification-count" id="notification_count">0</sup>
                    </a>
                    <div className="dropdown-menu dropdown-menu-right bg-dark"  aria-labelledby="navbarDropdown"
                     style={{ fontSize:'17px',paddingLeft:'5px',  overflowY: 'auto', minHeight:'200px' }}
                     aria-labelledby="navbarDropdown"  id="notification_list">

    <br/>
                    </div>
                </li>
    </ul>
  </i>
  )
}

function guest(){
return(
  <i>
     <ul className="nav navbar-nav" >
                      <li className= {`${(page =='/home' || page =='/') ? 'active' : '' }`}>
                      <a href="/home" ><i className="fa fa-home fa-fw"></i>Home</a></li>
                       {/* <li className="dropdown">
                    <a className="dropdown-toggle" data-toggle="dropdown" href="#"><i className="fa fa-bar-chart fa-fw"></i>About<span className="caret"></span></a>
                    <ul className="dropdown-menu">
                    <li><a href="details.php">Details</a></li>
                    <li><a href="transport.php">Transport</a></li>
                      <li><a href="securite.php">Securite</a></li>
                       <li><a href="support.php">Support</a></li>
                        <li><a href="finance.php">Finance</a></li>
                       
                     
                    </ul>
                  </li> */}
                   
                      {/* <li><a href="service"><i className="fa fa-server fa-fw"></i>Service</a></li>
                       <li className="dropdown">
                    <a className="dropdown-toggle" data-toggle="dropdown" href="#"><i className="fa fa-sliders fa-fw"></i>Blog<span className="caret"></span></a>
                    <ul className="dropdown-menu">
                    <li><a href="blog">Pharmacy Blog</a></li>
                    <li><a href="client">Client</a></li>
                    </ul>
                  </li>
                       */}
                      {/* <li><a href="contact"><i className="fa fa-book fa-fw"></i>Contact</a></li> */}
                 
                      
                </ul>
                <ul className="nav navbar-nav navbar-right">	
                <li>
                <a onClick={() => displayFormSignIn()}>
                <i className="fa fa-sign-in fa-fw"></i>Sign in</a></li>
                <li>
                <a onClick={() => displayFormSignUp()} >
                <i className="fa fa-eject fa-fw"></i>Sign Up</a></li>
              </ul>

              
  </i>
)
}

        return (
            <i >
            <nav className="navbar navbar-inverse navbar-fixed-top" >
            <div className="container-fluid">
              <div className="navbar-header  " style={{ marginRight:'5px' }}>
                <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>                        
                </button>
                    <h1>
                      <img src={logo} width="50" height="50" alt="" style={{ marginRight:'5px' }}/>
                      <b>
                        <font color="#2375b8">remote pills</font>
                      </b>
                    </h1>
                    <font color="white" style={{ position:'absolute' }} >with us you are always comfortable</font>
                    <br/>
              </div>
              <div className="collapse navbar-collapse" id="myNavbar">
               

              { cookie ? auth() : guest() }
                
               </div>
               
              
            </div>
          </nav>

          <div id="signin" style={{ display: 'none'}}>
                <SignIn/>
              </div>

              <div id="signup" style={{ display: 'none'}}>
                <SignUp props={roles}/>
              </div>

              <div id="forgetpass" style={{ display: 'none'}}>
                <ForgetPassword/>
              </div>
          
          <div style={{ marginTop:'120px' }}> </div>
          </i>

        )

}












