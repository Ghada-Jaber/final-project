import React, {useState, useEffect} from 'react';
import {Link, useHistory} from 'react-router-dom';
import api from '../../api';
import Header from './../layouts/Header';
import Footer from './../layouts/Footer';
import Payment from './Payment';

export  default function Cart(){
  const [cart, setCart] = useState([]);

  useEffect(() => {
   api.getCartMedicine().then(response => {
    setCart(response.data)
  
})

    
 },[]);
 var total =0;

 

 function renderBuy(carts){
    return carts.cart.map(buy=>{
        total = total +(buy.price * buy.quantity);
        return(
            <tr key={buy.id}  className={`${buy.reservation==1 ? 'orange-bg' : ''}`} >
            <td>
                {carts.pharmacy.name}
            </td>
            <td> 
                <img src={buy.medicine.image} width="100px" height="100px"/>
            </td>

            <td> 
            {buy.medicine.name}
            </td>

            <td> 
            {buy.price}
            </td>

            <td> 
            {buy.quantity}
            </td>

            <td> 
            {buy.price * buy.quantity}
            </td>
            <td> 
            {buy.reservation==1 ? 'yes' : 'no'}
            </td>
            <td>
            <a onClick= {() => handleDeleteCartMedicine(buy.id)}
                      className="btn btn-default"
                        title="Delete">
                        <i className="fa fa-trash fa-fw"></i>
                     </a>
            </td>
            </tr>
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



function  handleDeleteCartMedicine(buy_id){ //I added event here and in line 89
  event.preventDefault();
  var confirm_delete = confirm('Are you sure you want to Delete ?');
  if (confirm_delete == true) {
      api.deleteCartMedicine(buy_id).then(response => {
          window.location.reload();
      })
  }
}


function payment(){
  if (document.getElementById("payment").style.display =="block"){
    document.getElementById("payment").style.display="none";} 
    else{
    document.getElementById("payment").style.display = "block";
    }
 }


    return(
        <div className="templatemo-flex-row">
	  
        <div className="templatemo-content col-1 light-gray-bg">
        
         <Header />
          <div className="templatemo-flex-row flex-content-row " style={{ marginTop:'100px' }}>

            
              <div className="col-1">				 
            
              <div className="templatemo-content-widget no-padding">
              
            <div className="panel panel-default table-responsive">
            <table id="myTable" className="table table-striped table-bordered templatemo-user-table"
             cellSpacing="0" width="100%">
                <thead>
                  <tr>
                  <th>Pharmacy</th>
                    <th>Image</th>
                    <th>Medicine</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Total</th>
                    <th>Reservation</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                
                {renderCart()}

           

                </tbody>
              </table>
            </div>

            <div className="row">
          <div className="col-md-6 pl-5">
            <div className="row justify-content-end">
              <div className="col-md-7">
           
                <div className="row">
                  <div className="col-md-12 text-right border-bottom mb-5">
                    <h3 className="text-black h4 text-uppercase">Cart Totals</h3>
                    
                  </div>
                 
                </div>
                <div className="row mb-5">
                  <div className="col-md-6">
                    <span className="text-black">Total</span>
                  </div>
                  <div className="col-md-6 text-right">
                    <strong className="text-black">{total}</strong>
                  </div>
                </div>
    
                <div className="row">
                  <div className="col-md-12">
                    <button  onClick={() => payment()}
                    className="btn btn-primary btn-lg btn-block" >Proceed To
                      Checkout</button>
                      {/* onClick="window.location='checkout.html'" */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
    
       
  
        <div id="payment" style={{ display:'none'}}>
              <Payment />

            </div>     
  
       </div>     
       </div>
                     
             <Footer />
          </div>
        </div>

    )

}
