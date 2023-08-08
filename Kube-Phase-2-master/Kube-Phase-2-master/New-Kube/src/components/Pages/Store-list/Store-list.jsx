import React, { useEffect, useState } from "react";
import "./store-list.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaPhoneAlt, FaRegHeart, FaCaretDown, FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import { connect, useDispatch } from "react-redux";
import { Helmet } from "react-helmet";
import { screenToggleA } from "../../../Redux/Action/SelectedA";
import { Modal } from "react-bootstrap";
import StarRatings from "react-star-ratings";
import Login from "../Login/Login";
import Registration from "../Registration/Registration";
import OtpScreen from "../OtpScreen/OtpScreen";
import "react-toastify/dist/ReactToastify.css";
import { getSubCategories } from "../../../Services/CategoriesServices";
import { getSellers, getStores } from "../../../Services/StoreServices";
import {
  getUsers,
  likeVendor,
  unLikeVendor,
} from "../../../Services/UserServices";

const StoreList = (props) => {
  // console.log("Storelist Data" , props);
  let [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [city, setCity] = useState();
  const [locality, setLocality] = useState();
  const [loginStatus, setLoginStatus] = useState();
  const [storeData, setStoreData] = useState([]);

  const [selectedCategory, setSelectedCategory] = useState(
    ""
    // searchParams.get("cat")
  );
  const [selectedSubCategory, setSelectedSubCategory] = useState("");
  const [onlineShop, setOnlineShop] = useState(false);
  const [homeDelivery, setHomeDelivery] = useState(false);
  const [callToggle, setCallToggle] = useState(false);
  const [showLogin, setSetLoginFlag] = useState(false);
  const [subcategories, setSubcategories] = useState();

  const [otpData, setOtpData] = useState([]);
  const [authUser, setAuthUser] = useState([]);
  const [isLogin, setIsLogin] = useState(false);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    setSelectedCategory(searchParams.get("cat"));
    setSelectedSubCategory(searchParams.get("Subcat"));
  }, [searchParams.get("cat"), searchParams.get("Subcat")]);

  useEffect(() => {
    if (
      selectedCategory != undefined &&
      city &&
      locality &&
      selectedSubCategory != undefined
    ) {
      getSellers(
        city,
        locality,
        homeDelivery,
        onlineShop,
        selectedCategory,
        selectedSubCategory
      ).then((res) => {
        console.log("storeData", res);
        setStoreData(res);
      });
    }
  }, [
    selectedCategory,
    selectedSubCategory,
    locality,
    city,
    homeDelivery,
    onlineShop,
  ]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("kube-user"));
    getUsers(user?.phoneNo).then((res) => {
      setUserData(res[0]);
    });
  }, [userData?.email, userData?.userName, userData?.favouriteStores]);

  useEffect(() => {
    const selectedCity = localStorage.getItem("selectedCity");
    const locality = localStorage.getItem("setLocality");
    setCity(selectedCity);
    setLocality(locality);
    setLoginStatus(localStorage.getItem("isUserVerify"));
  }, [city, locality, loginStatus, localStorage.getItem("isUserVerify")]);

  const showHomeDeliveryData = () => {
    setHomeDelivery(!homeDelivery);
  };

  useEffect(() => {
    if (props.searchStores !== undefined) {
      setStoreData(props?.searchStores);
    }
  }, [props?.searchStores]);

  const getSubcategoryDataList = (category) => {
    if (props?.categories !== undefined) {
      if (category == "") {
        setSubcategories([]);
      } else {
        getSubCategories(category).then((res) => {
          res.forEach((val) => {
            setSubcategories(val.subCategories);
          });
        });
      }
    }
  };

  const GoProductDetail = (data) => {
    if (loginStatus === "true") {
      localStorage.setItem("selectedVendorDetail", JSON.stringify(data));
      navigate("/vendorDetail/" + data?.id);
    } else {
      setSetLoginFlag(true);
      dispatch(screenToggleA("Login"));
    }
  };

  const handleClose = () => {
    setSetLoginFlag(false);
  };
  const showToast = () => {
    setSetLoginFlag("Enter otp");
  };

  const StoreLike = (vendor) => {
    likeVendor(vendor, userData?.uniqueId);
  };
  const StoreUnLike = (vendor) => {
    unLikeVendor(vendor, userData?.uniqueId);
  };

  // console.log("lLL", userData)

  return (
    <div className="p-10">
      <Helmet>
        <title>
          Store List | Check Out The Best Deals & Discounts At Your Nearest
          Shops
        </title>
        <meta
          name="Description"
          content="Check out which Kube-listed shop near you is giving the best deals & discounts. Click here to explore the store list."
        />
      </Helmet>
      <div className="shorting_title_wrap mb-md-4 mb-3">
        <h1 className="common_header">Store List</h1>
      </div>

      {props?.searchStores === undefined && (
        <div className="filtring_section mt-md-3 mt-2 mb-4">
          <div className="filter_list_name">
            <select
              onChange={(e) => {
                setSelectedCategory(e.target.value);
                navigate(`/StoreList?cat=${e.target.value}`);
                getSubcategoryDataList(e.target.value);
                // setSelectedSubCategory("");
              }}
              value={selectedCategory}
              className=" mt-0"
            >
              <option value={""} selected={true}>
                Category
              </option>
              {props?.categories?.map((x) => (
                <option value={x.categoryName}>{x.categoryName}</option>
              ))}
            </select>
            <FaCaretDown />
          </div>
          <div className="filter_list_name">
            <select
              onChange={(e) => {
                setSelectedSubCategory(e.target.value);
                if (e.target.value == "") {
                  setSelectedSubCategory("");
                  navigate(`/StoreList?cat=${selectedCategory}`);
                } else {
                  navigate(
                    `/StoreList?cat=${selectedCategory}&Subcat=${e.target.value}`
                  );
                }
              }}
              value={selectedSubCategory}
              className=" mt-0"
            >
              <option value={""} selected>
                All Sub-Categories
              </option>
              {subcategories !== undefined &&
                subcategories.map((data, index) => (
                  <option key={index} value={data.subCategoryName}>
                    {data.subCategoryName}
                  </option>
                ))}
            </select>
            <FaCaretDown />
          </div>

          <div className="filter_list_name mt-0">
            Online Shop
            <input
              onChange={() => setOnlineShop(!onlineShop)}
              type="checkbox"
              name=""
              id=""
            />
          </div>
          <div className="filter_list_name mt-0">
            Home Delivery
            <input
              onChange={() => showHomeDeliveryData()}
              type="checkbox"
              name=""
              id=""
            />
          </div>
        </div>
      )}
      <div className="row">
        {storeData.length == 0 && <h1 className="loading">Loading...</h1>}
        {storeData &&
          storeData?.map((data, index) => (
            <>
              <div
                key={index}
                className="col-lg-4 inner_listing_box text-center mb-md-5 mb-3"
              >
                <div>
                  <div
                    onClick={() => GoProductDetail(data)}
                    className="SLimage_wrap"
                  >
                    {data?.store?.images[0] == "" ? (
                      <img src={require("../../../assets/Noimage.jpg")} />
                    ) : (
                      <img src={data?.store?.images[0]} alt="" />
                    )}
                  </div>

                  <div className="details_overview_wrap mt-md-3 mt-2 text-start">
                    <div className="inner_details_overview_wrap">
                      <div className="ab_heart_icon">
                        {loginStatus == "true" && (
                          <>
                            {userData?.favouriteStores &&
                            userData?.favouriteStores?.indexOf(
                              data?.uniqueId
                            ) !== -1 ? (
                              <FaHeart
                                onClick={() => StoreUnLike(data?.id)}
                                color="red"
                              />
                            ) : (
                              <FaRegHeart onClick={() => StoreLike(data?.id)} />
                            )}
                          </>
                        )}
                      </div>
                      <div className="ab_gold_silver_tag">
                        {data?.store?.package === "Platinum" && (
                          <img
                            src={require("../../../assets/Badges 03.png")}
                            alt=""
                          />
                        )}
                        {data?.store?.package === "Free" && (
                          <img
                            src={require("../../../assets/Badges 05.png")}
                            alt=""
                          />
                        )}
                        {data?.store?.package === "Bronze" && (
                          <img
                            src={require("../../../assets/Badges 04.png")}
                            alt=""
                          />
                        )}
                        {data?.store?.package === "Silver" && (
                          <img
                            src={require("../../../assets/Badges 02.png")}
                            alt=""
                          />
                        )}
                        {data?.store?.package === "Gold" && (
                          <img
                            src={require("../../../assets/Badges 01.png")}
                            alt=""
                          />
                        )}
                        {data?.store?.package === "Basic" && (
                          <img
                            src={require("../../../assets/Badges 06.png")}
                            alt=""
                          />
                        )}
                      </div>
                      <p className="title_head">{data?.store?.storeName}</p>

                      <div className="addressbar_wrap">
                        <a href="" className="tag_add">
                          Add.
                        </a>
                        <p className="mb-md-1 mb-0">{data?.store?.address}</p>
                      </div>

                      <div className="review_wrap_section">
                        <div className="rieview_list">
                          <div className="starRatingCls">
                            <StarRatings
                              rating={data?.store?.ratings}
                              starRatedColor="#25255c"
                              numberOfStars={5}
                              name="rating"
                              starDimension={"16px"}
                              starSpacing={"1px"}
                            />
                          </div>
                          <p className="review_write_wrap mt-2 mx-1">
                            {data?.store?.numOfReviews
                              ? "( " + data?.store?.numOfReviews + " Reviews )"
                              : "( 0 Reviews )"}
                          </p>
                          {/* {loginStatus === "true" && (
                            <div>
                              {callToggle === false ? (
                                <button
                                  onClick={() => setCallToggle(!callToggle)}
                                  href=""
                                  className="call_now_wrap mx-2 mt-2"
                                >
                                  {" "}
                                  <FaPhoneAlt /> Call now
                                </button>
                              ) : (
                                <span
                                  onClick={() => setCallToggle(!callToggle)}
                                >
                                  <a href="tel:+9571515056">+9571515056</a>
                                </span>
                              )}
                            </div>
                          )} */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ))}
      </div>

      {/* <Modal
        className="new_modal"
        show={showLogin}
        onHide={handleClose}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
      >
        <Modal.Body>
        {props?.screenToggle === "Register" && (
            <Registration closeModal={handleClose} showToast={showToast} />
          )}
          {props?.screenToggle === "Login" && (
            <Login closeModal={handleClose} showToast={showToast} />
          )}
          {props?.screenToggle === "OTP" && (
            <OtpScreen closeModal={handleClose} showToast={showToast} />
          )}
        </Modal.Body>
      </Modal> */}
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
    </div>
  );
};

export default connect(
  ({ toggleScreensR, SetSearchStoresR, GetCategoriesR }) => ({
    screenToggle: toggleScreensR.screenToggle,
    searchStores: SetSearchStoresR.searchStores,
    categories: GetCategoriesR.category,
  })
)(StoreList);
