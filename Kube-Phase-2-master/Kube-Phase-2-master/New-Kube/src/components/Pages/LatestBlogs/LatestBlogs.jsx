import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch, connect } from "react-redux";
import { Helmet } from "react-helmet";
import BlogCard from "./BlogCard";
import "./LatestBlogs.css";

import {
  getBlogCategory,
  getAllBlogs,
  getCategoryWiseBlogs,
} from "../../../Services/BlogServices";

const LatestBlogs = () => {
  const [blogCategory, setBlogCategory] = useState("");
  const [getAllBlogCategories, setAllBlogCategories] = useState([]);
  const [blogData, setBlogData] = useState([]);
  const [dateFilterData, setDateFilterData] = useState("");

  useEffect(() => {
    if (!blogCategory) {
      getAllBlogs(dateFilterData).then((res) => {
        setBlogData(res);
      });
    } else {
      getCategoryWiseBlogs(blogCategory, dateFilterData).then((res) => {
        setBlogData(res);
      });
    }
  }, [blogCategory, dateFilterData]);

  useEffect(() => {
    getBlogCategory().then((res) => {
      setAllBlogCategories(res);
    });
  }, []);

  return (
    <>
      <Helmet>
        <title>
          Kube City | Creative & Informative Blogs about your Day-to-Day Life
        </title>
        <meta
          name="Description"
          content="Read from the wide range of blogs according to your preference to be well informed about your local shops and daily life."
        />
      </Helmet>
      <div>
        <h2 className="Lblogsheading">Latest Blogs</h2>
        <select
          className="Lbsortcategory"
          name="sortcategory"
          id="category"
          onChange={(e) => {
            setBlogCategory(e.target.value);
          }}
        >
          <option value="">Sort by Category</option>
          {getAllBlogCategories?.map((val) => {
            return <option key={val.id}>{val}</option>;
          })}
        </select>
        <select
          className="LbsortsubCategory"
          name="sortcategory"
          onChange={(e) => {
            setDateFilterData(e.target.value);
          }}
        >
          <option value="Normal">Sort by Date</option>
          <option value="Oldest">Oldest to Latest</option>
          <option value="Latest">Latest to Oldest</option>
        </select>

        {blogData?.map((val) => {
          return (
            <BlogCard
              key={val.slugtitle}
              tImage={val.thumbnailImage}
              date={val.createdAt}
              title={val.title}
              slugtitle={val.slugtitle}
              desc={val.desc}
              fImage={val.featuredImage}
              category={val.category}
            />
          );
        })}
      </div>
    </>
  );
};

export default connect(({ GetBlogsR }) => ({
  blogs: GetBlogsR.blogs,
}))(LatestBlogs);
