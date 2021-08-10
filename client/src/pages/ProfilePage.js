import React, {useCallback,useState} from 'react'
import {useDropzone} from 'react-dropzone'
import { useSelector,useDispatch} from "react-redux";
import {updatePhotoUrl} from "../store/Reducers/userReducer";
import toast from 'react-hot-toast'
import {uploadUserImage} from '../utils/UsersDataHandler'
const ProfilePage = ()=>{

    const disptach = useDispatch()
    const user = useSelector((state) => state.user.user);

    const handelFile = file=>{

        if (file.size > 1000000) {
            return toast.error('Image size larger than 1MB')
        }
        let reader = new FileReader()
        reader.readAsDataURL(file)
    
        reader.onloadend = ()=> {
                uploadUserImage(reader.result).then((()=>{
                disptach(updatePhotoUrl('/users/image?img='+user._id+'&ur='+ new Date().getTime()))
            }))
            }
    }
    const onDrop = useCallback(acceptedFiles => {
        acceptedFiles.forEach(file => {
          handelFile(file)
        });
      }
      , [])

      const {getRootProps, getInputProps, isDragActive,isDragAccept} = useDropzone({onDrop,multiple:false,accept: 'image/jpeg, image/png'})

    
    return (
        <div className = 'profile'>
            <div {...getRootProps({className :"profile__picture"})}>
                <input {...getInputProps()} />
                {
                    isDragActive ?
                    isDragAccept ?
                    <p>Drop the files here ...</p>
                    :
                    <p>Unsuported File Type please use a valid image ...</p>
                    :
                    user.photo_url ?
                    <img src={user.picture} alt ='Profile pic '/>
                    :
                    <span className ="profile__picture__span" >{user.username.toUpperCase()[0]}</span>
                }
                <div className ="profile__picture__veil"  >
                    <span>Upload a Picture</span>
                    <span>(max 1MB)</span>
                </div>
            </div>
            
            <h2 className = 'profile__name'> {user.username}</h2>
            <h3 className = 'profile__email'>Email : {user.email}</h3>
        </div>
    )
}

export default ProfilePage















// import {AddFriend,DeleteFriend} from '../utils/UsersDataHandler'
    // const handleAddFriend = ()=>{
    //     AddFriend(user.username).then(({error,ok})=>{
            
    //     })
    // }

    // const handleDeleteFriend = ()=>{
    //     DeleteFriend(user._id).then(data=>{
    //     })

    // }