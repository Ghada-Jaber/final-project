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

  const [symtom, setSymtom] = useState([]);

  const history = useHistory();

  useEffect(() => {
      api.showMedicine(props.match.params.id)
      .then(response => {

        console.log(response.data)
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
        <i>
       <i style={{ border:'1px solid #2375b8', padding:'10px', borderRadius:'5px'}} key={symtom.id}>
          {symtom.name}
       </i>
       &nbsp;&nbsp;
       </i>
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
          <div className="col-md-4 mr-auto">
            <div className="border text-center">
              <img src={`./images/medicine/${image}`} alt="Image" className="img-fluid p-5" />
            </div>
          </div>
          <div className="col-md-4">
            <h2 className="text-black">{name} {format}, {dosage} {unit}</h2>

            <h3>Description</h3>
            <p>{description}</p>

            <h3>Dosage</h3>
            <p>dosage.</p>

            <h3>Ingredient</h3>
            <p>{ingredient}</p>
            
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
            <a className='btn btn-primary' >
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
                        <td>{detail.quantity}</td>
                      </tr>

                      <tr>
                        <th scope="row">Price</th>
                        <td>{detail.price}</td>
                      </tr>

                      <tr>
                        <th scope="row">MFD</th>
                        <td>{detail.MFD}</td>

                      </tr>
                      <tr>
                        <th scope="row">EXP</th>
                        <td>{detail.EXP}</td>

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
