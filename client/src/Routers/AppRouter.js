import React from 'react';
import {BrowserRouter,Route,Switch} from 'react-router-dom'
import  { Toaster } from 'react-hot-toast';
import LoginPage from '../pages/LoginPage'
import ProfilePage from '../pages/ProfilePage'
import Waves from '../Components/Waves'
import ChatPage from '../pages/ChatPage'
import FriendsPage from '../pages/FriendsPage'
import PrivateRoute from './PrivateRoute'
import PublicRoute from './PublicRoute'


const App =() =>{

  return(
  <BrowserRouter>
    <>
      <Switch>
        <PublicRoute path ='/' component ={LoginPage} exact={true}/>
        <PrivateRoute path ='/Chat' component ={ChatPage}/>  
        <PrivateRoute path ='/friends' component ={FriendsPage}/> 
        <PrivateRoute path = '/profile' component= {ProfilePage}/>
        <Route  component= {()=><h1>Page Not Found</h1>}/>
      </Switch>
    </>
    <Toaster/>
    <Waves/>
  </BrowserRouter>
)}

export default App
