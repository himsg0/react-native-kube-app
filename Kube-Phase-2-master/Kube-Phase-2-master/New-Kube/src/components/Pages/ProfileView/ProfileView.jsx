import React, { useEffect, useState } from "react";
import "./ProfileView.css";
import { useNavigate } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import { useDispatch, connect } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FavoriteVendor from "../FavoriteVendor/FavoriteVendor";

import { editUser, getUsers, uploadProfileImage } from "../../../Services/UserServices";

const ProfileView = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [profile, setProfile] = useState();
  const [uploadProfile, setUploadProfile] = useState(false);

  const [userName, setUserName] = useState();
  const [email, setEmail] = useState();

  const [userData, setUserData] = useState({})

  useEffect(() => {
    if (userData) {
      setProfile(userData?.image);
    }
  }, [userData?.image]);


  const changeImage = () => {
    setUploadProfile(true);
  };

  useEffect(() => {
    getUserData();
  }, [userData?.image,uploadProfile]);


  const getUserData = () => {
    if (localStorage.getItem("kube-user") !== null){
      const user = JSON.parse(localStorage.getItem("kube-user"));
      getUsers(user?.phoneNo).then((res) => {
        setUserData(res[0]);
      })
    }
  }


  const updateUser = () => {
    const updateUser = {
      userName : userName, 
      email : email, 
      userId : userData?.uniqueId
    }
    editUser(updateUser).then(res => {
      toast('User Update successfully');
    }).catch(err => {
      alert("Some Network Issue Can you please Login Again And Try");
    })
  };

  const uploadProfilePicture = () => {
    uploadProfileImage(profile,userData?.uniqueId).then(res => {
      toast("Image Uploaded Successfull")
      setUploadProfile(false);
    })
    
  };

  const closeProfileDialogue = () => {
    setUploadProfile(false);
  };

  const closeProfile = () => {
    navigate("/");
    localStorage.setItem("kube-user", null);
    localStorage.setItem("selectedVendorDetail", null);
    localStorage.setItem("isUserVerify", false);
    setUploadProfile(false);
    window.location.reload();
  };

  return (
    <div>
      <div className="edit-profile-section">
        <div className="container p-50">
          <div className="col-12">
            <div className="row">
              <div className="col-lg-6">
                <h1 className="common_header">Profile</h1>
                <div className="out_box_profile_wrap">
                  <p>
                    <span>Name :</span>
                    <input
                      className="cus_input"
                      defaultValue={userData?.userName}
                      onChange={(e) => setUserName(e.target.value)}
                    />
                    <img src={require("../../../assets/pen-edit.png")} alt="" />
                  </p>
                  <p>
                    <span>Mobile no. :</span>
                    <input className="cus_input" value={userData?.phoneNo} />
                  </p>
                  <p>
                    <span>E-mail :</span>
                    <input
                      className="cus_input"
                      defaultValue={userData?.email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <img src={require("../../../assets/pen-edit.png")} alt="" />
                  </p>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="col-12">
                  <div className="main-img">
                    {profile && (
                      <img
                      onClick={() => changeImage()}
                        style={{ height: 100, width: 100 }}
                        src={userData?.image ? userData?.image: profile}
                        alt=""
                      />
                    )}
                    <div className="ab_camera_icon">
                      <img
                        onClick={() => changeImage()}
                        src={require("../../../assets/edit-photo-icn.png")}
                        alt=""
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <button
            onClick={() => updateUser()}
            type="submit"
            class="localityLogoButton mt-5"
          >
            Save
          </button>
          <div className="light_grey_line col-12 divGreyColorLine">
            <span className="favVendorTitle common_header">FAV.Vendor</span>
          </div>

          <div className="p-20">
            <FavoriteVendor />
          </div>
          <br />
          <div className="light_grey_line col-12 divGreyColorLineForSignOut">
            <span
              className="signOutBtnCls common_header"
              onClick={() => closeProfile()}
            >
              Sign Out
            </span>
          </div>
        </div>
        <div className="container">
          <div className="orange_line col-12"></div>
          <div className="light_grey_line col-12 mt-2"></div>
        </div>
        <Modal
          className="new_modal"
          show={uploadProfile}
          onHide={closeProfileDialogue}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <div className="container box_pop_up">
            <div className="row">
              <div className="col-6">
                <form>
                  <h1 className="common_header">Select Profile photo</h1>
                  <input
                    type="file"
                    className="input_file_wrap"
                    onChange={(e) => setProfile(e.target.files[0])}
                  />
                </form>
              </div>
            </div>
            <div className="row">
              <div className="col-12 bottom_logout_wrap">
                <Button onClick={() => uploadProfilePicture()}>Upload</Button>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default ProfileView;
