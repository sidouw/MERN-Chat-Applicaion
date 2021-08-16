import React,{useEffect,useState} from 'react'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import  moment  from 'moment';
import {getRoomMessages} from '../utils/RoomsDataHandler'
import MessagesList from './MessagesList'
import { useSelector,useDispatch } from 'react-redux'
import { updateRooms,chatSelector,updateRoomMessages} from "../store/Reducers/chatReducer";

const Chat = ({sendMessage})=>{

    const dispatch = useDispatch()
    const [partner,setPartner] = useState([{}]) 
    const [loading,setloading] = useState(false) 
    const [hasMore,setHasMore] = useState(false) 
    const [page,setPage] = useState(0)
    const user = useSelector((state) => state.user.user);
    const {currentChat:room,rooms} = useSelector(chatSelector);

    useEffect(()=>{
        
        if (room){
                setloading(true) 
                if (rooms[room._id] === undefined){
                    setPage(0)
                    getRoomMessages(room._id).then((roomMessages)=>{
                        dispatch(updateRooms({room:room._id,messages:roomMessages}))
                        if (roomMessages.length === 10){
                            setHasMore(true)
                        }
                        if(!room.error){
                            room.users.forEach(ruser => {
                                if(ruser._id !== user._id ){
                                    setPartner(ruser)
                                }
                            })
                            setloading(false)
                        }
                    })
                }else{
                        if(!room.error){
                            setHasMore(true)
                            setPage(Math.ceil(rooms[room._id].length/10))
                            room.users.forEach(ruser => {
                                if(ruser._id !== user._id ){
                                    setPartner(ruser)
                                }
                            })
                            setloading(false)
                        }
                    }
                }
                
    },[room])

    useEffect(()=>{
        if(hasMore){
            getRoomMessages(room._id,(page)*10).then((roomMessages)=>{
                dispatch(updateRoomMessages({room:room._id,messages:roomMessages}))
                setHasMore(roomMessages.length === 10)
            })

        }
    },[page])

    const handleSumbmit = (e)=>{
        e.preventDefault()
        const msg = e.target.elements[0].value
        if(msg.trim()!==''){
            const message = {sender:user._id,body:msg,room:room._id,receiver:partner._id,icat: moment().unix()}
            sendMessage(message)
            e.target.elements[0].value = ''
        }
    }
    const UpdateMessages = ()=>{
        setPage((prv)=> prv+1)

    }

    return(
        ! rooms[room._id] ?
        <div className ='emptyChat' >
            
            {
                loading ? 
                <Loader
                    type="Rings"
                    color="#FFF"
                    height={50}
                    width={50}
                    timeout={5000} //3 secs
                />
                :
                <>
                    <span>ʕ•͡ɛ•͡ʼʼʔ </span>
                    <span>Pick a Convo and start Chating </span>
                </>
            }
        </div>
        :
        room.error?
         <p>Empty</p>
        :
        <div className ="chatbox">
            <div className = 'chatbox__header'>
                <img height = '60px' width = "60px" src='/img/Happiness.jpg' className ='last-chat-elem__image'  alt ='Profile pic '/>
                <span className = 'chatbox__header__title'>{partner.username }</span>
            </div>
            {rooms[room._id] && <MessagesList messages = {rooms[room._id]}  partner = {partner} endReached= {UpdateMessages} />}
            <div className = "chatbox--input">
            
                <form className = "chatbox--input--form" onSubmit = {handleSumbmit}>
                
                    <input className = "chatbox--input--form--input" placeholder="message" name ="message" required autoComplete="off"/>
                    
                    <button  className = "chatbox--input--form--btn">
                    <svg
                        aria-hidden="true" focusable="false" data-prefix="fas" data-icon="external-link-square-alt" className="svg-inline--fa fa-external-link-square-alt fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M448 80v352c0 26.51-21.49 48-48 48H48c-26.51 0-48-21.49-48-48V80c0-26.51 21.49-48 48-48h352c26.51 0 48 21.49 48 48zm-88 16H248.029c-21.313 0-32.08 25.861-16.971 40.971l31.984 31.987L67.515 364.485c-4.686 4.686-4.686 12.284 0 16.971l31.029 31.029c4.687 4.686 12.285 4.686 16.971 0l195.526-195.526 31.988 31.991C358.058 263.977 384 253.425 384 231.979V120c0-13.255-10.745-24-24-24z"></path>
                    </svg>

                    </button>
                </form>
            </div>
        </div>
    )

}


export default Chat