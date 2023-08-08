import React, { useEffect, useState } from "react";
import "./DownloadButton.css";
import { Link } from "react-router-dom";
import { connect, useSelector,useDispatch } from "react-redux";
import Axios from 'axios';
import FileSaver from 'file-saver';

function DownloadButton(props) {

    const dispatch = useDispatch();

    const [loginStatus, setLoginStatus] = useState();
    const [showLogin, setSetLoginFlag] = useState(false);
    const [counter , setCounter] = useState(props.counter ? props.counter : 0); 
    
    useEffect(() => {
      setLoginStatus(localStorage.getItem("isUserVerify"));
    }, [  
      loginStatus,
      props?.userLoginStatus,
      localStorage.getItem("isUserVerify")
    ]);

    // const LoginOpen = () => {
    //     if (loginStatus === "false") {
    //         setSetLoginFlag(true);
    //         dispatch(screenToggle("Login"));
    //     }
    // }

    // const handleClose = () => {
    //     setSetLoginFlag(false);
    //   }
    // const showToast = () => {
    //     setSetLoginFlag('Enter otp');
    // }
    
    
    

    const OffersCounter = () => {
        const data = {
            storeId: props.Id,
            image: props.Image,
            counter: counter,
            
        };
        Axios.put("https://kubeshop.in:8080/api/v1/rl7nuo0GNHFAvhTL/store/offer/counter", data).then((res) => {
            setCounter(counter+1); 
        });

      };


    const DownloadImage = () => {
        FileSaver.saveAs(props.Image, 'offer.png')
    }

    
    

    

    return(
        <>
            <button 
                className="offerDownloadBtn" 
                onClick={()=>{ DownloadImage() || OffersCounter(); } }
            >
                Download Now
            </button>
              
            <p className="para"> Downloaded ({counter})</p>

        </>
    )
}

export default DownloadButton ;
