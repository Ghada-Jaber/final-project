import React, {useState, useEffect} from 'react';
import {Link, useHistory} from 'react-router-dom';
import api from '../../api';
import Header from '../layouts/Header';
import Footer from '../layouts/Footer';
import AddMedicine from './AddMedicine';
import ShowMedicine from './ShowMedicine';
import EditMedicine from './EditMedicine';
import $ from 'jquery';
import { add } from 'lodash';


export  default function ManageMedicine(){
  const [id, setId] = useState('');
  const [medicine, setMedicine] = useState([]);

  useEffect(() => {
    api.getAllMedicine().then(response => {
      setMedicine(response.data);
    })
 },[]);

 function filterFunction(event){
    var search = event.target.value;
    var filter, tr, i;
     filter = search.toUpperCase();
     var table = document.getElementById("myTable");
     tr = table.getElementsByTagName("tr");
     for (i = 0; i < tr.length; i++) {
        var td = tr[i].getElementsByTagName("td")[0];
        if (td) {
          var txtValue = td.textContent || td.innerText;
          if (txtValue.toUpperCase().indexOf(filter) > -1) {
            tr[i].style.display = "";
          } else {
            tr[i].style.display = "none";
          }
        }       
      }
   }

   function addMedicine(){
    if (document.getElementById("addmedicine").style.display =="block"){
      document.getElementById("addmedicine").style.display="none";} 
      else{
      document.getElementById("addmedicine").style.display = "block";
      if (document.getElementById("editmedicine").style.display==""||document.getElementById("showmedicine").style.display==""){
        document.getElementById("editmedicine").style.display="none";
        document.getElementById("showmedicine").style.display="none";
      }
      }
   }

   function editMedicine(id){
    setId(id)
    if (document.getElementById("editmedicine").style.display =="block"){
      document.getElementById("editmedicine").style.display="none";} 
      else{
      document.getElementById("editmedicine").style.display = "block";
      if (document.getElementById("addmedicine").style.display==""||document.getElementById("showmedicine").style.display==""){
        document.getElementById("addmedicine").style.display="none";
        document.getElementById("showmedicine").style.display="none";
      }
      }
   }

   function showMedicine(id){
    setId(id)
    if (document.getElementById("showmedicine").style.display =="block"){
      document.getElementById("showmedicine").style.display="none";} 
      else{
      document.getElementById("showmedicine").style.display = "block";
      if (document.getElementById("editmedicine").style.display==""||document.getElementById("addmedicine").style.display==""){
        document.getElementById("editmedicine").style.display="none";
        document.getElementById("addmedicine").style.display="none";
      }
      }
   }

  

   function renderMedicine(){
    return medicine.map(medicine => {
        return(
          <tr key={medicine.id}>
                    <td>{medicine.id}</td>
                    <td>
                    
                    <img src={`../../../../storage/app/${medicine.image}`} width="100px" height="100px"/></td>
                    <td>{medicine.name}</td>
                    <td>{medicine.dosage}</td>
                    <td>{medicine.description}</td>
                    <td>{medicine.ingredient}</td>
                    <td>{medicine.format}</td>
                    <td>{medicine.prescription == 1 ? 'yes' : 'no'}</td>
                    <td>{medicine.tablet}</td>
                    <td>{medicine.dosage} {medicine.dosage_unit}</td>
                    <td>
                    <div className="btn-group " role="group">
                    
                               
                               <a onClick={() => showMedicine(medicine.id)}
                               className="btn btn-info"
                                   title="Show">
                                   <i className="fa fa-info fa-fw"></i>
                                </a>
                                <a onClick={() => editMedicine(medicine.id)}
                                className="btn btn-primary"
                                   title="Edit">
                                   <i className="fa fa-edit fa-fw"></i>
                                </a>
                            
                                <a onClick= {() => handleDeleteMedicine(medicine.id)} 
                                 className="btn btn-default"
                                   title="Delete">
                                   <i className="fa fa-trash fa-fw"></i>
                                </a>
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
             <div className="row" style={{  display: 'flex'}}>
             <a className="btn btn-primary" style={{ marginLeft:'10px' }} 
             onClick={() => addMedicine()} >
             Add </a>			 
              
             <div className="input-group" style={{ width:'200px', marginLeft:'20px' }}>
             <div className="input-group-addon"><i className="fa fa-search fa-fw"></i></div>	        		
		              	<input type="text" className="search form-control"
						   placeholder="Serach" 
                           onChange={filterFunction} 
               />  
               </div>
               </div> 
               </caption>
                <thead>
                  <tr>
                    <td><a href="" className="white-text templatemo-sort-by"># <span className="caret"></span></a></td>
                    <td><a href="" className="white-text templatemo-sort-by">
                    Medicine image <span className="caret"></span></a></td>
                    <td><a href="" className="white-text templatemo-sort-by">
                    Name <span className="caret"></span></a></td>
                    <td><a href="" className="white-text templatemo-sort-by">
                    Dosage <span className="caret"></span></a></td>
                    <td><a href="" className="white-text templatemo-sort-by">
                    Medicine description <span className="caret"></span></a></td>
                    <td><a href="" className="white-text templatemo-sort-by">
                    Ingredient <span className="caret"></span></a></td>
                    <td><a href="" className="white-text templatemo-sort-by">
                    Format <span className="caret"></span></a></td>
                    <td><a href="" className="white-text templatemo-sort-by">
                    Need Prescription <span className="caret"></span></a></td>
                    <td><a href="" className="white-text templatemo-sort-by">
                    Tablet <span className="caret"></span></a></td>
                    <td><a href="" className="white-text templatemo-sort-by">
                    Dosage <span className="caret"></span></a></td>
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
          <div id="addmedicine" className="formShow">
          <a href="#" onClick={() => addMedicine()} className="closecss">
          &times;</a>
              <AddMedicine />

            </div>

            <div id="editmedicine" className="formShow">
          <a href="#" onClick={() => editMedicine()} className="closecss">
          &times;</a>
              <EditMedicine props={id}/>

            </div>

            <div id="showmedicine" className="formShow">
          <a href="#" onClick={() => showMedicine()} className="closecss">
          &times;</a>
              <ShowMedicine props={id} />

            </div>
                 
  
       </div>                       
            </div> 

            
                     
             <Footer />
          </div>

          
        </div>

    )

}
