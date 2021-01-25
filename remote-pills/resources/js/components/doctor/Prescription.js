import React, {Component, useState, useEffect} from 'react';
import {Link, useHistory} from 'react-router-dom';
import api from '../../api';
import Header from '../layouts/Header';
import Footer from '../layouts/Footer';
import moment from 'moment'


export  default function Prescription(){

  const [prescription, setPresciption] = useState([]); 
  const history = useHistory();

  useEffect(() => {
    api.getAskPrescription().then(response => {
      console.log(response.data)
        setPresciption(response.data)
      })
  },[]);



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

  function renderPrescription(){
    return prescription.map(prescription => {
      return(
        <div key={prescription.id}
        style={{ paddingLeft:'15px',paddingBottom:'5px', paddingTop:'5px'}}
        className="templatemo-content-widget no-padding white-bg item mb-4">
          <h3>
            <a data-toggle="collapse" data-parent="#accordion" onClick={()=> changeArrow(prescription.id)}
            href={`#prescribe${prescription.id}`}>
            {prescription.patient.name}
            <span style={{float:'right',paddingRight:'15px'}}>
            {moment(prescription.created_at).format('DD/MM/YYYY')}
            &nbsp;
            <img src="images/arrow.png" id={`down${prescription.id}`}/>
            <img src="images/arrow2.png" id={`arrowup${prescription.id}`} style={{display:'none'}}/>
            </span>
            </a> 
          </h3>
          <div className="panel-group" id="accordion">
            <div className="no-padding templatemo-overflow-hidden offset-0">
              <div id={`prescribe${prescription.id}`} className="panel-collapse collapse">
                <b>Medicine:</b>&nbsp;{prescription.name}<br/>
                <b>Patient Note:</b>
                <p style={{ whiteSpace: 'pre-line' }}>
                  {prescription.description}
                </p>
                <a className="btn btn-primary"
                href={`/prescription/${prescription.id}`}>Prescribe
                </a>
              </div>
            </div>
          </div>
        </div>
      
      )
    })
  }

  function filterFunction(event){
    var search = event.target.value;
    var filter, option, i;
     filter = search.toUpperCase();
     var div = document.getElementById("showSearch");
     option = div.getElementsByTagName("div");
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
                  placeholder="Search"  
                  onChange={filterFunction}/>   
                </div>
              </div>
              <div style={{ marginTop:'10px' }} >
              </div>
  
              <div className="row">
                <div id="showSearch">
                  {prescription.length > 0 ? renderPrescription() : 'no data'}
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
