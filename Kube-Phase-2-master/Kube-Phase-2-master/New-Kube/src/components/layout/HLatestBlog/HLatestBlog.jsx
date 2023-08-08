import React, {useEffect, useState, useRef} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import Slider from "react-slick";
import { Link } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Heart from "react-heart"
import './HLatestBlog.css'
import { getAllBlogs } from '../../../Services/BlogServices';

const HLatestBlog =() =>{
    const LBsettings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        responsive: [
            {
              breakpoint: 600,
              settings: {
                dots: false,
                infinite: false,
                speed: 500,
                slidesToShow: 1.4,
                swipeToSlide: true,
              }
            }
        ]
      };

      // const[mainTitle,setMainTitle]=useState([]);
      const [allHomeBlogs, setAllHomeBlogs] = useState([]);

      // const dispatch = useDispatch();
      //   useEffect(() => {
      //       dispatch(getBlog());
      //   }, [dispatch]);
  
      //   const hBlogData = useSelector(
      //  (state) => state.blogReducer.post
      //   );

      useEffect(() =>{
        getAllBlogs("").then((res) => {
          if (res != null) {
            setAllHomeBlogs(res)
          }
        })
      },[])


      return(
          <>

            
          <div className="hLatestBlogSec">
              <h2 className="hLatestBlogHeading">Latest Blog</h2>
              <div className="hLatestBlogCardMainSec">
              <Slider {...LBsettings}>
              {allHomeBlogs?.map((val) => {
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
              
                const HBlogDate = month + ' ' + date + ', ' + year;
                    return(
                        <Link to={`/LatestBlogs/${val.slugtitle}?cate=${val.category}`}>
                        <div className="hLatestBlogCardSubSec">
                            <div className="hLatestBlogCard">
                                <img className="hLatestBlogImg" src={val.thumbnailImage}></img>
                                <div className="hLatestBlogTimeStamp">
                                    <img className='hLatestBlogCalenderIcon' src='https://www.kubeshop.in/wp-content/uploads/2022/05/Planner.webp'></img>
                                    <p className='hLatestBlogDate'>{HBlogDate}</p>
                                </div>
                                {/* <div className="hLatestBlogLikeSec">
                                        <span className="hLatestBlogNoOfLikes">(125 Likes)</span>
                                        <div className="hLatestBlogHeart"><Heart isActive={activeHeart} onClick={() => setActiveHeart(!activeHeart)} /></div>
                                </div> */}
                
                                <h2 className="hLatestBlogTitle">{val.title?.length >=40 ? val.title.substring(0,40) + "..." : val.title}</h2>
                                <h3 className='hLatestBlogAuthor'>{val.author}</h3>
                                <div className="hLatestBlogText" dangerouslySetInnerHTML={{ __html: val.desc}}></div>
                                <div className="hLatestBlogReadMore">Read More</div>
                            </div>
                        </div>
                        </Link>
                        
                    )
            })}
               <div className='NRhLatestBlog'>
                </div>     
                    
                    
              </Slider>
              </div>
              <Link to={`/LatestBlogs`}>
              <div className="hLatestBlogViewAllButtonSec"><button className="hLatestBlogViewAllButton">View All</button></div>
              </Link>
          </div>
          </>
      )
    }

export default HLatestBlog;