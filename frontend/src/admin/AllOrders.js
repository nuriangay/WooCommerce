import {useState,useEffect} from 'react'
import axios from 'axios'
import Spinner from '../components/Spinner'
import { toast } from 'react-toastify'
import AdminNavbar from '../components/AdminNavbar'
import AdminSidebar from '../components/AdminSidebar/AdminSidebar'

import moment from 'moment'
const AllOrders = () => {

    const [loading,setLoading]=useState(false)

    const [orders,setOrders]=useState([])

    const getAdminOrders=async()=>{
        try {
            setLoading(true)

            const response=await axios.get('/orders/all-orders',{
                headers:{Authorization:`Bearer ${JSON.parse(localStorage.getItem('user')).token}`}
            })
            setLoading(false)

            if(response.data.success){
                setOrders(response.data.data)
                localStorage.setItem('allOrders',JSON.stringify(response.data.data))
            }
        } catch (error) {
            setLoading(false)
            toast.error('Something went wrong')
            
        }
    }

    const markAsDelivered=async(orderId)=>{
        try {
            setLoading(true)
            const response=await axios.post(`/orders/mark-as-delivered/${orderId}`,{},
            {headers:{Authorization:`Bearer ${JSON.parse(localStorage.getItem('user')).token}`}})
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
        getAdminOrders()
    },[])

    if(loading){
        return <Spinner/>
    }
  return (
    <>
    <AdminNavbar/>
    <AdminSidebar/>


    <table className="table  mb-0 bg-white  ml-5">
  <thead className="bg-light">
    <tr>
      <th>Name</th>
      <th>Shipping address</th>
      <th>Products</th>
      <th>Order Time</th>
      <th>Price</th>
      <th>Actions</th>
    </tr>
  </thead>
  <tbody>
   {orders.map((order)=>{
    return  <tr key={order._id}>
    <td>
      <div className="d-flex align-items-center">
       
        <div className="ms-3">
          <p className="fw-bold mb-1">{order.userData.fullName}</p>
          <p className="text-muted mb-0">{order.userData.email}</p>
        </div>
      </div>
    </td>
    <td>
      <p className="fw-normal mb-1">{order.shippingDetails.fullAddress}</p>
      <p className="text-muted mb-0">{order.shippingDetails.country}/{order.shippingDetails.city}</p>
    </td>
    <td>
      <span className=""><p>{order.cartItems.map((item)=><p>{item.name}</p>)}</p></span>
    </td>
    <td>
      <span className=""><p>{moment(order.createdAt).format('ll')}</p></span>
    </td>
    <td>{order.totalPrice}</td>
    <td>
    {!order.isDelivered ?   <button type="button" onClick={()=>markAsDelivered(order._id)} className="btn btn-success btn-sm mr-4 deliver-button">
        Mark as delivered
      </button> : (  <button disabled type="button" className="btn btn-success btn-sm mr-4 deliver-button">
        Mark as delivered
      </button>) }
    </td>
  </tr>

   })}
  </tbody>
</table>
    </>
  )
}

export default AllOrders
