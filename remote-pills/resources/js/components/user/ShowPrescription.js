import React, {useState, useEffect} from 'react';
import {Link, useHistory} from 'react-router-dom';
import api from '../../api';
import Header from '../layouts/Header';
import Footer from '../layouts/Footer';
import Back from '../Back';


import firebase from 'firebase';
import config from '../firebase/config';


if (!firebase.apps.length) {
  firebase.initializeApp(config);
}else {
firebase.app(); // if already initialized
}

if ("serviceWorker" in navigator) {
    navigator.serviceWorker
      .register("./firebase-messaging-sw.js")
      .then(function(registration) {
        console.log("Registration successful, scope is:", registration.scope);
      })
      .catch(function(err) {
        console.log("Service worker registration failed, error:", err);
      });
    }
const db = firebase.firestore();
db.settings({
 timestampsInSnapshots: true
});

export  default function ShowPrescription(props){
  const [prescription, setPresciption] = useState([]);
 
  const [pharmacy, setPharmacy] = useState([]);

  const[pharmacyId, setPharmacyId] = useState('');
  
  const history = useHistory();

  useEffect(() => {
      api.ShowPrescription(props.match.params.id)
      .then(response => {
        setPresciption(response.data);
      }) .catch(error => {
      })

      api.getPharmacies()
      .then(response => {
        console.log(response.data)
        setPharmacy(response.data);
        setPharmacyId(response.data[0].id)
      }) .catch(error => {
      })

  },[]);

  function renderPrescription(){
    return prescription.map(prescription => {
      return(
        <tr key={prescription.id}>
          <td>{prescription.medicine.id}</td>
          <td>{prescription.medicine.name}</td>
          <td>{prescription.quantity}</td>
        </tr>
        )
      })
  }
  function goBack(){
    history.goBack();
}


function notification(fcm_token, buy_id, pharmacy_UID, user_UID, user_name, medicine){
  const notification = {
   "notification": {
       "title": "Buy",
       "body": user_name+" wants to buy "+medicine+" medication",
       "click_action": "/customer",
       "icon": "../../../images/logo.png"
   },
   "to":fcm_token
}
const header = {
 headers: {
   'Content-type': 'application/json',
   'Authorization': 'Key=AAAAdCJ4zKc:APA91bHIE-xEiS_CqK4cSBnLVrwaQ1_p7Y1lwpTeem-RRmMwVjh1RNKHlaeHbkpcoewfDOkeoZDpUPjw9U_Tb8H81mXJZguyt3oyNs4_ns4EQL6kW1-7g44JM1RdpGO6_AKq7voO6wha'
},
}
   axios.post('https://fcm.googleapis.com/fcm/send',notification , header).then((response) => {
       let request_id_str = String(buy_id);
       const notificationRef = db.collection('notifications').doc(request_id_str);

       notificationRef.set({
           title: 'Buy Request',
           message: `${user_name} wants to buy ${medicine} medication`,
           toUserID: pharmacy_UID, // pharmacy
           fromUserID: user_UID, //login user
           isOpened: false,
       });

 });



}


function orderMedicine(){
  var array = [];
  var table, rows, i, x, y;
  table = document.getElementById("myTable");

  rows = table.rows;
 
  for (i = 1; i < (rows.length ); i++) {
    // console.log(i)
    x = rows[i].getElementsByTagName("TD")[0];
    y = rows[i].getElementsByTagName("TD")[2];
    array.push(x.innerHTML+","+y.innerHTML)
  
  }

 console.log(array)

  const order={
    pharmacy: pharmacyId,
    array: array
  }

  api.orderMedicines(order).then(response => {
    console.log(response.data)
    alert('Order Medication done')
    const query = db.collection('fcm_token').where('userID', '==', response.data.pharmacyUID).get();
    query.then(snapshot => {
        console.log(snapshot.docs)

        for(var i =0; i<response.data.buyId.length;i++){
          notification(snapshot.docs[0].data().userToken, response.data.buyId[i], response.data.pharmacyUID, response.data.userUID, response.data.username, response.data.medicineName[i])
    
        }
        
        
      
    })  
  }) .catch(error => {
    console.log(error)
  })

}


function renderPharmacy(){
  return pharmacy.map(pharmacy => {
    return(
      <option key={pharmacy.id} value={pharmacy.id}>
        {pharmacy.name}
      </option>
      )
    })
}

function handelPharmacyChange(event){
  setPharmacyId(event.target.value)
}

    return(
        <div className="templatemo-flex-row">
	  
        <div className="templatemo-content col-1 light-gray-bg">
        
         <Header />
          <div className="templatemo-flex-row flex-content-row " style={{ marginTop:'100px' }}>
              <div className="col-1">		

      <div className="templatemo-content-widget no-padding">
      <a className='btn btn-primary' onClick={goBack}>
                    <i className="fa fa-arrow-left"></i>
                </a>  
                <br /> <br />
            <div className="panel panel-default table-responsive">
            <table id="myTable" className="table table-striped table-bordered templatemo-user-table"
             cellSpacing="0" width="100%">
             <caption>
             <div style={{ display:'flex'}}>
             Prescription&nbsp;|&nbsp;&nbsp;&nbsp;
             Pharmacy  &nbsp;
             <select className="form-control" style={{ width:'100px'}}
             onChange={handelPharmacyChange}>
              {renderPharmacy()}
             </select>&nbsp;
             <button 
             onClick={() =>orderMedicine()}
             className="btn btn-primary">Order</button>
             </div>
             </caption>
 <thead>
                  <tr>
                  <th style={{width:'100px'}}>Medicine Id
                    </th>
                    <th>Medicine Name
                    </th>
                    <th>
                    quantity</th>
                  </tr>
                </thead>

                <tbody>


{prescription.length > 0 ? renderPrescription() : 
<tr><td  style={{ textAlign:'center' }} >no data</td></tr>}


 

</tbody>
             </table>
             </div>
             </div>
       </div>                       
            </div>      
             <Footer />
          </div>
        </div>

    )

}
