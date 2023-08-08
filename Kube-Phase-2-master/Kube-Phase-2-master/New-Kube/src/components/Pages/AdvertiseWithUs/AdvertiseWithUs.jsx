import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch, connect } from 'react-redux';
import "./AdvertiseWithUs.css";
import Axios from 'axios';

import {AdvertiseModel} from "../../../Model/AdvertiseModel"
import { submitAdvertise } from "../../../Services/AdvertiseUsService";

import Cities from '../../../constant/Cities.json';


const AWU = (props)=>{


  const dispatch = useDispatch();


    const [showCity,setShowCity]= useState(null);
    const [showCategory,setShowCategory]= useState(null);
    const [allCities,setAllCities]= useState([]);
    const [advertiseData, setAdvertiseData] = useState({
      firstName: '',
      lastName: '',
      phoneNo: 0,
      createdAt: new Date(),
      email: '',
      cityName: '',
      categoryName: '',
    });

    const handleInputChange = (field, value) => {
      setAdvertiseData({
        ...advertiseData,
        [field]: value
      });
    };

    useEffect(() => {
      setAllCities(Cities.products)
    }, []);

    const submitAndRefresh = () => {
      submitAdvertise(advertiseData);
      setAdvertiseData({
        firstName: '',
        lastName: '',
        phoneNo: 0,
        createdAt: new Date(),
        email: '',
        cityName: '',
        categoryName: '',
      })
    }

      const dropdownCityRef = useRef(null);
      const dropdownCategoryRef = useRef(null);
      const [isCity, setIsCity] = useState(false);
      const [isCategory, setIsCategory] = useState(false);
    
      const DropDownCity = () => setIsCity(!isCity);
      const DropDownCategory = () => setIsCategory(!isCategory);

      console.log("city",isCity)

      useEffect(() => {
        const City = advertiseData.cityName;
        if (City?.length >= 10) {
          var reducedCityText = City.substring(0, 5);
          setShowCity(reducedCityText + "...")
          handleInputChange("cityName",City)
        } else {
          setShowCity(City);
          handleInputChange("cityName",City)
        }

        const Category = advertiseData.categoryName;
        if (Category?.length >= 10) {
          var reducedCategoryText = Category.substring(0, 6);
          setShowCategory(reducedCategoryText + "...")
          handleInputChange("categoryName",Category)
        } else {
          setShowCategory(Category)
          handleInputChange("categoryName",Category)
        }
      },[advertiseData.cityName, advertiseData.categoryName]);

      console.log("city",isCity)

      useEffect(() => {
        
      
        const pageClickEvent = (e) => {
          console.log("cityTest",e.target, dropdownCityRef.current.contains(e.target))
          if (dropdownCityRef.current !== null && !dropdownCityRef.current.contains(e.target)) {
            setIsCity(!isCity);
          }
          console.log(e);
        };
      // If the item is active (ie open) then listen for clicks
        if (isCity) {
          window.addEventListener('click', pageClickEvent);
        }
        return () => {
          window.removeEventListener('click', pageClickEvent);
        }
      
      }, [isCity]);


      useEffect(() => {
        const pageClickEvent = (e) => {
          if (dropdownCategoryRef.current !== null && !dropdownCategoryRef.current.contains(e.target)) {
            setIsCategory(!isCategory);
          }
          console.log(e);
        };
      // If the item is active (ie open) then listen for clicks
        if (isCategory) {
          window.addEventListener('click', pageClickEvent);
        }
        return () => {
          window.removeEventListener('click', pageClickEvent);
        }
      
      }, [isCategory]);
    
      const onCatOptionClicked = value => () => {
        handleInputChange("categoryName",value)
        setIsCategory(false);
        
      };

      const onCityOptionClicked = value => () => {
        handleInputChange("cityName",value)
        setIsCity(false);
      };

    return(
        <>
        <div className='AdvertiseWithUs'>
            <h1>Advertise With Us</h1>
            <div className="AWUMainSec mt-4">
            <div className='contactTeamSec '>
                <h2 className="contactTeamSecHeading">Contact Our Sales Team</h2>
                <div className='contactTeamDetails mt-md-5'>
                    <h3>Mobile No : </h3><span> +91 9910766406</span>
                    <h3 className="mt-2">E-Mail : </h3><span className="mt-2"> contact@kubeonline.in</span>
                </div>
            </div>    
            <h2 className="AWUFormHeading">Your Details</h2>
            <form className='AWUForm'>
            <div className="row">
              <div className="AWUName col-md-5 col-11 ms-md-5 ms-3 mt-md-5 mb-2 ">
                  <label for="AWUStoreName" class="ALabel">First Name</label>
                  <input type="text" class="form-control AInput mt-2" id="AWUStoreName" name="First Name" value={advertiseData.firstName} onChange={(e)=>{handleInputChange("firstName",e.target.value)}} />
              </div>
              <div className="AWUName col-md-5 col-11 ms-md-5 ms-3 mt-md-5 mb-2 offset-md-1">
                  <label for="AWUStoreName" class="ALabel">Last Name</label>
                  <input type="text" class="form-control AInput mt-2" id="AWUStoreName" name="Last Name" value={advertiseData.lastName} onChange={(e)=>{handleInputChange("lastName",e.target.value)}} />
              </div>
            </div>
            <div className="row">
              <div class="AWUContact col-md-5 col-11 ms-md-5 ms-3 mt-md-5 mb-2 ">
                    <label for="AWUStoreName" class="ALabel">Contact No.</label>
                    <input type="number" class="form-control AInput mt-2" id="AWUStoreName" name="ContactNo" value={advertiseData.phoneNo} onChange={(e)=>{handleInputChange("phoneNo",e.target.value)}} />
                </div>
              <div class="AWUEmail col-md-5 col-11  ms-md-5 ms-3  mt-md-5 mb-2 offset-md-1">
                  <label for="AWUStoreName" class="ALabel">E-mail</label>
                  <input type="text" class="form-control AInput mt-2" id="AWUStoreName" name="Email" value={advertiseData.email} onChange={(e)=>{handleInputChange("email",e.target.value)}} />
              </div>
            </div>
            

        <div  className='AWUCategory' for="AWUStoreName">
                    <div  className='AWUDropdownbtn' onClick={DropDownCategory} >
                        {showCategory || "Category"}
                    </div>
                    {isCategory && (
                        <div  ref={dropdownCategoryRef} className='AWUDropdownListMainSec'>
                            <div className="AWUDropdownListSec">
                            <ul className='AWUDropdownList'>
                              {props?.categories.map((val) =>{
                                return(
                                  <li onClick={onCatOptionClicked(val.categoryName)}  className='AWUDropdownListItem' key={val.categoryName}>
                                    {val.categoryName}
                                  </li>
                                )
                              })}
                                
                            </ul>
                            </div>
                        </div>
                    )}
            </div>
            {/* <input type="text" class="bInput" id="AWUStoreName" onChange={(e)=>{setLocality(e.target.value)}}/> */}
            
            
            <div  className='AWUcity' for="AWUStoreName">
                    <div  className='AWUDropdownbtn' onClick={DropDownCity} >
                        {showCity || "City"}
                    </div>
                    {isCity && (
                        <div  ref={dropdownCityRef} className='AWUDropdownListMainSec'>
                            <div className="AWUDropdownListSec">
                            <ul className='AWUDropdownList'>
                                {allCities.map((val) =>{
                                  return(
                                    <li onClick={onCityOptionClicked(val)}  className='AWUDropdownListItem' key={val}>
                                      {val}
                                    </li>
                                  )
                                })}
                            </ul>
                            </div>
                        </div>
                    )}
                    
            </div>
            {/* <input type="text" class="bInput" id="AWUStoreName" onChange={(e)=>{setCity(e.target.value)}} /> */}
            
            
                
            <button class="AWUSubmitBtn" onClick={() => submitAndRefresh()} >Submit</button>
            </form>
            </div>  
            
        </div>
        
        
        </>
    );
}
export default connect(({GetCategoriesR}) => ({
  categories: GetCategoriesR.category,
}))(AWU);