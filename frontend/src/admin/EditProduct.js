import {useState,useEffect} from 'react'
import AdminNavbar from '../components/AdminNavbar'
import AdminSidebar from '../components/AdminSidebar/AdminSidebar'
import Form from 'react-bootstrap/Form'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'
import { Spinner } from 'react-bootstrap'


const EditProduct = () => {

    const [name,setName]=useState('')
    const [image,setImage]=useState('')
    const [brand,setBrand]=useState('')
    const [category,setCategory]=useState('')
    const [countInStock,setCountInStock]=useState(0)
    const [price,setPrice]=useState(0)
    const [description,setDescription]=useState('')

    const [loading,setLoading]=useState(false)
    const [product,setProduct]=useState({})

    const {productId}=useParams()

    const imageUpload=async(e)=>{
      const file=e.target.files[0]
      const formData = new FormData()
      formData.append('image', file)
      setLoading(true)
      
      try {
        
        const response=await axios.put(`/products/upload-image/${productId}`,formData,{
          headers:{Authorization:`Bearer ${JSON.parse(localStorage.getItem('user')).token}`}
        })
        setLoading(false)
        if(response){
          setImage(response.data.image)
        }
      } catch (error) {
        setLoading(false)
        toast.error('Something went wrong on image upload')
      }
    }


    const getProductDetails=async()=>{
        try {
            setLoading(true)

            const response=await axios.get(`/products/${productId}`,{headers:{Authorization:`Bearer ${JSON.parse(localStorage.getItem('user')).token}`}})

            setLoading(false)
            if(response.data.success){
                setProduct(response.data.product)
            }
        } catch (error) {
            
            setLoading(false)
            toast.error('Something went wrong')
        }

    }
    const editProduct=async()=>{
        try {
            setLoading(true)

            const response=await axios.post(`/products/edit-product/${productId}`,{image,name,countInStock,description,category,brand,price},{headers:{Authorization:`Bearer ${JSON.parse(localStorage.getItem('user')).token}`}})

            setLoading(false)
            if(response.data.success){
                toast.success(response.data.msg)
            }
        } catch (error) {
            toast.error(error.response.data.message)
        }

    }
    useEffect(() => {
        
        getProductDetails()
   
 
        setName(product.name)
        setBrand(product.brand)
        setImage(product.image)
        setCategory(product.category)
        setCountInStock(product.countInStock)
         setPrice(product.price)
         setDescription(product.description)
     }, [product.name,product.brand,product.price,product.countInStock,product.category,product.description,product.image])

    if(loading){
        return <Spinner/>
    }
    


  return (
    <>
    <AdminNavbar/>
    <AdminSidebar/>

    <div className='container '>
        <div className='row'>
            <div className='col-md-12 ml-5'>
            <Form.Group className="mb-3" >
        <Form.Label>Product Image Url</Form.Label>
        <Form.Control  value={image} onChange={(e)=>setImage(e.target.value)}  type="text" placeholder="Image url" />
      </Form.Group>
      <Form.Group className="mb-3" >
        <Form.Label>Product Image</Form.Label>
        <Form.Control   onChange={imageUpload} id='image-file' type="file" placeholder="Image" />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Product Name</Form.Label>
        <Form.Control value={name} onChange={(e)=>setName(e.target.value)} type="text" placeholder="Enter Product name" />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Product Brand</Form.Label>
        <Form.Control  value={brand} onChange={(e)=>setBrand(e.target.value)}  type="text" placeholder="Enter Product brand" />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Product Category</Form.Label>
        <Form.Control  value={category} onChange={(e)=>setCategory(e.target.value)}  type="text" placeholder="Enter Product category" />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Product Price</Form.Label>
        <Form.Control  value={price} onChange={(e)=>setPrice(e.target.value)}  type="text" placeholder="Enter Product Price" />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Product Description</Form.Label>
        <Form.Control  value={description} onChange={(e)=>setDescription(e.target.value)}  type="text" placeholder="Enter Product description" />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Product Stock</Form.Label>
        <Form.Control  value={countInStock} onChange={(e)=>setCountInStock(e.target.value)}  type="number" placeholder="Enter Product stock" />
      </Form.Group>
      <Form.Group className="mb-3">
       <button type='button' onClick={editProduct} className='btn btn-dark '>Edit product</button>
      </Form.Group>
            </div>
        </div>
    </div>
    </>
  )
}

export default EditProduct
