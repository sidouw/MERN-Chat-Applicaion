import React,{useEffect,useState} from 'react'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import toast from 'react-hot-toast'
import {getFriends} from '../utils/UsersDataHandler'
import { useSelector } from 'react-redux';
import {DeleteFriend} from '../utils/UsersDataHandler'
const FriendsList = ()=>{
const [friends,setfriends] = useState([{}])
const [loading,setloading] = useState(true)
const user = useSelector((state) => state.user.user);

useEffect(()=>{
    getFriends(user._id).then((data)=>{
        setfriends(data)
        setloading(false)
    })
},[user._id])

const handleDelete = (id)=>{
    DeleteFriend(id).then(data=>{
                const filter = friends.filter(f=>{
                    return f._id !== id
                })
                setfriends([...filter])
                toast.success('Friend deleted !')
            })
}

return(
    loading?
    <div className ='emptyChat' >
        <Loader
            type="Rings"
            color="#FFF"
            height={50}
            width={50}
            timeout={5000} //3 secs
        />
    </div>
    :
    <div >
    <ul className="item-list">
    {
        friends.map((friend)=>(
            <li className = "item-list--item" key = {friend._id} >
                    {            
                        friend.photo_url ?
                        <img src={'/users/image?img='+friend._id} alt ='Profile pic '/>
                        :
                        <span className ="item-list__span" >{friend.username.toUpperCase()[0]}</span>
                    }
                    <span className="item-list--item-text">{friend.username}</span>
                    <div onClick = {()=>handleDelete(friend._id)}  className ="chat-link">
                        <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="user-minus"  role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
                            <path fill="currentColor" d="M624 208H432c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h192c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16zm-400 48c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z"></path>
                        </svg>
                    </div>
            </li>
        ))
    }
    </ul>
    </div>
)
}
export default FriendsList


