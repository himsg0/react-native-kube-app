import React, {useEffect, useState, useRef} from 'react';
import {connect, useSelector, useDispatch} from 'react-redux';
import { useSearchParams } from "react-router-dom";
import { Link } from "react-router-dom";
import DownloadButton from "../VendarDetails/VendorOffers/DownloadButton/DownloadButton"

import { useNavigate } from "react-router-dom";
import { getOffers } from '../../../Services/StoreServices';



const FiftyOFFOffers = (props) =>{

    const navigate = useNavigate();

    const [loginStatus, setLoginStatus] = useState();
    const [showLogin, setSetLoginFlag] = useState(false);

    let [searchParams, setSearchParams] = useSearchParams();
    const [ offersCategory, setOffersCategory ]=useState("")
    const [ offersSubCategory, setoffersSubCategory] = useState("");
    const [fiftyOFFoffers, setFiftyOFFoffers] = useState([])

    console.log(",,", fiftyOFFoffers)
    

    useEffect(()=>{
        setOffersCategory(searchParams.get("cat"));
        setoffersSubCategory(searchParams.get("Subcat"));
    },[searchParams.get("cat"),searchParams.get("Subcat")])
    
    

    useEffect(() => {
        localStorage.getItem("setLocality") && localStorage.getItem("selectedCity") && offersCategory &&
        getOffers(offersCategory, "", localStorage.getItem("selectedCity"),"All Locality").then(res => {
          setFiftyOFFoffers(res);
        })
    },[offersCategory,localStorage.getItem("selectedCity")])


        
    return(
        <>
            <div>
                {offersCategory == "Wellness" ? 
                <h2 className='Bofferheading'>Upto 50% OFF on Supplements</h2> :
                <h2 className='Bofferheading'>Upto 50% OFF on {offersCategory}</h2> }
                
                
                <div className='BOffersSec'>
                    {
                    fiftyOFFoffers?.map((val) => {
                    return(
                        val?.offer && val?.offer.length !== 0 && 
                        val.offer?.map((index,i) =>{
                            console.log("ll",index)
                            return(
                            index?.offerdiscount && index?.offerdiscount === "50" &&
                            <div className='Boffersimgsec'>
                                <Link to={`/OfferDetails/${val._id}?i=${i}`}>
                                    <img className='Boffersimg' src={index.image}></img>
                                </Link>
                                <div className="offerDownloadBtnSec">
                                    <DownloadButton Id={val._id} Image={index.image} counter={index.offerCounter}/>
                                </div>
                            </div>
                            
                            
                            )
                        })
                    )
                    })}
                    
                </div>
            </div>

        </>
    )
}

export default FiftyOFFOffers;