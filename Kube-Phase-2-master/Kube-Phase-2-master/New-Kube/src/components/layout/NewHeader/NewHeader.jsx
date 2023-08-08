import React, { useState, useEffect, useRef } from "react";
import "./NewHeader.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";

import { connect, useDispatch } from "react-redux";
import { FaCaretDown } from "react-icons/fa";

import CityModel from "../Modal/Modal";
import Login from "../../Pages/Login/Login";
import Registration from "../../Pages/Registration/Registration";
import OtpScreen from "../../Pages/OtpScreen/OtpScreen";
import Menu from "../Menu/Menu";
import { Button, Modal } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import { Link, useLocation } from "react-router-dom";
import { FaChevronRight } from "react-icons/fa";

import algoliasearch from "algoliasearch/lite";
import {
  InstantSearch,
  SearchBox,
  Hits,
  connectSearchBox,
  Configure,
  connectHits,
} from "react-instantsearch-dom";

import { getUsers } from "../../../Services/UserServices";
import { screenToggleA } from "../../../Redux/Action/SelectedA";
import { SetSearchStoresA } from "../../../Redux/Action/SetSearchStoresA";
import { getCategories } from "../../../Services/CategoriesServices";
import { GetCategoriesA } from "../../../Redux/Action/GetCategoriesA";

// const SearchHits = React.forwardRef(({ hitComponent: Hit, ...restProps }, ref) => (
//   <Hits hitComponent={Hit} {...restProps} innerRef={ref} />
// ));

const Search = connectSearchBox(
  ({ currentRefinement, refine, onFocus, onBlur }) => {
    const [isSearchFocused, setIsSearchFocused] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const hitsRef = useRef(null);

    useEffect(() => {
      const pageClickEvent = (e) => {
        console.log(hitsRef.current.contains(e.target));
        if (hitsRef.current !== null && !hitsRef.current.contains(e.target)) {
          setIsSearchFocused(!isSearchFocused);
        }
      };
      // If the item is active (ie open) then listen for clicks
      if (isSearchFocused) {
        window.addEventListener("addclick", pageClickEvent);
      }
      return () => {
        window.removeEventListener("removeclick", pageClickEvent);
      };
    }, [isSearchFocused]);

    useEffect(() => {
      if (searchQuery.length % 4 === 0) {
        refine(searchQuery);
      }
    }, [searchQuery]);

    const handleInputChange = (event) => {
      setSearchQuery(event.currentTarget.value);
    };

    useEffect(() => {
      const pageClickEvent = (e) => {
        if (
          hitsRef.current !== null &&
          !hitsRef.current.contains(e.target.value)
        ) {
          setIsSearchFocused(!isSearchFocused);
        }
      };
      // If the item is active (ie open) then listen for clicks
      if (isSearchFocused) {
        window.addEventListener("click", pageClickEvent);
      }
      return () => {
        window.removeEventListener("click", pageClickEvent);
      };
    }, [isSearchFocused]);

    const handleFocus = () => {
      setIsSearchFocused(true);
    };

    const Hit = ({ hit }) => {
      const navigate = useNavigate();
      const storeName = hit["store.storeName"];
      const GoToVendor = () => {
        navigate("/vendorDetail/" + hit?.objectID);
      };
      return (
        <div onClick={GoToVendor} className="hit" ref={hitsRef}>
          <h3>
            <FaChevronRight />
          </h3>
          <p className="store-name">{storeName}</p>
        </div>
      );
    };

    return (
      <div className="headerSearchbarSec">
        <div className="headerSearchbar" onClick={handleFocus}>
          <div className="headerSearchiconsec">
            <img
              className="headersearchicon"
              src="https://www.kubeshop.in/wp-content/uploads/2022/05/Search.webp"
              alt="Search"
            />
          </div>

          <input
            type="search"
            placeholder="Search..."
            autoComplete="off"
            name="search"
            list="store"
            value={searchQuery}
            onChange={handleInputChange}
            className="headerSearch"
          />
        </div>
        {isSearchFocused && (
          <div ref={hitsRef}>
            <Hits hitComponent={Hit} className="hits-list" />
          </div>
        )}
      </div>
    );
  }
);

