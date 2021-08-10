import React from 'react'
import toast from 'react-hot-toast'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import {AddFriend} from '../utils/UsersDataHandler'

const AddFriends = ()=>{

    const [FName,setFName]= React.useState('')
    const [Buttondisabled,setButtondisabled]= React.useState(false)

    const handleAdd = (e)=>{
        e.preventDefault()
        setButtondisabled(true)
        if(FName.trim() !==''){
            AddFriend(FName).then(({error})=>{
                if(error){
                    toast.error(error)
                }else{
                    toast.success("Request Sent")
                }
                setFName('')
                setButtondisabled(false)
            })
        }

    }
    const valueChanged =e=>{
       setFName(e.target.value)
    }
    return (
        <>
            <h2>Add Friends</h2>
            <form className='friendadd-form' onSubmit = {handleAdd}>
                <input placeholder = "Friend Name" value = {FName} onChange = {valueChanged}/>
                <button disabled = {Buttondisabled}>
                {
                    Buttondisabled ?
                    <Loader
                        type="ThreeDots"
                        color="#FFF"
                        height={20}
                        width={20}
                        timeout={9000} //3 secs
                    />
                    :
                    'Add'
                }</button>
            </form>
        </>
    )
}


export default AddFriends