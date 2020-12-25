import React, {useState, useEffect} from 'react';
import {Link, useHistory} from 'react-router-dom';
import api from '../../api';
import Header from '../layouts/Header';
import Footer from '../layouts/Footer';
import Back from '../Back';

export  default function ShowPrescription(props){
  const [prescription, setPresciption] = useState([]);
 

  const history = useHistory();

  useEffect(() => {
      api.ShowPrescription(props.match.params.id)
      .then(response => {
        console.log(response.data)
        setPresciption(response.data);
      }) .catch(error => {
      })

  },[]);

  function renderPrescription(){
    return prescription.map(prescription => {
      return(
        <tr key={prescription.id}>
          <td>{prescription.medicine.name}</td>
          <td>{prescription.quantity}</td>
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
      

      <Back  />

      <div className="templatemo-content-widget no-padding">
            <div className="panel panel-default table-responsive">
            <table id="myTable" className="table table-striped table-bordered templatemo-user-table"
             cellSpacing="0" width="100%">
             <caption>Prescription</caption>
 <thead>
                  <tr>
                    <th>Medicine Name
                    </th>
                    <th>
                    quantity</th>
                  </tr>
                </thead>

                <tbody>


{prescription.length > 0 ? renderPrescription() : 
<tr><td  style={{ textAlign:'center' }} >no data</td></tr>}


 

</tbody>
             </table>
             </div>
             </div>
       </div>                       
            </div>      
             <Footer />
          </div>
        </div>

    )

}
