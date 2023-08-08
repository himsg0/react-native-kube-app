import React, {useEffect} from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import {useSelector, useDispatch} from 'react-redux';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ReactStars from 'react-rating-stars-component'
import './HBestOffer.css'

const HBestOffer =({offers,title,link,status}) =>{

    const BOsettings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 3.1,
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

      
    //   console.log("hello",offers);
      let newOffer = offers.sort( ()=> (Math.random() > 0.5) ? 1 : -1)
      

    return(
        <>
        <div className="hBestOfferSec">
            <h1 className="hBestOfferHeading">{title}</h1>
            <div className="hBestOfferCardSec">
            <Slider {...BOsettings}>

            {newOffer.map((val)=>{
                return(
                <Link to={`/OfferDetails/${val.storeId}?i=${val.position}`}>
                <div>
                {val.image && <div className="hBestOfferImgSec">
                                        <img className="hBestOfferImg" src={val.image}></img>
                                </div>}
                </div>
                <div className="hBestOfferAvailButtonSec"><button className="hBestOfferAvailButton">Click to Avail</button></div>
                </Link>
                
                );
            })}  
            <div className='NRhBestOffer'>
            </div>    
            
        </Slider>
            </div>


            
            {(title=="Best")? 
            <Link to={`/${link}`}>
            <div className="hBestOfferViewAllButtonSec"><button className="hBestOfferViewAllButton">View All</button></div>
            </Link> :
            status ?
            <Link to={`/${link}?cat=${title}`}>
            <div className="hBestOfferViewAllButtonSec"><button className="hBestOfferViewAllButton visible">View All</button></div>

            </Link>
            :
            <Link to={`/${link}?cat=${title}`}>
            <div className="hBestOfferViewAllButtonSec"><button className="hBestOfferViewAllButton">View All</button></div>

            </Link>
            }
        </div>
        </>
    )
}

export default HBestOffer;
