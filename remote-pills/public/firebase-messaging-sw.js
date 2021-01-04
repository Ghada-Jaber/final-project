// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here, other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/7.14.6/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.14.6/firebase-messaging.js');



// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
firebase.initializeApp({
    apiKey: "AIzaSyBYYD_Sl8DPXRx2jKMXlV-qp2R6khuvQx4",
    authDomain: "remote-pills.firebaseapp.com",
    projectId: "remote-pills",
    storageBucket: "remote-pills.appspot.com",
    messagingSenderId: "498794548391",
    appId: "1:498794548391:web:c6c8286b3e6a76a4e5df82",
    measurementId: "G-860YNJWJWY"
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



