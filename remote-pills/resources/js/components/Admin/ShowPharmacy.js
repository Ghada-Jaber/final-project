import React, {useState, useEffect} from 'react';
import {Link, useHistory} from 'react-router-dom';
import api from '../../api';
import Header from '../layouts/Header';
import Footer from '../layouts/Footer';
import Back from '../Back';

export  default function ShowPharmacy(props){

    const [name, setName] = useState('');
    const [image, setImage] = useState('');
    const [open, setOpened] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');

    const [medicine, setMedicine] = useState([]);

  const history = useHistory();

  useEffect(() => {
    api.getInfoPharmacy(props.match.params.id).then(response => {
      // console.log()
      setImage(response.data.image);
        setName(response.data.name);
        setEmail(response.data.email);
        setOpened(response.data.birthay);
      })

      api.getPharmacyMedicine(props.match.params.id).then(response => {
        setMedicine(response.data)
      })

  },[]);


  function renderPharmacy(){
    return pharmacy.map(pharmacy => {
      return(
      <li  key={pharmacy.id}>
      {pharmacy.name}
      </li> 

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

  <div className="container">
      <div className="row">
        <div className="col-md-4 mr-auto">
          <div className="border text-center">
            <img src={`./images/medicine/${image}`} alt="Image" className="img-fluid p-5" />
          </div>
        </div>
        <div className="col-md-4">
          <h2 className="text-black">{name}</h2>

          <h3>email</h3>
          <p>{email}</p>

          <h3>Address</h3>
          <p></p>

          <h3>Opened</h3>
          <p>{open}</p>

  
        </div>
        <div className="col-md-4">
        <h3>Pharmacy have medicine {name} / Number: {medicine.length}</h3>
    <div className="scrollform">

    <div className ="templatemo-content-widget blue-bg" >   
   
   <ol>
    {/* {pharmacy.length > 0 ? renderPharmacy() : 'Not Exist in any pharmacy'} */}

    </ol>
    
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
