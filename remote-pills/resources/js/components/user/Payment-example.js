import React, {Component, useState, useEffect} from 'react';
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

export  default function Payment(){
    const [cart, setCart] = useState([]);

    const [type, setType] = useState('on delivery');
    const [errors, setErrors] = useState([]);
    

    useEffect(() => {
        details();

     api.getCartMedicine().then(response => {
      setCart(response.data)
    
     })
    },[]);

   function details(){
        api.details().then(response => {
        }).catch(error => {
        })
    }


    var total =0;

    var buyId = [];

    function  handleDeleteCartMedicine(buy_id){ //I added event here and in line 89
        event.preventDefault();
        var confirm_delete = confirm('Are you sure you want to Delete ?');
        if (confirm_delete == true) {
            api.deleteCartMedicine(buy_id).then(response => {
                window.location.reload();
            })
        }
    }

    function renderBuy(carts){
        return carts.cart.map(buy=>{
            total = total +(buy.price * buy.quantity);
            buyId.push(buy.id);
            return(
            <div className="templatemo-content-widget blue-bg test" 
            style={{marginLeft:'-10px'}} key={buy.id}>
                <a onClick= {() => handleDeleteCartMedicine(buy.id)}
                    title="Remove">
                    <i className="fa fa-times"></i>
                </a>
                <h4>  <b>Medicine:</b> {buy.medicine.name} </h4>
                <table>
                    <tbody>
                    <tr>
                        <td> <b>Pharmacy: </b></td><td>&nbsp;{carts.pharmacy.name}</td>
                    </tr>
                    <tr>
                        <td> <b>Quantity: </b></td><td>{buy.quantity}</td>
                    </tr>
                    <tr>
                        <td> <b>Price: </b></td><td>{buy.price} $ </td>
                    </tr>
                    <tr>
                        <td> <b>Total:</b> </td><td>{buy.price * buy.quantity} $ </td>
                    </tr>
                    </tbody>
                </table>
                </div>
            )

        })
    }

    function renderCart(){
        return cart.map(cart => {
            return(
                renderBuy(cart)
            )
        })
    }

    function handleChangeType(event){
     setType(event.target.value)
    }

    function notification(fcm_token, buy_id, pharmacy_UID, user_UID, user_name, medicine){
        const notification = {
            "notification": {
                "title": "Order Notification",
                "body": user_name+" wants to buy "+medicine,
                "click_action": "/customer",
                "icon": "../../../images/logo.png"
            },
            "to":fcm_token
        }  
        const header = {
            headers: {
                'Content-type': 'application/json',
                'Authorization': 'Key=Server key'
            },
        }
        axios.post('https://fcm.googleapis.com/fcm/send',notification , header).then((response) => {
            let request_id_str = String(buy_id);
            const notificationRef = db.collection('notifications').doc(request_id_str);

            notificationRef.set({
                title: 'Order Notification',
                message: `${user_name} wants to buy ${medicine}`,
                toUserID: pharmacy_UID, // pharmacy
                fromUserID: user_UID, //login user
                isOpened: false,
                created: firebase.firestore.Timestamp.now(),
            });

        });
    }   

    function handleAddPayment(event){
        event.preventDefault();

        const payment = {
            buy: buyId,
            type: type,
            price: total,
            creditCardNumber: number,
            nameOnCard: name,
            expiryDate: expiry,
            cvvCode: cvv
        }


        api.addPayment(payment)
        .then(response => {
        let array = Array.from(Array(response.data.length), () => new Array(6))
        var count = 0;
            for(var i =0 ; i<response.data.length; i++){
                const query = db.collection('fcm_token').where('userID', '==', response.data[i].customer.pharmacy.FirebaseUID).get();
                query.then(snapshot => {
                    notification(snapshot.docs[0].data().userToken, response.data[count].id, response.data[count].customer.pharmacy.FirebaseUID, response.data[count].customer.customer.FirebaseUID, response.data[count].customer.customer.name, response.data[count].medicine.name)
                
                    count++;
                    document.getElementById('close').style.display = 'none';
                    setTimeout(function(){
                    location.reload();
                    },1000);
                })  
            
            }
        })
        .catch(error => {
            setErrors(error.response.data.errors)
        })
    } 
  
   function closeForm(){
       document.getElementById('close').style.display = 'none';
   }

    return(
        <div className="formShow" id="close">
          <div className="col-1 " >	
            <div className="templatemo-content-widget templatemo-login-widget  white-bg"
            style={{width:'380px'}}>
                <a onClick={() => closeForm()} ><i className="fa fa-times"></i></a>
                 <div >
                    <h2 className="text-black">Payment Method</h2>
                    <div className="form-group">
				        <input type="radio" onChange={handleChangeType}
                        value="on delivery" name="radio" id="r5" defaultChecked={true} />
						<label htmlFor="r5" ><span></span>On Delivery</label> &nbsp;
                        <button onClick={(event) => handleAddPayment(event)} 
                        className="btn btn-primary">Purchase</button>  			    
				    </div>
                    <h4 style={{ color:'#2375b8' }}>Order Summary</h4>
            
                    <div className="paymentscroll">
                        {renderCart()}
                    </div>
                    <hr/>
          
                    <b style={{ color:'#2375b8' }}><u>Total</u></b>
                    &nbsp;
                    {total} $
                </div>
          </div>
         </div>   
       </div>

    )

}
