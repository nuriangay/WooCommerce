import {useState,useEffect} from 'react'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import { addToCart } from '../store/cart/slice'
import { useSelector,useDispatch } from 'react-redux'
import products from './products'
import { Link, Navigate,useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'
import Spinner from '../components/Spinner'



const Product = () => {

    const [loading,setLoading]=useState(false)
    
    const dispatch=useDispatch()
    const {user}=useSelector(state=>state.auth)



  const addCart=(product)=>{

    dispatch(addToCart(product))
 
  }

  // const allProducts=async()=>{
  //   try {
  //     setLoading(true)

  //     const response=await axios.get('/products/main-page/all-products')
  //     setLoading(false)
  //     if(response.data.success){
  //       setProducts(response.data.data)
  //     }
      
  //   } catch (error) {
  //     setLoading(false)
  //     toast.error('Something went wrong')
  //   }
  // }


  
  // useEffect(()=>{
  //   allProducts()
  // },[])

  if(loading){
    return <Spinner/>
  }

  return (
    <>
    <Navbar/>

    <div className="row row-cols-1 row-cols-md-4">
    {products.map((product)=>{
     
        return   <div key={product._id} className="col mb-4">
        <div className="card mt-5 ml-1">
          <img src={product.image } className="card-img-top" alt='Image'/>
          <div className="card-body">
            <h5 className="card-title">{product.name}</h5>
            <p className="card-text">{product.description}</p>
            <hr/>
            <div className='row'>
            <p className="card-text ml-5">Price: {product.price} </p>
            <p className="card-text ml-5">In Stock: {product.countInStock} </p>
            </div>
      <hr/>
            {product.countInStock===0 ?(  <button disabled  type='button' onClick={()=>addCart(product)} className='btn btn-dark btn-block mt-5'>Add to cart</button>)
            :( user ?  <button  type='button' onClick={()=>addCart(product)} className='btn btn-dark btn-block mt-5'>Add to cart</button>:(<Link to={'/login'}> <button  type='button'  className='btn btn-dark btn-block mt-5'>Add to cart</button></Link>))  
          }
          </div>
        </div>
      </div>
    })}
    
      </div>

   <Footer/>
    </>
  )
}

export default Product
