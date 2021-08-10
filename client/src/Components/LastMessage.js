import React,{useState} from 'react'
import moment from 'moment'
import { useDispatch} from "react-redux";
import { setCurrentChat} from "../store/Reducers/chatReducer";

 const LastMessage = ({message})=>{

    const dispatch = useDispatch();
    
    const Clicked = ()=>{
        dispatch(setCurrentChat(message.room))
    }

    return (  
        <div className = 'last-chat-elem' onClick = {Clicked}>
            <div className = 'last-chat-elem__container'>
                {   message.user.photo_url ?
                    
                    <img height = '60px' width = "60px" src={'/users/image?img='+message.user._id} className ='last-chat-elem__image'  alt ='Profile pic '/>
                    :
                    <span className = 'last-chat-elem__span' >{message.user.username[0].toUpperCase()[0]}</span>
                }
                <div className ='last-chat-elem__content'>
                    <span className = 'last-chat-elem__user'>{message.user.username}</span> 
                    <div className ='last-chat-elem__content__data'>
                        <span className = 'last-chat-elem__message'>{message.message.body}</span>
                        {message.message.icat && <span className = 'last-chat-elem__time'>{moment.unix(message.message.icat).format("LT")}</span>}
                    </div>
                </div>
            </div>
        </div>
    )}

    export default LastMessage