import React from "react";
import "./VendorProduct.css";
import { Link } from "react-router-dom";

function VendorProduct(props) {
  console.log("data on props products",props);
  return (
    <>
      <div className="row">
        {props?.products &&
          props.products.map((data, index) => {
            return (
              
              <div key={index} className="col-lg-3 VDofferimg">
                <div className="image_wrap">
                
                  <img
                    src={
                      data?.url
                        ? data?.url
                        : require("../../../../assets/list_details.png")
                    }
                  />
                  <p className="productName">{data.productName}</p>
                  
                </div>
              </div>
              
            );
          })}
      </div>
    </>
  );
}

export default VendorProduct;
