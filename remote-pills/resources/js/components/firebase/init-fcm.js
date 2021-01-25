import firebase from "firebase";
import "firebase/messaging";
import config from './config';

const initializedFirebaseApp = firebase.initializeApp(config);
const messaging = initializedFirebaseApp.messaging();
messaging.usePublicVapidKey("BGvosei8DMRjMBui54X_u43QtHf4k11Ia30F-O9coBaBX2NSgw5cug0DrAP695hLfArJwPpQ6gMRpGLuR8DT6ME");
      
export { messaging };