import React, {useRef,useLayoutEffect,useCallback } from 'react'
import Message from './Mesaage'
import { useSelector } from "react-redux";




const MessagesList = ({messages,partner,endReached})=>{

    const messagesEndRef = useRef(null)
    const chatboxref  = useRef()
    const user = useSelector((state) => state.user.user)
    const [end,setEnd] = React.useState(false)
    const [oldHeight,setOldHeight] = React.useState(200)

    const observer = useRef()
    const lastMessagelementRef = useCallback(node => {
        if (observer.current) observer.current.disconnect()
        observer.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting ) {
            endReached()
            setEnd(true)
            setOldHeight(chatboxref.current.scrollHeight)
        }
        })
        if (node) observer.current.observe(node)
    }, [messages])


    useLayoutEffect(()=>{
        messagesEndRef.current.scrollIntoView({ behavior: "smooth",block: "end", inline: "nearest"})
    },[])

    useLayoutEffect(()=>{
        if (end) {      
            chatboxref.current.scrollTop= chatboxref.current.scrollHeight- oldHeight
            setEnd(false)
        }
    },[messages])

    useLayoutEffect(()=>{
        const shouldScrollToBottom = chatboxref.current.scrollTop + chatboxref.current.clientHeight + 200 >= chatboxref.current.scrollHeight
        if (shouldScrollToBottom) {
            messagesEndRef.current.scrollIntoView({ block: "end", inline: "nearest"})
        }


    },[messages])

    return (        
    <div ref={chatboxref}  className = "chatbox--messages">
        <ul className = 'MessagesList'>
        {messages.slice(0).map((message,index)=>{
            if (index ===0) {
                return(
                <React.Fragment key={index}>  
                    <div ref={lastMessagelementRef}></div>
                    <Message  {...message} own = {! (message.sender === user._id)} name= {partner.username} profilepic={ partner.photo_url ? partner._id : undefined } />
                </React.Fragment>
                )
              } else {
                return  <Message key ={index} {...message} own = {! (message.sender === user._id)} name= {partner.username} profilepic={ partner.photo_url ? partner._id : undefined } />
              }
        })}
        </ul>
        <div ref={messagesEndRef} />
    </div>
    )
}

export default MessagesList
