import React, {useEffect} from "react";
import "./Menu.css";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Privacy from "./../../../assets/Privacy Policy.pdf"
import Term from "./../../../assets/Terms and Conditions.pdf"


const Menu = (props) => {
  const dispatch = useDispatch();

  const CloseModel = async () => {
    props?.setIsMenuOpen(false)
    localStorage.setItem('showLoginModel', true);
  };

  return (
    <div className="menuHead">
        {/* <button className="ab_close_menu">Close</button> */}
      <button onClick={() => CloseModel()} type="button" className="ab_close_menu">
        <span className="closebtn">&times;</span>
      </button>
      <img
        className="profile_image_ab"
        src="data:image/png;base64,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"
        alt="User Image"
      />
      <div className="container">
        <div className="text-center pt-3">
          <h1 className="menuTitle_header">Menu</h1>
        </div>

        <div className="col-12 out_box_menu mt-md-3 mt-5">
          <div className="col-12 inner_box_menu">
            <div className="row">
              <div className="col-lg-4 list_menu">
                <Link to = "/" onClick={() => CloseModel()}><p>Home</p></Link>
                <Link to = "/Categories" onClick={() => CloseModel()}><p>Categories</p></Link>
                <Link to = "/LatestBlogs" onClick={() => CloseModel()}><p>Blog</p></Link>
                <Link to = "/Offers" onClick={() => CloseModel()}><p>Offers</p></Link>
              </div>
              <div className="col-lg-4 list_menu">
                <Link to = "/Events" onClick={() => CloseModel()}><p>Events</p></Link>
                <Link to ={"/StoreList"} onClick={() => CloseModel()}><p>Store</p></Link>
                <Link to="/Become-A-Partner" onClick={() => CloseModel()}><p>Become A Partner</p></Link>

                <Link to="/Advertise-With-Us" onClick={() => CloseModel()}><p>Advertise With Us</p></Link>

              </div>
              <div className="col-lg-4 list_menu">
                <Link to = "/About" onClick={() => CloseModel()}><p>About Us</p></Link>
                <Link to = "/Contact" onClick={() => CloseModel()}><p>Contact Us</p></Link>
                <a href={Privacy} target="_blank"><p>Privacy Policy</p></a>
                <a href={Term} target="_blank"><p>Terms & Conditions</p></a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="orange_line col-12 mt-3"></div>
      <div className="light_grey_line col-12 mt-2"></div>

      <div className="modal-footer">
        <h5 className="modal-title text-blue">
          <div className="footsection">
            <div className="logosection">
              <img
                src={require("../../../assets/KubeLogo.png")}
                className="Mlogo"
              />
            </div>

            <h3 className="Mtext">Your City Partner</h3>
          </div>
        </h5>
      </div>
    </div>
  );
};

export default Menu;
