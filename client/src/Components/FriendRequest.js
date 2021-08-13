import React,{useState} from 'react'
import {HandleRequest} from '../utils/UsersDataHandler'
import {addRoom} from '../utils/RoomsDataHandler'
import {useDispatch } from 'react-redux';
import toast from 'react-hot-toast'
import {updateContacts} from '../store/Reducers/userReducer'
import {updateRooms} from '../store/Reducers/chatReducer'


const FriendRequest = ({Request})=>{

    const dispatch = useDispatch()
    const [disable,setdisable] = useState(false)

    const accept = ()=>{
        setdisable(true)
        HandleRequest(Request._id,'A').then(data=>{
            dispatch(updateContacts(Request._id))
            addRoom(Request._id).then((ret)=>{
                if (!ret.error)
                    toast.success("Accepted")
                    dispatch(updateRooms({room:ret,messages:[]}))
            })
        })
        
    }   

    const decline = ()=>{
        setdisable(true)
        HandleRequest(Request._id,'D').then(data=>{
            toast.error("Declined")
        })
    }   

    return (
        <div className="Reqeust">
            {            
                Request.photo_url ?
                <img src={'/users/image?img='+Request._id} alt ='Profile pic '/>
                :
                <span className ="item-list__span" >{Request.username.toUpperCase()[0]}</span>
            }
            <span className="Reqeust__text">{Request.username}</span>
            <button onClick ={accept} disabled ={disable}>
                <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="check" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path fill="currentColor" d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"></path>
                </svg>
            </button>
            <button onClick = {decline} disabled ={disable}> 
                <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="times" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 352 512">
                    <path fill="currentColor" d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"></path>
                </svg>
            </button>
        </div>
    )
}

export default FriendRequest