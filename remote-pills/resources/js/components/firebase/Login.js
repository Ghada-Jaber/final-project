import React, {Component, useState, useEffect} from 'react';
import firebase from "firebase/app";
import {Link, useHistory} from 'react-router-dom';

// Add the Firebase services that you want to use
import "firebase/auth";
import "firebase/firestore";

import "firebaseui";
import config from './config';
import CookieService from '../../Service/CookieService';


//import * as admin from 'firebase-admin';


import api from '../../api';



export default function Login(){
  const history = useHistory();

  const request = {
    "Firebasetoken": "your-firebase-auth-credential-token"
  }
    
    if (!firebase.apps.length) {
        firebase.initializeApp(config);
      }else {
        firebase.app(); // if already initialized
      }

      var ui = new firebaseui.auth.AuthUI(firebase.auth());

      ui.start('#firebaseui-auth-container', {
        signInOptions: [
            {
                provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
                signInMethod: firebase.auth.EmailAuthProvider.EMAIL_LINK_SIGN_IN_METHOD
              }
        ],
        // Other config options...
      });

      // Is there an email link sign-in?
if (ui.isPendingRedirect()) {
    ui.start('#firebaseui-auth-container', uiConfig);
  }
  // This can also be done via:
  if (firebase.auth().isSignInWithEmailLink(window.location.href)) {
    ui.start('#firebaseui-auth-container', uiConfig);
  }

  firebase.auth().onAuthStateChanged(user => {

    // user.getIdToken().then(function(accessToken) {
      
    // })   
    
  });


  firebase.auth().signOut().then(function() {
    // Sign-out successful.
  }, function(error) {
    // An error happened.
  });

  var uiConfig = {
    callbacks: {
      signInSuccessWithAuthResult: function(authResult, redirectUrl) {
        console.log(authResult)
          // authResult.user.getIdToken().then(function(accessToken) {

          //   const firebaseToken = {
          //     Firebasetoken : accessToken
          //   }
          //   if(authResult.additionalUserInfo.isNewUser == true){
          //     api.firebaseRegister(firebaseToken).then(response => {
          //     }
             
          //   );

          //   }else{
          //   api.firebaseLogin(firebaseToken).then(response => {
          //     const options = {Path: "/",Expires: response.data.expires_at, Secure: true};
          //     CookieService.set('access_token', response.data.access_token, options);
  
          //     history.push('/')
          //     window.location.reload();
          //   }
           
          // );
          //   }
            
          // })
      
        // don't redirect automatically
        return false;
        
      },
      uiShown: function() {
        // The widget is rendered.
        // Hide the loader.
        document.getElementById('loader').style.display = 'none';
      }
    },
    // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
    signInFlow: 'popup',
    signInSuccessUrl: 'home',
    signInOptions: [
      // Leave the lines as is for the providers you want to offer your users.
      firebase.auth.EmailAuthProvider.PROVIDER_ID
    ],
    // Terms of service url.
    tosUrl: '<your-tos-url>',
    // Privacy policy url.
    privacyPolicyUrl: '<your-privacy-policy-url>'
  };

  ui.start('#firebaseui-auth-container', uiConfig);
 

  return(
    <div  id="signin" className="logincontainer">
     <br/>
        <div className="templatemo-content-widget templatemo-login-widget white-bg">
        <a onClick={() => displayFormSignIn()} ><i className="fa fa-times"></i></a>
        <div id="firebaseui-auth-container"></div>
        <div id="loader">Loading...</div>
        
        </div>
      </div>
  )
    
}


