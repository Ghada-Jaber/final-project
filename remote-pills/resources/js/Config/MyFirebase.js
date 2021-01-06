import firebase from 'firebase'

const config = {
    apiKey: "AIzaSyBYYD_Sl8DPXRx2jKMXlV-qp2R6khuvQx4",
    authDomain: "remote-pills.firebaseapp.com",
    projectId: "remote-pills",
    storageBucket: "remote-pills.appspot.com",
    messagingSenderId: "498794548391",
    appId: "1:498794548391:web:c6c8286b3e6a76a4e5df82",
    measurementId: "G-860YNJWJWY"
}
firebase.initializeApp(config)
firebase.firestore().settings({
    timestampsInSnapshots: true
})

export const myFirebase = firebase
export const myFirestore = firebase.firestore()
export const myStorage = firebase.storage()