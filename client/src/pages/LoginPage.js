import React,{useEffect} from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import {authanticate} from '../utils/auth'
import cookies from 'js-cookie'
import LoginForm from '../Components/LoginForm'
import SignUpForm from '../Components/SignUpForm'
import {useDispatch} from 'react-redux'
import {setLoged} from '../store/Reducers/userReducer'


const LoginPage = (props)=>{
  const dispatch = useDispatch()
  useEffect(()=>{
    const token = cookies.get('token')
    if(token){
      authanticate(token).then((data)=>{
        if (!data.error) {
          dispatch(setLoged(true))
        }
      })
    }
  })

    return (
    <div className = 'boxLayout'>
      <Tabs>
        <TabList>
          <Tab>Login</Tab>
          <Tab>SignUp</Tab>
        </TabList>

        <TabPanel>
            <LoginForm push = {props.history.push} />
        </TabPanel>
        <TabPanel>
          <SignUpForm push = {props.history.push} />
        </TabPanel>
      </Tabs>
    </div>
)}


export default LoginPage