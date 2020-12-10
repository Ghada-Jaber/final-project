import React, {useState, useEffect} from 'react';
import {Link, useHistory } from 'react-router-dom';
import SignIn from '../auth/SignIn';
import SignUp from '../auth/SignUp';
import ForgetPassword from '../auth/ForgetPassword';
import api from '../../api';
import CookieService from '../../Service/CookieService';
// import styles from './../../../css/templatemo-style.css';
// import s2 from './../../../css/font-awesome.min.css';
// import classNames from 'classnames/bind';
// const cx = classNames.bind(styles);
//<div className={ cx('widget-item-container') }>
export default function Header(){

  const [page, setCurrentPage] = useState('');
  const history = useHistory();
  const [name, setName] = useState('');
    const [check, setCheck] = useState('');
    const [image, setImage] = useState('');
    const [greeting, setGreeting] = useState('');

  useEffect(() => {
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
    details();
 },[]);


 function details(){
  api.details().then(response => {
      setName(response.data.name)
      setImage(response.data.image)
      setCheck(true)
  }).catch(error => {
      setCheck(false)
     history.push('/');
  })
}


function handleLogout() {
  api.logout().then((response) => {
      CookieService.remove('access_token')
      history.push('/');
      window.location.reload();
  });
}


 


  function displayFormSignIn(){
    

    document.getElementById("signup").classList.remove('show');

    document.getElementById("forpass").classList.remove('show');
  }

  function displayFormSignUp(){
    document.getElementById("signin").classList.remove('show');
    document.getElementById("forpass").classList.remove('show');
}


  function displayFormForgetPass(){
    document.getElementById("signin").classList.remove('show');
    document.getElementById("signup").classList.remove('show');
}


function auth(){
  return (
    <i> 
     
  <ul className="nav navbar-nav navbar-right">

      <div className="panel-group" id="accordion">
			  <div className="panel panel-default  offset-0" style={{ padding: '5px'}} >

<img src={`./images/userimage/${image}`} width="50px" height="50px"/> &nbsp;
{greeting}
        <li className="nav-item dropdown">
                    <a id="navbarDropdown" className="nav-link dropdown-toggle" href="#"
                    role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        {name}
                    </a>
                    <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                         <a className="dropdown-item" href="/profile" >
                         <i className="fa fa-id-badge fa-fw"></i>Profile</a><br/>
                        <a className="dropdown-item" href="#" onClick= {() => handleLogout()}>
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
                        <span className="fa fa-comments fa-fw"></span>
                        <span className="number">2</span>
                    </a>
</li>
    <li className="nav-item dropdown">


                    <a id="navbarDropdown" className="nav-link dropdown-toggle" href="#"
                    role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"
                    className="icons-btn" style={{ position: 'relative', marginRight: '20px', marginTop: '10px' }}>
                        <span className="fa fa-bell fa-fw"></span>
                        <span className="number">2</span>
                    </a>
                    <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                         <a className="dropdown-item" >
                         Notification</a><br/>
                    </div>
                </li>
    </ul>
  </i>
  )
}

function guest(){
return(
  <i>
     <ul className="nav navbar-nav " >
                      <li className= {`${(page =='/home' || page =='/') ? 'active' : '' }`}>
                      <a href="/home" ><i className="fa fa-home fa-fw"></i>Home</a></li>
                       <li className="dropdown">
                    <a className="dropdown-toggle" data-toggle="dropdown" href="#"><i className="fa fa-bar-chart fa-fw"></i>About<span className="caret"></span></a>
                    <ul className="dropdown-menu">
                    <li><a href="details.php">Details</a></li>
                    <li><a href="transport.php">Transport</a></li>
                      <li><a href="securite.php">Securite</a></li>
                       <li><a href="support.php">Support</a></li>
                        <li><a href="finance.php">Finance</a></li>
                       
                     
                    </ul>
                  </li>
                      <li className= {`${(page =='/medicine') ? 'active' : '' }`}>
                      <a href="medicine"><i className="fa fa-money fa-fw"></i>Price List</a></li>
                   
                      <li><a href="service"><i className="fa fa-server fa-fw"></i>Service</a></li>
                       <li className="dropdown">
                    <a className="dropdown-toggle" data-toggle="dropdown" href="#"><i className="fa fa-sliders fa-fw"></i>Blog<span className="caret"></span></a>
                    <ul className="dropdown-menu">
                    <li><a href="blog">Pharmacy Blog</a></li>
                    <li><a href="client">Client</a></li>
                    </ul>
                  </li>
                      
                      <li><a href="contact"><i className="fa fa-book fa-fw"></i>Contact</a></li>
                 
                      
                </ul>
                <ul className="nav navbar-nav navbar-right">	  
                    <li><a data-toggle="collapse" data-parent="#accordion" onClick={() => displayFormSignIn()} href="#signin"><i className="fa fa-sign-in fa-fw"></i>Sign in</a></li>
                     <li><a data-toggle="collapse" data-parent="#accordion" onClick={() => displayFormSignUp()} href="#signup"><i className="fa fa-eject fa-fw"></i>Sign Up</a></li>
                      <li><a data-toggle="collapse" data-parent="#accordion" onClick={() => displayFormForgetPass()} href="#forpass"><i className="fa fa-key fa-fw"></i>Forget Password</a></li> 
                
                <div className="panel-group" id="accordion">
                        <div className="panel panel-default  templatemo-content-widget  no-padding templatemo-overflow-hidden offset-0" style={{ float: 'right' }}>
                     <div id="signin" className="panel-collapse collapse">
              <div className="panel-body">
              <SignIn />
              </div>
          </div>
                     <div id="signup" className="panel-collapse collapse">
              <div className="panel-body">
              <SignUp />
              </div>
          </div>
                     <div id="forpass" className="panel-collapse collapse">
              <div className="panel-body">
                <ForgetPassword />
              </div>
              </div>
              </div>
              </div>
              </ul>
  </i>
)
}

        return (
            
            <nav className="navbar navbar-inverse navbar-fixed-top">
            <div className="container-fluid">
              <div className="navbar-header  " style={{ marginRight:'5px' }}>
                <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>                        
                </button>
                    <h1>
                      <img src="images/logo.png" width="50" height="50" alt="" style={{ marginRight:'5px' }}/>
                      <b>
                        <font color="#2375b8">remote pills</font>
                      </b>
                    </h1>
                    <font color="white" style={{ position:'absolute' }} >with us you are always comfortable</font>
                    <br/>
              </div>
              {/* className in this div ili ta7et ma ilu da3i */}
              <div className="collapse navbar-collapse" id="myNavbar">
               

              { check==true ? auth() : guest() }
                
               </div>
               
              
            </div>
          </nav>
          
          

        )

}












