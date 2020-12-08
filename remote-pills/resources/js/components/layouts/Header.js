import React, { Component } from 'react'
import {Link} from 'react-router-dom';
import Login from './../auth/Login';
import SignUp from './../auth/SignUp';
// import styles from './../../../css/templatemo-style.css';
// import s2 from './../../../css/font-awesome.min.css';
// import classNames from 'classnames/bind';
// const cx = classNames.bind(styles);
//<div className={ cx('widget-item-container') }>
export default function Header(){


  function displayFormSignIn(){
    if (document.getElementById("signin").style.display =="block"){
      document.getElementById("signin").style.display="none";} 
        else{
      document.getElementById("signin").style.display = "block";
        if (document.getElementById("signup").style.display==""||document.getElementById("forpass").style.display==""){
        document.getElementById("signup").style.display="none";
        document.getElementById("forpass").style.display="none";
      }
        }
  }

  function displayFormSignUp(){
    if (document.getElementById("signup").style.display =="block"){
      document.getElementById("signup").style.display="none";} 
        else{
      document.getElementById("signup").style.display = "block";
        if (document.getElementById("forpass").style.display==""||document.getElementById("signin").style.display==""){
        document.getElementById("forpass").style.display="none";
        document.getElementById("signin").style.display="none";
      }
  }
}


  function displayFormForgetPass(){
    if (document.getElementById("forpass").style.display =="block"){
      document.getElementById("forpass").style.display="none";} 
        else{
      document.getElementById("forpass").style.display = "block";
        if (document.getElementById("signup").style.display==""||document.getElementById("signin").style.display==""){
        document.getElementById("signup").style.display="none";
        document.getElementById("signin").style.display="none";
      }
  }
}

        return (
            
            <nav className="navbar navbar-inverse navbar-fixed-top">
            <div className="container-fluid">
              <div className="navbar-header  ">
                <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>                        
                </button>
                
                
                    <h1><img src="images/logo.png" width="50" height="50" alt="" /><b><font color="#13895F">GAD</font></b></h1>
                    <font color="white" style={{ position:'absolute' }} >with us you are always comfortable</font>
                    <br/>
              </div>
              <div className="collapse navbar-collapse" id="myNavbar">
                <ul className="nav navbar-nav " >
                      <li><a href="index.php" ><i className="fa fa-home fa-fw"></i>Home</a></li>
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
                      <li><a href="gallery.php"><i className="fa fa-photo fa-fw"></i>Gallery</a></li>
                      <li><a href="pricelist.php"><i className="fa fa-money fa-fw"></i>Price List</a></li>
                   
                      <li><a href="service.php"><i className="fa fa-server fa-fw"></i>Service</a></li>
                       <li className="dropdown">
                    <a className="dropdown-toggle" data-toggle="dropdown" href="#"><i className="fa fa-sliders fa-fw"></i>Blog<span className="caret"></span></a>
                    <ul className="dropdown-menu">
                    <li><a href="expert_blog.php">Expert Blog</a></li>
                    <li><a href="client.php">Client</a></li>
                    <li><a href="oursponsor.php">Our Sponsor</a></li>
                    </ul>
                  </li>
                      
                      <li><a href="contact.php"><i className="fa fa-book fa-fw"></i>Contact</a></li>
                 
                      
                </ul>
                <ul className="nav navbar-nav navbar-right">	  
                    <li><a data-toggle="collapse" data-parent="#accordion" onClick={() => displayFormSignIn()} href="#signin"><i className="fa fa-sign-in fa-fw"></i>Sign in</a></li>
                     <li><a data-toggle="collapse" data-parent="#accordion" onClick={() => displayFormSignUp()} href="#signup"><i className="fa fa-eject fa-fw"></i>Sign Up</a></li>
                      <li><a data-toggle="collapse" data-parent="#accordion" onClick={() => displayFormForgetPass()} href="#forpass"><i className="fa fa-key fa-fw"></i>Forget Password</a></li> 
                
                <div className="panel-group" id="accordion">
                        <div className="panel panel-default  templatemo-content-widget  no-padding templatemo-overflow-hidden offset-0" style={{ float: 'right' }}>
                     <div id="signin" className="panel-collapse collapse">
              <div className="panel-body">
              <Login />
              </div>
          </div>
                     <div id="signup" className="panel-collapse collapse">
              <div className="panel-body">
              <SignUp />
              </div>
          </div>
                     <div id="forpass" className="panel-collapse collapse">
              <div className="panel-body">forget</div>
              </div>
              </div>
              </div>
              </ul>
                
               </div>
               
              
            </div>
          </nav>
          
          

        )

}












