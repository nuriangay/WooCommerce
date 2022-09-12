import React from 'react'
import AdminNavbar from '../components/AdminNavbar'
import './admin-style.css'
import AdminSidebar from '../components/AdminSidebar/AdminSidebar'
const AdminMain= () => {

    const allUsers=JSON.parse(localStorage.getItem('allUsers'))?.length
    const allOrders=JSON.parse(localStorage.getItem('allOrders'))?.length
    
  return (
  <>
  <AdminNavbar/>
  <AdminSidebar/>

  <div class="col-md-12 ml-5 ">
    <div class="row card2 ml-5">
        <div class="col-md-3 card2 col-md-3">
            <div class="card  l-bg-cherry">
                <div class="card-statistic-3 p-4">
                    <div class="card-icon card-icon-large"><i class="fas fa-shopping-cart"></i></div>
                    <div class="mb-4">
                        <h5 class="card-title mb-0">All Orders</h5>
                    </div>
                    <div class="row align-items-center mb-2 d-flex">
                        <div class="col-8">
                            <h2 class="d-flex align-items-center mb-0">
                                {allOrders}
                            </h2>
                        </div>
                        <div class="col-4 text-right">
                            <span>12.5% <i class="fa fa-arrow-up"></i></span>
                        </div>
                    </div>
                    <div class="progress mt-1 " data-height="8" >
                        <div class="progress-bar l-bg-cyan" role="progressbar" data-width="25%" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100" ></div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-xl-3 col-lg-6">
            <div class="card l-bg-blue-dark">
                <div class="card-statistic-3 p-4">
                    <div class="card-icon card-icon-large"><i class="fas fa-users"></i></div>
                    <div class="mb-4">
                        <h5 class="card-title mb-0">Customers</h5>
                    </div>
                    <div class="row align-items-center mb-2 d-flex">
                        <div class="col-8">
                            <h2 class="d-flex align-items-center mb-0">
                               {allUsers}
                            </h2>
                        </div>
                        <div class="col-4 text-right">
                            <span>9.23% <i class="fa fa-arrow-up"></i></span>
                        </div>
                    </div>
                    <div class="progress mt-1 " data-height="8" >
                        <div class="progress-bar l-bg-green" role="progressbar" data-width="25%" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100" ></div>
                    </div>
                </div>
            </div>
        </div>
        
      
    </div>
</div>
  </>
  )
}

export default AdminMain
