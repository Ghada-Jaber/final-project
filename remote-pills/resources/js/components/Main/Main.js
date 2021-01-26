import React, {useState, useEffect} from 'react';
import ReactLoading from 'react-loading'
import images from '../Themes/Images'
import WelcomeBoard from '../WelcomeBoard/WelcomeBoard'
import './Main.css'
import ChatBoard from './../ChatBoard/ChatBoard'

import api from '../../api'
import Header from '../layouts/Header';
import Footer from '../layouts/Footer';
import avatar from '../../../images/ic_default_avatar.png';

export  default function Main(){
    const [currentPeerUser, setCurrentPeerUser] =  useState([]);
    const [detail, setDetail] =  useState([]);
    const [listUser, setListUser ]=   useState([]);
    const [role, setRole] = useState('');

    useEffect(() => {
        api.details().then(response => {
            setDetail(response.data)
            setRole(response.data.roles[0])
        })

        getListUser();
    },[]);

   

   function  getListUser() {

        api.getusers().then(response => {

            setListUser(response.data)
        })
    }




    function renderListUser (){    
        return listUser.map(user => {
            return(
                <>
                   {user.id !== detail.id ?  
                   <>
                    {role == "ROLE_NORMALUSER" ? 

                    <>
                    {(user.roles[0] != 'ROLE_NORMALUSER' && user.roles[0] != 'ROLE_ADMIN') ? 
                        <button key={user.id}
                            className={
                                currentPeerUser &&
                                currentPeerUser.id === user.id
                                    ? 'viewWrapItemFocused'
                                    : 'viewWrapItem'
                            }
                            onClick={() => { 
                                setCurrentPeerUser(user)
                            }}
                        >   
                        
                            <img
                                className="viewAvatarItem"
                                src={user.image}
                                alt="icon avatar"
                            />

                            <div className="viewWrapContentItem">
                                <span className="textItem" >
                                <b>{`${
                                    user.name
                                    }`}
                                </b></span>
                                <span className="textItem" style={{fontSize:'10px'}}>
                                    Role:&nbsp;
                                    {user.roles[0] == 'ROLE_ADMIN' ? 'Admin'
                                    : user.roles[0] == 'ROLE_PHARMACY' ? 'Pharmacy'
                                    :user.roles[0] == 'ROLE_DOCTOR' ? 'Doctor'
                                    : ''
                                    }
                                </span>
                            </div>
                        </button>
                            : ''}

                    </>
                    : 
                    
                    <button key={user.id}
                            className={
                                currentPeerUser &&
                                currentPeerUser.id === user.id
                                    ? 'viewWrapItemFocused'
                                    : 'viewWrapItem'
                            }
                            onClick={() => { 
                                setCurrentPeerUser(user)
                            }}
                        >
                             {user.image!= "" ?
                                <img
                                    className="viewAvatarItem"
                                    src={user.image}
                                    alt="icon avatar"
                                />
                                : 

                                <img
                                    className="viewAvatarItem"
                                    src={avatar}
                                    alt="icon avatar"
                                />
                            }
                            <div className="viewWrapContentItem">
                                <span className="textItem" >
                                <b>{`${
                                    user.name
                                    }`}
                                </b></span>
                                <span className="textItem" style={{fontSize:'10px'}}>
                                    Role:&nbsp;
                                    {user.roles[0] == 'ROLE_ADMIN' ? 'Admin'
                                    : user.roles[0] == 'ROLE_PHARMACY' ? 'Pharmacy'
                                    :user.roles[0] == 'ROLE_DOCTOR' ? 'Doctor'
                                    :user.roles[0] == 'ROLE_NORMALUSER' ? 'User'
                                    :''
                                    }
                                </span>
                            </div>
                        </button>
                        
                        }
                    
                        
                        
                    </>
                    : '' 
                    }

                       
                        
                </>
            )
        })
        
    }

  
    return (
        <div className="root">
            <Header/>
            <div className="body" style={{ marginTop:'81px' }}>
                <div className="viewListUser"> 
                    {listUser.length > 0 ? renderListUser() : ''}
                </div>

                <div className="viewBoard">
                    {currentPeerUser.length != 0 ? (
                        <ChatBoard
                            currentUser={detail}
                            currentPeerUser={currentPeerUser}
                        />
                    ) : (
                        <WelcomeBoard
                            currentUserNickname={detail.name}
                            currentUserAvatar={detail.image}
                        />
                    )}    
                </div>
            </div>
              
            <Footer/>
        </div>
    )

}
