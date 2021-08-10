import React,{useState} from 'react'
import cookies from 'js-cookie'
import {login} from '../utils/auth'
import {useDispatch} from 'react-redux'
import toast from 'react-hot-toast';
import {setUserx,updatePhotoUrl} from '../store/Reducers/userReducer'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
const LoginForm = ({push})=>{

const dispatch = useDispatch();
const [user,setUsernaem] = useState('')
const [pass,setPass] = useState('')
const [disabled,setDisabled] = useState(false)

const Submited = (e)=>{
    setDisabled(true)
    e.preventDefault()
    login(e.target.elements[0].value,e.target.elements[1].value)
    .then((data)=>{
        if (data.error) {
            toast.error("Wrong Username or Password")
            setDisabled(false)
        }else{
            dispatch(setUserx(data.user))
            dispatch(updatePhotoUrl('/users/image?img='+data._id+'&ur='+ new Date().getTime()))
            cookies.set('token',data.token)
            push('/profile/'+data.user._id)
        }
    })
}

    return (
        
    <div className='loginform'>
        <h2 className='loginform__title'>Login</h2>
        <form className='loginform__form'  onSubmit = {Submited}>
            <input className ='loginform__input' placeholder='User Name' value={user} autoComplete='username' required onChange = {(e)=> setUsernaem(e.target.value)}/>
            <input className ='loginform__input' placeholder='Password' type='password' required autoComplete='current-password' value={pass} onChange = {(e)=> setPass(e.target.value)}/>
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
                    'Login'
                }
            </button>
        </form>
    </div>)
}

export default LoginForm