import React, {useState, useEffect} from 'react';
import {Link, useHistory} from 'react-router-dom';
import api from '../../api';
import Header from '../layouts/Header';
import Footer from '../layouts/Footer';
import Back from '../Back';

export  default function ShowMedicine(props){

    const [name, setName] = useState('');
    const [image, setImage] = useState('');
    const [format, setFormat] = useState('Tablet');
    const [description, setDescription] = useState('');
    const [ingredient, setIngredient] = useState('');
    const [prescription, setPrescription] = useState(0);
    const [tablet, setTablet] = useState('');
    const [dosage, setDosage] = useState('');
    const [unit, setUnit] = useState('');

    const [symptom, setSymptom] = useState([]);

    const [pharmacy, setPharmacy] = useState([]);

  const history = useHistory();

  useEffect(() => {
    api.getInfoMedicine(props.match.params.id).then(response => {
      setImage(response.data.image);
        setName(response.data.name);
        setFormat(response.data.format);
        setDescription(response.data.description);
        setIngredient(response.data.ingredient);
        setPrescription(response.data.prescription);
        setTablet(response.data.tablet);
        setDosage(response.data.dosage);
        setUnit(response.data.dosage_unit);
        setSymptom(response.data.symptom);
      })

      api.getMedicinePharmacy(props.match.params.id).then(response => {
        setPharmacy(response.data)
      })

  },[]);


  function renderSymptom(){
    return symptom.map(symptom => {
      return(
        <i key={symptom.id}>
       <i style={{ border:'1px solid #2375b8', padding:'10px', borderRadius:'5px'}} >
          {symptom.name}
       </i>
       &nbsp;&nbsp;
       </i>
        )
      })
  }


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
      <div className="col-md-4">
              <img src={image} alt="Image"  style={{ width:'100%' , height:'300px'}}/>
          </div>
        <div className="col-md-4">
          <h2 className="text-black">{name} {format}, {dosage} {unit}</h2>

          <h3>Description</h3>
          <p>{description}</p>

          <h3>Ingredient</h3>
          <p>{ingredient}</p>

          <h3>Tablet</h3>
          <p>{tablet}</p>

          <h3>Need Prescription</h3>
          <p>{prescription == 1 ? 'yes' : 'no'}</p>


  
        </div>
        <div className="col-md-4">
        <h4 style={{ color:'#2375b8' }}>Symptom</h4>
            
            <div style={{ overflow:'auto', width:'260px', height:'70px', padding:'10px' }}>
            {renderSymptom()}

            </div>
<hr/>
            <br/>
            
        <h3>Pharmacy have medicine {name} / Number: {pharmacy.length}</h3>
    <div className="scrollform">

    <div className ="templatemo-content-widget blue-bg" >   
   
   <ol>
    {pharmacy.length > 0 ? renderPharmacy() : 'Not Exist in any pharmacy'}

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
