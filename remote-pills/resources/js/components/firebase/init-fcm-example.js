import firebase from "firebase";
import "firebase/messaging";
import config from './config';

const initializedFirebaseApp = firebase.initializeApp(config);
const messaging = initializedFirebaseApp.messaging();
messaging.usePublicVapidKey("Vapidkey");
      
export { messaging };