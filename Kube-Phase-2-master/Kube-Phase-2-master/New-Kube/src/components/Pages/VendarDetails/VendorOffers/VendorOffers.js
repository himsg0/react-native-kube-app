import React, { useEffect, useState } from "react";
import "./VendorOffers.css";
import { Link } from "react-router-dom";
import Photo from "../../../../assets/list_details.png"
import Axios from 'axios';

import DownloadButton from "./DownloadButton/DownloadButton"


function VendorOffers(props) {
  console.log("data on props",props);



  return (
    <>
      <div className="row">
        {props?.offers &&
          props.offers.map((data, index) => {
            
            return (
              
              <div key={index} className="col-lg-4 VDofferimg">
                <div className="image_wrap">
                <Link to={`/OfferDetails/${props?.id}?i=${index}`}>
                  <img
                    src={
                      data?.image
                        ? data?.image
                        : require("../../../../assets/list_details.png")
                    }
                  />
                  </Link>
                </div>
                
                <div className="offerDownloadBtnSec">
                  <DownloadButton Id={props.id} Image={data.image} counter={data.offerCounter}/>
                </div>
                
              </div>
              
            );
          })}
      </div>
    </>
  );
}

export default VendorOffers;
