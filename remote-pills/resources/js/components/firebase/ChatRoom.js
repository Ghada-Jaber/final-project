import React, {useState, useEffect, useRef} from 'react';
import {Link, useHistory } from 'react-router-dom';

import config from '../firebase/config';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';

import ChatMessage from './ChatMessage';

if (!firebase.apps.length) {
    firebase.initializeApp(config);
}else {
  firebase.app(); // if already initialized
}


const auth = firebase.auth();
const firestore = firebase.firestore();
export default function ChatRoom(){
    const messagesRef = firestore.collection('messages');
    const query = messagesRef.orderBy('createdAt').limitToLast(25);

    const [messages] = useCollectionData(query, { idField: 'id' });

    console.log(messages)


    const [formValue, setFormValue] = useState('');


  const sendMessage = async (e) => {
    e.preventDefault();

    const { uid, photoURL } = auth.currentUser;

    await messagesRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL
    })

    setFormValue('');
    
  }


  const dummy = useRef();


  useEffect(() => {
    dummy.current.scrollIntoView({ behavior: 'smooth' });
  }, [messages])


    return (<>
        <main className="main">
          {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}
          <span ref={dummy}></span>
        </main>

        <form className="form" onSubmit={sendMessage}>

<input className="input" value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder="say something nice" />

<button className="button" type="submit" disabled={!formValue}>🕊️</button>

</form>
    
      </>)
}