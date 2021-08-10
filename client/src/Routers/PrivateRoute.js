import React,{useEffect,useState} from 'react'
import {Route,Redirect} from 'react-router-dom'
import cookie from 'js-cookie'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import {authanticate} from '../utils/auth'
import Header from '../Components/Header'
import {useSelector,useDispatch} from 'react-redux'
import {setLoged,setUserx,updatePhotoUrl} from '../store/Reducers/userReducer'

const PrivateRoute= ({component:Component,...rest})=>{
    const dispatch = useDispatch()
    const [loading,setloading] = useState(true)
    const isloged = useSelector(state => state.user.isloged)

    useEffect(()=>{
        authanticate(cookie.get('token')).then((data)=>{
            if (data.error) {
                dispatch(setLoged(false))
                setloading(false)
                return
            }else if (data._id){
                dispatch(setUserx(data))
                dispatch(updatePhotoUrl('/users/image?img='+data._id+'&ur='+ new Date().getTime()))
                dispatch(setLoged(true))
                setloading(false)
            }
        })

    })
    return(
        loading ? 
        <div className ='boxLayout' >
            <Loader
                type="Rings"
                color="#FFF"
                height={150}
                width={150}
                timeout={10000} //3 secs
            />
        </div>
        :
        <Route {...rest} component = {(props)=>(
            isloged ?
            <>
            <Header/>
            <div className ='mainContent'>
                <Component {...props}/>
            </div>
            </> 
            :
            <Redirect to='/'/>
        )} />
    )

} 

export default PrivateRoute