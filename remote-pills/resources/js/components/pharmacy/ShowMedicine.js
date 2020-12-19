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
  const [detail, setDetail] = useState([]);
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [mfd, setMfd] = useState('');
  const [exp, setExp] = useState('');

  const [symtom, setSymtom] = useState([]);

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


          setDetail(response.data.detail[0]);
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
    console.log('here')
    document.getElementById('quantity').disabled= false;
    document.getElementById('price').disabled= false;
    document.getElementById('mfd').disabled= false;
    document.getElementById('exp').disabled= false;
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
          <div className="col-md-4 mr-auto">
            <div className="border text-center">
              <img src={`./images/medicine/${image}`} alt="Image" className="img-fluid p-5" />
            </div>
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
            <h4 style={{ color:'#2375b8' }}>Symtom</h4>
            
            <div style={{ overflow:'auto', width:'260px', height:'70px', padding:'10px' }}>
            {renderSymtom()}

            </div>
<hr/>
            <br/>
            
            <b style={{ color:'#2375b8' }}><u>Specifications</u></b>
              &nbsp;
            <a onClick= {() => editInfo()} className='btn btn-primary' >
             <i className="fa fa-edit fa-fw"></i>
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
                        {/* <td>
                        <input className="form-control" id="quantity"
                        type="number" value={detail.quantity} 
                        onChange={handleQuantityChange}
                        disabled/></td> */}
                      </tr>

                      <tr>
                        <th scope="row">Price</th>
                        {/* <td><input className="form-control" id="price"
                        type="number" value={detail.price}
                        onChange={handlePriceChange} 
                        disabled/></td> */}
                      </tr>

                      <tr>
                        <th scope="row">MFD</th>
                        <td>
                        <input className="form-control" id="mfd"
                        type="date" value={detail.MFD} 
                        onChange={handleMfdChange}
                        disabled/></td>

                      </tr>
                      <tr>
                        <th scope="row">EXP</th>
                        <td><input className="form-control" id="exp"
                         type="date" value={detail.EXP} 
                         onChange={handleExpChange}
                         disabled/></td>

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
