import React, {Component} from 'react'

import './WelcomeBoard.css'
import images from '../Themes/Images'

export  default function WelcomeBoard(props){
    return (
       <div className="viewWelcomeBoard">
            <span className="textTitleWelcome">{`Welcome, ${
                props.currentUserNickname
                
                }`}</span>
                    {props.currentUserAvatar!= "" ?
                        <img
                            className="avatarWelcome"
                            src={props.currentUserAvatar}
                            alt="icon avatar"
                        />
                    : 

                        <img
                            className="avatarWelcome"
                            src={images.ic_default_avatar}
                            alt="icon avatar"
                        />
                    }
                    <span className="textDesciptionWelcome">
                    Let's start talking. Great things might happen.
            </span>
        </div>
        )
}