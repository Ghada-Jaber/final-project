import React, {useState, useEffect} from 'react';
import ReactLoading from 'react-loading'
import images from '../Themes/Images'
import WelcomeBoard from '../WelcomeBoard/WelcomeBoard'
import './Main.css'
import ChatBoard from './../ChatBoard/ChatBoard'
import {AppString} from './../Const'

import api from '../../api'
import Header from '../layouts/Header';
import Footer from '../layouts/Footer';

export  default function Main(){
    const [currentPeerUser, setCurrentPeerUser] =  useState([]);
    const [detail, setDetail] =  useState([]);
    const [listUser, setListUser ]=   useState([])

    useEffect(() => {
        api.details().then(response => {
            setDetail(response.data)
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
                    <i  key={user.id}>
                   {user.id !== detail.id ?  
                        <button
                            key={user.id}
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
                <span className="textItem">{`${
                    user.name
                    }`}</span>
                    <span className="textItem">
                    role: &nbsp;
                    {user.roles[0] == 'ROLE_ADMIN' ? 'admin'
                    : user.roles[0] == 'ROLE_PHARMACY' ? 'pharmacy'
                    :user.roles[0] == 'ROLE_DOCTOR' ? 'doctor'
                    : 'normal user'
                    }</span>
                            </div>
                        </button>
                        : '' }
                </i>
                )
            })
        
    }

  
        return (
            <div className="root">
                {/* Header */}
                <Header/>

                <div className="body">
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

                {/* Dialog confirm */}
              
<Footer/>
            
            </div>
        )

}
