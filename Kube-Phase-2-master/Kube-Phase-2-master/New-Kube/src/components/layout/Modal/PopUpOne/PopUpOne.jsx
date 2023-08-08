import React, { useState, useEffect } from "react";
import "../../header/Header.css";

import "bootstrap/dist/css/bootstrap.min.css";
import "./PopUpOne.css"

import "../../Modal/Modal.css";
import { useDispatch, connect } from "react-redux";



const PopUp = (props) => {

      
return (
  
        <div className="PopUpOne">
            <div className="PopUpOne-content">
              
              <div className="PopUpOne-body">
  
                <div className="PopUpOne-Grid">
                  <div className="PopUpOnebox1">
                    <p>
                      Ab <b>Hazaar</b> sawaal nhi, <br/>
                      <b>1000 Rupee</b> milenge  <br/>
                      <b> Register</b> karte hi 
                    </p>
                  </div>
                  <div className="PopUpOnebox2">
                    <a href="https://play.google.com/store/apps/details?id=com.kubecity" target="#"><p>Download Now</p></a>
                    <a href="https://play.google.com/store/apps/details?id=com.kubecity" target="#">
                      <img
                          src="https://www.kubeshop.in/wp-content/uploads/2023/02/image-80.png"
                          className="PopUpOneDownloadImg"
                        /> 
                    </a>
                  </div>
                  <div className="PopUpOnebox3">
                      <img
                        src="https://www.kubeshop.in/wp-content/uploads/2023/02/unnamed.png"
                        className="PopUpOneImg"
                      /> 
                  
                    
                  </div>
                </div>
                <button
                      type="button"
                      className="popUpClose"
                      onClick={() => props.closePopUp()}
                >
                    <span className="popUpClosebtn">&times;</span>
                </button>
                
              </div>
            </div>
        </div>
  );
};

export default PopUp;
