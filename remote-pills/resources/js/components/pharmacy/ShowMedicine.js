import React, {useState, useEffect} from 'react';
import {Link, useHistory} from 'react-router-dom';
import api from '../../api';
import Header from '../layouts/Header';
import Footer from '../layouts/Footer';
import Back from '../Back';

export  default function ShowMedicine(props){
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
  const [mfd, setMfd] = useState('');
  const [exp, setExp] = useState('');

  const [symtom, setSymtom] = useState([]);

  const [errors, setErrors] = useState([]);

  const history = useHistory();

  useEffect(() => {
      api.showMedicine(props.match.params.id)
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
          setDetailId(response.data.detail[0].id);
          setQuantity(response.data.detail[0].quantity);
          setPrice(response.data.detail[0].price);
          setMfd(response.data.detail[0].MFD);
          setExp(response.data.detail[0].EXP);

          setSymtom(response.data.symtom);
      }) .catch(error => {
      })

  },[]);

  function renderSymtom(){
    return symtom.map(symtom => {
      return(
        <i key={symtom.id}>
       <i style={{ border:'1px solid #2375b8', padding:'10px', borderRadius:'5px'}} >
          {symtom.name}
       </i>
       &nbsp;&nbsp;
       </i>
        )
      })
  }

  function editInfo(){
    
    document.getElementById('edit').style.display="none";
    document.getElementById('save').style.display="";
    document.getElementById('quantity').disabled= false;
    document.getElementById('price').disabled= false;
    document.getElementById('mfd').disabled= false;
    document.getElementById('exp').disabled= false;
  
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

  function updateInfo(){
    const detail = {
      quantity: quantity,
      price: price,
      MFD: mfd,
      EXP:exp
  }
  api.updateMedicineDetail(detail, detailId)
      .then(response => {
        document.getElementById('edit').innerHTML= "<i  class='fa fa-edit fa-fw'></i>";
        document.getElementById('quantity').disabled= true;
        document.getElementById('price').disabled= true;
        document.getElementById('mfd').disabled= true;
        document.getElementById('exp').disabled= true;

        setQuantity(response.data.quantity);
        setPrice(response.data.price);
        setMfd(response.data.MFD);
        setExp(response.data.EXP);

        document.getElementById('edit').style.display="";
    document.getElementById('save').style.display="none";
          
      })
      .catch(error => {
          setErrors(error.response.data.errors)
      })
  }


  function handleQuantityChange(event){
    setQuantity(event.target.value);
  }


  function handlePriceChange(event){
    setPrice(event.target.value);
  }


  function handleMfdChange(event){
    setMfd(event.target.value);
  }

  function handleExpChange(event){
    setExp(event.target.value);
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
            <p style={{ overflowY:'auto', width:'100%', height: '100px', whiteSpace: 'pre-line' }}>{description}</p>

            <h3>Dosage</h3>
            <p style={{ overflowY:'auto', width:'100%', height: '100px', whiteSpace: 'pre-line' }}>dosage.</p>

            <h3>Ingredient</h3>
            <p style={{ overflowY:'auto', width:'100%', height: '100px', whiteSpace: 'pre-line' }}>
            {ingredient}</p>
            
</div>
            <div className="col-md-4">
            <h4 style={{ color:'#2375b8' }}>Symptoms</h4>
            
            <div style={{ overflow:'auto', width:'260px', height:'70px', padding:'10px' }}>
            {renderSymtom()}

            </div>
<hr/>
            <br/>
            
            <b style={{ color:'#2375b8' }}><u>Specifications</u></b>
              &nbsp;
              <a  id="save" onClick= {() => updateInfo()} className='btn btn-primary' 
                style={{ display:'none' }}>
                <i  className="fa fa-save fa-fw"></i>
                </a> 
            <a  id="edit" onClick= {() => editInfo()} className='btn btn-primary' >
             <i  className="fa fa-edit fa-fw"></i>
                </a> 

        

              <div className="tab-content">
              
                <div className="tab-pane active">
                  <table className="table custom-table">
                    <thead>
                    <tr>
                      <th>Title</th>
                      <th>Information</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th scope="row">Quantity</th>
                        <td>
                        <div className={`form-group ${hasErrorFor('quantity') ? 'has-error' : ''}`} >
                        <input className="form-control" id="quantity"
                        type="number" value={quantity} 
                        onChange={handleQuantityChange} disabled
                        />
                        {renderErrorFor('quantity')}
                        </div>
                        </td>
                      </tr>

                      <tr>
                        <th scope="row">Price</th>
                        
                        <td>
                        <div className={`form-group ${hasErrorFor('price') ? 'has-error' : ''}`} >
                        <input className="form-control" id="price"
                        type="number" value={price}
                        onChange={handlePriceChange} 
                        disabled/>
                        {renderErrorFor('price')}
                        </div>
                        </td>
                      </tr>

                      <tr>
                        <th scope="row">MFD</th>
                        <td>
                        <div className={`form-group ${hasErrorFor('MFD') ? 'has-error' : ''}`} >
                        <input className="form-control" id="mfd"
                        type="date" value={mfd} 
                        onChange={handleMfdChange} disabled
                        />
                        {renderErrorFor('MFD')}
                        </div>
                        </td>

                      </tr>
                      <tr>
                        <th scope="row">EXP</th>
                        <td>
                        <div className={`form-group ${hasErrorFor('MFD') ? 'has-error' : ''}`} >

                        <input className="form-control" id="exp"
                         type="date" value={exp} 
                         onChange={handleExpChange}
                         disabled/>
                         {renderErrorFor('EXP')}
                         </div>
                         </td>

                      </tr>
                      
                    </tbody>
                  </table>
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
