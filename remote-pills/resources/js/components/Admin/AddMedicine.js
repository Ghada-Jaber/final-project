import React, {useState, useEffect} from 'react';
import {Link, useHistory} from 'react-router-dom';
import api from '../../api';
import Header from '../layouts/Header';
import Footer from '../layouts/Footer';
import Back from '../Back';

export  default function AddMedicine(){

  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [format, setFormat] = useState('Tablet');
  const [description, setDescription] = useState('');
  const [ingredient, setIngredient] = useState('');
  const [prescription, setPrescription] = useState(0);
  const [tablet, setTablet] = useState('');
  const [dosage, setDosage] = useState('');
  const [unit, setUnit] = useState('');
  
  const[symptom, setSymptom] = useState([]);

  const [errors, setErrors] = useState([]);

  const[symptomName, setSymtomName] = useState([]);


  const[symptomId, setSymptomId]= useState([]);

  const history = useHistory();


  useEffect(() => {
    api.getAllSymptom().then(response => {
        setSymptom(response.data);
    })

  },[]);



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
    
    if (event.target.files && event.target.files[0]) {
      // Check this file is an image?
      const prefixFiletype = event.target.files[0].type.toString()
      if (prefixFiletype.indexOf('image/') !== 0) {
        document.getElementById('fileimage').value="";
        alert('This file is not an image')
        
        return
      }
      setImage(event.target.files[0]); 
    }
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
    fd.append('dosage_unit', unit);
    fd.append('symptom', symptomId);
    fd.append('name', name);
    fd.append('format', format);
    fd.append('description', description);
    fd.append('ingredient', ingredient);
    fd.append('prescription', prescription);
    fd.append('tablet', tablet);
    fd.append('dosage', dosage);
    fd.append('dosage_unit', unit);
    fd.append('image', image);
      

    api.addMedicineInfo(fd , {headers:{'Accept': "application/json",  'Content-Type': "multipart/form-data"}})
    .then(response => {
      console.log(response.data)
      alert("Add medicine success");

      history.push('/manageMedicine')
      window.location.reload();
    })
    .catch(error => {
      if(error.response.status == 500){
        alert('medicine already exist')
      }else{
        setErrors(error.response.data.errors)
      }
    })
  }


function renderSymptom(){
  return  symptom.map(symptom => {
    return(
        <option key={symptom.id} value={symptom.id}>
            {symptom.name}
        </option>
    )
  })
}

 function closeForm(){
  document.getElementById("addmedicine").style.display="none";
 }


 function handleChangeSymptom(){
  var selected = [];
  for (var option of document.getElementById('searchMed').options) {
    if (option.selected) {
      selected.push(option.value);
    }
  }
  setSymptomId(selected);
 }

  return(
    <div id="addmedicine"  className="formShow">
      <div className="col-1" >	

        <div className="templatemo-content-widget templatemo-login-widget  white-bg">
          <a onClick={() => closeForm()} ><i className="fa fa-times"></i></a>
          <div className="scrollform">
  
            <div className={`form-group ${hasErrorFor('image') ? 'has-error' : ''}`} >
              <div className="input-group" >
                <div className="input-group-addon">Image</div>	        		
                <input type="file" name="file" id="fileimage" className="form-control"
                  onChange={handleImageChange}/>   
              </div>
              {renderErrorFor('image')} 
            </div>

            <div className={`form-group ${hasErrorFor('name') ? 'has-error' : ''}`} >
              <div className="input-group" >
                <div className="input-group-addon">Name</div>	        		
                <input type="text" className="form-control"
                value={name} onChange={handleNameChange}/>  
              </div>
              {renderErrorFor('name')} 
            </div>


            <div className={`form-group ${hasErrorFor('format') ? 'has-error' : ''}`} >
              <div className="input-group" >
                <div className="input-group-addon">Format</div>	 
                <select className="form-control"value={format} onChange={handleFormatChange} >
                  <option value="Tablet">Tablet</option>
                  <option value="Liquid">Liquid</option>
                  <option value="Cream">Cream</option>
                </select>
              </div>
              {renderErrorFor('format')} 
            </div>

            <div className={`form-group ${hasErrorFor('symptom') ? 'has-error' : ''}`} >
              <div className="input-group" >
                <div className="input-group-addon">Symptom<br/><br/>
                  <button className="btn btn-primary">
                    <i className="fa fa-plus"></i>
                  </button>
                </div>	        		
                <select onChange={handleChangeSymptom} className="form-control select" size="5" 
                multiple="multiple"
                id="searchMed">
                  { symptom.length >0 ? renderSymptom() : '' }
                </select>
              </div>
              {renderErrorFor('symptom')} 
            </div>
                

            <div className={`form-group ${hasErrorFor('description') ? 'has-error' : ''}`} >
              <div className="input-group" >
                <div className="input-group-addon">Description</div>	        		
                <textarea type="text" className="form-control"
                value={description} onChange={handleDescriptionChange}/>   
              </div>
              {renderErrorFor('description')} 
            </div>

            <div className={`form-group ${hasErrorFor('ingredient') ? 'has-error' : ''}`} >
              <div className="input-group" >
                <div className="input-group-addon">Ingredient</div>	        		
                <textarea type="text" className="form-control"
                  value={ingredient} onChange={handleIngredientChange}/>   
              </div>
              {renderErrorFor('ingredient')} 
            </div>

            <div className={`form-group ${hasErrorFor('tablet') ? 'has-error' : ''}`} >
              <div className="input-group" >
                <div className="input-group-addon">Tablet</div>	        		
                <input type="number" className="form-control"
                value={tablet} onChange={handleTabletChange} />   
              </div>
              {renderErrorFor('tablet')} 
            </div>

            <div className={`form-group ${hasErrorFor('dosage') ? 'has-error' : ''}`} >
              <div className="input-group" >
                <div className="input-group-addon">Dosage</div>	        		
                <input type="number" className="form-control"
                value={dosage} onChange={handleDosageChange}/>   
              </div>
              {renderErrorFor('dosage')} 
            </div>

            <div className={`form-group ${hasErrorFor('dosage_unit') ? 'has-error' : ''}`} >
              <div className="input-group" >
                <div className="input-group-addon">Dosage Unit</div>	        		
                <input type="text" className="form-control"
                value={unit} onChange={handleUnitChange}/>   
              </div>
              {renderErrorFor('dosage_unit')} 
            </div>

        

            <div className="form-group">
              <input type="checkbox" className="check" id="c2" name="cc2" 
              defaultChecked={false}
              onChange={handlePrescriptionChange}/>
              <label htmlFor="c2"><span></span>need prescription</label>				    
            </div>
          </div>
      
          <div className="form-group">
            <button type="submit" className="btn btn-primary width-100"
            onClick={(event) => handleAddMedicine(event)}>
            Add </button>
          </div>   
        </div>        
      </div>    
    </div>

  )

}
