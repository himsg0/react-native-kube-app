import React, { useEffect } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./Registration.css";
import "../../layout/header/Header.css";
import { connect, useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { screenToggleA } from "../../../Redux/Action/SelectedA";
import { firebase, auth } from "../../../Firebase";
import { getUsers } from "../../../Services/UserServices";

const phoneRegExp = /^((\+91?)|\+)?[5-9][0-9]{9}$/;

const Registration = (props) => {
  const dispatch = useDispatch();
  const GoToLogin = () => {
    dispatch(screenToggleA("Login"));
  };

  async function signInWithPhoneNumber(phoneNumber) {
    let verify = new auth.RecaptchaVerifier("recaptcha-container");
    const confirmation = await auth()
      .signInWithPhoneNumber(phoneNumber, verify)
      .then((result) => {
        props?.setOtpData(result);
        dispatch(screenToggleA("OTP"));
        props?.setIsLogin(false);
      })
      .catch((err) => {
        alert(err);
        window.location.reload();
      });
  }

  const GotoOTP = (mobileNo, username, email) => {
    getUsers(mobileNo.slice(3)).then((res) => {
      if (res.length == 0) {
        signInWithPhoneNumber(mobileNo);
        props.setAuthUser({
          userName: username,
          phoneNo: mobileNo.slice(3),
          email: email,
        });
      } else {
        props?.showToast("Mobile Number Already Exist");
      }
    });
  };

  return (
    <div className="register_loginSection">
      <center>
        <button
          type="button"
          className="ab_close_menu"
          onClick={() => props.closeModal()}
        >
          <span className="closebtn">&times;</span>
        </button>
        <div className="ab_close_button">{/* <FaCaretDown size={30} /> */}</div>
        <div className="register_ab_left_image">
          <img src={require("../../../assets/left-side.png")} alt="" />
        </div>
        <div className="register_ab_right_image">
          <img src={require("../../../assets/right-side.png")} alt="" />
        </div>

        <div className="container">
          <div className="inner-loginSection text-center">
            <h1 className="register_title_header">Sign In</h1>
          </div>

          <Formik
            initialValues={{
              name: "",
              email: "",
              mobileNumber: "+91",
            }}
            validationSchema={Yup.object().shape({
              name: Yup.string().required("Name is required"),
              email: Yup.string().email("Email is invalid"),
              mobileNumber: Yup.string()
                .required("Mobile number is required")
                .matches(phoneRegExp, "Phone number is not valid")
                .min(13, "to short")
                .max(13, "to long"),
            })}
            onSubmit={(fields) => {
              GotoOTP(fields.mobileNumber, fields.name, fields.email);
            }}
            render={({ errors, status, touched }) => (
              <Form>
                <div className="form-group register_box mt-md-4 mt-3">
                  <p htmlFor="name">Name</p>
                  <div className="register_headerSearchbar cus_login_search">
                    <Field
                      name="name"
                      type="text"
                      className={
                        "headerSearch form-control" +
                        (errors.name && touched.name ? " is-invalid" : "")
                      }
                    />
                    <ErrorMessage
                      name="name"
                      component="div"
                      className="invalid-feedback"
                    />
                  </div>
                </div>

                <div className="form-group register_box mt-md-4 mt-3">
                  <p htmlFor="mobileNumber">Mobile No</p>
                  <div className="register_headerSearchbar cus_login_search">
                    <Field
                      name="mobileNumber"
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
                </div>

                <div className="form-group register_box mt-md-4 mt-3">
                  <p htmlFor="email">Email ID</p>
                  <div className="register_headerSearchbar cus_login_search">
                    <Field
                      name="email"
                      type="text"
                      className={
                        "headerSearch form-control" +
                        (errors.email && touched.email ? " is-invalid" : "")
                      }
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="invalid-feedback"
                    />
                  </div>
                </div>
                <div style={{ marginTop: 20 }} id="recaptcha-container"></div>
                <div className="form-group">
                  <div className="register_loginNextbutton text-center">
                    <button
                      type="submit"
                      className="localityLogoButton mt-md-4 mt-3"
                    >
                      Next
                    </button>
                  </div>
                </div>
              </Form>
            )}
          />

          <div className="col-12 mt-1 mb-1 register_registerSection">
            <div className="row text-center justify-content-center">
              <div className="col-md-7 text-md-end">
                <p>Already A Member?</p>
              </div>
              <div className="col-md-5 text-md-start">
                <span
                  onClick={() => GoToLogin()}
                  className="register_registerNow"
                >
                  Login Now
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="register_orange_line col-12"></div>
        <div className="register_light_grey_line col-12 mt-2"></div>

        <div className="container-fluid">
          <img
            className="register_bottomimage mt-1"
            src={require("../../../assets/building.png")}
            alt=""
          />
        </div>
      </center>
    </div>
  );
};

export default Registration;
