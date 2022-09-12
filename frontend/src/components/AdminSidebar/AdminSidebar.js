import React from 'react'
import './sidebar.scss'
import { Link } from 'react-router-dom'
const AdminSidebar = () => {
  return (
    <>
  
<header>

  <nav id="sidebarMenu" className="collapse d-lg-block sidebar collapse bg-white  ">
    <div className="position-sticky ">
      <div className="list-group list-group-flush mx-3 mt-4">
        <Link
          to={'/admin'}
          className="list-group-item list-group-item-action py-2 ripple"
          aria-current="true"
        >
          <i className="fas fa-tachometer-alt fa-fw me-3"></i><span>Main dashboard</span>
        </Link>
    
        <Link to="/admin/all-orders" class="list-group-item list-group-item-action py-2 ripple"
          ><i className="fas fa-chart-bar fa-fw me-3"></i><span>Orders</span></Link
        >
       
        <Link to={'/admin/all-users'} class="list-group-item list-group-item-action py-2 ripple"
          ><i className="fas fa-users fa-fw me-3"></i><span>Users</span></Link
        >
        <Link to={'/admin/all-products'} class="list-group-item list-group-item-action py-2 ripple"
          ><i className="fas fa-shop fa-fw me-3"></i><span>Products</span></Link
        >
  
      </div>
    </div>
  </nav>


 

</header>



<main >
  <div class="container pt-4"></div>
</main>

    

    </>
  )
}

export default AdminSidebar
