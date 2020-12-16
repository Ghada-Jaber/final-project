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

  const history = useHistory();

  useEffect(() => {
    console.log(props)
    api.getInfoMedicine(props).then(response => {
      console.log(response.data)
      setImage(response.data.image);
        setName(response.data.name);
        setFormat(response.data.format);
        setDescription(response.data.description);
        setIngredient(response.data.ingredient);
        setPrescription(response.data.prescription);
        setTablet(response.data.tablet);
        setDosage(response.data.dosage);
        setUnit(response.data.unit);
      })

  },[]);


    return(
            <div className="col-1" style={{ backgroundColor:'gray' }}>		

  <div className="container">
      <div className="row">
        <div className="col-md-5 mr-auto">
          <div className="border text-center">
            <img src={`./images/medicine/${image}`} alt="Image" className="img-fluid p-5" />
          </div>
        </div>
        <div className="col-md-6">
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
      </div>
    </div>
     </div> 

    )

}
