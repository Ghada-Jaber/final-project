import React, {useState, useEffect} from 'react';
import {Link, useHistory} from 'react-router-dom';
import api from '../api';
import Header from './layouts/Header';
import Footer from './layouts/Footer';

export  default function Profile(){
    const [pharmacy, setPharmacy] = useState([]);
  const history = useHistory();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const[password, setPassword] = useState('');
    const [image, setImage] = useState('');

    const [newImg, setNImg] = useState('');
    const [birthday, setBirthday] = useState('');

    const [id, setId] = useState('');


  useEffect(() => {
    details();
 },[]);


 function details(){
  api.details().then(response => {
    setId(response.data.id)
      setName(response.data.name)
      setEmail(response.data.email)
      setName(response.data.name)
      setImage(response.data.image)
  })
}

    function functionalert(id){
        if (document.getElementById(id).style.display ==""){
           
   document.getElementById(id).style.display="none";} 
   else{
   document.getElementById(id).style.display = "";
   } 
   for(i=0; i<pharmacy.length; i++){
            
        if(pharmacy[i].id!=id){
        
            if (document.getElementById(aru[i]).style.display==""){
     document.getElementById(aru[i]).style.display="none";
   }	
          }	 
   }
   
   }

   function handleImageChange(event){
    setNImg(event.target.files[0]);
}

function handleProfileChange (event) {
  event.preventDefault();
  const fd = new FormData();
  fd.append('name', name);
  fd.append('image', newImg);



  api.changeProfile(fd, {headers:{'Accept': "application/json",  'Content-Type': "multipart/form-data"}})
  .then(response => {
        console.log(response.data)
      }) .catch(error => {
  console.log(error)
      })
}
   

    return(
        <div className="templatemo-flex-row">
	  
        <div className="templatemo-content col-1 light-gray-bg">
        
         <Header />
          <div className="templatemo-flex-row flex-content-row " style={{ marginTop:'100px' }}>
              <div className="col-1">				 
              <div className="bg-light py-3">
      <div className="container">
        <div className="row">
          <div className="col-md-12 mb-0">
          <a href="/home">Home</a> 
          <span className="mx-2 mb-0">/</span> 
          <strong className="text-black">Store</strong></div>
        </div>
      </div>
    </div>
    <div className="templatemo-flex-row flex-content-row">
    <div className="templatemo-content-widget  no-padding templatemo-overflow-hidden"
    style={{ width:'50%'}}>
   
    <div className="templatemo-content-widget  col-2">
              <i className="fa fa-edit"></i>
              <div className="media margin-bottom-30">
                <div className="media-left">
                  <a href="#">
                  <img src={`./images/userimage/${image}`} width="100px" height="100px"
                   className="media-object img-circle templatemo-img-bordered"/>
                  </a>
                </div>
                <div className="media-body">
                  <h2 className="media-heading text-uppercase blue-text">{name}</h2>
                </div>        
              </div>
              <div className="table-responsive">
                <table className="table">
                  <tbody>
                    <tr>
                      <td>email</td>
                      <td>{email}</td>                    
                    </tr> 
                    <tr>
                      <td>password</td>
                      <td>22</td>                    
                    </tr>  
                    <tr>
                      <td>birthday</td>
                      <td>13</td>                    
                    </tr>  
                    <tr>
                      <td>Address</td>
                      <td>18</td>                    
                    </tr>                                      
                  </tbody>
                </table>
              </div>             
            
            </div>       
              </div>

              <div className="templatemo-content-widget  no-padding templatemo-overflow-hidden"
    style={{ width:'50%'}}>
    <div className="templatemo-content-widget  col-2">
              <div className="media margin-bottom-30">
                <div className="media-left">
                  <input type="file" className="form-control"
                    onChange={handleImageChange}
                  />
                </div>       
              </div>
              <div className="table-responsive">
                <table className="table">
                  <tbody>
                  <tr>
                      <td>name</td>
                      <td>{name}</td>                    
                    </tr> 
                    <tr>
                      <td>password</td>
                      <td>22</td>                    
                    </tr>  
                    <tr>
                      <td>birthday</td>
                      <td>13</td>                    
                    </tr>  
                    <tr>
                      <td>Address</td>
                      <td>18</td>                    
                    </tr>                                      
                  </tbody>
                </table>
              </div>   
              <button type="submit" className="templatemo-blue-button"
              onClick={(event) => handleProfileChange(event)} >
              Change</button>          
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
