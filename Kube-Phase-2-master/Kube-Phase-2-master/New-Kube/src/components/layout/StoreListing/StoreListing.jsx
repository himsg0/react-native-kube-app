import React,{useEffect} from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ReactStars from 'react-rating-stars-component'
import './StoreListing.css'

const StoreListing =({store,title,link,status}) =>{

    

    const SLsettings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 3.95,
        slidesToScroll: 1,
        responsive: [
            {
              breakpoint: 600,
              settings: {
                dots: false,
                infinite: false,
                speed: 500,
                slidesToShow: 2.1,
                swipeToSlide: true,
              }
            }
        ]
      };

    
    const options ={
        color: "rgba(20,20,20,0.3)",
        activeColor: "#25255c",
        size: window.innerWidth < 600 ? 12 : 25,
        
        edit: false,
        isHalf: true,
        
    };  
    

    return(
        <>
        <div className="storeListingSec">

            <h1 className="storeListingHeading">{title} Vendors</h1>

            
            <div className="storeListingCardSec">
            <Slider {...SLsettings}>
            {store?.slice(0,25).map((val)=>{
                console.log("data",val)
             return(
            <Link to={`vendorDetail/${val._id}`}> 
            <div className="storeListingCard">
                <img className="storeListingImg" src={val.images[0].url}></img>
                <h2 className="storeListingShopName">{val.storename}</h2>
                <p className="storeListingAddress">{val.address}</p>
                <div className="storeListingRatingReview">
                    <ReactStars 
                     value = {val.ratings}
                    {...options} />
                    <span className="sListingNoOfReviews">({val.numOfReviews} Reviews)</span>
                    {/* <button className="storeListingCallNowBtn">
                        <img className="storeListingCallNowImg" src="https://www.kubeshop.in/wp-content/uploads/2022/06/Group-49.webp"></img>
                    </button> */}
                </div>
            </div>
            </Link>
            );
        })}
        <div className='NRhBestOffer'>
        </div>
            </Slider>
            {console.log("status",status)}
            </div>
            
            {(title=="Top")? 
            <Link to={`/${link}`}>

            <div className="storeListingViewAllButtonSec"><button className="storeListingViewAllButton" >View All</button></div>
            </Link> :
             status ?
            <Link to={`/${link}?cat=${title}`}>
            <div className="storeListingViewAllButtonSec "><button className="storeListingViewAllButton visible" >View All</button></div>
            </Link>
            :
            <Link to={`/${link}?cat=${title}`}>
            <div className="storeListingViewAllButtonSec "><button className="storeListingViewAllButton" >View All</button></div>
            </Link>
            
            }
            

            
        </div>
        </>
    )
}

export default StoreListing;