import moment from 'moment'
import React, {useState, useEffect} from 'react';
import ReactLoading from 'react-loading'
import 'react-toastify/dist/ReactToastify.css'
import images from '../Themes/Images'
import './ChatBoard.css'
import {AppString} from './../Const'


import firebase from 'firebase';
import config from '../firebase/config';

import api from '../../api';




if (!firebase.apps.length) {
  firebase.initializeApp(config);
}else {
firebase.app(); // if already initialized
}

if ("serviceWorker" in navigator) {
navigator.serviceWorker
  .register("./firebase-messaging-sw.js")
  .then(function(registration) {
    console.log("Registration successful, scope is:", registration.scope);
  })
  .catch(function(err) {
    console.log("Service worker registration failed, error:", err);
  });
}

const db = firebase.firestore();
db.settings({
 timestampsInSnapshots: true
});

export  default function ChatBoard(props){



    const [detail, setDetail] =  useState('');
    const [listUser, setListUser] =   useState([]);
    const[isShowSticker, setIsShowSticker] = useState(false);

    const[inputValue, setInputValue] = useState('');

    const[groupChatId, setGroupChatId] = useState();

    const[messages, setMesssages] = useState([]);

    let currentPeerUser = props.currentPeerUser;
    
    
    let removeListener = null;
    let currentPhotoFile = null;
    let messagesEnd= null;
    let refInput = null;
    

    useEffect(() => {
        api.details().then(response => {
            setDetail(response.data)

            getListHistory(response.data.id)
        })

        

    },[]);

          

    // componentDidUpdate() {
    //     this.scrollToBottom()
    // }

  

    // componentWillUnmount() {
    //     if (this.removeListener) {
    //         this.removeListener()
    //     }
    // }

    function getListHistory(user_id) {
        let listMessage = [];
        let groupChatId = "";
        if (removeListener) {
            removeListener()
        }
       listMessage.length = 0
        if (
            hashString(user_id) <=
            hashString(currentPeerUser.id)
        ) {
            groupChatId = `${user_id}-${currentPeerUser.id}`;
        } else {
            groupChatId = `${currentPeerUser.id}-${user_id}`;
        }


        setGroupChatId(groupChatId);

       

        removeListener = db.collection('messages')
            .doc(groupChatId)
            .collection(groupChatId)
            .onSnapshot(
                snapshot => {
                    snapshot.docChanges().forEach(change => {
                        console.log(change.doc.data())
                        if (change.type === 'added') {
                            listMessage.push(change.doc.data())
                        }
                    })
                
                },
                err => {
                   
                }
            )
setMesssages(listMessage);


    }

    function openListSticker(){

        setIsShowSticker(!isShowSticker)

    }

    function onSendMessage (content, type){
        if (isShowSticker && type === 2) {
            setIsShowSticker(false)
        }

        if (content.trim() === '') {
            return
        }

        const timestamp = moment()
            .valueOf()
            .toString()

        const itemMessage = {
            idFrom: detail.id,
            idTo: currentPeerUser.id,
            timestamp: timestamp,
            content: content.trim(),
            type: type
        }


        db.collection('messages')
            .doc(groupChatId)
            .collection(groupChatId)
            .doc(timestamp)
            .set(itemMessage)
            .then(() => {
                setInputValue('')
            })
            .catch(err => {
            })
    }

    function onChoosePhoto(event){
        if (event.target.files && event.target.files[0]) {
            currentPhotoFile = event.target.files[0]
            // Check this file is an image?
            const prefixFiletype = event.target.files[0].type.toString()
            if (prefixFiletype.indexOf(AppString.PREFIX_IMAGE) === 0) {
                uploadPhoto()
            }
        }
    }

    function uploadPhoto(){
        if (currentPhotoFile) {
            const timestamp = moment()
                .valueOf()
                .toString()

            const uploadTask = myStorage
                .ref()
                .child(timestamp)
                .put(currentPhotoFile)

            uploadTask.on(
                AppString.UPLOAD_CHANGED,
                null,
                err => {
                },
                () => {
                    uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
                        onSendMessage(downloadURL, 1)
                    })
                }
            )
        } else {
        }
    }

    function onKeyboardPress(event) {
        if (event.key === 'Enter') {
            onSendMessage(inputValue, 0)
        }
    }

    function scrollToBottom(){
        if (messagesEnd) {
            messagesEnd.scrollIntoView({})
        }
    }

   
        return (
            <div className="viewChatBoard">
                <div className="headerChatBoard">
                    <img
                        className="viewAvatarItem"
                        src={currentPeerUser.image}
                        alt="icon avatar"
                    />
                    <span className="textHeaderChatBoard">
            {currentPeerUser.name}
          </span>
                </div>

                {/* List message */}
                <div className="viewListContentChat">
                    {messages.length >0 ?  renderListMessage() : 
                        <div className="viewWrapSayHi">
                    <span className="textSayHi">Say hi to new friend</span>
                    <img
                        className="imgWaveHand"
                        src={images.ic_wave_hand}
                        alt="wave hand"
                    />
                </div>
                }
                    <div
                        style={{float: 'left', clear: 'both'}}
                        ref={el => {
                            messagesEnd = el
                        }}
                    />
                </div>

                {/* Stickers */}
                {isShowSticker ? renderStickers() : null}

                {/* View bottom */}
                <div className="viewBottom">
                   <a> <img
                        className="icOpenGallery"
                        src={images.ic_photo}
                        alt="icon open gallery"
                        onClick={() => refInput.click()}
                    />
                    </a>
                     <input className="hoverinput"
                        ref={el => {
                            refInput = el
                        }}
                        accept="image/*"
                        className="viewInputGallery"
                        type="file"
                        onChange={onChoosePhoto}
                    />

                   <a> <img
                        className="icOpenSticker"
                        src={images.ic_sticker}
                        alt="icon open sticker"
                        onClick={openListSticker}
                    /> </a>

                    <input
                        className="viewInput"
                        placeholder="Type your message..."
                        value={inputValue}
                        onChange={event => {
                            setInputValue(event.target.value)
                        }}
                        onKeyPress={onKeyboardPress}
                    />
                   <a> <img
                        className="icSend"
                        src={images.ic_send}
                        alt="icon send"
                        onClick={() => onSendMessage(inputValue, 0)}
                    />
                    </a>
                </div>

            </div>
        )
    
    
    function renderListMessage(){
            let viewListMessage = []
            messages.forEach((message, index) => {
                if (message.idFrom === detail.id) {
                    // Item right (my message)
                    if (message.type === 0) {
                        viewListMessage.push(
                            <div className="viewItemRight" key={message.timestamp}>
                                <span className="textContentItem">{message.content}</span>
                            </div>
                        )
                    } else if (message.type === 1) {
                        viewListMessage.push(
                            <div className="viewItemRight2" key={message.timestamp}>
                                <img
                                    className="imgItemRight"
                                    src={message.content}
                                    alt="content message"
                                />
                            </div>
                        )
                    } else {
                        viewListMessage.push(
                            <div className="viewItemRight3" key={message.timestamp}>
                                <img
                                    className="imgItemRight"
                                    src={getGifImage(message.content)}
                                    alt="content message"
                                />
                            </div>
                        )
                    }
                } else {
                    // Item left (peer message)
                    if (message.type === 0) {
                        viewListMessage.push(
                            <div className="viewWrapItemLeft" key={message.timestamp}>
                                <div className="viewWrapItemLeft3">
                                    {isLastMessageLeft(index) ? (
                                        <img
                                            src={currentPeerUser.image}
                                            alt="avatar"
                                            className="peerAvatarLeft"
                                        />
                                    ) : (
                                        <div className="viewPaddingLeft"/>
                                    )}
                                    <div className="viewItemLeft">
                                        <span className="textContentItem">{message.content}</span>
                                    </div>
                                </div>
                                {isLastMessageLeft(index) ? (
                                    <span className="textTimeLeft">
                    {moment(Number(message.timestamp)).format('ll')}
                  </span>
                                ) : null}
                            </div>
                        )
                    } else if (message.type === 1) {
                        viewListMessage.push(
                            <div className="viewWrapItemLeft2" key={message.timestamp}>
                                <div className="viewWrapItemLeft3">
                                    {isLastMessageLeft(index) ? (
                                        <img
                                            src={currentPeerUser.image}
                                            alt="avatar"
                                            className="peerAvatarLeft"
                                        />
                                    ) : (
                                        <div className="viewPaddingLeft"/>
                                    )}
                                    <div className="viewItemLeft2">
                                        <img
                                            className="imgItemLeft"
                                            src={messsage.content}
                                            alt="content message"
                                        />
                                    </div>
                                </div>
                                {isLastMessageLeft(index) ? (
                                    <span className="textTimeLeft">
                    {moment(Number(messsage.timestamp)).format('ll')}
                  </span>
                                ) : null}
                            </div>
                        )
                    } else {
                        viewListMessage.push(
                            <div className="viewWrapItemLeft2" key={message.timestamp}>
                                <div className="viewWrapItemLeft3">
                                    {isLastMessageLeft(index) ? (
                                        <img
                                            src={currentPeerUser.image}
                                            alt="avatar"
                                            className="peerAvatarLeft"
                                        />
                                    ) : (
                                        <div className="viewPaddingLeft"/>
                                    )}
                                    <div className="viewItemLeft3" key={message.timestamp}>
                                        <img
                                            className="imgItemLeft"
                                            src={getGifImage(message.content)}
                                            alt="content message"
                                        />
                                    </div>
                                </div>
                                {isLastMessageLeft(index) ? (
                                    <span className="textTimeLeft">
                    {moment(Number(message.timestamp)).format('ll')}
                  </span>
                                ) : null}
                            </div>
                        )
                    }
                }
            })
            return viewListMessage
    }

    function renderStickers(){
        return (
            <div className="viewStickers">
                <a><img
                    className="imgSticker"
                    src={images.mimi1}
                    alt="sticker"
                    onClick={() => onSendMessage('mimi1', 2)}
                />
                </a>
                <a>
                <img
                    className="imgSticker"
                    src={images.mimi2}
                    alt="sticker"
                    onClick={() => onSendMessage('mimi2', 2)}
                />
                </a>

                <a>
                <img
                    className="imgSticker"
                    src={images.mimi3}
                    alt="sticker"
                    onClick={() => onSendMessage('mimi3', 2)}
                />
                </a>
                <a>
                <img
                    className="imgSticker"
                    src={images.mimi4}
                    alt="sticker"
                    onClick={() => onSendMessage('mimi4', 2)}
                />
                </a>
                <a>
                <img
                    className="imgSticker"
                    src={images.mimi5}
                    alt="sticker"
                    onClick={() => onSendMessage('mimi5', 2)}
                />
                </a>
                <a>
                <img
                    className="imgSticker"
                    src={images.mimi6}
                    alt="sticker"
                    onClick={() => onSendMessage('mimi6', 2)}
                />
                </a>
                <a>
                <img
                    className="imgSticker"
                    src={images.mimi7}
                    alt="sticker"
                    onClick={() => onSendMessage('mimi7', 2)}
                />
                </a>
                <a>
                <img
                    className="imgSticker"
                    src={images.mimi8}
                    alt="sticker"
                    onClick={() => onSendMessage('mimi8', 2)}
                />
                </a>
                <a>
                <img
                    className="imgSticker"
                    src={images.mimi9}
                    alt="sticker"
                    onClick={() => onSendMessage('mimi9', 2)}
                />
                </a>
            </div>
        )
    }

    function hashString(str){
        let hash = 0
        for (let i = 0; i < str.length; i++) {
            hash += Math.pow(str.charCodeAt(i) * 31, str.length - i)
            hash = hash & hash // Convert to 32bit integer
        }
        return hash
    }

    function getGifImage(value) {
        switch (value) {
            case 'mimi1':
                return images.mimi1
            case 'mimi2':
                return images.mimi2
            case 'mimi3':
                return images.mimi3
            case 'mimi4':
                return images.mimi4
            case 'mimi5':
                return images.mimi5
            case 'mimi6':
                return images.mimi6
            case 'mimi7':
                return images.mimi7
            case 'mimi8':
                return images.mimi8
            case 'mimi9':
                return images.mimi9
            default:
                return null
        }
    }

    function isLastMessageLeft(index) {
        if (
            (index + 1 < listMessage.length &&
                listMessage[index + 1].idFrom === detail.id) ||
            index === listMessage.length - 1
        ) {
            return true
        } else {
            return false
        }
    }

    function isLastMessageRight(index) {
        if (
            (index + 1 < listMessage.length &&
                listMessage[index + 1].idFrom !== detail.id) ||
            index === listMessage.length - 1
        ) {
            return true
        } else {
            return false
        }
    }
}