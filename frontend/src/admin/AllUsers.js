import {useState,useEffect} from 'react'
import AdminNavbar from '../components/AdminNavbar'
import AdminSidebar from '../components/AdminSidebar/AdminSidebar'


import axios from 'axios'
import { toast } from 'react-toastify'
import moment from 'moment'
import Spinner from '../components/Spinner'
const AllUsers = () => {

    const [loading,setLoading]=useState(false)
    const [users,setUsers]=useState([])

    const getAllUsers=async()=>{
        try {
            setLoading(true)

            const response=await axios.get('/users',{headers:{Authorization:`Bearer ${JSON.parse(localStorage.getItem('user')).token}`}})
        
            setLoading(false)

            if(response.data.success){
                setUsers(response.data.data)
                localStorage.setItem('allUsers',JSON.stringify(response.data.data))
            }
        } catch (error) {
            setLoading(false)
            toast.error('Something went wrong')
            
        }
    }

    const blockUser=async(id)=>{

        try {
            setLoading(false)
            const response=await axios.delete(`/users/delete-user/${id}`,{headers:{Authorization:`Bearer ${JSON.parse(localStorage.getItem('user')).token}`}})

            setLoading(true)

            if(response.data.success){
                toast.success(response.data.msg)
            }
        } catch (error) {
            setLoading(false)
            toast.error(error.response.data.message)
        }

    }

    useEffect(()=>{

        getAllUsers()
    },[])

    if(loading){
        return <Spinner/>
    }
  return (

   <>
   <AdminNavbar/>
   <AdminSidebar/>

   <table className="table align-middle mb-0 bg-white">
  <thead className="bg-light">
    <tr>
      <th>Full Name</th>
      <th>Email</th>
      <th>Status</th>
      <th>Create Time</th>
      <th>Block user</th>
    </tr>
  </thead>
  <tbody>
  {users.length>0 &&users.map((user)=>{
    return   <tr>
    <td>
      <div className="d-flex align-items-center">
       
        <div className="ms-3">
          <p className="fw-bold mb-1">{user.fullName}</p>
        
        </div>
      </div>
    </td>
    <td>
      <p className="fw-normal mb-1">{user.email}</p>
    
    </td>
    <td>
      <p className="fw-normal mb-1">{user.isAdmin ? 'Admin' :'Client'}</p>
    
    </td>
    <td>
      <span className="rounded-pill d-inline">{moment(user.createdAt).format('ll')}</span>
    </td>
    <td>{user.isAdmin ? <button disabled className='btn btn-danger' onClick={()=>blockUser(user._id)}>Block</button> :(<button className='btn btn-danger' onClick={()=>blockUser(user._id)}>Block</button>)}</td>
  </tr>
 
  })}
  </tbody>
</table>


   </>
  )
}

export default AllUsers