function Header(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const isUserVerify = JSON.parse(localStorage.getItem("isUserVerify"));
  const [show, setShow] = useState(false);
  const [currentCity, setCurrentCity] = useState();
  const [locality, setLocality] = useState();
  const [cityLocalityToggle, setCityLocalityToggle] = useState(false);
  const [showLogin, setSetLoginFlag] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [loginUserName, setLoginUserName] = useState();

  const [profileImage, setProfileImage] = useState();
  const [isProfileView, setProfileViewImage] = useState(false);

  const [searchData, setSearchData] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [isOpenSuggetion, setIsOpenSuggetion] = useState(false);
  const [value, setvalue] = useState();

  const [otpData, setOtpData] = useState([]);
  const [authUser, setAuthUser] = useState([]);
  const [isLogin, setIsLogin] = useState(false);

  const [userData, setUserData] = useState({});

  const handleClose = () => {
    GotoLogin();
    setSetLoginFlag(false);
  };

  useEffect(() => {
    getCategories().then((res) => {
      if (res != null) {
        dispatch(GetCategoriesA(res));
      }
    });
  }, []);

  console.log("::", props?.selectedCityData);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("kube-user"));
    getUsers(user?.phoneNo).then((res) => {
      setUserData(res[0]);
    });
  }, [userData?.email, userData?.userName, userData?.image]);

  //using
  useEffect(() => {
    const city = localStorage.getItem("selectedCity");
    const cityModel = localStorage.getItem("showCityModel");
    if (city?.length <= 0 || city == undefined || cityModel == "true") {
      setShow(true);
    }
  }, []);

  //using
  const opencity = () => {
    setShow(true);
    setCityLocalityToggle(false);
  };
  const openLocality = () => {
    setShow(true);
    setCityLocalityToggle(true);
  };

  useEffect(() => {
    setProfileViewImage(localStorage.getItem("isUserVerify"));
  }, [JSON.parse(localStorage.getItem("kube-user"))]);

  //using
  useEffect(() => {
    if (props?.selectedCityData && props?.selectedCityData?.length >= 10) {
      var reducedCityText = props?.selectedCityData?.substring(0, 7);
      setCurrentCity(reducedCityText + "...");
    } else {
      setCurrentCity(props?.selectedCityData);
    }

    const localityData = localStorage.getItem("setLocality");
    if (localityData?.length >= 12) {
      var reducedLocalityText = localityData.substring(0, 7);
      setLocality(reducedLocalityText + "...");
    } else {
      setLocality(localityData);
    }
  }, [currentCity, locality]);

  //using
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("kube-user"));
    const isUserVerify = JSON.parse(localStorage.getItem("isUserVerify"));
    if (user && isUserVerify) {
      const loginname = user?.userName;
      if (loginname?.length >= 12) {
        var reducedLoginText = loginname.substring(0, 6);
        setLoginUserName(reducedLoginText + "...");
      } else {
        setLoginUserName(loginname);
      }
      if (isUserVerify == false) {
        setLoginUserName("");
      }
    }
  }, [loginUserName, showLogin, isUserVerify, props.updateUserList]);

  //using & change
  useEffect(() => {
    const profileUrl = userData?.image;
    setProfileImage(
      profileUrl
        ? profileUrl?.replace("localhost", "192.168.0.110")
        : userData?.image?.replace("localhost", "192.168.0.110")
    );
  }, [userData?.image]);

  useEffect(() => {
    if (props?.searchStores !== undefined) {
      setSearchData(props?.searchStores);
    }
  });

  //using
  const GotoLogin = () => {
    if (loginUserName) {
      navigate("/ProfileView");
    } else {
      setSetLoginFlag(true);
    }
    dispatch(screenToggleA("Login"));
    // props.clearverifyOTP();
    setProfileViewImage(localStorage.getItem("isUserVerify"));
  };

  const showToast = (msg) => {
    toast(msg);
  };

  const defaultImage = require("../../../assets/defaultUser.png");

  const handleSearchFocus = () => {
    return true;
  };

  const handleSearchBlur = () => {
    return false;
  };

  const searchClient = algoliasearch(
    "UB7DCZ4PSL",
    "26c6fd7c7d7221eec57e481664a8af40"
  );

  const index = "sellersSearch";

  return (
    <>
      <div className="mainheader">
        {isMenuOpen ? (
          <div className="menuHead">
            <Menu setIsMenuOpen={setIsMenuOpen} />
          </div>
        ) : (
          <div className="FlexBox">
            <Link to="/" className="headerLogo">
              <img
                className="headerlogoicon"
                src="https://www.kubeshop.in/wp-content/uploads/2023/02/LOGO.png"
                alt="logo icon"
              />
            </Link>
            <span onClick={() => setIsMenuOpen(true)} className="headerMenu">
              <img
                className="headerMenuicon"
                src="https://www.kubeshop.in/wp-content/uploads/2023/02/MENU.png"
                alt="menu icon"
              />
            </span>
            <span onClick={() => GotoLogin()} className="headerloginsection">
              <div className="headerLoginContentSec">
                {/* <div className="headerloginimgsection">
                    <div className="headerloginimgsection"> */}
                {isProfileView === "false" ? (
                  <img className="headerloginicon" src={defaultImage} />
                ) : (
                  <img
                    className="headerloginicon"
                    src={
                      profileImage ? profileImage : defaultImage
                      // : props?.user?.data?.image
                    }
                    alt="login icon"
                  />
                )}
                {/* </div>
                  </div> */}
                <h1 className="headerlogintext">
                  {loginUserName ? loginUserName : "Login / Register"}
                </h1>
              </div>
            </span>

            <div className="headerCityLocality">
              <div className="headerLocationSec">
                <img
                  className="headerlocationicon"
                  src="https://www.kubeshop.in/wp-content/uploads/2023/02/Location.png"
                  alt="location icon"
                />
                <div className="headerCityLocalitySec">
                  <span className="cityLabel" onClick={() => opencity()}>
                    {currentCity ? currentCity : "Select City"}
                    <FaCaretDown size={25} />
                  </span>
                  <span
                    className="localityLabel"
                    onClick={() => openLocality()}
                  >
                    {locality ? locality : "Select Locality"}
                    <FaCaretDown size={25} />
                  </span>
                </div>
              </div>
            </div>
            <InstantSearch searchClient={searchClient} indexName={index}>
              <Configure hitsPerPage={10} />
              <Search onFocus={handleSearchFocus} onBlur={handleSearchBlur} />
            </InstantSearch>

            <CityModel
              show={show}
              setShow={setShow}
              cityLocalityToggle={cityLocalityToggle}
            />
          </div>
        )}
      </div>

      <Modal
        className="new_modal"
        show={showLogin}
        onHide={handleClose}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
      >
        <Modal.Body>
          {props?.screenToggle === "Register" && (
            <Registration
              setIsLogin={setIsLogin}
              setOtpData={setOtpData}
              setAuthUser={setAuthUser}
              closeModal={handleClose}
              showToast={showToast}
            />
          )}
          {props?.screenToggle === "Login" && (
            <Login
              setIsLogin={setIsLogin}
              setOtpData={setOtpData}
              setAuthUser={setAuthUser}
              closeModal={handleClose}
              showToast={showToast}
            />
          )}
          {props?.screenToggle === "OTP" && (
            <OtpScreen
              isLogin={isLogin}
              otpData={otpData}
              authUser={authUser}
              closeModal={handleClose}
              notUser={handleClose}
              showToast={showToast}
            />
          )}
        </Modal.Body>
      </Modal>

      <ToastContainer />
    </>
  );
}

export default connect(
  ({ selectedCityNameR, toggleScreensR, SetSearchStoresR }) => ({
    selectedCityData: selectedCityNameR.selectedCityData,
    screenToggle: toggleScreensR.screenToggle,
    searchStores: SetSearchStoresR.searchStores,
  })
)(Header);
