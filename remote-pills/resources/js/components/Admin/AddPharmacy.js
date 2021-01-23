import React, {useState, useEffect} from 'react';
import {Link, useHistory} from 'react-router-dom';
import api from '../../api';
import Header from '../layouts/Header';
import Footer from '../layouts/Footer';
import Back from '../Back';

export  default function AddPharmacy(props){

  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [format, setFormat] = useState('Tablet');
  const [description, setDescription] = useState('');
  const [ingredient, setIngredient] = useState('');
  const [prescription, setPrescription] = useState(0);
  const [tablet, setTablet] = useState('');
  const [dosage, setDosage] = useState('');
  const [unit, setUnit] = useState('');
  const [errors, setErrors] = useState([]);

  const history = useHistory();

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




  function handleNameChange(event){
    setName(event.target.value);
  }


  function handleImageChange(event){
    setImage(event.target.files[0]); 
  }


  function handleFormatChange(event){
    setFormat(event.target.value);
  }

  function handleDescriptionChange(event){
    setDescription(event.target.value);
  }


  function handleIngredientChange(event){
    setIngredient(event.target.value);
  }


  function handlePrescriptionChange(event){
    if(event.target.checked){
      setPrescription(1)
    }else{
        setPrescription(0)
    }
  }


  function handleTabletChange(event){
    setTablet(event.target.value);
  }


  function handleDosageChange(event){
    setDosage(event.target.value);
  }

  function handleUnitChange(event){
    setUnit(event.target.value);
  }

   
  function handleAddMedicine(event) {
    event.preventDefault();
    const fd = new FormData();
    fd.append('image', image);
    fd.append('name', name);
    fd.append('format', format);
    fd.append('description', description);
    fd.append('ingredient', ingredient);
    fd.append('prescription', prescription);
    fd.append('tablet', tablet);
    fd.append('dosage', dosage);
    fd.append('dosage_unit', unit);
    api.addMedicineInfo(fd , {headers:{'Accept': "application/json",  'Content-Type': "multipart/form-data"}})
    .then(response => {
      alert("add success");

      history.push('/manageMedicine')
      window.location.reload();
    })
    .catch(error => {
      console.log(error)
      setErrors(error.response.data.errors)
    })
  }

  return(
    <div className="col-1">	
      <div style={{ marginTop:'10px' }} ></div>

      <div className="templatemo-content-widget templatemo-login-widget  white-bg">
        <div className="scrollform">
          <div className="form-group">
              <div className="input-group" >
                <div className="input-group-addon">image</div>	        		
                <input type="file" className="form-control"
                  onChange={handleImageChange}/>   
              </div>
          </div>

          <div className={`form-group ${hasErrorFor('name') ? 'has-error' : ''}`} >
            <div className="input-group" >
              <div className="input-group-addon">name</div>	        		
              <input type="text" className="form-control"
              value={name} onChange={handleNameChange}/>  
            </div>
            {renderErrorFor('name')} 
          </div>


          <div className={`form-group ${hasErrorFor('email') ? 'has-error' : ''}`} >
            <div className="input-group" >
              <div className="input-group-addon">format</div>	 
                <select className="form-control"value={format} onChange={handleFormatChange} >
                  <option value="Tablet">Tablet</option>
                  <option value="Liquid">Liquid</option>
                  <option value="Cream">Cream</option>
                </select>
              </div>
              {renderErrorFor('email')} 
          </div>


                    

          <div className={`form-group ${hasErrorFor('password') ? 'has-error' : ''}`} >
            <div className="input-group" >
              <div className="input-group-addon">description</div>	        		
              <textarea type="text" className="form-control"
                value={description} onChange={handleDescriptionChange}/>   
            </div>
            {renderErrorFor('password')} 
          </div>

          <div className={`form-group ${hasErrorFor('ingredient') ? 'has-error' : ''}`} >
            <div className="input-group" >
              <div className="input-group-addon">ingredient</div>	        		
              <textarea type="text" className="form-control"
              value={ingredient} onChange={handleIngredientChange}/>   
            </div>
            {renderErrorFor('ingredient')} 
          </div>

          <div className={`form-group ${hasErrorFor('tablet') ? 'has-error' : ''}`} >
            <div className="input-group" >
              <div className="input-group-addon">tablet</div>	        		
                <input type="number" className="form-control"
                value={tablet} onChange={handleTabletChange}/>   
            </div>
              {renderErrorFor('tablet')} 
          </div>

          <div className={`form-group ${hasErrorFor('dosage') ? 'has-error' : ''}`} >
            <div className="input-group" >
              <div className="input-group-addon">dosage</div>	        		
              <input type="number" className="form-control"
                value={dosage} onChange={handleDosageChange} />   
            </div>
            {renderErrorFor('dosage')} 
          </div>

          <div className={`form-group ${hasErrorFor('dosage_unit') ? 'has-error' : ''}`} >
            <div className="input-group" >
              <div className="input-group-addon">dosage unit</div>	        		
              <input type="text" className="form-control"
              value={unit} onChange={handleUnitChange} />   
            </div>
            {renderErrorFor('dosage_unit')} 
          </div>
        </div>
          
        <div className="form-group">
          <button type="submit" className="templatemo-blue-button width-100"
          onClick={(event) => handleAddMedicine(event)}>
          Add 
          </button>
        </div>
      </div>
    </div>    
  )
}
