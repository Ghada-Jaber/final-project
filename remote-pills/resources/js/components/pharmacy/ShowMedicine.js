import React, {useState, useEffect} from 'react';
import {Link, useHistory} from 'react-router-dom';
import api from '../../api';
import Header from '../layouts/Header';
import Footer from '../layouts/Footer';
import Back from '../Back';

export  default function ShowMedicine(props){
  const [image, setImage] = useState('');
  const [name, setName] = useState('');
  //description
  const [detail, setDetail] = useState([]);

  const history = useHistory();

  useEffect(() => {
      api.showMedicine(props.match.params.id)
      .then(response => {

        console.log(response.data)
        setImage(response.data.image);
          setName(response.data.name);

          setDetail(response.data.detail[0]);
      }) .catch(error => {
      })

  },[]);
   

    return(
        <div className="templatemo-flex-row">
	  
        <div className="templatemo-content col-1 light-gray-bg">
        
         <Header />
          <div className="templatemo-flex-row flex-content-row " style={{ marginTop:'100px' }}>
              <div className="col-1">		
      

      <Back  />

    <div className="container">
        <div className="row">
          <div className="col-md-5 mr-auto">
            <div className="border text-center">
              <img src={`./images/medicine/${image}`} alt="Image" className="img-fluid p-5" />
            </div>
          </div>
          <div className="col-md-6">
            <h2 className="text-black">{name} Tablets, 200mg</h2>

            <h3>Description</h3>
            <p>description.</p>

            <h3>Dosage</h3>
            <p>dosage.</p>

            <h3>Ingredient</h3>
            <p>ingredient.</p>

            <div className="mt-5">
            
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
            </div>      
             <Footer />
          </div>
        </div>

    )

}
