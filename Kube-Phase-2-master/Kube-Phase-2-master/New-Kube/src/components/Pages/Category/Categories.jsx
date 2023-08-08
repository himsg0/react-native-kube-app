import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch, connect} from 'react-redux';
import SubCategories from './SubCategories';
import "./Categories.css";


const Categories = (props) =>{

    const dispatch = useDispatch();


      const [catData, setCatData] = useState([])

      useEffect(() => {
        setCatData(props?.categories)
      },[props?.categories])

      console.log("cateies", props)
  
      

    return(
        <>
            <div >
            <h2 className="catheading">All Category</h2>
            {catData?.map((val) => {
                return(
                <SubCategories key={val.categoryName} name={val.categoryName} img={val.url} subcat={val.subCategories}  />
                
                )
            })}
            </div>
        </>
    )
}

export default connect(({GetCategoriesR}) => ({
    categories: GetCategoriesR.category,
  }))(Categories);