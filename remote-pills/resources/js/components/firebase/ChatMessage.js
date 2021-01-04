import React, {useState, useEffect} from 'react';
import {Link, useHistory } from 'react-router-dom';

import config from '../firebase/config';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';

if (!firebase.apps.length) {
    firebase.initializeApp(config);
}else {
  firebase.app(); // if already initialized
}


const auth = firebase.auth();
const firestore = firebase.firestore();

export default function ChatMessage(props){
    const { text, uid, photoURL } = props.message;

    const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';
  
    return (<>
    
      <div className={`message ${messageClass}`}>
        <img className="image" src={photoURL} />
        <p className="p">{text}</p>
      </div>
    </>)
}