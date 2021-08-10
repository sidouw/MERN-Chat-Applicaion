import React,{useEffect,useState} from 'react'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import LastMessage from './LastMessage'
import ChatListFilter from './ChatListFilter'
import {getLastRoomMessage,getUserRooms} from '../utils/RoomsDataHandler'
import { useSelector } from 'react-redux';

const selectFriends = (friends,filter)=>{
    return friends.filter((friend)=>{
        if (friend.user.username) {
            return friend.user.username.toLowerCase().includes(filter.toLowerCase())
        }
        return false
    }).sort((a,b)=>{
        return a.message.icat < b.message.icat ? 1 :-1
})
}


const ChatList = ()=>{

    const [loading,setLoading] = useState(true)
    const [chatListData,setChatListData] = useState([])
    const [chatList,setChatList] = useState([])
    const [chatFilter,setchatFilter] = useState('')
    // const [discUser,setdiscUser] = useState('') 
    // const [conUser,setConUser] = useState('')
    const user = useSelector((state) => state.user.user);
    const message = useSelector((state) => state.chat.message);

    const getEntries =async ()=>{
        const Friends =[]
        const userRooms =  await getUserRooms()
        for (let index = 0; index < userRooms.length; index++) {
            const entry = {}
            entry.room = userRooms[index]
            entry.user = userRooms[index].users[0]._id === user._id ? userRooms[index].users[1] : userRooms[index].users[0]
            entry.message = await getLastRoomMessage(userRooms[index]._id)
            Friends.push(entry)
        }
        return selectFriends(Friends,chatFilter)
    }

    useEffect(()=>{
        
            getEntries().then((data)=>{
                    setChatListData([...data])
                    setChatList([ ...data])  
            
            // Socket Stuff TODO
            // socket.on('userdisconnected',(duser)=>{
            //     setdiscUser(duser)
            // })
    
            // socket.on('userconnected',cuser=>{
            //     setConUser(cuser)
                
            // })
            // socket.emit('online',user.contacts,(online)=>{
            //     online.forEach(onlinefriend => {
            //         setConUser(onlinefriend)
            //     })
            // })

            setLoading(false)
        })
    },[])


    // useEffect(()=>{
    //     chatListData.forEach(chat=>{
    //         if (chat.user._id===discUser) {
    //             chat.user.state = false
    //             setdiscUser('')
    //         }
    //     })
    //     setChatListData([...chatListData])
    //     setChatList([...chatListData])
    // },[discUser])

    // useEffect(()=>{
    //     chatListData.forEach(chat=>{
    //         if (chat.user._id===conUser) {
    //             chat.user.state = true
    //             setConUser('')
    //         }
    //     })
    //     setChatListData([...chatListData])
    //     setChatList([...chatListData])
    // },[conUser])

    useEffect(()=>{
        chatListData.forEach((chat)=>{
                if (chat.room._id === message.room)
                    chat.message = {...message}
        })
        setChatList([ ...chatListData])
    },[message])


    useEffect(()=>{
        setChatList([ ...selectFriends(chatListData,chatFilter)])
    },[message,chatFilter])

    return( 
        loading?
        <div className ='emptyChat' >
            <Loader
                type="Rings"
                color="#FFF"
                height={80}
                width={80}
                timeout={9000} //3 secs
            />
        </div>
        :
        chatListData.length==0?
        <div className ='emptyChat' >
           <span>Empty</span>
        </div>
        :
        <div className = 'Chatitem-list-container'>
            <ChatListFilter setchatFilter = {setchatFilter}  chatFilter = {chatFilter}/>
            <div className="Chatitem-list">
                {
                    chatList.map((message,index)=>(
                            <LastMessage key= {index} message ={message} />
                    ))
                }
            </div>
        </div>
    )
}

export default ChatList

