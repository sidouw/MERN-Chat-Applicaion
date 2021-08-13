import React,{useState,useEffect,useRef} from 'react'
import io from 'socket.io-client'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import Chat from '../Components/Chat'
import ChatList from '../Components/ChatList'
import { useSelector,useDispatch } from "react-redux";
import {updateMessage} from '../store/Reducers/chatReducer'

const ChatPage = ()=>{
    
const socket = useRef()
const [loading,setloading] = useState(true)

const dispatch = useDispatch()
const user = useSelector((state) => state.user.user);

    useEffect(()=>{
        socket.current = io.connect('/chat')
        socket.current.emit('join',user._id,user.contacts)
        socket.current.on('message',msg=>{dispatch(updateMessage(msg))})

        socket.current.on('ping',(pong)=>{
            if (pong){
                pong()
            }
            
        })
    
        setloading(false)
        return ()=>{
            socket.current.emit('leave',user._id)
        }
    },[])


    const sendMessage = message=>{
        dispatch(updateMessage(message))
        socket.current.emit('sendMessage',message)
    }

    return (
        loading ? 
        <div className ='emptyChat' >
            <Loader
                type="Puff"
                color="#FFF"
                height={200}
                width={200}
                timeout={10000} //3 secs
            />
        </div>
        :

        <div className ="chat-page-container">
            <div className = "chatList">
                <ChatList socket={socket.current} />
            </div>
            <div className = "chatBox">
                <Chat sendMessage= {sendMessage}/>
            </div>
            <div className = "chatOptions">
                <div className = "chatOption-Container">
                    <div className = "chatOption-Container__userInfo">
                        <img src = '/img/Happiness.jpg'/>
                        <span> User Name </span>
                    </div>

                </div>
            </div>
        </div>

        
    )

}


export default ChatPage
