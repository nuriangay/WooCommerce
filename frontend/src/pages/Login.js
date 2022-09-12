import {useState,useEffect} from 'react'
import { Link,useNavigate,useLocation } from 'react-router-dom'
import {useSelector,useDispatch} from 'react-redux'
import Spinner from '../components/Spinner'
import {login} from '../store/auth/slice'
import {toast} from 'react-toastify'
const Login = () => {

  const navigate=useNavigate()
  const dispatch=useDispatch()
  const location=useLocation()

  const {error,success,loading,message,user}=useSelector(state=>state.auth)

  
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')

  const SignIn=()=>{
    const userData={email,password}
    dispatch(login(userData))



  
  }



  useEffect(()=>{

    if(success){
      toast.success(message)
      
    //  const {pathname}=location?.state?.from
    //  const from =`${pathname}` || '/'

     setTimeout(()=>{
      if(user.isAdmin){
        navigate('/admin')
      }else{
        navigate('/')
      }
     },4000)
 

    }
    if(error){
      toast.error(message)
    }



  },[error,message,navigate,success])

  if(loading){
    return <Spinner/>
  }
  return (
    
    <div className="container">
    <div className="row">
   
      <div className="col-sm-9  mt-5 col-md-7 col-lg-5 mx-auto">
      <h1 className='mt-3  text-center'>WOO-COMMERCE</h1>
        <div  className="card  border-0 shadow rounded-3 my-5 card1">
          <div className="card-body p-4 p-sm-5">
            <h5 className="card-title text-center mb-5 fw-light fs-5">Sign In</h5>
            <form>
              <div className="form-floating mb-3">
              <label for="floatingInput">Email address</label>
                <input type="email"   name='email' value={email} onChange={(e)=>setEmail(e.target.value)} className="form-control" id="floatingInput" placeholder="name@example.com"/>
               
              </div>
              <div className="form-floating mb-3">
              <label for="floatingPassword">Password</label>
                <input type="password" name='password' value={password} onChange={(e)=>setPassword(e.target.value)} className="form-control" id="floatingPassword" placeholder="Password"/>
               
              </div>

          
                <Link style={{color:'black'}} to='/register'>Don't have an account? Register</Link>
              
              <div className="d-grid mt-3">
                <button className="btn btn-danger btn-login text-uppercase fw-bold" onClick={SignIn} type="submit">Login
                  </button>
              </div>
           
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Login
