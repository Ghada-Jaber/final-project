import firebase from 'firebase';
import config from './config';

// export const inicializarFirebase = () => {
//   if (!firebase.apps.length) {
//     firebase.initializeApp({
//       messagingSenderId: '498794548391'
//     });
// }else {
//   firebase.app(); // if already initialized
// }
  
// navigator.serviceWorker
//     .register('/my-sw.js')
//     .then((registration) => {
//       firebase.messaging().useServiceWorker(registration);
//     });
// }



export const askForPermissioToReceiveNotifications = async () => {
    try {
      if (!firebase.apps.length) {
        firebase.initializeApp(config);
    }else {
      firebase.app(); // if already initialized
    }
      const messaging = firebase.messaging();
      messaging.usePublicVapidKey("BGvosei8DMRjMBui54X_u43QtHf4k11Ia30F-O9coBaBX2NSgw5cug0DrAP695hLfArJwPpQ6gMRpGLuR8DT6ME");
      await messaging.requestPermission();
      const token = await messaging.getToken();
      //console.log('fcm token:', token);
      
      return token;

      
    } catch (error) {
      console.error(error);
    }
  }