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
  //   api.getPharmacyOrder().then(response => {
  //     setOrder(response.data);
  // }) .catch(error => {
  //   console.log(error)
  // })

  api.getPharmacyOrders().then(response => {
    console.log(response.data)
    setOrders(response.data);
}) .catch(error => {
  console.log(error)
})

}


function deliver(buy_id){
  const deliver = {
    delivred: 1
}
  api.deliver(buy_id, deliver).then(response => {
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
    console.log(error)
  })
  }

  if(select == 'Delivred'){
    api.getPharmacyOrders().then(response => {
      setOrders(response.data);
      setDeliver([]);
      setDelivred(1)
      setReserve([])
  }) .catch(error => {
    console.log(error)
  })
  }

  if(select == 'Reserved'){
    api.getPharmacyReservation().then(response => {
      console.log(response.data)
      setReserve(response.data);
      setDeliver();
      setOrders([])
    }) .catch(error => {
    console.log(error)
    })
  }

}



    function renderOrders(){
      return orders.map(order => {
          return(
            <section key={order.id}>
 {order.buy.length > 0 ?  
  <div className="templatemo-content-widget no-padding white-bg col-sm-6 col-lg-4 text-center item mb-4" >
            <br/>
           
            <h3 className="text-dark">{order.customer.name}</h3>
           <div className="table-responsive" style={{ overflow:'auto', height:'100px'}}>
                    <table className="table">
                    <thead >
                        <tr >
                          <td><b>medicine name</b></td>
                          <td><b>Price</b></td>
                          <td><b>Quantity</b></td>
                          <td><b>Action</b></td>
                          </tr>
                        </thead>
                      <tbody>
                      {order.buy.map(namepharmacy=>{
                 return(
    
                  <tr key={namepharmacy.id}>
                  {delivred == namepharmacy.delivred  ? 
                  <> 
                   <td>  
                   {namepharmacy.medicine.name} </td><td>{namepharmacy.price}</td>
                   <td>
                   {namepharmacy.quantity}
                   </td>
                   <td>
                   {namepharmacy.delivred == 0 ? 
                    <a onClick={() => deliver(namepharmacy.id)}
                        className="btn btn-primary"
                            title="deliver">
                            <i className="fa fa-share fa-fw"></i>
                         </a>:  <a 
                        className="btn btn-primary"
                            title="show Payment">
                            <i className="fa fa-info fa-fw"></i>
                         </a>}
                  
                   </td>
                   </>
                   : <></>} 
                   
                   </tr>
                  
                 )
              })}
    
             
                                       
                      </tbody>
                    </table>
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
          window.location.reload()
        }
      )
      }

      function renderReservation(){
        return reserve.map(order => {
            return(
              <section key={order.id}>
              {order.cart.length > 0 ? 
                <div className="templatemo-content-widget no-padding white-bg col-sm-6 col-lg-4 text-center item mb-4" >
              <br/>
             
              <h3 className="text-dark">{order.customer.name}</h3>
             <div className="table-responsive" style={{ overflow:'auto', height:'100px'}}>
                      <table className="table">
                      <thead >
                          <tr >
                            <td><b>medicine name</b></td>
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
                     <td> {namepharmacy.medicine.name} </td><td>{namepharmacy.price}</td>
                     <td>
                     {namepharmacy.quantity}
                     </td>
                     <td>
                     <a onClick ={()=> confirmReservation(namepharmacy.id)}
                          className="btn btn-primary"
                              title="confirm">
                              confirm
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
            : ''}
             
            </section>
              )
            })
        }
  function handleSearchChange(event){
    var searchByName = event.target.value;

    const search = {
      name: searchByName
  }

    api.getMedicineByName({search}).then(response => {
      setMedicine(response.data);
  }) .catch(error => {
    console.log(error)
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
						   placeholder="Serach"  
               onChange={filterFunction}
               />   
               </div>
               <select className="form-control" style={{ width: '200px'}}
            onChange={handleSelectChange}
            >
              <option value="Ordered">Ordered</option>
              <option value="Reserved">Reserved</option>
              <option value="Delivred">Delivred</option>
            </select>
            </div>

            <div style={{ marginTop:'10px' }} >
        </div>
  
    <div className="row">
    {/* <Progress.Component
					style={{ background: '#99999978', height: '5px' }}
					thumbStyle={{ background: '#5900b3', height: '5px' }}
				/> */}
        <div id="showSearch" >
      {orders.length>0 ? renderOrders() :''}
      {reserve.length>0 ? renderReservation() :''}
      </div>

      {/* <ReactPaginate
					pageCount={pageCount}
					initialPage={currentPage - 1}
					forcePage={currentPage - 1}
					pageRangeDisplayed={4}
					marginPagesDisplayed={2}
					previousLabel="&#x276E;"
					nextLabel="&#x276F;"
					containerClassName="uk-pagination uk-flex-center"
					activeClassName="uk-active"
					disabledClassName="uk-disabled"
					onPageChange={handlePageClick}
					disableInitialCallback={true}
				/> */}

          {/* <div className="row mt-5">
          
            <div className="col-md-12 text-center">
            <div className="site-block-27">
              <ul>
                <li><a href="#">&lt;</a></li>
                <li className="active"><span>1</span></li>
                <li><a href="#">2</a></li>
                <li><a href="#">3</a></li>
                <li><a href="#">4</a></li>
                <li><a href="#">5</a></li>
                <li><a href="#">&gt;</a></li>
              </ul>
            </div>
          </div>
          </div> */}
        </div>     
      </div>
       </div>                       
            </div>      
             <Footer />
          </div>
        </div>

    )

}
