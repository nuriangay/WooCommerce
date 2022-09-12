import {useState,useEffect} from 'react'
import { useSelector } from 'react-redux'

 export const AuthStatus = () => {

    const [loggedIn,setLoggedIn]=useState(false)
    const [check,setCheck]=useState(true)

    const {user}=useSelector(state=>state.auth)


    useEffect(() => {
        if(user){
            setLoggedIn(true)
        }else{
            setLoggedIn(false)
        }
        setCheck(false)
    }, [user])
  return (
    {loggedIn,check}
  )
}


