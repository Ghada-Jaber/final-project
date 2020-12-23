import React, {useState, useEffect} from 'react';
import {Link, useHistory} from 'react-router-dom';
import api from '../../api';
import Header from './../layouts/Header';
import Footer from './../layouts/Footer';

export  default function IndexUser(){
  const [cart, setCart] = useState([]);

  useEffect(() => {
   api.getCartMedicine().then(response => {
     console.log(response.data)
    setCart(response.data)
  
})

    
 },[]);




    return(
        <div className="templatemo-flex-row">
	  
        <div className="templatemo-content col-1 light-gray-bg">
        
         <Header />
          <div className="templatemo-flex-row flex-content-row " style={{ marginTop:'100px' }}>
              <div className="col-1">				 
            
    
      <div className="container">
        <div className="row">
          <form className="col-md-12" >
            <div className="site-blocks-table">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th className="product-thumbnail">Image</th>
                    <th className="product-name">Medicine</th>
                    <th className="product-price">Price</th>
                    <th className="product-quantity">Quantity</th>
                    <th className="product-total">Total</th>
                    <th className="product-remove">Remove</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="product-thumbnail">
                      <img src="images/product_02.png" alt="Image" className="img-fluid"/>
                    </td>
                    <td className="product-name">
                      <h2 className="h5 text-black">Ibuprofen</h2>
                    </td>
                    <td>$55.00</td>
                    <td>
                      <div className="input-group mb-3" style={{ maxWidth: '120px' }}>
                        <div className="input-group-prepend">
                          <button className="btn btn-outline-primary js-btn-minus" type="button">&minus;</button>
                        </div>
                        <input type="text" className="form-control text-center"  placeholder=""
                          aria-label="Example text with button addon" aria-describedby="button-addon1" />
                        <div className="input-group-append">
                          <button className="btn btn-outline-primary js-btn-plus" type="button">&plus;</button>
                        </div>
                      </div>
    
                    </td>
                    <td>$49.00</td>
                    <td><a href="#" className="btn btn-primary height-auto btn-sm">X</a></td>
                  </tr>
    
                  <tr>
                    <td className="product-thumbnail">
                      <img src="images/product_01.png" alt="Image" className="img-fluid" />
                    </td>
                    <td className="product-name">
                      <h2 className="h5 text-black">Bioderma</h2>
                    </td>
                    <td>$49.00</td>
                    <td>
                      <div className="input-group mb-3" style={{ maxWidth: '120px' }}>
                        <div className="input-group-prepend">
                          <button className="btn btn-outline-primary js-btn-minus" type="button">&minus;</button>
                        </div>
                        <input type="text" className="form-control text-center"  placeholder=""
                          aria-label="Example text with button addon" aria-describedby="button-addon1" />
                        <div className="input-group-append">
                          <button className="btn btn-outline-primary js-btn-plus" type="button">&plus;</button>
                        </div>
                      </div>
    
                    </td>
                    <td>$49.00</td>
                    <td><a href="#" className="btn btn-primary height-auto btn-sm">X</a></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </form>
        </div>
    
        <div className="row">
          <div className="col-md-6">
            <div className="row mb-5">
              <div className="col-md-6">
                <button className="btn btn-outline-primary btn-md btn-block">Continue Shopping</button>
              </div>
            </div>
          </div>
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
                    <strong className="text-black">$230.00</strong>
                  </div>
                </div>
    
                <div className="row">
                  <div className="col-md-12">
                    <button className="btn btn-primary btn-lg btn-block" >Proceed To
                      Checkout</button>
                      {/* onClick="window.location='checkout.html'" */}
                  </div>
                </div>
              </div>
            </div>
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
