import React, { useState, useEffect } from "react";
import "../Store-list/store-list.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { connect, useDispatch } from "react-redux";
import StarRatings from "react-star-ratings";
import { FaPhoneAlt, FaRegHeart, FaHeart } from "react-icons/fa";
import {getUsers, likeVendor, unLikeVendor} from "../../../Services/UserServices"
import {getFavouriteVendors} from "../../../Services/StoreServices"

const FavoriteVendor = (props) => {
  const dispatch = useDispatch();
  const [callToggle, setCallToggle] = useState(false);
  const [userData, setUserData] = useState({})
  const [favVendorList, setFavVendorList] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("kube-user"));
    getUsers(user?.phoneNo).then((res) => {
      setUserData(res[0]);
    })
  }, [])

  useEffect(() => {
    userData?.favouriteStores &&
    getFavouriteVendors(userData?.favouriteStores).then(res => {
      setFavVendorList(res);
    })
  },[userData?.favouriteStores])




  const StoreLike = (vendor) => {
    likeVendor(vendor, userData?.uniqueId)
  };
  const StoreUnLike = (vendor) => {
    unLikeVendor(vendor, userData?.uniqueId)
  };

  return (
    <div className="row">
      {favVendorList?.map((data, index) => {
        return (
          <div
            key={index}
            className="col-lg-6 inner_listing_box text-center mb-5"
          >
            <div>
              <div className="image_wrap">
                {data.images[0].url == "" ? (
                      <img src={require("../../../assets/Noimage.jpg")} />
                      
                    ) : (
                      
                      <img src={data.images[0].url} alt="" />
                )}
              </div>

              <div className="details_overview_wrap mt-4 text-start">
                <div className="inner_details_overview_wrap">
                  <div className="ab_heart_icon">
                    {userData?.favouriteStores &&
                      userData?.favouriteStores?.indexOf(
                        data?.id
                      ) !== -1 ? (
                        <FaHeart
                          onClick={() => StoreUnLike(data?.id)}
                          color="red"
                        />
                      ) : (
                        <FaRegHeart onClick={() => StoreLike(data?.id)} />
                      )
                    }
                  </div>
                  <div className="ab_gold_silver_tag">
                    {data.package === "Platinum" && (
                      <img
                        src={require("../../../assets/Badges 03.png")}
                        alt=""
                      />
                    )}
                    {data.package === "Free" && (
                      <img
                        src={require("../../../assets/Badges 05.png")}
                        alt=""
                      />
                    )}
                    {data.package === "Bronze" && (
                      <img
                        src={require("../../../assets/Badges 04.png")}
                        alt=""
                      />
                    )}
                    {data.package === "Silver" && (
                      <img
                        src={require("../../../assets/Badges 02.png")}
                        alt=""
                      />
                    )}
                    {data.package === "Gold" && (
                      <img
                        src={require("../../../assets/Badges 01.png")}
                        alt=""
                      />
                    )}
                    {data.package === "Basic" && (
                      <img
                        src={require("../../../assets/Badges 06.png")}
                        alt=""
                      />
                    )}
                  </div>
                  <p className="title_head">{data.storeName}</p>

                  <div className="addressbar_wrap">
                    <a href="" className="tag_add">
                      Add.
                    </a>
                    <p className="mb-1">{data.address}</p>
                  </div>

                  <div className="review_wrap_section">
                    <div className="rieview_list">
                      <div className="starRatingCls">
                        <StarRatings
                                  rating={data?.numOfReviews}
                                  starRatedColor="#25255c"
                                  numberOfStars={5}
                                  name="rating"
                                  starDimension={"20px"}
                                />
                      </div>

                      <p className="review_write_wrap mx-2">
                        {"( " + data.numOfReviews + " Reviews )"}
                      </p>
                      {/* {callToggle === false ? (
                        <button
                          onClick={() => setCallToggle(!callToggle)}
                          href=""
                          className="call_now_wrap mx-2"
                        >
                          <FaPhoneAlt /> Call now
                        </button>
                      ) : (
                        <span onClick={() => setCallToggle(!callToggle)}>
                          <a href="tel:+9571515056">+9571515056</a>
                        </span>
                      )} */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default FavoriteVendor
