// import React, {useState, useEffect} from 'react';
// import {Link, useHistory} from 'react-router-dom';


// import { initializeFirebase } from './firebase/push-notification';
// import registerServiceWorker from './firebase/registerServiceWorker';

// import firebase from "firebase/app";

// // Add the Firebase services that you want to use
// import "firebase/auth";
// import "firebase/firestore";
// import config from './firebase/config';


// import axios from 'axios';

// import api from '../api';

// export  default function notification(){

//     if (!firebase.apps.length) {
//         firebase.initializeApp(config);
//     }else {
//       firebase.app(); // if already initialized
//     }

//   useEffect(() => {
 
//  },[]);


//  function notification(){

//    const notification = {
//     "notification": {
//         "title": "Firebase",
//         "body": "Firebase is awesome",
//         "click_action": "http://localhost:3000/",
//         "icon": "http://url-to-an-icon/icon.png"
//     },
//     "to":"dW518aUiY7GiACmbd9Qcb9:APA91bGgd2aGZL9m9GRcICDOTBXDisBIOYWQfEZswgBNWMNJ3UzRbVheUvL_1ELvo2KKLwNsCr-VzuNJ-XJFAtCTjNk7-HdEfTHYEN6o57NJEeiwRIk29lwFNRjCsub6bNzyzIaEJASj"
// }
// const header = {
//   headers: {
//     'Content-type': 'application/json',
//     'Authorization': 'Key=AAAAdCJ4zKc:APA91bHIE-xEiS_CqK4cSBnLVrwaQ1_p7Y1lwpTeem-RRmMwVjh1RNKHlaeHbkpcoewfDOkeoZDpUPjw9U_Tb8H81mXJZguyt3oyNs4_ns4EQL6kW1-7g44JM1RdpGO6_AKq7voO6wha'
// },
// }
//     axios.post('https://fcm.googleapis.com/fcm/send',notification , header).then((response) => {
//       console.log(response)
//       registerServiceWorker();
//   });
//  }
//     function notification(){
//    const notification = {
//     "notification": {
//         "title": "Firebase",
//         "body": "Firebase is awesome",
//         "click_action": "http://localhost:3000/",
//         "icon": "http://url-to-an-icon/icon.png"
//     },
//     "to":"dW518aUiY7GiACmbd9Qcb9:APA91bGgd2aGZL9m9GRcICDOTBXDisBIOYWQfEZswgBNWMNJ3UzRbVheUvL_1ELvo2KKLwNsCr-VzuNJ-XJFAtCTjNk7-HdEfTHYEN6o57NJEeiwRIk29lwFNRjCsub6bNzyzIaEJASj"
// }
// const header = {
//   headers: {
//     'Content-type': 'application/json',
//     'Authorization': 'Key=AAAAdCJ4zKc:APA91bHIE-xEiS_CqK4cSBnLVrwaQ1_p7Y1lwpTeem-RRmMwVjh1RNKHlaeHbkpcoewfDOkeoZDpUPjw9U_Tb8H81mXJZguyt3oyNs4_ns4EQL6kW1-7g44JM1RdpGO6_AKq7voO6wha'
// },
// }
//     axios.post('https://fcm.googleapis.com/fcm/send',notification , header).then((response) => {
//       console.log(response)
//       registerServiceWorker();
//   });
//  }

//  function sendNotification(){
//      const data ={
//         fcm_token: 'dW518aUiY7GiACmbd9Qcb9:APA91bGu2JeX4iZSr1rMKXy2B0ysHbKRfB0E3_DWjHxv6v1aiUjVNJA7bqrnWIoHVWpug6YlWZE9MYCYbawI4GrOIKAA6kMtbSlDllx-Wu62Dag_6t7BTHM_OUHq_6vj_D162src6OFY' ,
        
//         _token:'{{csrf_token()}}'
//      }
//      api.sendNotification(data).then(response => {
//         console.log(response.data)
//       }).catch(error =>{
//           console.log(error)
//       })
//  }

//     return(
//         <i>
//         <button onClick={notification}>test</button>


//         <button onClick={sendNotification}>send Notification</button>
//         </i>

//     )

// }
