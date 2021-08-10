import React,{useState} from 'react'
import {signup} from '../utils/auth'
import cookies from 'js-cookie'
import {useDispatch} from 'react-redux'
import toast from 'react-hot-toast';
import {setUserx,updatePhotoUrl} from '../store/Reducers/userReducer'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";

const SignUpForm = ({push})=>{

    const dispatch = useDispatch();
    const [username,setusername] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPass] = useState('')
    const [disabled,setDisabled] = useState(false)

    const Submited = (e)=>{
        setDisabled(true)
        e.preventDefault()
        signup({username,password,email}).then((data)=>{
            setDisabled(false)
            if (data.error) {
                toast.error("Email already in use")
                return console.log('something went wrong',data.error)
            }
            dispatch(setUserx(data.user))
            dispatch(updatePhotoUrl('/users/image?img='+data._id+'&ur='+ new Date().getTime()))
            cookies.set('token',data.token)
            push('/profile/'+data.user._id)
        })
    }

        return (
        <div className='loginform'>
            <h2 className='loginform__title'>SignUp</h2>
            <form className='loginform__form' onSubmit = {Submited}>
                <input className ='loginform__input' placeholder='User Name' required value={username} onChange = {(e)=> setusername(e.target.value)}/>
                <input className ='loginform__input' placeholder='Email' required value={email} onChange = {(e)=> setEmail(e.target.value)}/>
                <input className ='loginform__input' placeholder='Password' required type='password' value={password} onChange = {(e)=> setPass(e.target.value)}/>
                <button disabled = {disabled} className ='loginform__btn'>
                {
                    disabled ?
                    <Loader
                        type="ThreeDots"
                        color="#FFF"
                        height={20}
                        width={20}
                        timeout={9000} //3 secs
                    />
                    :
                    'SignUp'
                }
            </button>
            </form>
        </div>)
}

export default SignUpForm