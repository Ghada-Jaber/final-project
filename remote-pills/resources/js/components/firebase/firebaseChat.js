import React, {useState, useEffect} from 'react';
import {Link, useHistory } from 'react-router-dom';

import ChatRoom from './ChatRoom';

import config from '../firebase/config';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';


import  '../../../css/style.css';

// import styles from './../../../css/templatemo-style.css';
// import classNames from 'classnames/bind';
// const cx = classNames.bind(styles);
//<div className={ cx('widget-item-container') }>



if (!firebase.apps.length) {
    firebase.initializeApp(config);
}else {
  firebase.app(); // if already initialized
}


const auth = firebase.auth();
const firestore = firebase.firestore();


export default function firebaseChat(){

    // useEffect(() => {
    //     const css = document.createElement("link");
    //     css.href = css;

    //     document.body.appendChild(css);
    //  },[]);

   
    
    

   
    
 const [user] = useAuthState(auth);

 return (
    <div className="App">
      <header>
        <h1>⚛️🔥💬</h1>
      </header>

      <section>
        {user ? <ChatRoom /> : 'login first'}
      </section>

    </div>
  );
}