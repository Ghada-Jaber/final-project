import React, {Component, useState, useEffect} from 'react';
import axios from 'axios';
import {Link, useHistory} from 'react-router-dom';
import api from '../../api';
import Header from '../layouts/Header';
import Footer from '../layouts/Footer';
import ReactDOM from 'react-dom';

export  default function Customer(){

  const [order, setOrder] = useState([]);

  const[orders, setOrders] = useState([])
  const [deliverd, setDeliver] = useState([]);
  const [reserve, setReserve] = useState([]);

  const [delivred, setDelivred] = useState(0);
  const history = useHistory();

  useEffect(() => {

    fetchMedicine();
  },[]);


  function fetchMedicine(){

    api.getPharmacyOrders().then(response => {
      setOrders(response.data);
    }).catch(error => {
    console.log(error)
    })
  }


  function deliver(buy_id){
    const deliver = {
      delivred: 1
    }
    api.deliver(buy_id, deliver).then(response => {
      alert('The medicine has been successfully received by the customer');
      window.location.reload();
    })
  }



  function handleSelectChange(event){
    var select = event.target.value;
    if(select == 'Ordered'){
      api.getPharmacyOrders().then(response => {
        setOrders(response.data);
        setDeliver([]);
        setDelivred(0)
        setReserve([])
      }) .catch(error => {
      })
    }

    if(select == 'Delivred'){
      api.getPharmacyOrders().then(response => {
        setOrders(response.data);
        setDeliver([]);
        setDelivred(1)
        setReserve([])
      }) .catch(error => {
      })
    }

    if(select == 'Reserved'){
      api.getPharmacyReservation().then(response => {
        setReserve(response.data);
        setDeliver();
        setOrders([])
      }) .catch(error => {
      })
    }

  }

  function changeArrow(id){
    if (document.getElementById("down"+id).style.display ==""){
      document.getElementById("down"+id).style.display="none";
      document.getElementById("arrowup"+id).style.display="";
    } 
    else{
      document.getElementById("down"+id).style.display = "";
      document.getElementById("arrowup"+id).style.display="none";
    }
  }

  function renderOrders(){
    return orders.map(order => {
      return(
        <section key={order.id}>
           {order.buy.length > 0 ?  
          <div 
          style={{ paddingLeft:'15px',paddingTop:'1px'}}
          className="templatemo-content-widget no-padding white-bg item mb-4" >
         
            <h3 className="text-dark">
              <a data-toggle="collapse" data-parent="#accordion"  onClick={()=> changeArrow(order.id)}
              href={`#customer${order.id}`}>
                {order.customer.name}
                <span style={{float:'right',paddingRight:'15px'}}>
                  {order.customer.street.name},&nbsp;
                  {order.customer.street.city.name},&nbsp;
                  {order.customer.street.city.country.name}
                  &nbsp;
                  <img src="images/arrow.png" id={`down${order.id}`}/>
                  <img src="images/arrow2.png" id={`arrowup${order.id}`} style={{display:'none'}}/>
                </span>
              </a>
            </h3>
            <div className="panel-group" id="accordion">
              <div className="panel panel-default  templatemo-content-widget  no-padding templatemo-overflow-hidden offset-0">
                <div id={`customer${order.id}`} className="panel-collapse collapse">
                  <div className="table-responsive">
                    <table className="table">
                      <thead >
                        <tr >
                          <td><b>Medicine Name</b></td>
                          <td><b>Price</b></td>
                          <td><b>Quantity</b></td>
                          
                          {delivred == 0 ? <td><b>Action</b></td>: ''}
                        </tr>
                      </thead>
                      <tbody>
                      {order.buy.map(namepharmacy=>{
                      return(
          
                        <tr key={namepharmacy.id}>
                          {delivred == namepharmacy.delivred  ? 
                          <> 
                            <td>{namepharmacy.medicine.name} </td>
                            <td>{namepharmacy.price} $</td>
                            <td>{namepharmacy.quantity}</td>
                              {namepharmacy.delivred == 0 ? 
                                <td>
                                    <a onClick={() => deliver(namepharmacy.id)}
                                    className="btn btn-primary"
                                        title="deliver">
                                        <i className="fa fa-share fa-fw"></i>
                                    </a>
                              </td>
                              : ''}
                          </>
                          : <></>} 
                        </tr>
                  
                       )
                      })}               
                      </tbody>
                    </table>
                  </div> 
                </div> 
              </div> 
            </div> 
         </div>
          : ''}
           
        </section>
      )
    })
  }

  function confirmReservation(cart_id){
    const conf = {
      confirm : 0
    }
    api.confirmReservation(cart_id, conf).then(response => {
      alert('The medicine is reserved now for the customer')
      window.location.reload()
    })
  }

  function renderReservation(){
    return reserve.map(order => {
      return(
        <section key={order.id}>
          {order.cart.length > 0 ? 
            <div style={{ paddingLeft:'15px',paddingTop:'1px'}}
            className="templatemo-content-widget no-padding white-bg item mb-4" >
              <h3 className="text-dark">
                <a data-toggle="collapse" data-parent="#accordion" 
                onClick={()=> changeArrow(order.id)}
                href={`#reserve${order.id}`}>{order.customer.name}
                <span style={{float:'right',paddingRight:'15px'}}>
                  {order.customer.street.name},&nbsp;
                  {order.customer.street.city.name},&nbsp;
                  {order.customer.street.city.country.name} &nbsp;
                  <img src="images/arrow.png" id={`down${order.id}`}/>
                  <img src="images/arrow2.png" id={`arrowup${order.id}`} style={{display:'none'}}/>
                </span>
                </a>
              </h3>
              <div className="panel-group" id="accordion">
                <div className="panel panel-default  templatemo-content-widget  no-padding templatemo-overflow-hidden offset-0">
                  <div id={`reserve${order.id}`} className="panel-collapse collapse">
                    <div className="table-responsive">
                      <table className="table">
                       <thead >
                          <tr >
                            <td><b>Medicine Name</b></td>
                            <td><b>Price</b></td>
                            <td><b>Quantity</b></td>
                            <td><b>Action</b></td>
                          </tr>
                        </thead>
                        <tbody>
                        {order.cart.map(namepharmacy=>{
                          return(
                            <tr key={namepharmacy.id}>
                                <>
                              {namepharmacy.reservation == 1  ? 
                                <>
                            <td> {namepharmacy.medicine.name} </td><td>{namepharmacy.price} $</td>
                            <td>
                            {namepharmacy.quantity}
                            </td>
                            <td>
                            <a onClick ={()=> confirmReservation(namepharmacy.id)}
                                  className="btn btn-primary"
                                      title="confirm">
                                      Confirm
                                  </a>
                            </td>
                            </>
                              : <></>}
                              </> 
                            </tr>
                          )
                        })}
                                         
                        </tbody>
                      </table>
                    </div> 
                  </div> 
                </div> 
              </div> 
            </div>
            : ''}
             
        </section>
      )
    })
  }
 

  function filterFunction(event){
    var search = event.target.value;
    var filter, option, i;
     filter = search.toUpperCase();
     var div = document.getElementById("showSearch");
     option = div.getElementsByTagName("section");
     for (i = 0; i < option.length; i++) {
       var txtValue = option[i].textContent || option[i].innerText;
       if (txtValue.toUpperCase().indexOf(filter) > -1) {
         option[i].style.display = "";
       } else {
         option[i].style.display = "none";
       }
     }
   }

  return(
    <div className="templatemo-flex-row">
  
      <div className="templatemo-content col-1 light-gray-bg">
        <Header />
        <div className="templatemo-flex-row flex-content-row " style={{ marginTop:'100px' }}>
            <div className="col-1">		
              <div className="container"  >
                <div className="row" style={{  display: 'flex'}}>
                <div className="search" style={{ marginLeft:'10px', marginRight:'10px' }}>   		
                  <input type="text" className="form-control"
                  placeholder="Search" onChange={filterFunction} />   
                </div>
                <select className="form-control selectbuy" style={{ width: '200px'}}
                onChange={handleSelectChange} >
                  <option value="Ordered">Ordered</option>
                  <option value="Reserved">Reserved</option>
                  <option value="Delivred">Delivered</option>
                </select>
                </div>
              <div style={{ marginTop:'10px' }} >
              </div>

              <div className="row">
                <div id="showSearch" >
                  {orders.length>0 ? renderOrders() :''}
                  {reserve.length>0 ? renderReservation() :''}
                </div>
              </div>     
            </div>
          </div>                       
        </div>      
        <Footer />
      </div>
    </div>

  )

}
