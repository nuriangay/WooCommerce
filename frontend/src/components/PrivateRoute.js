import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import {AuthStatus} from '../hooks/AuthStatus'
import Spinner from './Spinner'
const PrivateRoute = () => {

    const {loggedIn,check}=AuthStatus()

    if(check){
        return <Spinner/>
    }
  return  loggedIn ? <Outlet/> : <Navigate to={'/login'}/>
   
  
}

export default PrivateRoute
