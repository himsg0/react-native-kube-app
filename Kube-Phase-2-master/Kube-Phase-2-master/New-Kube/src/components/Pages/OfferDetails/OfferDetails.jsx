import React, { useEffect, useState } from "react";
import "./OfferDetails.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Link, useParams } from "react-router-dom";
import { useSearchParams } from "react-router-dom";

import { connect, useSelector, useDispatch } from "react-redux";
import DownloadButton from "../VendarDetails/VendorOffers/DownloadButton/DownloadButton"

import { getOffersSingleStores } from "../../../Services/StoreServices";


const OfferDetails = (props) => {

  const navigate = useNavigate();

  const [loginStatus, setLoginStatus] = useState();
  const [showLogin, setSetLoginFlag] = useState(false);

  let [searchParams, setSearchParams] = useSearchParams();
  const { _id } = useParams();

  let offerindex = searchParams.get("i");


  const dispatch = useDispatch();

  const [shareLink, setShareLink] = useState('');
  const [offerDetailsData, setOfferDetailsData] = useState([])


  useEffect(() => {
    getOffersSingleStores(_id).then(res => {
      setOfferDetailsData(res);

    })
  }, [])

  useEffect(() => {
    if (localStorage.getItem("selectedVendorDetail") !== null) {
      setShareLink(window.location)
    } else {
      setShareLink(window.location)
    }
  }, [props]);


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


      {Object.keys(offerDetailsData).length !== 0 &&
        <div>

          <div className="container vendorDetails_section">
            <div className="row">
              <div className="ms-lg-5 col-lg-11 inner_listing_box text-center mb-md-5 mb-3">
                <div className="row">
                  <div className="col-lg-6">
                    <div className="OD_image_wrap">
                      <img
                        src={offerDetailsData.images[0].url}
                        alt=""
                      />

                    </div>
                  </div>

                  <div className="col-lg-6 ">
                    <div className="details_overview_wrap mt-4 text-start">
                      <div className="inner_details_overview_wrap">


                        <div className="ab_gold_silver_tag">
                          {offerDetailsData.package ===
                            "Platinum" && (
                              <img
                                src={require("../../../assets/Badges 03.png")}
                                alt=""
                              />
                            )}
                          {offerDetailsData.package ===
                            "Free" && (
                              <img
                                src={require("../../../assets/Badges 05.png")}
                                alt=""
                              />
                            )}
                          {offerDetailsData.package ===
                            "Bronze" && (
                              <img
                                src={require("../../../assets/Badges 04.png")}
                                alt=""
                              />
                            )}
                          {offerDetailsData.package ===
                            "Silver" && (
                              <img
                                src={require("../../../assets/Badges 02.png")}
                                alt=""
                              />
                            )}
                          {offerDetailsData.package ===
                            "Golden" && (
                              <img
                                src={require("../../../assets/Badges 01.png")}
                                alt=""
                              />
                            )}
                          {offerDetailsData.package ===
                            "Basic" && (
                              <img
                                src={require("../../../assets/Badges 06.png")}
                                alt=""
                              />
                            )}
                        </div>

                        
                          <p className="title_head">
                            {offerDetailsData.storeName}
                          </p>
                        
                        {offerDetailsData.vendor && <div className="addressbar_wrap">
                          <a href="" className="tag_add">
                            <b> Owner:</b>
                          </a>
                          <p className="mb-1">

                            {offerDetailsData.vendor.vendor_name}

                          </p>
                        </div>}
                        <div className="addressbar_wrap">
                          <a href="" className="tag_add">
                            <b> Add.</b>
                          </a>
                          <p className="mb-1">
                            {offerDetailsData.address}
                          </p>
                        </div>
                      </div>

                      <div className="addressbar_wrap d-flex justify-content-between">
                        <div className="contact_wrap d-flex">
                          <a href="" className="tag_add">
                            <b> Contact:</b>
                          </a>
                          <p className="mb-1">
                            +91 {offerDetailsData.phoneNo}
                          </p>
                        </div>

                      </div>
                      <div className="icons-wraps">
                        <img src={require("../../../assets/location.png")} />
                        <a href={`https://api.whatsapp.com/send?text=${shareLink}`} target='_blank'>
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

          <div className='offerDetailsSec'>
            <hr />
            <h2 className="h2">Redeem Now</h2>
            <img className='ODofferImg' src={offerDetailsData.offer[offerindex].image}></img>
            <div className='offerDetailsContentSec'>

              {offerDetailsData.offer[offerindex].offerdetail ?
                <div>
                  <h2>About Coupon</h2>
                  <p>{offerDetailsData.offer[offerindex].offerdetail}</p>
                </div> :
                <></>
              }
              
              <div className="offerDetailsDownloadBtnSec">
                <DownloadButton Id={offerDetailsData.uniqueId} Image={offerDetailsData.offer[offerindex].image} counter={offerDetailsData.offer[offerindex].offerCounter} />
              </div>

            </div>
          </div>
          {offerDetailsData.offer[offerindex].termsandcondition ? <div className='termsConditionSec'>
            <h1>Terms & Conditions</h1>
            <p>{offerDetailsData.offer[offerindex].termsandcondition}</p>
          </div>
            :
            <div></div>
          }

        </div>
      }


    </>
  )
}

export default OfferDetails;