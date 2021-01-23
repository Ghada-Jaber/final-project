import React, {useState, useEffect} from 'react';
import {Link, useHistory} from 'react-router-dom';
import api from '../../api';
import Header from '../layouts/Header';
import Footer from '../layouts/Footer';
import Back from '../Back';

export  default function EditDoctor(props){

  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState([]);
  const history = useHistory();

  useEffect(() => {
    api.getInfoPharmacy(props.match.params.id).then(response => {
      setImage(response.data.image);
        setName(response.data.name);
        setEmail(response.data.email);

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

   
  function handleUpdateMedicine(event) {
    event.preventDefault();


    const fd = new FormData();
          fd.append('name', name);

          const medicine = {
            name: name
    }
      
    api.updatePharmacy(medicine, props.match.params.id)
    .then(response => {
      alert("update success");

      history.push('/managePharmacy')
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

              <img src={image} alt="Image"  style={{ width:'50px' , height:'50px'}}/>

              <br/><br/>
              <div className={`form-group ${hasErrorFor('name') ? 'has-error' : ''}`} >
                <div className="input-group" >
                    <div className="input-group-addon">name</div>	        		
                      <input type="text" className="form-control"
                      value={name} onChange={handleNameChange}/>  
                </div>
                {renderErrorFor('name')} 
              </div>

              <div className="form-group" >
                <div className="input-group" >
                  <i className="fa fa-envelope-o"></i> &nbsp;
                  {email} 
                </div>
              </div>
              
          
              <div className="form-group">
                <button type="submit" className="templatemo-blue-button width-100"
                onClick={(event) => handleUpdateMedicine(event)}>
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
