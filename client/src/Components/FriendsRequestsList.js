import React,{useEffect,useState} from 'react'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import {getFriendsRequests} from '../utils/UsersDataHandler'
import FriendRequest from './FriendRequest'

const FriendsRequestsList = ()=>{
const [Requests,setRequests] = useState([{}])
const [loading,setloading] = useState(true)

useEffect(()=>{
    getFriendsRequests().then((data)=>{
        setRequests(data)
        setloading(false)
    })
},[])

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
    <div>
        <ul className="item-list">
        {
            Requests.map((Request)=>(
                <li className = "item-list--item" key = {Request._id}>
                <FriendRequest Request={Request}/>
                </li>
            ))
        }
        </ul>
    </div>
)
}
export default FriendsRequestsList


