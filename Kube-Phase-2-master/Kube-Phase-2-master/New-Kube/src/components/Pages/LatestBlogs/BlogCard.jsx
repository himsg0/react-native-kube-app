import React, {useEffect, useState, useRef} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { Link } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import "./LatestBlogs.css";

const LatestBlogCard = (props) =>{


     const timestamp = props.date
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
 
     const LBlogDate = month + ' ' + date + ', ' + year;
     
    return(
        <Link to={`${props.slugtitle}?cate=${props.category}`}>

                <div className='LatestBlogsection' >
                    
                    <img className='Lblogsimg' src={props.tImage} alt="Blog img"></img>
                    <div className='Lbcontent'>
                        <div className='Lbtimestamp'>
                            <img className='Lbcalendericon' src='https://www.kubeshop.in/wp-content/uploads/2022/05/Planner.webp'></img>
                            <p className='Lbdate'>{LBlogDate}</p>
                        </div>
                        <div className='Lbheading'>{props.title}</div>
                        <div className='Lbtext' dangerouslySetInnerHTML={{ __html: props.desc}}></div>
                    </div>
                </div>
                </Link>
    )
}

export default LatestBlogCard;