import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { reset } from '../store/auth/slice'
const AdminNavbar = () => {
  
  const dispatch=useDispatch()
  const navigate=useNavigate()

  const logout=()=>{
    localStorage.removeItem('user')
    localStorage.removeItem('allOrders')
    localStorage.removeItem('allUsers')
    dispatch(reset())
    
    navigate('/login')
  }
  return (
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
   
    <div class="container-fluid">
    
      <button
        class="navbar-toggler"
        type="button"
        data-mdb-toggle="collapse"
        data-mdb-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <i class="fas fa-bars"></i>
      </button>
  
    
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
    
        <a class="navbar-brand mt-2 mt-lg-0" href="#">
        <h3 className='admin-header'><b>Woo Commerce Admin</b></h3>
        </a>
      
     
      </div>
   
  
  
      <div class="d-flex align-items-center">
     
      <div class="btn-group dropleft">
  <button type="button" class="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    Dropleft
  </button>
  <div class="dropdown-menu">
 
    <button class="dropdown-item"  onClick={logout} type="button">Logout</button>
   
 
  </div>
</div>
      </div>
   
    </div>
 
  </nav>
  )
}

export default AdminNavbar
