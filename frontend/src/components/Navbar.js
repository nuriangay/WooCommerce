import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { reset } from "../store/auth/slice";
import { Modal } from "react-bootstrap";
import { removeFromCart,resetCart } from "../store/cart/slice";
import Spinner from "./Spinner";
import { toast } from "react-toastify";


const Navbar = () => {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);



  const{user} =useSelector(state=>state.auth)

  const token = JSON.parse(localStorage.getItem("user"))?.token;
 const {cartItems}=useSelector(state=>state.cart)
 




  const navigate = useNavigate();
  const dispatch = useDispatch();

  const Logout = () => {
    localStorage.removeItem("user");
    dispatch(reset());
    navigate("/login");
    localStorage.removeItem('cartItems')
    dispatch(resetCart())
  };

  const removeCart = (id) => {
    
      dispatch(removeFromCart(id));
      toast('Product removed cart')
    
  
   
  };

  if(loading){
    return <Spinner/>
  }
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light ">
        <a
          className="navbar-brand"
          style={{ fontSize: "40px", color: "white" }}
          href="#"
        >
          <b>Woo-Commerce</b>
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <Link className="nav-link" to="/">
                <b>Home</b>
              </Link>
            </li>
            <li className="nav-item active">
              <Link className="nav-link" to="/products">
                <b>Products</b>
              </Link>
            </li>
            <li className="nav-item active">
              <Link className="nav-link" to="/about">
                <b>About Us</b>
              </Link>
            </li>
          
          </ul>
          <form className="form-inline my-2 my-lg-0">
            {token ? (
              <>
                <div className=" dropleft ">
                  <i
                    className="  fa-regular fa-user   mr-sm-2"
                    style={{ color: "black" }}
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  ></i>

                  <div className="dropdown-menu ">
                    <Link className="dropdown-item" to={`/profile/${user._id}`}>
                      Profile
                    </Link>
                    <hr />
                    <Link className="dropdown-item" to="/my-orders">
                      My Orders
                    </Link>
                    <hr />
                    <a onClick={Logout} className="dropdown-item" href="#">
                      Logout
                    </a>
                  </div>
                </div>
              </>
            ) : (
              <Link style={{ color: "black" }} to="/login">
                <i className="fa-regular fa-user   mr-sm-2"></i>
              </Link>
            )}

            <i
              onClick={() => setShow(true)}
              className="  fa-solid fa-cart-plus mr-2  ml-1"
              style={{ color: "black" }}
            >
              <span className="badge badge-light">{token? cartItems?.length :''}</span>
            </i>
          </form>
        </div>
      </nav>

      <Modal
        show={show}
        onHide={() => setShow(false)}
        dialogClassName="modal-50w"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Header>
          <Modal.Title id="example-custom-modal-styling-title">
            {cartItems?.length ? `${cartItems.length} items in cart. ` :('Add product to your cart')} 
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {cartItems?.map((item) => {
            return (
              <>
                <div className="container col-md-12">
                  <hr />
                  <div className="row  col-md-12">
                    <div className="col ">
                      <img
                        className="cart-image mt-2 "
                        src={item.image}
                        alt="product-image"
                      />
                    </div>
                    <div className="col">
                      <h3
                        className="col-md-12 cart-header text-center"
                        style={{ color: "black" }}
                      >
                        {item.name}
                      </h3>
                      <p className="text-center">{item.category}</p>
                      <p className="text-center">
                        {item.price} x {item.cartQuantity} = $
                        {item.price * item.cartQuantity}{" "}
                      </p>
                    </div>

                    <div className="row">
                      <div className="col">
                        <span className="cart-delete">
                          <i
                            onClick={() => removeCart(item._id)}
                            className=" fa-regular fa-trash-can  "
                          ></i>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            );
          })}
          <hr />
          <h3>
            Total Price: $
            {cartItems?.reduce(
              (acc, item) => acc + item.cartQuantity * item.price,
              0
            )}
          </h3>
          <Link to={"/shipping"}>
            {cartItems?.length === 0 ? (
              <button disabled className="btn btn-dark btn-block">
                Go To Payment
              </button>
            ) : (
              <button className="btn btn-dark btn-block">Go To Payment</button>
            )}
          </Link>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Navbar;
