import React, {useState, useEffect} from 'react';
import {Link, useHistory } from 'react-router-dom';
import SignIn from '../auth/SignIn';
import SignUp from '../auth/SignUp';
import api from '../../api';
import CookieService from '../../Service/CookieService';
import logo from '../../../images/logo2.png';
import moment from 'moment'


import { messaging } from "../firebase/init-fcm";



import firebase from 'firebase';
import config from '../firebase/config';


if (!firebase.apps.length) {
  firebase.initializeApp(config);
}else {
firebase.app(); // if already initialized
}

if ("serviceWorker" in navigator) {
navigator.serviceWorker
  .register("./firebase-messaging-sw.js")
  .then(function(registration) {
    console.log("Registration successful, scope is:", registration.scope);
  })
  .catch(function(err) {
    console.log("Service worker registration failed, error:", err);
  });
}

const db = firebase.firestore();
db.settings({
 timestampsInSnapshots: true
});

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


    const [uid, setUID] = useState('');

    const[notifications, setNotifications] = useState([]);
    const[notified, setNotified] = useState(false);
    const[notificationOpen, setNotificationOpened] = useState(false);


  let counter = 0;


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

    
    details();

   

 },[notified, notificationOpen]);





 function details(){
  api.details().then(response => {
      setName(response.data.name)
      setImage(response.data.image)
      setRole(response.data.roles[0])
      setUID(response.data.FirebaseUID)
      getNotifications(response.data.FirebaseUID, 1);
      
      messaging.requestPermission()
      .then(function(){
          return messaging.getToken();
      })
      .then(token =>{
        console.log(token)
                const userRef = db.collection('fcm_token').doc(token);
                userRef.set({
                  userToken: token,
                  userID: response.data.FirebaseUID,
                });
                         
      }) .catch(err  => {
      console.log("Unable to get permission to notify.", err);
    }); 

      navigator.serviceWorker.addEventListener("message", (message) => console.log(message));
  }).catch(error => {
    if(error.response.status == 401) {
      history.push('/')
  }

 messaging.send(message)
 .then((response) => {
   // Response is a message ID string.
   console.log('Successfully sent message:', response);
 })
 .catch((error) => {
   console.log('Error sending message:', error);
 });

  })



}



function  getNotifications(userUID, click){
  const query = db.collection('notifications');

  let count = 0;
   let messages = [];
   
  query.onSnapshot(snapshot =>{
    
    snapshot.docChanges().forEach(change => { 
      if(change.type == 'added'){
        if(userUID == change.doc.data().toUserID){
          let timestamp = change.doc.data().created.toDate();
          let notification = {};
          notification['message'] = change.doc.data().message;
          notification['time'] = moment(timestamp).format('lll');
          messages.push(notification)
          if(change.doc.data().isOpened == false){
            count++;
          }
         }
      }

      if(change.type == 'modified'){
        setNotificationOpened(!notificationOpen);
      }
     
    })

    setNotifications({
      count:count,
      messages: messages
    })

    if(messages.length !=0){
      setNotified(true)
    }
  })

  counter = count;
}




