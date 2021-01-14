import React, {Component, useState, useEffect} from 'react';
import {Link, useHistory} from 'react-router-dom';
import api from '../../api';
import Header from '../layouts/Header';
import Footer from '../layouts/Footer';
import Back from '../Back';

export  default function ShowMedicineUser(props){
  const [image, setImage] = useState('');
  const [name, setName] = useState('');
  const [format, setFormat] = useState('');
  const [description, setDescription] = useState('');
  const [ingredient, setIngredient] = useState('');
  const [prescription, setPrescription] = useState(0);
  const [tablet, setTablet] = useState('');
  const [dosage, setDosage] = useState('');
  const [unit, setUnit] = useState('');
  //description
  const [detailId, setDetailId] = useState('');


  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [reservation, setReservation] = useState(0);


  const [symptom, setSymptom] = useState([]);

  const[detail, setDetail]= useState([]);

  

  const [errors, setErrors] = useState([]);

  const history = useHistory();

  useEffect(() => {
      api.showUserMedicine(props.match.params.id)
      .then(response => {
        
        setImage(response.data.image);
          setName(response.data.name);
          setFormat(response.data.format);
          setDescription(response.data.description);
          setIngredient(response.data.ingredient);
          setPrescription(response.data.prescription);
          setTablet(response.data.tablet);
          setDosage(response.data.dosage);
          setUnit(response.data.dosage_unit);

          setDetail(response.data.detail);
          // setDetailId(response.data.detail[0].id);
          // setQuantity(response.data.detail[0].quantity);
          // setPrice(response.data.detail[0].price);
          // setMfd(response.data.detail[0].MFD);
          // setExp(response.data.detail[0].EXP);


          setSymptom(response.data.symptom);
      }) .catch(error => {
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




  function hasErrorFor (field) {
    return !!errors[field]
}

function renderErrorFor (field) {
    if (hasErrorFor(field)) {
        return (
    <span style={{ color: '#D7425C' }}>
                <strong>{errors[field][0]}</strong>
            </span>
        )
    }
}


function addToCart(event, pharmacy_id, price){
  event.preventDefault();

  const addtocart = {
    pharmacy_id: pharmacy_id,
    quantity: quantity,
    price: price,
    reservation: reservation
}

api.addToCart(props.match.params.id, addtocart)
.then(response => {
  alert('add done')
})
.catch(error => {
   // setErrors(error.response.data.errors)
})
}







  function handleQuantityChange(event){
    setQuantity(event.target.value);
  }


  function handleReservationChange(event){
    if(event.target.checked){
      setReservation(1)
  }else{
      setReservation(0)
  }
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
          <div className="col-md-4" style={{ top:'10px', left:'-2%'}}>
              <img src={image} alt="Image"  style={{ width:'100%' , height:'300px'}} className="test"/>
          </div>
          <div className="col-md-4">
            <h2 className="text-black">{name} {format}, {dosage} {unit}</h2>
Tablet {tablet}
            <h3>Description</h3>
            <p style={{ overflowY:'auto', width:'100%', height: '100px', whiteSpace: 'pre-line' }}>{description}</p>

            <h3>Ingredient</h3>
            <p style={{ overflowY:'auto', width:'100%', height: '100px', whiteSpace: 'pre-line' }}>
            {ingredient}</p>
            
</div>
            <div className="col-md-4">
            <h4 style={{ color:'#2375b8' }}>Symtom</h4>
            
            <div style={{ overflow:'auto', width:'260px', height:'70px', padding:'10px' }}>
            {renderSymptom()}

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
