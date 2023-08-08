import React, { useState, useEffect } from "react";
import "../../header/Header.css";

import "bootstrap/dist/css/bootstrap.min.css";
import "./PopUpTwo.css"

import "../../Modal/Modal.css";
import { useDispatch, connect } from "react-redux";



const PopUpTwo = (props) => {

      
return (
        <div className="PopUpTwo">
            <div className="PopUpTwo-content">
              
              <div className="PopUpTwo-body">
                {/* <img
                    src="https://www.kubeshop.in/wp-content/uploads/2023/02/Group-40559.png"
                    className="advertisePopUpLogo"
                /> */}
                <div className="PopUpTwo-Grid">
                  <div className="PopUpTwobox1">
                    <p>
                      <b>Save</b> money on your total bill
                      at your<b> Nearby Vendor</b> and
                      get <b> Coin Back</b> as rewards.
                    </p>
                  </div>
                  <div className="PopUpTwobox2">
                    <a href="https://play.google.com/store/apps/details?id=com.kubecity" target="#"><p>Download Now</p></a>
                    <a href="https://play.google.com/store/apps/details?id=com.kubecity" target="#">
                      <img
                          src="https://www.kubeshop.in/wp-content/uploads/2023/02/image-80.png"
                          className="PopUpTwoDownloadImg"
                        /> 
                    </a>
                  </div>
                  <div className="PopUpTwobox3">
            
                      <img
                        src="https://www.kubeshop.in/wp-content/uploads/2023/02/Layer-2.png"
                        className="PopUpTwoImg"
                      /> 
        
                    
                  </div>
                </div>
                <button
                      type="button"
                      className="popUpTwoClose"
                      onClick={() => props.closePopUp()}
                >
                    <span className="popUpTwoClosebtn">&times;</span>
                </button>
                
              </div>
            </div>
        </div>
  );
};

export default PopUpTwo;
