import {useState,useEffect} from 'react'


import axios from 'axios'
import './style.css'
import Navbar from '../../components/Navbar'
import Spinner from '../../components/Spinner'
import { toast } from 'react-toastify'
import moment from 'moment'

const MyOrders = () => {

    const [orders,setOrders]=useState([])
    const [loading,setLoading]=useState(false)

        const getOrders=async()=>{
            try {
                setLoading(true)

                const response=await axios.get('/orders/my-orders',{headers:{
                    Authorization:`Bearer ${JSON.parse(localStorage.getItem('user')).token}`
                }})
                setLoading(false)

                if(response.data.success){
                    setOrders(response.data.data)
                }
            } catch (error) {
                setLoading(false)
                toast.error('Something went wrong')
            }
        }

        useEffect(()=>{
            getOrders()
        },[])

        if(loading){
        return <Spinner/>
        }
  return (
  <>
  
<Navbar/>
<div class="container">
    <div class="row">
    
       {orders.length>0 && orders?.map((order)=>{
        return  <div  class="col-md-12 mt-4">
        <div className="osahan-account-page-right shadow-sm bg-white p-4 h-100">
            <div className="tab-content" id="myTabContent">
                <div className="tab-pane  fade  active show" id="orders" role="tabpanel" aria-labelledby="orders-tab">
                    <h4 style={{fontSize:'20px'}} className="font-weight-bold mt-0 mb-4">Past Orders</h4>
                    <div className="bg-white card mb-4 order-list shadow-sm">
                        <div className="gold-members p-4">
                            <a href="#">
                            </a>
                            <div className="media">
                               {order?.cartItems.map((item)=>{
                                return  <a href="#">
                                <img className="mr-4" src={item.image} alt="Generic placeholder image"/>
                            </a>
                               })}
                                <div className="media-body">
                                    <a href="#">
                                        <span className="float-right mr-5 text-white">{order?.isDelivered ? <span className="badge bg-success order-badge mr-2">Delivered</span> :<span className="badge bg-danger order-badge ">Not delivered</span>} <i className="icofont-check-circled text-success"></i></span>
                                    </a>
                                    <h6 className="mb-2 text-gray">
            
                                        <p style={{fontSize:'15px'}} className="text-gray mr-2">Order Id: <b>{order?._id}</b></p>
                                    </h6>
                                    <p className="text-gray mb-1"><i className="icofont-location-arrow"></i> {order?.shippingDetails.fullAddress} <b>{order?.shippingDetails.country}/{order?.shippingDetails.city}</b>
                                    </p>
                                    <p className="text-gray mb-3"><i class="icofont-list"></i>Order Date: {moment(order?.createdAt).format('DD-MM-YYYY')}<i class="icofont-clock-time ml-2"></i></p>
                                    <p className="text-dark">{order?.cartItems.map((item)=>{
                                        return <p>{item?.name} x {item?.cartQuantity}</p>
                                    })}
                                    </p>
                                    <hr/>
                
                                    <p className="mb-0 text-black text-black pt-2"><span class="text-black font-weight-bold"> Total Paid:</span>$ {order?.totalPrice}
                                    </p>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
       })}
    </div>
</div>
  </>
  )
}

export default MyOrders
