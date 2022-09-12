import  {useState,useEffect} from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form'


import AdminNavbar from '../components/AdminNavbar'
import AdminSidebar from '../components/AdminSidebar/AdminSidebar'
import axios from 'axios';
import { toast } from 'react-toastify';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';

const AllProducts = () => {

    const [loading,setLoading]=useState(false)

    const [show, setShow] = useState(false);
    const [name,setName]=useState('')
    const [image,setImage]=useState('')
    const [brand,setBrand]=useState('')
    const [category,setCategory]=useState('')
    const [countInStock,setCountInStock]=useState(0)
    const [price,setPrice]=useState(0)
    const [description,setDescription]=useState('')

    const [products,setProducts]=useState([])

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const addProduct=async()=>{
      try {
        setLoading(true)

        const response=await axios.post('/products/add-product',{name,image,countInStock,description,price,category,brand},{
          headers:{Authorization:`Bearer ${JSON.parse(localStorage.getItem('user')).token}`}
        })
        setLoading(false)
        if(response.data.success){
          toast.success(response.data.msg)
          setShow(false)
        }
      } catch (error) {
       setLoading(false)
       toast.error(error.response.data.message) 
      }

    }

    const deleteProduct=async(productId)=>{
      try {
        setLoading(true)

        const response=await axios.delete(`/products/delete-product/${productId}`,{
          headers:{Authorization:`Bearer ${JSON.parse(localStorage.getItem('user')).token}`}
        })
        setLoading(false)

        if(response.data.success){
          toast.success(response.data.msg)
        }
      } catch (error) {
        setLoading(false)
        toast.error('Something went wrong')
        
      }

    }

    const allProducts=async()=>{
      try {
        setLoading(true)
        const response=await axios.get('/products/all-products',{headers:{Authorization:`Bearer ${JSON.parse(localStorage.getItem('user')).token}`}})
        setLoading(false)
        if(response.data.success){
          setProducts(response.data.data)
        }
      } catch (error) {
        toast.error('Something went wrong')
      }
    }
    



    useEffect(()=>{

      allProducts()
			

    },[])
    

    if(loading){
      return <Spinner/>
    }
  return (
   <>
   <AdminNavbar/>
   <AdminSidebar/>

  <div className='container  d-flex justify-content-center text-align-center'>
    <div className='row ml-5 '>
        <div className='col-md-12'>
            
   <Button variant="dark"  onClick={handleShow}>
        Add product +
      </Button>

 
        </div>
    </div>
  </div>
  
  <table class="table align-middle mb-0 bg-white mt-3">
  <thead class="bg-light">
    <tr>
      <th>Name</th>
      <th>Brand</th>
      <th>Price</th>
      <th>Count in stock</th>
      <th>Edit Product</th>
      <th>Delete Product</th>
    </tr>
  </thead>
  <tbody>

  {products.map((product)=>{
    return   <tr>
    <td>
      <div class="d-flex align-items-center">
       
        <div class="ms-3">
          <p class="fw-bold mb-1">{product.name}</p>
          <p class="text-muted mb-0">{product.category}</p>
        </div>
      </div>
    </td>
    <td>
      <p class="fw-normal mb-1">{product.brand}</p>
    
    </td>
    <td>
      <span class="rounded-pill d-inline">{product.price}</span>
    </td>
    <td>{product.countInStock}</td>
    <td>
     <Link to={`/admin/edit-product/${product._id}`}>
      
     <button
              type="button"
              class="btn btn-success btn-block "
            
              >
        Edit
      </button>
     </Link>
    </td>
    <td>
      <button
              type="button"
              class="btn btn-danger btn-block "
              onClick={()=>deleteProduct(product._id)}
             
              >
        Delete
      </button>
    </td>
  </tr>
  })}
  </tbody>
</table>
  <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Add new product</Modal.Title>
        </Modal.Header>
        <Modal.Body>

        <Form.Group className="mb-3" >
        <Form.Label>Product Image</Form.Label>
        <Form.Control  value={image} onChange={(e)=>setImage(e.target.value)}  type="file" placeholder="Image" />
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

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button type='button' variant="dark" onClick={addProduct}>
            Add product
          </Button>
        </Modal.Footer>
      </Modal>
   </>
  )
}

export default AllProducts
