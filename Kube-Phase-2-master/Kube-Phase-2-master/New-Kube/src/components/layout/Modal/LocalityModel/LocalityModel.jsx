import React, { useEffect, useState } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import "./LocalityModel.css";
import { connect, useDispatch } from "react-redux";
import Localities from "../../../../constant/Localities.json"

const Locality = (props) => {

  const [selectedCity, setSelectedCity] = useState(props?.selectedCity);
  const [allLocalities, setAllLocalities] = useState([]);

  const getLocalities = () => {
    for (let index = 0; index < Localities.Localities.length; index++) {
      const city = Object.keys(Localities.Localities[index])[0];
      if(city == selectedCity){
        setAllLocalities(Localities.Localities[index][city]); // Get the localities of the selected city
        break;
      }
    }
  }
  // console.log("LL", allLocalities);

  useEffect(() => {
    const city = localStorage.getItem("selectedCity");
    setSelectedCity(city);
    // dispatch(getLocality(city));
    getLocalities()
  }, [selectedCity]);

  const closeCity = () => {
    props.setShow(false);
  };
  const setLocality = (locality) => {
    closeCity();
    localStorage.setItem("setLocality", locality);
    localStorage.setItem('showCityModel', false);
  };

  const OpenCityModel = () => {
    localStorage.setItem('showCityModel', true);
  }

  const refreshPage = () => {
    window.location.reload();
  }

  return (
    <div className="modal-content cus-modal-content">
      <div className="modal-body container">
        
          <div
            style={{
              
              justifyContent: "space-between",
              width: "100%",
            }}
          >

            
            <div className="pickLocalitySec">

            
            <div
              style={{
                display: "flex",
                width: "100%",
                justifyContent: "space-between",
                textAlign: "center",
              }}

            >
              <h3 className="picklocality">Pick a Locality</h3>
              <button
                type="button"
                className="close"
                onClick={() => closeCity()}
              >
                <span className="closebtn">&times;</span>
              </button>
            </div>
          </div>
          </div>
          <div className="allLocalitiesSec">
            <button onClick={() => {OpenCityModel(); refreshPage()}} className="alllocatilys"> 
              {props.selectedCity ? props.selectedCity : selectedCity}
            </button>
          </div>
          <br />


          <button onClick={() =>{ setLocality('All Locality') ; refreshPage()}} className="alllocatilys">All Localities </button>

          <div className="localitySection">
            {allLocalities.map((locality, index) => {
              return (
                <button
                  key={index}
                  className="localityLogoButton"
                  onClick={() => {setLocality(locality); refreshPage()}}
                >
                  {locality}
                </button>
              );
            })}
          </div>
        
      </div>
      <div className="modal-footer">
        <h5 className="modal-title text-danger">
          <div className="footsection">
            <div className="logosection">
              <img
                src={require("../../../../assets/KubeLogo.png")}
                className="Mlogo"
              />
            </div>

            <h3 className="Mtext">Your City Partner</h3>
          </div>
        </h5>
      </div>
    </div>
  );
};

export default Locality;
