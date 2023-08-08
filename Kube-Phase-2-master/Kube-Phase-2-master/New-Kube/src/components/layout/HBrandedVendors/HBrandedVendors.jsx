import React, {useEffect, useState, useRef} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import Slider from "react-slick";
import { Link } from "react-router-dom";
import { getHBrandedStore } from '../../../Service/Actions/HomeActions';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ReactStars from 'react-rating-stars-component'
import './HBrandedVendors.css'

const  HBrandedVendors =() =>{
    const NVsettings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 5.7,
        slidesToScroll: 1,
        responsive: [
            {
              breakpoint: 600,
              settings: {
                dots: false,
                infinite: false,
                speed: 500,
                slidesToShow: 3.5,
                swipeToSlide: true,
              }
            }
        ]
      };

   const [storeBrandedData, setStoreBrandedData] = useState([]);

   const uniqueBrands = [...new Map(storeBrandedData?.map((val) => [val['storename'], val])).values() ];

    return(
        <>
        {uniqueBrands.length != 0 &&
        <div className="hBrandedVendorsSec">
            <h1 className="hBrandedVendorsHeading">Branded Vendors</h1>
            <div className="hBrandedVendorsCardSec">
            <Slider {...NVsettings}>

            {uniqueBrands.map((val) => {
                return(
                <div className="hBrandedVendorsImgSec">
                <img className="hBrandedVendorsImg" src={val.images[0].url}></img>
                </div>
                )
            })}
              <div className='NRhBestOffer'>
              </div>  
                
            </Slider>
            </div>
        </div>
      }
        </>
    )
}

export default HBrandedVendors;