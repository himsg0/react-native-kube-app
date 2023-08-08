import React, { useEffect } from "react";
import "./Login.css";
import "../../layout/header/Header.css";

import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";

import { connect, useDispatch } from "react-redux";
import { getUsers } from "../../../Services/UserServices";
import { firebase, auth } from "../../../Firebase";
import { screenToggleA } from "../../../Redux/Action/SelectedA";

const phoneRegExp = /^((\+91?)|\+)?[7-9][0-9]{9}$/;

const Login = (props) => {
  const user = JSON.parse(localStorage.getItem("kube-user"));
  const username = user?.user?.username;
  console.log(username, "username");

  console.log("uu", props);

  const dispatch = useDispatch();

  const GotoRegister = () => {
    dispatch(screenToggleA("Register"));
  };

  async function signInWithPhoneNumber(phoneNumber) {
    let verify = new auth.RecaptchaVerifier("recaptcha-container");
    const confirmation = await auth()
      .signInWithPhoneNumber(phoneNumber, verify)
      .then((result) => {
        props?.setOtpData(result);
        dispatch(screenToggleA("OTP"));
        props?.setIsLogin(true);
      })
      .catch((err) => {
        alert(err);
        window.location.reload();
      });
  }

  const GotoOTP = (mobileNo, username) => {
    getUsers(mobileNo.slice(3)).then((res) => {
      if (res.length > 0) {
        signInWithPhoneNumber(mobileNo);
        props?.setAuthUser(res);
      } else {
        toast("Mobile Number Not Found");
      }
    });
  };

  return (
    <div className="login_loginSection">
      <center>
        <button
          type="button"
          className="ab_close_menu"
          onClick={() => props.closeModal()}
        >
          <span className="closebtn">&times;</span>
        </button>

        <div className="login_ab_left_image">
          <img src={require("../../../assets/left-side.png")} alt="" />
        </div>
        <div className="login_ab_right_image">
          <img src={require("../../../assets/right-side.png")} alt="" />
        </div>

        <div className="container">
          <div className="inner-loginSection text-center">
            <h1 className="login_title_header">Login</h1>
          </div>

          <Formik
            initialValues={{
              mobileNumber: "+91",
            }}
            validationSchema={Yup.object().shape({
              mobileNumber: Yup.string()
                .required("+91 Add or Phone number is not valid")
                .matches(phoneRegExp, "+91 Add or Phone number is not valid")
                .min(13, "to short")
                .max(13, "to long"),
            })}
            onSubmit={(fields) => {
              GotoOTP(fields.mobileNumber, username);
            }}
            render={({ errors, status, touched }) => (
              <Form>
                <div className="login_headerSearchbar cus_login_search mt-md-4 mt-4">
                  <Field
                    name="mobileNumber"
                    class="headerSearch"
                    type="text"
                    className={
                      "headerSearch form-control" +
                      (errors.mobileNumber && touched.mobileNumber
                        ? " is-invalid"
                        : "")
                    }
                  />
                  <ErrorMessage
                    name="mobileNumber"
                    component="div"
                    className="invalid-feedback"
                  />
                </div>
                <div style={{ marginTop: 20 }} id="recaptcha-container"></div>
                <div className="login_loginNextbutton text-center">
                  <button type="submit" class="localityLogoButton mt-md-5 mt-3">
                    Next
                  </button>
                </div>
              </Form>
            )}
          />

          <div className="col-12 mt-md-4 mb-md-4 mt-4 mb-4 login_registerSection">
            <div className="row text-center justify-content-center">
              <div className="col-md-7 text-end">
                <p>Haven’t Registered With Us?</p>
              </div>
              <div className="col-md-5 text-middle">
                <span
                  onClick={() => GotoRegister()}
                  className="login_registerNow"
                >
                  Register Now
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="login_orange_line col-12"></div>
        <div className="login_light_grey_line col-12 mt-2"></div>

        <div className="container-fluid">
          <img
            className="login_bottomimage mt-3"
            src={require("../../../assets/building.png")}
            alt=""
          />
        </div>
      </center>
    </div>
  );
};

export default Login;
