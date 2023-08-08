import React, {useEffect, useState, useRef} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { Link , useParams} from "react-router-dom";
import RecentBlogCard from './RecentBlogCard';
import "./SingleBlog.css";
import { useSearchParams } from "react-router-dom";

import {getCategoryWiseBlogs, getSingleBlog} from "../../../Services/BlogServices"

const SingleBlog = (props) => {
  const {title} = useParams()
  let [searchParams, setSearchParams] = useSearchParams();
  const [singleBlogData, setSingleBlogData] = useState([]);
  const [relatedBlogData, setRelatedBlogData] = useState([])

  function instaShare(){
      
    let postUrl = encodeURI(document.location.href);
    let url= `https://www.instagram.com/sharer.php?u=${postUrl}`

    let win=window.open(url,"url");
    win.focus();
  
}
    
   function facebookShare(){
      
        let postUrl = encodeURI(document.location.href);
        let url= `https://www.facebook.com/sharer.php?u=${postUrl}`;

        let win=window.open(url,"url");
        win.focus();
      
    }


    function twitterShare(){
      
      let postUrl = encodeURI(document.location.href);
      let url= `https://twitter.com/share?url=${postUrl}`;

      let win=window.open(url,"url");
      win.focus();
    
  }

  function pinterestShare(){
      
    let postUrl = encodeURI(document.location.href);
    let url= `https://pinterest.com/pin/create/bookmarklet/?&url=${postUrl}`;

    let win=window.open(url,"url");
    win.focus();
  
}
  
    const dispatch = useDispatch();
    
    useEffect(() => {
      window.scrollTo(0, 0);
        getSingleBlog(title).then(res => {
          setSingleBlogData(res)
        })
   }, [dispatch,title]);

   console.log(singleBlogData,title, "//")
  

  
   useEffect(() => {
    getCategoryWiseBlogs(searchParams.get("cate"), "").then(res => {
      setRelatedBlogData(res);
    });
}, [dispatch,searchParams.get("cate")]);

 


   return (
      <>

        <div className='SBmainsections'>
        { singleBlogData?.map((val) => {
            const timestamp = val.createdAt
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
          
            const SBlogDate = month + ' ' + date + ', ' + year;
              
                return(

                <div className='SBblogsection'>
                  <h2 className='SBheading'>{val.title}</h2>
                  <h3 className='SBauthor'>{val.author}</h3>
                  <div className='SBtimestamp'>
                    <img className='SBplanner' src='https://www.kubeshop.in/wp-content/uploads/2022/05/Planner.webp'></img>
                    <p className='SBdate'>{SBlogDate}</p>
                  </div>
                  <div className='SBcontentsec'>
                    <img className='SBimg' src={val.featuredImage}></img> 
                    <div className='SBcontenttext' dangerouslySetInnerHTML={{ __html: val.desc}} />
                  </div>
                 
                 
                </div>
                )
          })}

          <div className='SBRelatedBlogSec'>
            <h2 className='SBRelatedBlogHeading'>Related Blog</h2>
          { relatedBlogData?.map((val) => {
          
              return(
                  singleBlogData[0].slugtitle != val.slugtitle &&
                    <RecentBlogCard key={val.slugtitle} thumbnailImage={val.thumbnailImage} date={val.createdAt} title={val.title} slugtitle={val.slugtitle} desc={val.desc} fImage={val.featuredImage} category={val.category}/>    
              )
          })}
          </div>
          
        </div>
  
        <div className='SBShareSection'>
          <h2 className='SBShareHeading'>Share</h2>
          
          <img  className='SBShareButtons' src='https://www.kubeshop.in/wp-content/uploads/2022/05/facebook-_1_.webp' onClick={facebookShare}></img>
          <img className='SBShareButtons' src='https://www.kubeshop.in/wp-content/uploads/2022/05/twitter.webp' onClick={twitterShare}></img>
          <img className='SBShareButtons' src='https://www.kubeshop.in/wp-content/uploads/2022/05/pinterest.webp' onClick={pinterestShare}></img>
        </div>
  
      </>
    )
  }
  
  export default SingleBlog;