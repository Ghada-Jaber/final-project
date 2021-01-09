import React, {useState, useEffect} from 'react';
import {Link, useHistory} from 'react-router-dom';
import api from '../api';
import Header from './layouts/Header';
import Footer from './layouts/Footer';
import images from './Themes/Images';
import '../../css/Profile.css';

export  default function Profile(props){
    const [pharmacy, setPharmacy] = useState([]);
  const history = useHistory();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const[password, setPassword] = useState('');
    const [image, setImage] = useState('');
    const [address, setAddress] = useState('');

    const [newImg, setNImg] = useState('');
    const [birthday, setBirthday] = useState('');
    const [errors, setErrors] = useState([]);

    const [id, setId] = useState('');


  useEffect(() => {

    details();
   

 },[]);
 let refInput = null;
 let newAvatar = null;
 let photoUrl = null;

 function details(){
  api.details().then(response => {
  
    setId(response.data.id)
    setName(response.data.name)
    setEmail(response.data.email)
    setPassword(response.data.password)
    setBirthday(response.data.birthday)
    setImage(response.data.image)
    setAddress(response.data.address)
      
  }).catch(error => {
    //  history.push('/');
  })
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


function onChangeAvatar(event) {
  if (event.target.files && event.target.files[0]) {
      // Check this file is an image?
      const prefixFiletype = event.target.files[0].type.toString()
      if (prefixFiletype.indexOf('image/') !== 0) {
          alert('This file is not an image')
          return
      }
    
      setNImg(event.target.files[0]);
  } else {
      alert('Something wrong with input file')
  }
}

function uploadAvatar () {
  
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

function updateInfo(){
  console.log(newImg)

  event.preventDefault();
  const fd = new FormData();
  fd.append('image',newImg);

  api.changeProfile(fd, {headers:{'Accept': "application/json",  'Content-Type': "multipart/form-data"}})
      .then(response => {
          

          console.log(response.data);
      }) .catch(error => {
         console.log(error)
      })

//   const detail = {
//     quantity: quantity,
//     price: price,
//     MFD: mfd,
//     EXP:exp
// }
// api.updateMedicineDetail(detail, detailId)
//     .then(response => {
//       document.getElementById('edit').innerHTML= "<i  class='fa fa-edit fa-fw'></i>";
//       document.getElementById('quantity').disabled= true;
//       document.getElementById('price').disabled= true;
//       document.getElementById('mfd').disabled= true;
//       document.getElementById('exp').disabled= true;

//       setQuantity(response.data.quantity);
//       setPrice(response.data.price);
//       setMfd(response.data.MFD);
//       setExp(response.data.EXP);

//       document.getElementById('edit').style.display="";
//   document.getElementById('save').style.display="none";
        
//     })
//     .catch(error => {
//         setErrors(error.response.data.errors)
//     })
}


function editInfo(){
    
  document.getElementById('edit').style.display="none";
  document.getElementById('save').style.display="";
  document.getElementById('password').disabled= false;
  document.getElementById('birthday').disabled= false;

}

function handlePasswordChange(event){
  setPassword(event.target.value)
}


function handleBirthdayChange(event){
  setBirthday(event.target.value)
}
   

    return(
        <div className="templatemo-flex-row">
	  
        <div className="templatemo-content col-1 light-gray-bg">
        
         <Header />
          <div className="templatemo-flex-row flex-content-row " style={{ marginTop:'100px' }}>
              <div className="col-1">				 
    <div className="templatemo-flex-row flex-content-row">
    <div className="templatemo-content-widget  no-padding templatemo-overflow-hidden">
   
    <div className="templatemo-content-widget  col-2">
              
              <img className="avatar" alt="Avatar" src={image}/>

                <div className="viewWrapInputFile">
                    <img
                        className="imgInputFile"
                        alt="icon gallery"
                        src={images.ic_input_file}
                        onClick={() =>refInput.click()}
                    />
                    <input
                        ref={el => {
                            refInput = el
                        }}
                        accept="image/*"
                        className="viewInputFile"
                        type="file"
                        onChange={onChangeAvatar}
                    />
                </div>
              <div className="media margin-bottom-30">
                
                <div className="media-body">
                  <h2 className="media-heading text-uppercase">{name}</h2>
                </div>        
              </div>
              <div className="table-responsive">
             
              <a  id="save" onClick= {() => updateInfo()} className='btn btn-primary' 
                style={{ display:'none' }}>
                <i  className="fa fa-save fa-fw"></i>
                </a> 
            <a  id="edit" onClick= {() => editInfo()} className='btn btn-primary' >
             <i  className="fa fa-edit fa-fw"></i>
                </a> 

                <br/><br/>
                <table className="table">
                  <tbody>
                    <tr>
                      <td>email</td>
                      <td>{email}</td>                    
                    </tr> 
                    <tr>
                      <td>password</td>
                      <td>
                      <div className={`form-group ${hasErrorFor('password') ? 'has-error' : ''}`} >
                        <input className="form-control" id="password"
                        type="password" 
                        value='*****'
                        onChange={handlePasswordChange} 
                        disabled
                        />
                        {renderErrorFor('password')}
                        </div>
                      </td>                    
                    </tr>  
                    <tr>
                      <td>birthday</td>
                      <td>
                      <div className={`form-group ${hasErrorFor('birthday') ? 'has-error' : ''}`} >
                        <input className="form-control" id="birthday"
                        type="date" 
                        value={birthday} 
                        onChange={handleBirthdayChange} 
                        disabled
                        />
                        {renderErrorFor('birthday')}
                        </div>
                      </td>                    
                    </tr>  
                    <tr>
                      <td>Address</td>
                      <td>{address}</td>                    
                    </tr>                                      
                  </tbody>
                </table>
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
