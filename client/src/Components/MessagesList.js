import React, {useRef,useLayoutEffect } from 'react'
import Message from './Mesaage'
import { useSelector } from "react-redux";




const MessagesList = ({messages,partner})=>{

    const messagesEndRef = useRef(null)
    const chatboxref  = useRef()
    const user = useSelector((state) => state.user.user)
    
    useLayoutEffect(()=>{
        messagesEndRef.current.scrollIntoView({ behavior: "smooth",block: "end", inline: "nearest"})
    },[])

    useLayoutEffect(()=>{
        const shouldScrollToBottom = chatboxref.current.scrollTop + chatboxref.current.clientHeight + 200 >= chatboxref.current.scrollHeight
        if (shouldScrollToBottom) {
            messagesEndRef.current.scrollIntoView({ block: "end", inline: "nearest"})
        }
    },[messages])



    return (        
    <div ref={chatboxref}  className = "chatbox--messages">
        <ul className = 'MessagesList'>
        {messages.map((message,index)=>{
            return (
                <Message key ={index} {...message} own = {! (message.sender === user._id)} name= {partner.username} profilepic={ partner.photo_url ? partner._id : undefined } />
            )
        })}
        </ul>
        <div ref={messagesEndRef} />
    </div>
    )
}

export default MessagesList
