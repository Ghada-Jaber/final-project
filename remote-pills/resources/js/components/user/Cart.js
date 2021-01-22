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

            <td style={{ width:'200px'}}>
                {carts.pharmacy.street.name}, {carts.pharmacy.street.city.name}, {carts.pharmacy.street.city.country.name}
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
            
            <div style={{ overflowY:'auto', width:'450px' , height: '100px', whiteSpace: 'pre-line' }}>
            {buy.medicine.description}
                      </div>
            </td>

            <td  style={{ textAlign:'right'}}> 
            {buy.price} $
            </td>

            <td  style={{ textAlign:'right'}}> 
            {buy.quantity}
            </td>

            <td  style={{ textAlign:'right'}}> 
            {buy.price * buy.quantity} $
            </td>
            <td style={{ textAlign:'center'}}> 
           
                     <input type="checkbox"  id={`g${buy.medicine.id}`} name={`gg${buy.medicine.id}`} 
             defaultChecked={buy.reservation} disabled/> 
             <label htmlFor={`g${buy.medicine.id}`} ><span></span>&nbsp;</label> 
            </td>
            <td  style={{ textAlign:'center'}}>
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

 function sortTable(n) {
  var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
  table = document.getElementById("myTable");
  switching = true;
  //Set the sorting direction to ascending:
  dir = "asc"; 
  /*Make a loop that will continue until
  no switching has been done:*/
  while (switching) {
    //start by saying: no switching is done:
    switching = false;
    rows = table.rows;
    /*Loop through all table rows (except the
    first, which contains table headers):*/
    for (i = 1; i < (rows.length - 1); i++) {
      //start by saying there should be no switching:
      shouldSwitch = false;
      /*Get the two elements you want to compare,
      one from current row and one from the next:*/
      x = rows[i].getElementsByTagName("TD")[n];
      y = rows[i + 1].getElementsByTagName("TD")[n];
      /*check if the two rows should switch place,
      based on the direction, asc or desc:*/
      if (dir == "asc") {
        if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
          //if so, mark as a switch and break the loop:
          shouldSwitch= true;
          break;
        }
      } else if (dir == "desc") {
        if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
          //if so, mark as a switch and break the loop:
          shouldSwitch = true;
          break;
        }
      }
    }
    if (shouldSwitch) {
      /*If a switch has been marked, make the switch
      and mark that a switch has been done:*/
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      //Each time a switch is done, increase this count by 1:
      switchcount ++;      
    } else {
      /*If no switching has been done AND the direction is "asc",
      set the direction to "desc" and run the while loop again.*/
      if (switchcount == 0 && dir == "asc") {
        dir = "desc";
        switching = true;
      }
    }
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
                  <th><a onClick={() => sortTable(0)} 
                    className="white-text templatemo-sort-by">Pharmacy <span className="caret"></span></a></th>
                    <th style={{ width:'20px'}}>
                    <a onClick={() => sortTable(1)} 
                    className="white-text templatemo-sort-by">Address <span className="caret"></span></a>
                    </th>
                    <th style={{ width:'20px'}}>Image</th>
                    
                    <th><a onClick={() => sortTable(3)} 
                    className="white-text templatemo-sort-by">Name <span className="caret"></span></a></th>
                    <th><a onClick={() => sortTable(4)} 
                    className="white-text templatemo-sort-by">Medicine Description <span className="caret"></span></a></th>
                    <th><a onClick={() => sortTable(5)} 
                    className="white-text templatemo-sort-by">Price <span className="caret"></span></a></th>
                    <th><a onClick={() => sortTable(6)} 
                    className="white-text templatemo-sort-by">Quantity <span className="caret"></span></a></th>
                    <th><a onClick={() => sortTable(7)} 
                    className="white-text templatemo-sort-by">Total <span className="caret"></span></a></th>
                    <th>Reservation <br/>Required (Y/N)</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                
                {renderCart()}

                </tbody>
              </table>
            </div>

            <div >
          <div style={{ display:'flex'}}>
          <div  style={{ width:'75px', marginRight:'5px', marginTop:'5px'}}>
                    <span className="bluetext"><u>Price Totals</u></span>
                  </div>
                  <div style={{marginTop:'5px'}}>
                    <strong 
                    className="text-black">{totals} $</strong>
                    &nbsp;&nbsp;</div>
                  <div >
                  <button  onClick={() => payment()}
                    className="btn btn-primary" >Proceed To
                      Checkout</button>
                  </div>
          </div>
        </div>
              </>: <div className="panel panel-default white-bg text-center">
                <h4>Cart is empty go buy some medicine!</h4>
            </div>}
            
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
