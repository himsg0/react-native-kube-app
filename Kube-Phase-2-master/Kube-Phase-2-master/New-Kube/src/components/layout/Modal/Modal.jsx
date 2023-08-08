import React, { useState, useEffect } from "react";
import "../header/Header.css";

import "bootstrap/dist/css/bootstrap.min.css";

import "../Modal/Modal.css";
import Locality from "../Modal/LocalityModel/LocalityModel";
import { useDispatch, connect } from "react-redux";
import { selectedCityA } from "../../../Redux/Action/SelectedA";
import Cities from '../../../constant/Cities.json';

const CityModel = (props) => {
  const dispatch = useDispatch();
  const [currentSelectedCity, setCurrentSelectedCity] = useState();
  const [showLocality, setShowLocality] = useState(false);
  const [search, setSearch] = useState();
  const [allCities, setAllCities] = useState([])

  useEffect(() => {
    setAllCities(Cities?.products)
  },[])

  console.log("", props.cityLocalityToggle, showLocality)

  useEffect(() => {
    const city = localStorage.getItem('selectedCity');
    dispatch(selectedCityA(city));
    setShowLocality(props.cityLocalityToggle);
  }, [currentSelectedCity, props.cityLocalityToggle]);


  const closeCity = () => {
    props.setShow(false);
  };

  const topCity = (city) => {
    localStorage.setItem("selectedCity", city);
    dispatch(selectedCityA(city));
    setCurrentSelectedCity(city);
    setShowLocality(props.cityLocalityToggle);
  };

  return (
    <div>
      <div
        show={props.show}
        onClose={closeCity}
        className={"modal fade" + (props.show ? " show d-block" : " d-none")}
        tabIndex="-1"
        role="dialog"
        data-bs-backdrop="false"
      >
        <div className="cityDialog">
          {currentSelectedCity || showLocality ? (
            <Locality
              show={props.show}
              setShow={props.setShow}
              locality={props.locality}
              selectedCity={currentSelectedCity}
              parth={'abc'}
            />
          ) : (
            <div className="modal-content cus-modal-content">
              
              <div className="modal-body">
    
                  <h3 className="pickcity">
                    Pick a City
                    <button
                      type="button"
                      className="close"
                      onClick={() => closeCity()}
                    >
                      <span className="closebtn">&times;</span>
                    </button>
                  </h3>
                  <div className="cityheaderSearchbar cuscityHeaderSearchbar">
                    <img
                      className="cityheadersearchicon"
                      src="https://www.kubeshop.in/wp-content/uploads/2022/05/Search.webp"
                      alt="Search"
                    />
                    <input
                      className="cityheaderSearch"
                      type="text"
                      autoComplete="off"
                      placeholder="Enter Your City name"
                      name="search"
                      onChange={(event) => setSearch(event.target.value)}
                      value={search}
                    ></input>
                  </div>
                  <div className="search mt-md-5 mt-0">
                    {search
                      ? allCities.map((city, index) => {
                            const searchTxt = search.toUpperCase();
                            const cityText = city.toUpperCase();
                          return (
                            <>
                              {cityText.indexOf(searchTxt) > -1 && (
                                <span
                                  key={index}
                                  className="cityList"
                                  onClick={() => topCity(city)}
                                >
                                  {city}
                                </span>
                              )}
                            </>
                          );
                        })
                      : null}
                  </div>
                  <br />
                  {/* <h3 className="topcities">Top Cities</h3> */}
                  <div className="citylogosection">
                    <button
                      className="citylogobtn"
                      onClick={() => topCity("Noida")}
                    >
                      <img
                        className="citylogo"
                        src="https://i.imgur.com/rLSx5CZ.png"
                      ></img>
                    </button>
                    <button
                      className="citylogobtn"
                      onClick={() => topCity("Greater Noida")}
                    >
                      <img
                        className="citylogo"
                        src="https://i.imgur.com/urfy0uO.png"
                      ></img>
                    </button>
                    { <button
                      className="citylogobtn"
                      onClick={() => topCity("Ghaziabad")}
                    >
                      <img
                        className="citylogo"
                        src="https://www.kubeshop.in/wp-content/uploads/2022/09/Artboard-1-copy.png"
                      ></img>
                    </button> }
                    {/* <button
                      className="citylogobtn"
                      onClick={() => topCity("Bareilly")}
                    >
                      <img
                        className="citylogo"
                        src="https://i.imgur.com/Ov0nDuk.png"
                      ></img>
                    </button> */}
                    <button
                      className="NRcitylogobtn"
                    >
                      <img
                        className="citylogo"
                        src=""
                      ></img>
                    </button>
                  </div>
                
              </div>
              <div className="modal-footer">
                <h5 className="modal-title text-danger">
                  <div className="footsection">
                    <div className="logosection">
                      <img
                        src={require("../../../assets/KubeLogo.png")}
                        className="Mlogo"
                      />
                    </div>

                    <h3 className="Mtext">Your City Partner</h3>
                  </div>
                </h5>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CityModel;
