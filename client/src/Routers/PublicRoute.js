import React,{useEffect,useState} from 'react'
import {Route,Redirect} from 'react-router-dom'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import {authanticate} from '../utils/auth'
import {useSelector,useDispatch} from 'react-redux'
import {setLoged,setUserx} from '../store/Reducers/userReducer'


const PublicRoute= ({component:Component,...rest})=>{
    const dispatch = useDispatch()
    const [loading,setloading] = useState(true)
    const {isloged,user} = useSelector(state => state.user)
    useEffect(()=>{
        authanticate().then((data)=>{
            if(data){
                if (data.error) {
                    dispatch(setLoged(false))
                    setloading(false)
                    return
                }else if (data._id){
                    dispatch(setUserx(data))
                    dispatch(setLoged(true))
                    setloading(false)
                }
            }else{
                dispatch(setLoged(false))
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
            !isloged ?
            <div>
            <Component {...props}/>
            </div> 
            :
            <Redirect to={'/profile/'+user._id}/>
        )} />
    )

} 

export default PublicRoute