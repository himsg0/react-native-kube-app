



import React, { useEffect, useState } from "react";
import "./VendorDetails.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { useParams } from 'react-router-dom';
import StarRatings from "react-star-ratings";
import { connect, useDispatch } from "react-redux";
import VendorOffers from "./VendorOffers/VendorOffers";
import AboutUS from "./AboutUs/Aboutus";
import VendorProduct from "./Products/VendorProduct";

import { useNavigate } from "react-router-dom";
import { getSingleStores } from "../../../Services/StoreServices";
import { getUsers, likeVendor, unLikeVendor } from "../../../Services/UserServices";

function VendorDetails(props) {

  const [loginStatus, setLoginStatus] = useState();
  const [showLogin, setSetLoginFlag] = useState(false);
  const [singleStoreData, setSingleStoreData] = useState({})
  const [userData, setUserData] = useState({})

  const [shareLink, setShareLink] = useState('');
  const [tabActivity, setTabActivity] = useState({
    offers: true,
    products: false,
    aboutUs: false,
  });
  const { id } = useParams();

  const user = JSON.parse(localStorage.getItem("kube-user"));

  console.log("singleStore", singleStoreData)
  // console.log("userData", userData);
  

  useEffect(() => {
    getUsers(user?.phoneNo).then((res) => {
      setUserData(res[0]);
    })
  }, [])

  useEffect(() => {
    getSingleStores(id).then(res => {
      setSingleStoreData(res);
    })
  },[id]);

  useEffect(() => {
    window.scrollTo(0,0);
    if (localStorage.getItem("selectedVendorDetail") !== null) {
      setShareLink(window.location)
    } else {
      setShareLink(window.location)
    }
  }, [props]);


  function onTabChange(tabName) {
    let tabsAry = {
      offers: false,
      products: false,
      aboutUs: false,
    };
    tabsAry[tabName] = true;
    setTabActivity(tabsAry);
  }

  const StoreLike = (vendor) => {
    // dispatch(likeVendor(props?.user?.data?._id, vendor));
    likeVendor(vendor, userData?.uniqueId).then(res => {
      getUsers(user?.phoneNo).then((res) => {
        setUserData(res[0]);
      })
    })
  };
  const StoreUnLike = (vendor) => {
    // dispatch(unLikeVendor(props?.user?.data?._id, vendor));
    unLikeVendor(vendor, userData?.uniqueId).then(res => {
      getUsers(user?.phoneNo).then((res) => {
        setUserData(res[0]);
      })
    })
  };

  const copyText = (text) => {
    var textField = document.createElement('textarea');
    textField.innerText = text;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand('copy');
    textField.remove();
    alert("Copyed text");
  }



  return (
    <>
    { Object.keys(singleStoreData).length !== 0 &&
    <div>
      <div className="container vendorDetails_section">
        <div className="row">
          <div className="col-lg-12 inner_listing_box text-center mb-md-5 mb-3">
            <div className="row">
              <div className="col-lg-6 VDImgBox">
                <div className="VDimage_wrap">
                  {/* <img
                    src={singleStoreData?.images[1]?.url}
                    alt=""
                  /> */}
                  <img
                    src={singleStoreData?.store?.images[0]}
                    alt="No Image Available"
                  />
                </div>
              </div>

              <div className="col-lg-6 ">
                <div className="details_overview_wrap mt-md-4 mt-2 text-start">
                  <div className="inner_details_overview_wrap">
                    <div className="ab_heart_icon">
                      {userData?.favouriteStores &&
                      userData?.favouriteStores?.indexOf(
                        singleStoreData?.id
                      ) !== -1 ? (
                        
                        <FaHeart
                          onClick={() =>
                            StoreUnLike(singleStoreData?.id)
                          }
                          color="red"
                        />
                      ) : (
                        <FaRegHeart
                          onClick={() =>
                            StoreLike(singleStoreData?.id)
                          }
                        />
                      )}
                    </div>

                    <div className="VD_ab_gold_silver_tag">
                      {singleStoreData?.store?.package ===
                        "Platinum" && (
                          <img
                            src={require("../../../assets/Badges 03.png")}
                            alt=""
                          />
                        )}
                      {singleStoreData?.store?.package ===
                        "Free" && (
                          <img
                            src={require("../../../assets/Badges 05.png")}
                            alt=""
                          />
                        )}
                      {singleStoreData?.store?.package ===
                        "Bronze" && (
                          <img
                            src={require("../../../assets/Badges 04.png")}
                            alt=""
                          />
                        )}
                      {singleStoreData?.store?.package ===
                        "Silver" && (
                          <img
                            src={require("../../../assets/Badges 02.png")}
                            alt=""
                          />
                        )}
                      {singleStoreData?.store?.package ===
                        "Gold" && (
                          <img
                            src={require("../../../assets/Badges 01.png")}
                            alt=""
                          />
                        )}
                      {singleStoreData?.store?.package ===
                        "Basic" && (
                          <img
                            src={require("../../../assets/Badges 06.png")}
                            alt=""
                          />
                        )}
                    </div>

                    <p className="title_head">
                      {singleStoreData?.store?.storeName}
                    </p>


                   { singleStoreData?.store?.vendor?.vendor_name &&
                   <div className="addressbar_wrap">
                      <a href="" className="tag_add">
                        <b> Owner :</b>
                      </a>
                      <p className="mb-1">
                        {
                          singleStoreData?.store?.vendor
                            ?.vendor_name
                        }
                      </p>
                    </div>
                    }
                    <div className="addressbar_wrap">
                      <a href="" className="tag_add">
                        <b> Add.</b>
                      </a>
                      <p className="mb-1">
                        {singleStoreData?.store?.address}
                      </p>
                    </div>
                  </div>

                  <div className="contactRatingBar_wrap d-flex justify-content-between">
                    <div className="contact_wrap d-flex">
                      <a href="" className="tag_add">
                        <b> Contact :</b>
                      </a>
                      <p className="mb-1">
                        +91 {singleStoreData?.phoneNo}
                      </p>
                    </div>
                    <div className="VP_review_wrap_section">
                      <div className="rieview_list">
                        <StarRatings
                          rating={singleStoreData?.store?.ratings}
                          starRatedColor="#25255c"
                          numberOfStars={5}
                          name="rating"
                          starDimension= {window.innerWidth < 600 ? "18px" : "20px" }
                          starSpacing={"1px"}
                        />
                        <p className="review_write_wrap mx-2 mt-2">
                          {singleStoreData?.store?.numOfReviews ? "( " + singleStoreData?.store?.numOfReviews + " Reviews )" : "( 0 Reviews )"}
                        </p>
                      </div> 
                    </div>
                  </div>
                  <div className="icons-wraps">
                  {singleStoreData?.store?.package !==
                        "Free" && (
                          <img
                            src={require("../../../assets/location.png")}
                            alt=""
                          />
                        )}
                    
                    <a href={`https://wa.me/91${singleStoreData?.store?.phoneNo}/?text=Hii ${singleStoreData?.store?.storeName}, I got your contact through kubecity.in  `} target='_blank'>
                      <img src={require("../../../assets/whatsapp_icon.png")} />
                    </a>
                    <img src={require("../../../assets/share-icon.png")} onClick={() => copyText(shareLink)} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-12 tab-vendor-details">
        <div className="container">
          <div className="col-12 inner-tab-vendor-details">
            <button
              onClick={() => {
                onTabChange("offers");
              }}
              className={
                tabActivity.offers
                  ? "VDLogoButton active"
                  : "VDLogoButton"
              }
            >
              Offers
            </button>
            <button
              onClick={() => {
                onTabChange("products");
              }}
              className={
                tabActivity.products
                  ? "VDLogoButton active"
                  : "VDLogoButton"
              }
            >
              Products
            </button>
            <button
              onClick={() => {
                onTabChange("aboutUs");
              }}
              className={
                tabActivity.aboutUs
                  ? "VDLogoButton active"
                  : "VDLogoButton"
              }
            >
              About Us
            </button>
          </div>
          <div className="list-tab-wrap mt-md-4 mt-2">
            {tabActivity.offers && (
              <VendorOffers
                offers={singleStoreData?.store?.offer}
                id = {singleStoreData?.id}
              />
            )}

            {tabActivity.products && (
              <VendorProduct
                products={singleStoreData?.store?.products}
                id = {singleStoreData?.id}
              />
            )}

            {tabActivity.aboutUs && (
              <AboutUS 
                aboutData={singleStoreData?.store} 
                id = {singleStoreData?.id}
              />
            )}
          </div>
        </div>
      </div>
      
    </div>  }
    </>
  );
}


export default VendorDetails;



