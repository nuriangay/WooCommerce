import {useState} from 'react'
import Navbar from '../components/Navbar'
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import Spinner from '../components/Spinner'
import { useNavigate } from 'react-router-dom';
const OrderReview = () => {

    const navigate=useNavigate()

    const {user}=useSelector(state=>state.auth)

    const shippingDetails=JSON.parse(localStorage.getItem('shipping'))
    const cartItems=JSON.parse(localStorage.getItem('cartItems'))
    const userData={fullName:user.fullName,email:user.email,id:user._id}

    const [loading,setLoading]=useState(false)

    const totalPrice= cartItems?.reduce((acc, item) => acc + item.cartQuantity * item.price,0)


   const onToken =async (token) => {
      try {
        setLoading(true)
        const response=await axios.post('/orders/create-order',{shippingDetails,cartItems,userData,totalPrice,token},{
          headers:{Authorization:`Bearer ${JSON.parse(localStorage.getItem('user')).token}`}
        })
        setLoading(false)

        if(response.data.success){
          toast.success(response.data.msg)
          localStorage.removeItem('cartItems')
          localStorage.removeItem('shipping')
          setTimeout(()=>{
            navigate('/products')
          },1000)
       
        }
      } catch (error) {
        setLoading(false)
        toast.error(error.response.data.message)
        
      }
      }

      if(loading){
        return <Spinner/>
      }
    
  return (
    <>
    <Navbar/>
    <div className='row'>

    <div className='col'>
      
    <div className=' ml-5 col-md-12 border-0 shadow rounded-3  review-box'>
     
    <div className='mt-3  justify-content-center align-items-center' >

   
               {cartItems?.map((product)=>{
                return <>
                  <hr/>
                 <div className='col-md-12  '>
                <div className='row '>
                  <div className='col'>
                  <img className='review-image  ml-4 ' src={product.image} alt='cover' />
                  <h4 className='review-header   mt-3'>Product Name: <b>{product.name}</b></h4>
                  <p className='review-brand   mt-3'>Brand: <b>{product.brand}</b></p>
                  <p className='review-brand   mt-3'>Price: <b>{product.price} x {product.cartQuantity} = {product.price * product.cartQuantity} </b></p>
                 
                
              

                  </div>
                  <div className='col'>
                  <h2>Shipping Details</h2>
                  <p className='review-brand  review mt-3'>Full Address: <b>{shippingDetails.fullAddress}</b></p>
                  <p className='review-brand  review mt-3'>Country: <b>{shippingDetails.country}</b></p>
                  <p className='review-brand  review mt-3'>City: <b>{shippingDetails.city}</b></p>
                  <p className='review-brand  review mt-3'>Postal Code: <b>{shippingDetails.postalCode}</b></p>
                  </div>

                 
               
             
               
             
                  </div>
    </div>

                    

                </>
               

               })}
            
           
     
   
   
  </div>
  
    </div>

    
    </div>

    <div className='col '>
      
      <div style={{height:'300px'}} className='  ml-5 col-md-9 border-0  shadow rounded-3  review-box'>
       
      <div className='mt-3  justify-content-center align-items-center' >
  
               <h1 style={{color:'black'}} className='text-center mt-2'><b>Order Summary</b></h1>
            <h3 className='mt-2'>Total products in cart: <b>{cartItems?.length}</b></h3>
           <h3 className='mt-2'> Total Price: 
           $<b>  {cartItems?.reduce(
              (acc, item) => acc + item.cartQuantity * item.price,
              0
            )}</b></h3>
            <h3 className=''>Delivery Fee: $<b>20</b></h3>
            <h3 className='mt-2'> Total Price: <b>{totalPrice + 20}</b></h3>

            <hr/>

          
    
            <StripeCheckout  currency='USD' amount={totalPrice * 100}
        token={onToken}  className='btn btn-dark btn-block mt-4 pay-button '
        stripeKey="pk_test_51LaxrbEJrk733tyPA5SLAvWWkuep15kveGKZe597w5cEdDrOBxuEfuJ7v2a0dYSSJjp44BRqg6HaQaIMCgXtMzrT00lmyJnJ8Q"
      >
        
        <button type='button' className='bt btn-dark btn-block  mt-5 '>Complete order</button>
      </StripeCheckout>
        
             
       
     
     
    </div>
    
      </div>
  
      
      </div>
    </div>
  </>
  )
}

export default OrderReview
