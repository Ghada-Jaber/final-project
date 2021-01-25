// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here, other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/7.14.6/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.14.6/firebase-messaging.js');



// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
firebase.initializeApp({
    apiKey: "API_KEY",
    authDomain: "PROJECT_ID.firebaseapp.com",
    databaseURL: "https://PROJECT_ID.firebaseio.com",
    projectId: "PROJECT_ID",
    storageBucket: "PROJECT_ID.appspot.com",
    messagingSenderId: "SENDER_ID",
    appId: "APP_ID",
    measurementId: "G-MEASUREMENT_ID",
    });

  
  
  // Retrieve an instance of Firebase Messaging so that it can handle background
  // messages.
  const messaging = firebase.messaging();

  messaging.setBackgroundMessageHandler(function(payload) {
    const promiseChain = clients
         .matchAll({
              type: "window",
              includeUncontrolled: true,
         })
         .then((windowClients) => {
              for (let i = 0; i < windowClients.length; i++) {
                   const windowClient = windowClients[i];
                   windowClient.postMessage(payload);
              }
         })
         .then(() => {
              return registration.showNotification("my notification title");
         });
    return promiseChain;
});
self.addEventListener("notificationclick", function(event) {
    console.log(event);
});



