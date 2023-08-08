


import React, {useState, useEffect} from "react";
import { FaLocationArrow, FaRegHeart } from "react-icons/fa";
import { useDispatch, connect } from 'react-redux';
import StarRatings from "react-star-ratings";
import "./Aboutus.css";
import { ToastContainer, toast } from "react-toastify";
import { getUsers } from "../../../../Services/UserServices";
import { getSingleStores } from "../../../../Services/StoreServices";
import {addReviews} from "../../../../Services/ReviewServices"

function AboutUS(props) {
  
  const [comment, setComment] = useState();
  const [ratingStart, setRatingStar] = useState();
  const [userData, setUserData] = useState({})
  const [singleStoreReviewData, setSingleStoreReviewData] = useState({})
  const [reviewPosted, setReviewPosted] = useState(false);
  const lat = props?.aboutData?.location?._lat;
  const long = props?.aboutData?.location?._long;

  const iFrameData = `https://www.google.com/maps?q=${lat},${long}&hl=es;&output=embed`;

  const user = JSON.parse(localStorage.getItem("kube-user"));


  const goToDestination = () => {
    if(props?.aboutData?.location && props?.aboutData?.location?._lat !=0 && props?.aboutData?.location?._long !=0 ){
      window.open( iFrameData );
    }
    else{
      toast("Location Not Available")
    }
    
  };

  useEffect(() => {
    getUsers(user?.phoneNo).then((res) => {
      setUserData(res[0]);
    })
  }, [])

  useEffect(() => {
    getSingleStores(props?.id).then(res => {
      setSingleStoreReviewData(res);
    })
  },[reviewPosted])
  

  const postReview = () => {
    addReviews({
      id : props?.id,
      username : userData?.userName,
      rating : ratingStart,
      comment : comment,
      image : userData?.image,
    })
    .then((res) => {
      setComment('');
      setRatingStar(0);
      setReviewPosted(!reviewPosted);
    })
    .catch((err) => {
      console.log("error", err);
    });

  }

  const changeRating = (newRating) => {
    setRatingStar(newRating)
  }

  // console.log("checkStore",singleStoreReviewData)
  // console.log("checkUser", userData)


  
 
  return (
    <>
      <h1 className="VDaboutUS_header">About</h1>
      <p className="VDaboutUs_desc">{props?.aboutData?.description}</p>
      <hr />
      {props?.aboutData?.media && props?.aboutData?.media[0]?.youtube ? (
        <div>
          {props?.aboutData?.location && props?.aboutData?.location?._lat !=0 && props?.aboutData?.location?._long !=0 &&
          <iframe
            className="pop_up_wrap"
            src={
              "https://www.youtube.com/embed/" +
              props?.aboutData?.media[0]?.youtube
            }
            frameborder="0"
            allow="autoplay; encrypted-media"
            allowfullscreen
            title="video"
          />}
          <hr />
        </div>
      ) : (
        <p></p>
      )}
      

      <div className="address_wrap">
        <h1 className="VDaboutUS_header">Address</h1>
        <div className="row align-items-center">
          <div className="col-md-5 ms-md-5 ms-0 ps-4">
            <p>{props?.aboutData?.address}</p>
            <div className="get_direction_wrap">
              <p onClick={() => goToDestination()}>
                {" "}
                <FaLocationArrow /> Get Directions
              </p>
            </div>
          </div>
          <div className="col-md-6 text-md-end text-center">
            <div className="map">

              <iframe
                frameborder="0"
                scrolling="no"
                marginheight="0"
                marginwidth="0"
                src={iFrameData}
              ></iframe>
            </div>
          </div>
        </div>
      </div>

      <hr />

      <div className="col-12 rate_this_wrap mt-4 pb-3 text-center">
        <h1 className="VDaboutUS_header">Rate This</h1>
        <StarRatings
          rating={
            singleStoreReviewData?.store?.ratings
              ? singleStoreReviewData?.store?.ratings
              : 0
          }
          starRatedColor="#25255c"
          numberOfStars={5}
          name="rating"
          starDimension={window.innerWidth < 600 ? "25px" : "35px"}
        />
      </div>

      <hr />

      <div className="col-12 write_your_reviews_section">
        <h1 className="VDaboutUS_header pt-md-4 pt-2">Write Your Review</h1>

        {singleStoreReviewData?.store?.reviews &&
          singleStoreReviewData?.store?.reviews?.map(
            (data, index) => {
              const timestamp = data.createdAt
              const d = new Date(timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000);
              const months = [
                'January',
                'February',
                'March',
                'April',
                'May',
                'June',
                'July',
                'August',
                'September',
                'October',
                'November',
                'December',
              ];
            
              const date = d.getDate();
              const month = months[d.getMonth()];
              const year = d.getFullYear();
            
              const SBlogDate = month + ' ' + date + ', ' + year;
              return (
                <div key={index} className="col-12 out_box_reviewers">
                  <div className="review_image_wrap">
                    <img
                      src={require("../../../../assets/reviewer_1.png")}
                      alt=""
                    />
                  </div>
                  <div className="review_details_wrap">
                    <h1 className="common_header">
                      {data.userName}
                      <span>
                        {SBlogDate}
                      </span>
                    </h1>
                    <div className="col-12 float-start rieview_list">
                      <StarRatings
                        rating={data.rating}
                        starRatedColor="#25255c"
                        numberOfStars={5}
                        name="rating"
                        starDimension={"15px"}
                        starSpacing={"2px"}
                      />
                    </div>
                    <div className="review_write_display">
                      <p>{data.comment}</p>
                    </div>
                    <div className="likes_wrap_section">
                      <p>
                        <FaRegHeart /> Like{" "}
                      </p>
                      <p>{data.rating} Like</p>
                    </div>
                  </div>
                </div>
              );
            }
          )}

        {props?.aboutData?.reviews?.length <= 0 ? (
          <h1 className="VDaboutUS_noReviews">No reviews</h1>
        ) : null}
      </div>

      <div className="col-12 leave_box_comments_wrap">
        <h1 className="VDaboutUS_header">Leave A Comment</h1>

        <div className="ms-2 ps-5">
          <StarRatings
            rating={ratingStart}
            starRatedColor="#25255c"
            numberOfStars={5}
            starDimension={window.innerWidth < 600 ? "30px" : "35px"}
            changeRating={(e) => changeRating(e)}
            name="rating"
          />
        </div>
        <div className="row">
          <div className="col-md-7 mt-3">
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              name=""
              id=""
              className="text_wrap"
              rows="3"
            ></textarea>
            <button
              onClick={() => postReview()}
              className="post_button mt-2"
              type="submit"
            >
              Post
            </button>

            <h3 className="VDaboutUS_allReviews mt-3">
              See All Reviews ({props?.aboutData?.reviews?.length})
            </h3>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default AboutUS;

