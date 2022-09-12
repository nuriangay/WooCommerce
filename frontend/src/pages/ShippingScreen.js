import {useState} from 'react'
import { Nav,Form,Button, Spinner } from 'react-bootstrap'
import Navbar from '../components/Navbar'
import { useSelector,useDispatch } from 'react-redux'
import { saveShippingDetails } from '../store/shipping/slice'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
const ShippingScreen = () => {

  const dispatch=useDispatch()

  const [loading,setLoading]=useState(false)

  const [fullAddress,setFullAddress]=useState('')
  const [country,setCountry]=useState('')
  const [city,setCity]=useState('')
  const [postalCode,setPostalCode]=useState('')

  const navigate=useNavigate()

 

  const shipping=()=>{
   
    setLoading(true)
      dispatch(saveShippingDetails({fullAddress,country,city,postalCode}))
    setLoading(false)

      toast.success('Address saved successfully')

    setTimeout(()=>{
      navigate('/order-review')
    },4000)


  }

  if(loading){
    return <Spinner/>
  }
  return (
    <>
    <Navbar/>
    <div className='container col-md-3 border-0 shadow rounded-3'>
     
    <Nav className='mt-5  justify-content-center align-items-center' justify variant="tabs" defaultActiveKey="/home">
    <Nav.Item>
      <Nav.Link className='shipping-header' href="/shipping"><b>Shipping Details</b></Nav.Link>
<hr/>
    
      <Form.Group className="mb-3 mt-3 " controlId="formBasicEmail">
        <Form.Label >Full Address</Form.Label>
        <Form.Control name='fullAddress' value={fullAddress} onChange={(e)=>setFullAddress(e.target.value)} type="text" placeholder="Enter full address" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Country</Form.Label>
        <Form.Control  name='country' value={country} onChange={(e)=>setCountry(e.target.value)} type="text" placeholder="Enter country" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>City</Form.Label>
        <Form.Control  name='city' value={city} onChange={(e)=>setCity(e.target.value)} type="text" placeholder="Enter city" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Postal Code</Form.Label>
        <Form.Control  name='postalCode' value={postalCode} onChange={(e)=>setPostalCode(e.target.value)} type="text" placeholder="Enter postal code" />
      </Form.Group>
    
      <Button variant="primary" type="button" onClick={shipping} className=' mt-5 btn btn-danger btn-block mb-2'>
        Save Address
      </Button>
  
    </Nav.Item>
  
   
  </Nav>
  
    </div>
  
  
  </>
  )
}

export default ShippingScreen
