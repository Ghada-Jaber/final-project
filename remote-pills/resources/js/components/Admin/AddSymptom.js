import React, {useState, useEffect} from 'react';
import {Link, useHistory} from 'react-router-dom';
import api from '../../api';
import Header from '../layouts/Header';
import Footer from '../layouts/Footer';
import Back from '../Back';

export  default function AddSymptom(){
    
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


function renderSymptom(){
  return  symptom.map(symptom => {
    return(
        <option key={symptom.id} value={symptom.id}>
            {symptom.name}
        </option>
    )
  })
}

function filterFunction(event){
  var search = event.target.value;
  var filter, option, i;
   filter = search.toUpperCase();
   var div = document.getElementById("searchMed");
   option = div.getElementsByTagName("option");
   for (i = 0; i < option.length; i++) {
     var txtValue = option[i].textContent || option[i].innerText;
     if (txtValue.toUpperCase().indexOf(filter) > -1) {
       option[i].style.display = "";
     } else {
       option[i].style.display = "none";
     }
   }
 }

 function closeForm(){
  document.getElementById("addmedicine").style.display="none";
 }



 function handleChangeNameSymptom(event){
   setSymtomName(event.target.value)
 }


 function addSymptom(){

  const symptomadd = {
    symptomName: symptomName
  }
  
    api.addSymptom(symptomadd).then(response => {
      alert("add symptom success");

      var x = document.getElementById("searchMed");
      var option = document.createElement("option");
      option.value= response.data.id;
      option.text = response.data.name;
      x.add(option);
      

    })
    .catch(error => {
      if(error.response.status == 500){
         alert('symptom already exist')
      }else{
        setErrors(error.response.data.errors)
      }
      
    })
 }

    return(
      <div id="addmedicine"  className="formShow">
              <div className="col-1" >	

        <div className="col-md-4" >
        Symptom
        <div className="form-group">
          <div className="search" >  	      		
		              	<input type="text" className="search form-control"
						   placeholder="Serach"  
               id="myInput" onChange={filterFunction}

               /> 
               </div>
               </div> 

               <div className={`form-group ${hasErrorFor('symptomName') ? 'has-error' : ''}`} >
          <div className="input-group" >       		
            <input type="text" className="form-control"
						   placeholder="Symptom Name"  onChange={handleChangeNameSymptom}

               /> 
               	<div className="input-group-addon">  <a   
             onClick={() => addSymptom()} >
             <i className="fa fa-plus"></i>
             </a>	</div>	   
		          	</div>
                {renderErrorFor('symptomName')} 
                </div>
             
             	

            
          </div>

       
        </div>    
        </div>

    )

}
