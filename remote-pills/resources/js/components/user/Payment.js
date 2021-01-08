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

    const [number, setNumber] = useState('');
    const [name, setName] = useState('');
    const [expiry, setExpiry] = useState('');
    const [cvv, setCvv] = useState('');
    const [errors, setErrors] = useState([]);



    const [pharmacyBuy, setBuy] = useState('');

    const [UserBuy, setUserBuy] = useState('');

    const [username, setUserName] = useState('');


    

    

    const history = useHistory();
    

    useEffect(() => {
        details();

     api.getCartMedicine().then(response => {
      setCart(response.data)
    
  })
  
      
   },[]);

   function details(){
    api.details().then(response => {
        setUserName(reponse.data.name)
    }).catch(error => {
      //  history.push('/');
    })
  }


   function hasErrorFor (field) {
    return !!errors[field]
}

function renderErrorFor (field) {
    if (hasErrorFor(field)) {
        return (
            <span style={{ color: '#D7425C' }}>
                <strong>{errors[field][0]}</strong>
            </span>
        )
    }
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
            <div key={buy.id}>
             <h4>  <b>Medicine:</b> {buy.medicine.name} </h4> <br/>
               <b>Pharmacy:</b> {carts.pharmacy.name} <br/>
          
            <b> Quantity:</b> {buy.quantity} <br/>
            <b> Price:</b> {buy.price} <br/>
            
           <b> Total:</b>  {buy.price * buy.quantity}
           &nbsp;
            <a onClick= {() => handleDeleteCartMedicine(buy.id)}
                      className="btn btn-default"
                        title="Delete">
                        <i className="fa fa-trash fa-fw"></i>
                     </a>
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

function handleChangeNumber(event){
    setNumber(event.target.value)
}

function handleChangeName(event){
    setName(event.target.value)
}

function handleChangeExpiry(event){
    setExpiry(event.target.value)
}

function handleChangeCvv(event){
    setCvv(event.target.value)
}

 function notification(fcm_token, buy_id, pharmacy_UID, user_UID, user_name){
   const notification = {
    "notification": {
        "title": "Buy",
        "body": "A user did buy",
        "click_action": "http://localhost:8000/",
        "icon": "http://url-to-an-icon/icon.png"
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
            message: `${user_name} wants to buy a medication`,
            toUserID: pharmacy_UID, // pharmacy
            fromUserID: user_UID, //login user
            isOpened: false,
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



    
        console.log(response.data.customer.pharmacy.FirebaseUID);
        

        const query = db.collection('fcm_token').where('userID', '==', response.data.customer.pharmacy.FirebaseUID).get();
                  
        
        query.then(snapshot => {
            console.log(snapshot.docs)
            //console.log(snapshot.docs[0].data().userToken)
         notification(snapshot.docs[0].data().userToken, response.data.id, response.data.customer.pharmacy.FirebaseUID, response.data.customer.customer.FirebaseUID, response.data.customer.customer.name);
            }) 

            document.getElementById('close').style.display = 'none';
            
           

       
    })
    .catch(error => {
        console.log(error)
        setErrors(error.response.data.errors)
    })
}
  
   function closeForm(){
       document.getElementById('close').style.display = 'none';
   }

    return(
        <div className="formShow" id="close">
      <div className="col-1 " >	
    <div className="container ">
        <div className="row white-bg">
        <a onClick={() => closeForm()} ><i className="fa fa-times"></i></a>
          <div className="col-md-6 ">
            <h2 className="text-black">1. Payment Method</h2>
          

                <div className="form-group">
				        <input type="radio" onChange={handleChangeType}
                        value="on delivery"
                         name="radio" id="r5" defaultChecked={true} />
						<label htmlFor="r5" ><span></span>On Delivery</label>			    
				</div>

                  <div className="form-group">
				        <input type="radio" onChange={handleChangeType}
                        value="credit card"
                         name="radio" id="r6" defaultChecked={false} />
						<label htmlFor="r6" ><span></span>Credit card</label>
                        <img src="./images/cards.png" />			    
				</div>

            <div  className={`form-group ${hasErrorFor('nameOnCard') ? 'has-error' : ''}`}  >
	        		<div className="input-group">
		        		<div className="input-group-addon"><i className="fa fa-user fa-fw"></i></div>	        		
		              	<input type="text" className="form-control" 
						   placeholder=" Full Name" 
                           value={name}
                           onChange={handleChangeName}
						    />


                                   
		          	</div>	
                      {renderErrorFor('nameOnCard')}     
	        	</div>
           
            <div  className={`form-group ${hasErrorFor('creditCardNumber') ? 'has-error' : ''}`} >
	        		<div className="input-group">
		        		<div className="input-group-addon"><i className="fa fa-credit-card fa-fw"></i></div>	        		
		              	<input type="number" className="form-control" 
						   placeholder=" Card Number" 
                           value={number}
                           onChange={handleChangeNumber}
						    />


                                   
		          	</div>	
                      {renderErrorFor('creditCardNumber')}  
	        	</div>

                <div  className={`form-group ${hasErrorFor('expiryDate') ? 'has-error' : ''}`}  >
	        		<div className="input-group">
		        		<div className="input-group-addon">Exp Date</div>	        		
		                <input type="month" className="form-control" 
                          value={expiry}
                           onChange={handleChangeExpiry}
						    />

                                   
		          	</div>	
                      {renderErrorFor('expiryDate')}
	        	</div>
                <div  className={`form-group ${hasErrorFor('cvvCode') ? 'has-error' : ''}`} >
	        		<div className="input-group">
                            <div className="input-group-addon">CVC</div>	        		
		                <input type="number" className="form-control"  maxLength="3"
                          value={cvv}
                           onChange={handleChangeCvv}
						    />


                                   
		          	</div>	
                      {renderErrorFor('cvvCode')}
	        	</div>

                <button onClick={(event) => handleAddPayment(event)} 
                className="btn btn-primary">Buy</button>


              

              
            
</div>
            <div className="col-md-6">
            <h4 style={{ color:'#2375b8' }}>Card Summary</h4>
            
            <div style={{ overflow:'auto', width:'300px', height:'400px', padding:'10px' }}>
                {renderCart()}

            </div>
<hr/>
          
            <b style={{ color:'#2375b8' }}><u>Total</u></b>
              &nbsp;
              {total}
            </div>

        </div>
      </div>
       </div>   
       </div>

    )

}
