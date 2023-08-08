import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { Link } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import "./AllEvents.css";

const AllEvents = () =>{


    return(
        <>
            {/* <h2 className='allEventsHeading'>Events</h2>
            <div className="eventsFilterButtonSec">
                <button className="eventsFilterButton">Today</button>
                <button className="eventsFilterButton">Tomorrow</button>
                <button className="eventsFilterButton">This Weekend</button>
            </div>
            
            <div className='allEventsCardsSec'>
                {eventData?.map((val) =>{
                    console.log("image",val.images[0].primeurl);
                    return(
                        <div className='allEventsCard'>
                        <img className='allEventCardImg' src={val.images[0].primeurl}></img>
                            <p className='allEventName'>{val.eventtitle?.length >=15 ? val.eventtitle.substring(0,15) + "..." : val.eventtitle}</p>
                            <p className='allEventAddress'>{val.eventvenue}</p>
                            <p className='allEventOrganiserName'><span>Organizer : </span>{val.organiser[0].organiser_name}</p>
                        </div>
                    )
                })}
                
            </div> */}
            <div className='coming-soon-sec'>
                <h1 className='coming-soon'>Coming Soon...</h1>
            </div>
        </>
    )
}

export default AllEvents;