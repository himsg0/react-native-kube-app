

import React, { useEffect, useState } from "react";
import "./OtpScreen.css";
import "./../../layout/header/Header.css";

import { connect, useDispatch } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import { screenToggleA } from "../../../Redux/Action/SelectedA";
import { getUsers, addUsers } from "../../../Services/UserServices";

const OtpScreen = (props) => {
  const dispatch = useDispatch();
  const [otp, setOtp] = useState("");

  const getCodeBoxElement = (index) => {
    return document.getElementById("codeBox" + index);
  };

  const onKeyUpEvent = (index, event) => { 
    const eventCode = event.which || event.keyCode;
    if (getCodeBoxElement(index).value.length === 1) {
      if (index !== 6) {
        getCodeBoxElement(index + 1).focus();
      } else {
        getCodeBoxElement(index).blur();
        let getOtp = "";
        for (var item = 1; item < 7; item++) {
          const currentElement = document.getElementById("codeBox" + item);
          getOtp += currentElement.value;
        }

        setOtp(getOtp);
      }
    }
    if (eventCode === 8 && index !== 1) {
      getCodeBoxElement(index - 1).focus();
    }
  };

  const RegisterCall = () => {
    addUsers(props?.authUser).then((res) =>{
      getUsers(props?.authUser?.phoneNo).then((res) => {
        localStorage.setItem("kube-user", JSON.stringify(res[0]));
        localStorage.setItem("isUserVerify", true);
        props.showToast("User Created")
        props.closeModal();
      })
    })
  }

  const LoginCall = () => {
    localStorage.setItem("kube-user", JSON.stringify(props?.authUser[0]));
    localStorage.setItem("isUserVerify", true);
    props.showToast("Device Verified");
    props.closeModal();
  }

  const submitOTP = async() => {
    try {
      await props?.otpData.confirm(otp).then((res) =>{
        if(props?.isLogin == true){
          LoginCall()
          dispatch(screenToggleA("Login"));
        }
        else{
          RegisterCall()
        }
      });
    } catch (error) {
      props.showToast("Entered OTP is Incorrect");
    }
    
  };


  return (
    <div className="loginSection">
      <button
        type="button"
        className="ab_close_menu"
        onClick={() => {props.notUser()}}
      >
        <span className="closebtn">&times;</span>
      </button>
      <div className="ab_left_image">
        <img src={require("../../../assets/left-side.png")} alt="" />
      </div>
      <div className="ab_right_image">
        <img src={require("../../../assets/right-side.png")} alt="" />
      </div>

      <div className="container">
        <div className="inner-loginSection text-center">
          <h1 className="title_header">Enter OTP</h1>
          <p className="otpLabel">
            {`We've Just Sent a Verification Code To ${props.userDetail?.loginDetails?.phone}`}
            
          </p>
        </div>
        <div className="otpContainer">
          <div className="headerSearchbar cus_login_search mt-4">
            <input
              class="headerSearch"
              id="codeBox1"
              type="number"
              maxLength={1}
              name="search"
              autoComplete="off"
              onKeyUp={(e) => onKeyUpEvent(1, e)}
            ></input>
          </div>
          <div className="headerSearchbar cus_login_search mt-4">
            <input
              class="headerSearch"
              id="codeBox2"
              type="number"
              maxLength={1}
              name="search"
              autoComplete="off"
              onKeyUp={(e) => onKeyUpEvent(2, e)}
            ></input>
          </div>
          <div className="headerSearchbar cus_login_search mt-4">
            <input
              class="headerSearch"
              id="codeBox3"
              type="number"
              maxLength={1}
              name="search"
              autoComplete="off"
              onKeyUp={(e) => onKeyUpEvent(3, e)}
            ></input>
          </div>
          <div className="headerSearchbar cus_login_search mt-4">
            <input
              class="headerSearch"
              id="codeBox4"
              type="number"
              maxLength={1}
              name="search"
              autoComplete="off"
              onKeyUp={(e) => onKeyUpEvent(4, e)}
            ></input>
          </div>
          <div className="headerSearchbar cus_login_search mt-4">
            <input
              class="headerSearch"
              id="codeBox5"
              type="number"
              maxLength={1}
              name="search"
              autoComplete="off"
              onKeyUp={(e) => onKeyUpEvent(5, e)}
            ></input>
          </div>
          <div className="headerSearchbar cus_login_search mt-4">
            <input
              class="headerSearch"
              id="codeBox6"
              type="number"
              maxLength={1}
              name="search"
              autoComplete="off"
              onKeyUp={(e) => onKeyUpEvent(6, e)}
            ></input>
          </div>
        </div>
        <div className="loginNextbutton text-center">
          <button class="localityLogoButton mt-4" onClick={() => submitOTP()}>
            Submit
          </button>
        </div>

        <div className="col-12 mt-2 mb-2 registerSection">
          <div className="row text-center justify-content-center">
            <div className="col-md-12">
              <a href="" className="registerNow">
                Resend ?
              </a>
              <br />
              <a href="" className="registerNow">
                Change Mobile Number?
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="otp_orange_line col-12"></div>
      <div className="otp_light_grey_line col-12 mt-2"></div>

      <div className="container-fluid">
        <img
          className="bottomimage mt-1"
          src={require("../../../assets/building.png")}
          alt=""
        />
      </div>
    </div>
  );
};

export default OtpScreen;
