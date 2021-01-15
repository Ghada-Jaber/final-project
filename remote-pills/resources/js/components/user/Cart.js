import React, {useState, useEffect} from 'react';
import {Link, useHistory} from 'react-router-dom';
import api from '../../api';
import Header from './../layouts/Header';
import Footer from './../layouts/Footer';
import Payment from './Payment';

export  default function Cart(){
  const [cart, setCart] = useState([]);
  const [totals, setTotals] = useState(0);
  var total =0;

  useEffect(() => {
   api.getCartMedicine().then(response => {
     console.log(response.data)
    setCart(response.data)

    for(var i =0; i<response.data.length;i++){
      for(var j =0; j< response.data[i].cart.length;j++){
        total = total +(response.data[i].cart[j].price * response.data[i].cart[j].quantity);
      }
      
    }

    setTotals(total)

    
  
})

    
 },[]);


 

 function renderBuy(carts){
    return carts.cart.map(buy=>{
       
        return(
            <tr key={buy.id}  className={`${buy.reservation==1 ? 'orange-bg' : ''}`} >
            <td>
                {carts.pharmacy.name}
            </td>
            <td > 
                <img src={buy.medicine.image} width="120px" height="120px"
                  style={{ objectFit: 'contain', padding:'0px' }}
                />
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
              {totals> 0 ? 
              <>
              <div className="panel panel-default table-responsive">
            <table id="myTable" className="table table-striped table-bordered templatemo-user-table"
             cellSpacing="0" width="100%">
                <thead>
                  <tr>
                  <th>Pharmacy</th>
                    <th style={{ width:'20px'}}>Image</th>
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
                  <div className="col-md-3">
                    <span className="text-black">Price Totals</span>
                  </div>
                  <div className="col-md-4 text-right">
                    <strong className="text-black">{totals}</strong>
                  </div>
                  <div className="col-md-4">
                  <button  onClick={() => payment()}
                    className="btn btn-primary" >Proceed To
                      Checkout</button>
                  </div>
                 
                </div>
              </div>
            </div>
          </div>
        </div>
              </>: 'cart is empty go buy some medicine'}
            
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
