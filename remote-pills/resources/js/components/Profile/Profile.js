import React, {useState, useEffect} from 'react';
import ReactLoading from 'react-loading'
import {withRouter} from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css'
import images from './../Themes/Images'
import './Profile.css';
import api from '../../api';
import Header from '../layouts/Header';
export  default function Profile(){

    const[isLoading, setIsLoading] =  useState(false);

    const[detail, setDetail] =  useState([]);

    const [name, setName] = useState('');
    const[password, setPassword] = useState('');
      const [image, setImage] = useState('');
      const [address, setAddress] = useState('');


    useEffect(() => {

        details();
       
    
     },[]);

     function details(){
        api.details().then(response => {
            setDetail(response.data);
        }).catch(error => {
          //  history.push('/');
        })
      }


    //  this.state = {
    //     isLoading: false,
    //     nickname: localStorage.getItem(AppString.NICKNAME),
    //     aboutMe: localStorage.getItem(AppString.ABOUT_ME),
    //     photoUrl: localStorage.getItem(AppString.PHOTO_URL)
    // }
    let newAvatar = null;
    let newPhotoUrl = '';
    let refInput = null;
   

   

    function onChangeNickname (event) {
        setName(event.target.value)
    }

    function onChangeAboutMe (event){
        setPassword(event.target.value)
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

    function updateUserInfo (isUpdatePhotoUrl, downloadURL) {
        let newInfo
        if (isUpdatePhotoUrl) {
            newInfo = {
                name: name,
                photoUrl: downloadURL
            }
        } else {
            newInfo = {
                name: name
            }
        }
       
    }

  
        return (
            <div className="root">
                <Header/>

                <img className="avatar" alt="Avatar" src={detail.image}/>

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

                <span className="textLabel">Nickname:</span>
                <input
                    className="textInput"
                    value={name ? name : ''}
                    placeholder="Your nickname..."
                    onChange={onChangeNickname}
                />
                <span className="textLabel">About me:</span>
                <input
                    className="textInput"
                    value={password ? password : ''}
                    placeholder="Tell about yourself..."
                    onChange={onChangeAboutMe}
                />

                <button className="btnUpdate" onClick={uploadAvatar}>
                    UPDATE
                </button>

                {isLoading ? (
                    <div className="viewLoading">
                        <ReactLoading
                            type={'spin'}
                            color={'#203152'}
                            height={'3%'}
                            width={'3%'}
                        />
                    </div>
                ) : null}
            </div>
        )
}

