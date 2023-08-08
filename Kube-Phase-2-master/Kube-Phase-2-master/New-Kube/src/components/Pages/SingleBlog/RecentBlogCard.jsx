import React, {useEffect, useState, useRef} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { Link } from "react-router-dom";
import { useSearchParams } from "react-router-dom";

import "./SingleBlog.css";

const RecentBlogCard = (props) =>{
 
    return(
        <Link to={`/LatestBlogs/${props.slugtitle}?cate=${props.category}`}>               
            <div className='SBRelatedBlogCard'>
                <img className='SBRelatedBlogImg' src={props.thumbnailImage}></img>
                <h2 className='SBRelatedBlogTitle'>{props.title}</h2>
        </div>
        </Link>  
    )
}

export default RecentBlogCard;