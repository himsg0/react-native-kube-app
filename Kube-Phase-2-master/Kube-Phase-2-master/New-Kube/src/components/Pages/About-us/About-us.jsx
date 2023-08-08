import React from "react";
import { Helmet } from "react-helmet";
import "./About.css";
import Abanner from "./About Banner/Abanner";

const About = () => {
  return (
    <div>
      <Helmet>
        <title>About Us | We Are Kube, The Best Information Marketplace</title>
        <meta
          name="Description"
          content="We are Kube, an Online Informative Marketplace that provides the best information about shops in your neighbourhood and provides you with the best deals & discounts."
        />
      </Helmet>
      <div className="About">
        <h1>About KUBE</h1>
        <p>
          Kube is a city-wide information directory serving all your basic,
          regular, and dynamic needs within your city’s boundaries. From the top
          shops, sellers, and markets to the best discounts, offers, and special
          events - know about what interests you on the Kube directory. Kube
          enables you to be in-charge of your city’s happenings and participate
          in things that excite you and also provide info about the best deals
          for you to indulge in. Kuch bhi chahiye, Kube Karo!
        </p>
      </div>
      <center>
        <div className="Icons">
          <div className="iconHeader">
            <img
              src="https://www.kubeshop.in/wp-content/uploads/2022/05/User-Location.webp"
              className="icon"
            />
            <h3>Find Your Local Vendor</h3>
            <br />
            <p className="iconDiv">
              Trust no one but the vendors you see, the vendors you can reach
              from around you.
            </p>
          </div>
          <div className="iconHeader">
            <img
              src="https://www.kubeshop.in/wp-content/uploads/2022/05/Megaphone.webp"
              className="icon"
            />
            <h3>Stay Updated About City Events</h3>
            <br />
            <p className="iconDiv">
              Whatever happens in your city, you can tune in for the latest
              updates and latest city news.
            </p>
          </div>
        </div>
        <div className="Icons1">
          <div className="iconHeader">
            <img
              src="https://www.kubeshop.in/wp-content/uploads/2022/05/Receive-Cash.webp"
              className="icon"
            />
            <h3>Daily News Deals From Your Locality</h3>
            <br />
            <p className="iconDiv">
              Shop for the best deals and acquire products at amazing prices.
              Sab kuch acha aur sasta!
            </p>
          </div>
          <div className="iconHeader">
            <img
              src="https://www.kubeshop.in/wp-content/uploads/2022/05/User-Groups.webp"
              className="icon"
            />
            <h3>Your City, Your Community</h3>
            <br />
            <p className="iconDiv">
              Participate, lead from the front, and talk about matters that
              matter to you. Lead the charts in your city.
            </p>
          </div>
        </div>
      </center>
    </div>
  );
};

export default About;
