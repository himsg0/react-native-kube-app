import { Link } from "react-router-dom";
import Privacy from "./../../../assets/Privacy Policy.pdf";
import Term from "./../../../assets/Terms and Conditions.pdf";
import React, { useState } from "react";
import "./footer.css";
import Axios from "axios";

const Footer = () => {
  const [email, setEmail] = useState(null);

  return (
    <>
      <div className="newsletterBar">
        <div className="newsletterText">
          Stay updated with everything happening in your city.
        </div>
        <div className="newsletterSearch">
          <input
            className="fEmail"
            type="E-mail"
            placeholder="Your E-mail"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <button className="fEmailbtn">
            <img
              className="fEmailbtnicon"
              src="https://www.kubeshop.in/wp-content/uploads/2022/05/arrow.webp"
            />
          </button>
        </div>
      </div>
      <div class="footlayout">
        <div class="footlinks">
          <div class="fsocialicons">
            <a href="https://www.facebook.com/kubenoida" target="_blank">
              {" "}
              <img
                src="https://www.kubeshop.in/wp-content/uploads/2022/05/ezgif.com-gif-maker-26.webp"
                className="fsicon"
              />
            </a>
            <a href="https://www.instagram.com/kubenoida/" target="_blank">
              <img
                src="https://www.kubeshop.in/wp-content/uploads/2022/05/ezgif.com-gif-maker-18.webp"
                className="fsicon"
              />
            </a>
            <a
              href="https://www.linkedin.com/company/kubeonlinein/"
              target="_blank"
            >
              <img
                src="https://www.kubeshop.in/wp-content/uploads/2022/05/ezgif.com-gif-maker-31.webp"
                className="fsicon"
              />
            </a>
            <a
              href="https://www.youtube.com/channel/UCfxw_RcGviyvcfXKRgPlGbQ"
              target="_blank"
            >
              <img
                src="https://www.kubeshop.in/wp-content/uploads/2022/05/ezgif.com-gif-maker-30.webp"
                className="fsicon"
              />
            </a>
          </div>
          <div class="fQuickLinks">
            <div className="fQuick">
              <h4>What We Do</h4>
              <ul>
                <Link to="/Categories">
                  <li>Categories</li>
                </Link>
                <Link to="/Offers">
                  <li>Offers</li>
                </Link>
                <Link to="/LatestBlogs">
                  <li>Blogs</li>
                </Link>
                <Link to="/">
                  <li>Events</li>
                </Link>
              </ul>
            </div>
            <div className="fQuick">
              <h4>Join Us</h4>
              <ul>
                <Link to="/Become-A-Partner">
                  <li>Become a Partner</li>
                </Link>
                <Link to="/Advertise-With-Us">
                  <li>Advertise Us</li>
                </Link>
              </ul>
            </div>
            <div className="fQuick">
              <h4>Company</h4>
              <ul>
                <Link to="/About">
                  <li>About</li>
                </Link>
                <a href={Privacy} target="_blank">
                  <li>Privacy Policy</li>
                </a>
                <a href={Term} target="_blank">
                  <li>Terms & Conditions</li>
                </a>
              </ul>
            </div>
          </div>
        </div>

        <div class="footdetails">
          <img
            src="https://www.kubeshop.in/wp-content/uploads/2023/01/Kube-NEw-Logo-01-1.png"
            class="footlogo"
          />
          <h2>Your City Partner</h2>
          <a
            href="https://play.google.com/store/apps/details?id=com.kubecity"
            target="_blank"
          >
            <img
              src="https://www.kubeshop.in/wp-content/uploads/2022/05/ezgif.com-gif-maker-29.webp"
              className="footapp"
            />
          </a>
        </div>

        <div className="fContactQuick">
          <h4>Contact us</h4>
          <ul>
            <li>
              <img
                src="https://www.kubeshop.in/wp-content/uploads/2022/05/email-1.webp"
                className="fContacticons"
              />
              contact@kubeonline.in
            </li>
            <li>
              <img
                src="https://www.kubeshop.in/wp-content/uploads/2022/05/Asset-2for-web.webp"
                className="fContacticons"
              />
              +91 9910766406
            </li>
            <li>
              <img
                src="https://www.kubeshop.in/wp-content/uploads/2022/05/Asset-1@4x.webp"
                className="fContacticons"
              />
              712 World Trade Tower, Sector 16, Noida
            </li>
          </ul>
        </div>
        <div className="fBottomLine">
          <p>@2023 Kube Retail Tech Private Limited. All Rights Reserved</p>
        </div>
      </div>
    </>
  );
};

export default Footer;
