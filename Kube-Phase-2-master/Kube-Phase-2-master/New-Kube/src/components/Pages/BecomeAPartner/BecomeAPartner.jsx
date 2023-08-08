import React,{useState} from 'react';
import "./BecomeAPartner.css";
import Axios from 'axios';

import {addPartner} from "../../../Services/BecomeAPartnerServices"

const BAP = ()=>{

    // const [storeName,setStoreName]= useState(null);
    // const [ownerName,setOwnerName]= useState(null);
    // const [storeAddress,setStoreAddress]= useState(null);
    // const [contact,setContact]= useState(null);
    // const [city,setCity]= useState(null);
    // const [locality,setLocality]= useState(null);

    // const bapData = () => {
    //     const data = {
    //         storeName: storeName,
    //         ownerName: ownerName,
    //         storeAddress: storeAddress,
    //         contactNo: contact,
    //         city: city,
    //         locality: locality
    //     };
    //     Axios.post("https://kubeshop.in:8080/api/v1/rl7nuo0GNHFAvhTL/becomeaPartner/new", data).then((res) => {
    //       window.location.reload();
    //       alert("Submit Successfully");
    //     });
    //   };

    const [partnerData, setPartnerData] =useState ({
        storeName: '',
        ownerName: '',
        storeAddress: '',
        city: '',
        locality: '',
        phoneNo: 0,
    });
  
    const handleInput = (feild, value) => {
      setPartnerData({
        ...partnerData,
        [feild]: value,
      });
    };

    const submitAndRefresh = () => {
        addPartner(partnerData);
        setPartnerData({
            storeName: '',
            ownerName: '',
            storeAddress: '',
            city: '',
            locality: '',
            phoneNo: 0,
        });
    }

    return(
        <>
        <div className='bap container'>
            <h1>Become A Partner</h1>
            <div className='bapSec row'>
            <form className='col-6 mt-5 bapForm'>
            <div className="col-11 mb-2 mt-md-5 mt-3 ml-4">
                <label for="BAPStoreName" class="col-form-label bLabel">Store Name</label>
                <input type="text" class="form-control mt-2 bInput" id="BAPStoreName" onChange={(e)=>{handleInput('storeName', e.target.value)}} />
            </div>
            <div class="col-11 mb-2 mt-3">
                <label for="BAPStoreName" class="col-form-label bLabel">Owner Name</label>
                <input type="text" class="form-control mt-2 bInput" id="BAPStoreName" onChange={(e)=>{handleInput('ownerName', e.target.value)}} />
            </div>
            <div class="col-11 mb-2 mt-3">
                <label for="BAPStoreName" class="col-form-label bLabel">Store Address</label>
                <input type="text" class="form-control mt-2 bInput" id="BAPStoreName" onChange={(e)=>{handleInput('storeAddress', e.target.value)}} />
            </div>
            <div class="col-11 mb-2 mt-3">
                <label for="BAPStoreName" class="col-form-label bLabel">Contact No.</label>
                <input type="number" class="form-control mt-2 bInput" id="BAPStoreName" onChange={(e)=>{handleInput('phoneNo', e.target.value)}}/>
            </div>
            <div class="col-11 mb-2 mt-3">
                <label for="BAPStoreName" class="col-form-label bLabel">City</label>
                <input type="text" class="form-control mt-2 bInput" id="BAPStoreName" onChange={(e)=>{handleInput('city', e.target.value)}} />
            </div>
            <div class="col-11 mb-2 mt-3">
                <label for="BAPStoreName" class="col-form-label bLabel">Locality</label>
                <input type="text" class="form-control mt-2 bInput" id="BAPStoreName" onChange={(e)=>{handleInput('locality', e.target.value)}}/>
            </div>
            <button class=" mt-4 mb-3 bapBtn" onClick={() => submitAndRefresh()} >Submit</button>
            </form>
            
            <div className='bapDownloadSec col-5 mt-5 ms-5'>
                <img className="bapDownloadAppImg" src='https://www.kubeshop.in/wp-content/uploads/2022/06/Bap.webp'></img>
            </div>
            </div>
        </div>
        </>
    );
}
export default BAP;