import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import Slider from "react-slick";
import { connect, useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ReactStars from 'react-rating-stars-component'
import './HAdvertise.css'

import { getHomeBanners, updateCounter } from "../../../Services/BannerServices"

const HAdvertise = (props) => {



  const BOsettings = {
    // className: "center",
    dots: true,
    infinite: true,
    // centerMode: true,
    // centerPadding: "16%",
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplayspeed: 2000,
    speed: 500,
    responsive: [
      {
        breakpoint: 600,
        settings: {
          // className: "center",
          dots: false,
          infinite: true,
          // centerMode: true,
          // centerPadding: "0px",
          slidesToShow: 1,
          slidesToScroll: 1,
          autoplay: true,
          autoplayspeed: 2000,
          speed: 500,
        }
      }
    ]
  };
  const [webBanners, setWebBanners] = useState()

  useEffect(() => {
    getHomeBanners().then((res) => {
      setWebBanners(res?.webBannerArray);
    })
  }, [])

  const BannerClick = (image) => {

    updateCounter(image)

    window.open('https://play.google.com/store/apps/details?id=com.kubecity', '_blank');

  };



  return (
    <>
      <div className="hAdvertiseSec">
        <div className="hAdvertiseCardSec">
          <Slider {...BOsettings}>
            {webBanners?.map((val) => {

              return (
                <div
                  className="hAdvertiseImgSec"
                  onClick={() => BannerClick(val.image)}
                >
                  <img className="hAdvertiseImg" src={val.image}></img>
                </div>

              )
            })}


          </Slider>
        </div>
      </div>

    </>
  )
}

export default HAdvertise;
