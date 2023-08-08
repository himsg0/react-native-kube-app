import React from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ReactStars from 'react-rating-stars-component'
import './HCategoryOffers.css'

const HCategoryOffers =({image}) =>{
    const Csettings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        responsive: [
            {
              breakpoint: 600,
              settings: {
                dots: false,
                infinite: false,
                speed: 500,
                slidesToShow: 3,
                swipeToSlide: true,
              }
            }
        ]
      };
      

    return(
        <>
        <div className="hCategoryOffersSec">
            <div className="hCategoryOffersCardSec">
            <Slider {...Csettings}>
            
            <Link to={`/DiscountOffers?cat=Food and Beverages`}>
                  <div className="hCategoryOffersImgSec">
                  <img className="hCategoryOffersImg" src="https://www.kubeshop.in/wp-content/uploads/2022/11/Group-40052fb-1.png"></img>
                  </div>
             </Link>   

             <Link to={`/DiscountOffers?cat=Home Decor`}>
                <div className="hCategoryOffersImgSec">
                <img className="hCategoryOffersImg" src="https://www.kubeshop.in/wp-content/uploads/2022/11/Group-40053HD.png"></img>
                </div>
                </Link>

                <Link to={`/DiscountOffers?cat=Electronics`}>
                <div className="hCategoryOffersImgSec">
                <img className="hCategoryOffersImg" src="https://www.kubeshop.in/wp-content/uploads/2022/11/Group-40054EC.png"></img>
                </div>
                </Link>

                <Link to={`/DiscountOffers?cat=Fashion`}>
                <div className="hCategoryOffersImgSec">
                <img className="hCategoryOffersImg" src="https://www.kubeshop.in/wp-content/uploads/2022/11/Group-40056FH.png"></img>
                </div>
                </Link>

                <Link to={`/DiscountOffers?cat=Wellness&Subcat=Gym`}>
                <div className="hCategoryOffersImgSec">
                <img className="hCategoryOffersImg" src="https://www.kubeshop.in/wp-content/uploads/2022/11/Group-40055we.png"></img>
                </div>
                </Link>
                
            
            
            </Slider>
            </div>
        </div>
        <hr className="bottomBorder"/>
        </>
    )
}

export default HCategoryOffers;
