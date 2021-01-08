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
      setImage(response.data.image);
        setName(response.data.name);
        setEmail(response.data.email);
        setOpened(response.data.birthday);
        setMedicine(response.data.medicine);
      })

  },[]);


  function renderPharmacy(){
    return medicine.map(medicine => {
      return(
      <li  key={medicine.id}>
      {medicine.name}
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
        <div className="col-md-4">
        <img src={image} alt="Image" width="50px" height="50px" className="img-fluid p-5" />
          <h2 className="text-black">{name}</h2>

          <h3>email</h3>
          <p>{email}</p>

          <h3>Address</h3>
          <p></p>

          <h3>Opened</h3>
          <p>{open}</p>

  
        </div>
        <div className="col-md-4">
        <h3>Pharmacy have {medicine.length} medicine</h3>
    <div className="scrollform">

    <div className ="templatemo-content-widget blue-bg" >   
   
   <ol>
    {medicine.length > 0 ? renderPharmacy() : 'No medicine exist yet'}

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
