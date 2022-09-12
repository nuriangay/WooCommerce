import {useState,useEffect} from 'react'
import Navbar from '../components/Navbar'
import { Form,Button } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'
import Spinner from '../components/Spinner'
const Profile = () => {

  const {userId}=useParams()

  const [profile,setProfile]=useState({})
  const [loading,setLoading]=useState(false)

  const [fullName,setFullName]=useState('')
  const [email,setEmail]=useState('')

  const getProfile=async()=>{
    try {
      setLoading(true)

      const response=await axios.get(`/users/${userId}`,{
        headers:{Authorization:`Bearer ${JSON.parse(localStorage.getItem('user')).token}`}
      })
      setLoading(false)

      if(response.data.success){
        setProfile(response.data.data)

      }
      
    } catch (error) {
      setLoading(false)
      toast.error('Something went wrong')
    }
  }

  const updateProfile=async()=>{
    try {
      setLoading(true)

      const response=await axios.post(`/users/${userId}`,{fullName,email},{
        headers:{Authorization:`Bearer ${JSON.parse(localStorage.getItem('user')).token}`}
      })
      setLoading(false)

      if(response.data.success){
        toast.success(response.data.msg)
      }
    } catch (error) {
      setLoading(false)
      toast.error(error.response.data.message)
    }
  }

  useEffect(()=>{

    getProfile()

    setFullName(profile.fullName)
    setEmail(profile.email)

    },[profile.fullName,profile.email])

    if(loading){
      return <Spinner/>
    }
  return (
    <>
    <Navbar/>
    
    <h1 className='mt-3 ml-5  ' style={{color:'black',fontSize:'20px'}}><b>Update Your Profile Information</b></h1>

    <div style={{float:'left',height:'350px'}}  className='container  col-md-3 ml-5 mt-3 border-0 shadow rounded-3'>

        <div className='mt-5 ' >

      
      <Form.Group className="mb-3" >
        <Form.Label>Full Name</Form.Label>
        <Form.Control value={fullName} onChange={(e)=>setFullName(e.target.value)} type="text" placeholder="Full Name" />
        <Form.Text className="text-muted">
        
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" >
        <Form.Label>Email</Form.Label>
        <Form.Control value={email} onChange={(e)=>setEmail(e.target.value)} type="email" placeholder="Email" />
      </Form.Group>
      <Button variant="primary" type="button" onClick={updateProfile} className='btn btn-dark btn-block mt-5 update-button'>
        Submit
      </Button>
   
        </div>
    </div>
    
    </>
  )
}

export default Profile