function handleLogout() {
  api.logout().then((response) => {
      CookieService.remove('access_token', {path: '/'});
      messaging.deleteToken();

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
                    <ul className="dropdown-menu" style={{ textAlign:'center'}}>
                    <li><a href="/manageDoctor">Doctors</a></li>
                    <li><a href="/managePharmacy">Pharmacies</a></li>
                    <li><a href="/manageUser">Users</a></li>
                       
                     
                    </ul>
                  </li>
                  <li className= {`${(page =='/manageMedicine') ? 'active' : '' }`}>
  <a href="/manageMedicine"><i className="fa fa-medkit fa-fw"></i>Manage Medicines</a></li>
                  </ul>
)
}

function doctor(){
  return(
    <ul className="nav navbar-nav" >
    <li className= {`${(page =='/patient') ? 'active' : '' }`}>
    <a href="/patient"><i className="fa fa-medkit fa-fw"></i>Patients</a></li>
    <li className= {`${(page =='/prescription') ? 'active' : '' }`}>
    <a href="/prescription"><i className="fa fa-medkit fa-fw"></i>Prescriptions</a></li>
    </ul>
  )
  }

function pharmacy(){
return(
  <ul className="nav navbar-nav" >
  <li className= {`${(page =='/medicine') ? 'active' : '' }`}>
  <a href="/medicine"><i className="fa fa-medkit fa-fw"></i>Medicines</a></li>
  <li className= {`${(page =='/customer') ? 'active' : '' }`}>
  <a href="/customer"><i className="fa fa-users fa-fw"></i>Customers</a></li>
  </ul>
)
}


function showNotifications(){
  return notifications.messages.map((message, i) =>{
    return(
      <>
      {i != notifications.messages.length-1  ? 
        <li key={i} >
        {message.message}<br/>
        <span style={{ color:'gray'}}>{message.time}</span>
        <br/>
        <div style={{ background: 'rgba(255,255,255,0.2)', width:'100%', height:'2px'}}/>
        </li>
        : <li key={i}>
        {message.message}<br/>
        <span style={{ color:'gray'}}>{message.time}</span>
        </li>}
      </>
    )
  }) 
}

function user(){
return(
  <ul className="nav navbar-nav" >
  <li className= {`${(page =='/buy') ? 'active' : '' }`}>
                      <a href="/buy"><i className="fa fa-medkit fa-fw"></i>Medicines</a></li>

  <li className= {`${(page =='/doctor') ? 'active' : '' }`}>
                      <a href="/doctor"><i className="fa fa-user-md fa-fw"></i>Doctors</a></li>

                      
  <li className= {`${(page =='/cart') ? 'active' : '' }`}>
                      <a href="/cart"><i className="fa fa-shopping-bag fa-fw"></i>Cart</a></li>

                  
                      
                      </ul>
)
}



function seeNotification(){
  const query = db.collection('notifications');
  query.get().then(snapshot => {
      snapshot.forEach(doc => {
        if(doc.data().toUserID == uid){
           doc.ref.update({'isOpened':true});
        }
      })
  })
}
function auth(){
  return (
    <> 

{role == 'ROLE_ADMIN' ? admin() : ''}

{role == 'ROLE_DOCTOR' ? doctor() : ''}

{role == 'ROLE_PHARMACY' ? pharmacy() : ''}

{role == 'ROLE_NORMALUSER' ? user() : ''}
                    
                      
                     
     
  <ul className="nav navbar-nav navbar-right">

      <div className="panel-group" id="accordion">
      
			  <div className=" offset-0" style={{ padding: '5px'}} >

        {/* <img src={require(test)} width="50px" height="50px" className="img"/> &nbsp;          */}
        <div style={{ display:'flex', flexFlow: 'row wrap'}}>
        
        <img src= {image} 
        width="50px" height="50px" className="img"/>&nbsp;&nbsp;
{/* <img src={require('../../../../storage/app/' + image)} width="50px" height="50px" className="img"/> &nbsp; */}
{/* class="media-object img-circle templatemo-img-bordered" */}
<div style={{ display:'flex', flexFlow: 'column wrap'}}>
<font color="white">{greeting}</font>

        <li className="nav-item dropdown">
                    <a id="navbarDropdown" className="nav-link dropdown-toggle"
                    role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                     
                       <font color="#2375b8"> {name == 'Ruba' ? 'Hamidi' : name}
                       </font>
                    </a>
                    <i style={{ color:"white", fontSize:"13px", display:'block', position:'absolute' }}>
                    {role == 'ROLE_ADMIN' ? '(Admin)' : ''}
                   
                  {role == 'ROLE_DOCTOR' ? '(Doctor)' : ''}

                  {role == 'ROLE_PHARMACY' ? '(Pharmacy)' : ''}

                  {role == 'ROLE_NORMALUSER' ? '(Customer)' : ''}
</i>
                    <div className="dropdown-menu menuwidth" 
                    style={{ padding: '12px'}} aria-labelledby="navbarDropdown">

    <ul>
                         <li style={{ borderBottom: '1px solid  rgba(255, 255, 255,0.1)'}}
                         ><a className="dropdown-item" href="/profile" >
                         <i className="fa fa-id-badge fa-fw"></i>Profile</a></li>
                          
                        <li><a className="dropdown-item" onClick= {() => handleLogout()}>
                        <i className="fa fa-sign-out fa-fw"></i>Logout</a></li>

                        </ul>
                    </div>
                </li>
                </div> 
                </div>
			  </div>
			  </div>
  </ul>

  <ul className="nav navbar-nav navbar-right" >
  <li className="dropdown">

<a   href="/chat">
  <i className="fa fa-comments fa-fw"  style={{ fontSize:'20px'}}></i>
  {/* <sup className="badge badge-success notification-count">2</sup> */}
                    </a>
</li>
     
    <li className="dropdown">
                    <a id="navbarDropdown" className="dropdown-toggle"
                    data-toggle="dropdown" onClick={() => seeNotification()}>
                        <i className="fa fa-bell fa-fw"
                        style={{ fontSize:'20px'}}></i>
                        <sup className={`badges ${notifications.count > 0 ? 'badge-danger' : 'badge-primary'} notification-count`}
                        >
                        {notifications.count}
                        </sup>
                    </a>


                    
                    
                    <ul className={`dropdown-menu itemstyle 
                    ${notifications.length!=0 ? notifications.messages.length !=0 ? 'notificationscroll' : '' : ''}
                    `}
                   
                      >

                     {notifications.length!=0 ? notifications.messages.length !=0 ? showNotifications()
                    : <li style={{padding:'5px'}}>No notification</li> :''}
   
                    </ul>
                </li>
    </ul>
  </>
  )
}

function guest(){
return(
  <>
     <ul className="nav navbar-nav" >
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

              
  </>
)
}



        return (
            <>
            <nav className="navbar navbar-inverse navbar-fixed-top" >
            <div className="container-fluid">
              <div className="navbar-header  " style={{ marginRight:'5px' }}>
                <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>                        
                </button>
                      <img src={logo} width="200" height="70" alt="" style={{ marginTop:'10px' , marginRight:'5px' }}/>
                      <b>
                        {/* <font color="#2375b8">remote pills</font> */}
                      </b>
              </div>
              <div className="collapse navbar-collapse" id="myNavbar">
              <ul className="nav navbar-nav" >
                      <li className= {`${(page =='/home' || page =='/') ? 'active' : '' }`}>
                      <a href="/home" ><i className="fa fa-home fa-fw"></i>Home</a></li>
                      </ul>

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
          
          
          </>

        )

}












