import React, {useState, useEffect} from 'react';
import {Link, useHistory} from 'react-router-dom';
import api from '../../api';
import Header from '../layouts/Header';
import Footer from '../layouts/Footer';
import Back from '../Back';

export  default function EditMedicine(props){

    const [name, setName] = useState('');
    const [image, setImage] = useState('');
    const [format, setFormat] = useState('Tablet');
    const [description, setDescription] = useState('');
    const [ingredient, setIngredient] = useState('');
    const [prescription, setPrescription] = useState();
    const [tablet, setTablet] = useState('');
    const [dosage, setDosage] = useState('');
    const [unit, setUnit] = useState('');
    const [errors, setErrors] = useState([]);

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




   
function handleUpdateMedicine(event) {
  event.preventDefault();


  const fd = new FormData();
        fd.append('name', name);
        fd.append('format', format);
        fd.append('description', description);
        fd.append('ingredient', ingredient);
        fd.append('prescription', prescription);
        fd.append('tablet', tablet);
        fd.append('dosage', dosage);
        fd.append('dosage_unit', unit);

        const medicine = {
          name: name,
          format: format,
          description: description,
          ingredient: ingredient,
          prescription: prescription,
          tablet: tablet,
          dosage: dosage,
          dosage_unit: unit
      }
    

  api.updateMedicineInfo(medicine, props.match.params.id  ) //, {headers:{'Accept': "application/x-www-form-urlencoded"}}
      .then(response => {
        alert("update success");

        history.push('/manageMedicine')
        window.location.reload();
      })
      .catch(error => {
        console.log(error)
        //  setErrors(error.response.data.errors)
      })
}

    return(
      <div className="templatemo-flex-row">
	  
      <div className="templatemo-content col-1 light-gray-bg">
      
       <Header />
        <div className="templatemo-flex-row flex-content-row " style={{ marginTop:'100px' }}>
            <div className="col-1">	
            <Back  />

        

    <div className="templatemo-content-widget templatemo-login-widget  white-bg">

    <img src= {image} 
        width="70px" height="70px" /> <br/><br/>
          <div className={`form-group ${hasErrorFor('name') ? 'has-error' : ''}`} >
          <div className="input-group" >
            <div className="input-group-addon">name</div>	        		
            <input type="text" className="form-control"
            value={name} onChange={handleNameChange}
            />  
		          	</div>
                {renderErrorFor('name')} 
                </div>


                <div className={`form-group ${hasErrorFor('format') ? 'has-error' : ''}`} >
          <div className="input-group" >
            <div className="input-group-addon">format</div>	 
            <select className="form-control"value={format} onChange={handleFormatChange} >
              <option value="Tablet">Tablet</option>
              <option value="Liquid">Liquid</option>
              <option value="Cream">Cream</option>
            </select>
		          	</div>
                {renderErrorFor('format')} 
                </div>


                

                <div className={`form-group ${hasErrorFor('description') ? 'has-error' : ''}`} >
          <div className="input-group" >
            <div className="input-group-addon">description</div>	        		
            <textarea type="text" className="form-control"
             value={description} onChange={handleDescriptionChange}

               />   
		          	</div>
                {renderErrorFor('description')} 
                </div>

                <div className={`form-group ${hasErrorFor('ingredient') ? 'has-error' : ''}`} >
          <div className="input-group" >
            <div className="input-group-addon">ingredient</div>	        		
            <textarea type="text" className="form-control"
             value={ingredient} onChange={handleIngredientChange}
               />   
		          	</div>
                {renderErrorFor('ingredient')} 
                </div>

                <div className={`form-group ${hasErrorFor('tablet') ? 'has-error' : ''}`} >
          <div className="input-group" >
            <div className="input-group-addon">tablet</div>	        		
            <input type="number" className="form-control"
             value={tablet} onChange={handleTabletChange}
               />   
		          	</div>
                {renderErrorFor('tablet')} 
                </div>

                <div className={`form-group ${hasErrorFor('dosage') ? 'has-error' : ''}`} >
          <div className="input-group" >
            <div className="input-group-addon">dosage</div>	        		
            <input type="number" className="form-control"
             value={dosage} onChange={handleDosageChange}
               />   
		          	</div>
                {renderErrorFor('dosage')} 
                </div>

                <div className={`form-group ${hasErrorFor('dosage_unit') ? 'has-error' : ''}`} >
          <div className="input-group" >
            <div className="input-group-addon">dosage unit</div>	        		
            <input type="text" className="form-control"
               value={unit} onChange={handleUnitChange}
               />   
		          	</div>
                {renderErrorFor('dosage_unit')} 
                </div>

                <div className="form-group">			    
		

                <div className="checkbox squaredTwo">
                
				        <input type="checkbox" id="c3" name="cc3"  defaultChecked={prescription}
                onChange={handlePrescriptionChange}
                                />
						<label htmlFor="c3"><span></span>need prescription</label>
				    </div>	

            </div>
            
        
            <div className="form-group">
					<button type="submit" className="templatemo-blue-button width-100"
          onClick={(event) => handleUpdateMedicine(event)}
					 >
					Update </button>
				</div>



    
          </div>
        </div>   
        </div> 

            
                     
<Footer />
</div>


</div> 

    )

}
