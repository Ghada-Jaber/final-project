import React, {useState, useEffect} from 'react';
import {Link, useHistory} from 'react-router-dom';
import api from '../../api';
import Header from '../layouts/Header';
import Footer from '../layouts/Footer';
import SignUp from '../auth/SignUp';


export  default function ManagePharmacy(){
  const [id, setId] = useState('');
  const [medicine, setMedicine] = useState([]);

  var role = 'ROLE_PHARMACY';
  useEffect(() => {
    api.getUsers('ROLE_PHARMACY').then(response => {
      console.log(response.data)
      setMedicine(response.data);
    })
 },[]);

 function filterFunction(event){
    var search = event.target.value;
    // Declare variables
var input, filter, table, tr, th, td, i ;
input = document.getElementById("myInput");
filter = search.toUpperCase();
table = document.getElementById("myTable");
tr = table.getElementsByTagName("tr"),
th = table.getElementsByTagName("th");

// Loop through all table rows, and hide those who don't match the        search query
for (i = 1; i < tr.length; i++) {
            tr[i].style.display = "none";
            for(var j=0; j<th.length; j++){
        td = tr[i].getElementsByTagName("td")[j];      
        if (td) {
          var txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
                break;
            }
        }
        }
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

   function addMedicine(){
    if (document.getElementById("addmedicine").style.display =="block"){
      document.getElementById("addmedicine").style.display="none";} 
      else{
      document.getElementById("addmedicine").style.display = "block";
      }
   }


   function handleDeleteMedicine(medicine_id){ //I added event here and in line 89
    event.preventDefault();
    var confirm_delete = confirm('Are you sure you want to Deactivate This User?');
    if (confirm_delete == true) {
      const active = {
        active:0
      }
      api.deleteUser(medicine_id, active).then(response => {
        window.location.reload()
      })
    }
}

function handleActiveUser(medicine_id){ //I added event here and in line 89
  event.preventDefault();
  var confirm_delete = confirm('Are you sure you want to Activate This User?');
  if (confirm_delete == true) {
    const active = {
      active:1
    }
    api.activeUser(medicine_id, active).then(response => {
      window.location.reload()
    })
  }
}


  

   function renderMedicine(){
    return medicine.map(medicine => {
        return(
          <tr key={medicine.id}>
                    <td>{medicine.id}</td>
                    <td>
                    
                    <img src={medicine.image} width="100px" height="100px"/></td>
                    <td>{medicine.name}</td>
                    <td>{medicine.street.name}, {medicine.street.city.name}, {medicine.street.city.country.name}
                    </td>
                    <td>{medicine.email}</td>
                    <td>{medicine.birthday}</td>
                    <td>
                    <div className="btn-group " role="group">
                    
                               
                               <a href={`/managePharmacy/show/${medicine.id}`}
                               className="btn btn-info"
                                   title="Show">
                                   <i className="fa fa-info fa-fw"></i>
                                </a>
                                <a href={`/managePharmacy/edit/${medicine.id}`}
                                className="btn btn-primary"
                                   title="Edit">
                                   <i className="fa fa-edit fa-fw"></i>
                                </a>
                            
                                {medicine.active ==1 ? 
                                  <a  onClick= {() => handleDeleteMedicine(medicine.id)}
                                 className="btn btn-default"
                                   title="Deactivate">
                                   <i className="fa fa-trash fa-fw"></i>
                                </a>
                                : 
                                <a  onClick= {() => handleActiveUser(medicine.id)}
                                 className="btn btn-default"
                                   title="Activate">
                                   <i className="fa fa-check fa-fw"></i>
                                </a>
                                }
                            </div>
                            </td>
                  </tr>
          )
        })
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
             <caption>
             <div className="row" style={{  display: 'flex', float:'left'}}>
             <a className="btn btn-primary" style={{ marginLeft:'10px', marginRight:'10px' }} 
             onClick={() => addMedicine()} >
             <i className="fa fa-plus"></i></a>			 
              
             
        <div className="search" style={{ marginRight:'10px' }}>  	        		
		              	<input type="text" className="form-control"
						   placeholder="Search" 
                           onChange={filterFunction} 
               />  
               </div>
               </div>  
               </caption>
                <thead>
                  <tr>
                    <th><a onClick={() => sortTable(0)} 
                    className="white-text templatemo-sort-by"># <span className="caret"></span></a>
                    </th>
                    <th>
                    Pharmacy image</th>
                    <th><a onClick={() => sortTable(2)} 
                     className="white-text templatemo-sort-by">
                    Name <span className="caret"></span></a></th>
                    <th><a onClick={() => sortTable(3)}  className="white-text templatemo-sort-by">
                    Address <span className="caret"></span></a></th>
                    <th><a onClick={() => sortTable(4)}  className="white-text templatemo-sort-by">
                    Email <span className="caret"></span></a></th>
                    <th><a onClick={() => sortTable(5)}  className="white-text templatemo-sort-by">
                    opened <span className="caret"></span></a></th>
                    <td>Action</td>
                  </tr>
                </thead>
                <tbody>

                {medicine.length > 0 ? renderMedicine() : 
                <tr><td colSpan="7" style={{ textAlign:'center' }} >no data</td></tr>}
               

                 

                </tbody>
              </table>    
            </div> 
                                     
          </div>   
          <div id="addmedicine" style={{ display:'none' }}>
                  <h4 className="closecss"> 
                  The field date in add pharmacy is when<br/> the pharmacy did open
                  </h4>
              <SignUp props={role}/>

            </div>

  
       </div>                       
            </div> 

            
                     
             <Footer />
          </div>

          
        </div>

    )

}
