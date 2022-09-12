
import {BrowserRouter,Routes,Route,Outlet, Navigate, Router} from 'react-router-dom'
import Login from './pages/Login';
import MainPage from './pages/MainPage';
import Product from './pages/Product';
import Register from './pages/Register';


import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import ShippingScreen from './pages/ShippingScreen';
import PrivateRoute from './components/PrivateRoute';
import OrderReview from './pages/OrderReview';
import Profile from './pages/Profile';
import MyOrders from './pages/myOrders/MyOrders';
import AdminMain from './admin/AdminMain';
import AllOrders from './admin/AllOrders';
import AllUsers from './admin/AllUsers';
import AllProducts from './admin/AllProducts';
import EditProduct from './admin/EditProduct';

function App() {


  const AdminRoute=()=>{

    return JSON.parse(localStorage.getItem('user')).isAdmin.toString()==='true' ? <Outlet/> :<Navigate to={'/login'}/>
  }
  return (
    <>
    <BrowserRouter>
    <Routes>

      <Route path='/' element={<MainPage/>}/>
      <Route path='/login' element={<Login/>}/>
      
      <Route path='/register' element={<Register/>}/>
      <Route path='/products' element={<Product/>}/>
      <Route element={<PrivateRoute/>}>

      <Route path='/shipping' element={<ShippingScreen/>}/>
      <Route path='/order-review' element={<OrderReview/>}/>
      <Route path='/profile/:userId' element={<Profile/>}/>
      <Route path='/my-orders' element={<MyOrders/>}/>
      <Route element={<AdminRoute/>}>
      <Route path='/admin' element={<AdminMain/>}/>
      <Route path='/admin/all-orders' element={<AllOrders/>}/>
      <Route path='/admin/all-users' element={<AllUsers/>}/>
      <Route path='/admin/all-products' element={<AllProducts/>}/>
      <Route path='/admin/edit-product/:productId' element={<EditProduct/>}/>
      </Route>
      
     
      </Route>
    
    </Routes>
    
    </BrowserRouter>

    <ToastContainer/>

    </>
  );
}

export default App;
