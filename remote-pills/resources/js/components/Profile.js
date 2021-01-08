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

    const [id, setId] = useState('');


  useEffect(() => {

    details();
   

 },[]);
 let refInput = null;

 function details(){
  api.details().then(response => {
  
    setId(response.data.id)
    setName(response.data.name)
    setEmail(response.data.email)
    setBirthday(response.data.birthday)
    setImage(response.data.image)
    setAddress(response.data.address)
      
  }).catch(error => {
    //  history.push('/');
  })
}


function onChangeAvatar(event) {
  if (event.target.files && event.target.files[0]) {
      // Check this file is an image?
      const prefixFiletype = event.target.files[0].type.toString()
      if (prefixFiletype.indexOf(AppString.PREFIX_IMAGE) !== 0) {
          this.props.showToast(0, 'This file is not an image')
          return
      }
      this.newAvatar = event.target.files[0]
      this.setState({photoUrl: URL.createObjectURL(event.target.files[0])})
  } else {
      this.props.showToast(0, 'Something wrong with input file')
  }
}

function uploadAvatar () {
  setIsLoading(true)
  if (this.newAvatar) {
      const uploadTask = myStorage
          .ref()
          .child(detail.id)
          .put(this.newAvatar)
      uploadTask.on(
          AppString.UPLOAD_CHANGED,
          null,
          err => {
              this.props.showToast(0, err.message)
          },
          () => {
              uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
                  this.updateUserInfo(true, downloadURL)
              })
          }
      )
  } else {
      this.updateUserInfo(false, null)
  }
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
    <div className="templatemo-flex-row flex-content-row">
    <div className="templatemo-content-widget  no-padding templatemo-overflow-hidden"
    style={{ width:'50%'}}>
   
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
                  <h2 className="media-heading text-uppercase blue-text">{name}</h2>
                </div>        
              </div>
              <div className="table-responsive">
              <i className="fa fa-edit"></i>
                <table className="table">
                  <tbody>
                    <tr>
                      <td>email</td>
                      <td>{email}</td>                    
                    </tr> 
                    <tr>
                      <td>password</td>
                      <td>******</td>                    
                    </tr>  
                    <tr>
                      <td>birthday</td>
                      <td>{birthday}</td>                    
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
