import React from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
const MainPage = () => {
  return (
    <>
      <Navbar />

      <div className="main">
        <div className="row">
          <div className="col-md-12">
            
            <div>
              <h1 className="m-b-40 text-center mt-5 main-header ">
                <strong>
                  Welcome To <br />
                  Woo Commerce
                </strong>
              </h1>
              <p
                className="m-b-40 text-center mt-5 main-p"
                style={{ color: "white" }}
              >
                See how your users experience your website in realtime or view{" "}
                <br /> trends to see any changes in performance over time.
              </p>
              <p>
                <Link
                  to="/products"
                  className="btn btn-danger mt-5 justify-content-center main-button"
                >
                  Shop Now
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default MainPage;
