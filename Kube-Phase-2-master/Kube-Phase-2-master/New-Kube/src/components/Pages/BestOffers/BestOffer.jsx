import React, { useEffect, useState, useRef } from "react";
import { connect, useSelector, useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { Link } from "react-router-dom";
import "./BestOffer.css";
import DownloadButton from "../VendarDetails/VendorOffers/DownloadButton/DownloadButton";
import { useNavigate } from "react-router-dom";
import { getOffers } from "../../../Services/StoreServices";
import { getSubCategories } from "../../../Services/CategoriesServices";

const BestOffer = (props) => {
  let [searchParams, setSearchParams] = useSearchParams();
  const [offersCategory, setOffersCategory] = useState("");
  const [offersSubCategory, setoffersSubCategory] = useState("");
  const [offers, setOffers] = useState([]);
  const [subCategories, setSubCategories] = useState([]);

  useEffect(() => {
    setOffersCategory(searchParams.get("cat"));
    setoffersSubCategory(searchParams.get("Subcat"));
  }, [searchParams.get("cat"), searchParams.get("Subcat")]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cityData = localStorage.getItem("selectedCity");
  const localityData = localStorage.getItem("setLocality");

  useEffect(() => {
    getOffers(offersCategory, offersSubCategory, cityData, localityData).then(
      (res) => {
        setOffers(res);
      }
    );
  }, [cityData, localityData, offersCategory, offersSubCategory]);

  //SubCategories
  useEffect(() => {
    getSubCategories(offersCategory).then((res) => {
      setSubCategories(res);
    });
  }, [dispatch, offersCategory]);

  console.log(",,,,", offersCategory);
  console.log("++++", offersSubCategory);

  return (
    <>
      <div>
        <h2 className="Bofferheading">Best Offers</h2>
        <select
          className="Bsortcategory"
          name="sortcategory"
          id="offersCategory"
          value={offersCategory}
          onChange={(e) => {
            navigate(`/Offers?cat=${e.target.value}`);
            setOffersCategory(e.target.value);
          }}
        >
          <option value="" disabled selected>
            Categories
          </option>
          {props.categories?.map((val) => {
            return <option key={val.id}>{val.categoryName}</option>;
          })}
        </select>
        <select
          className="BsortsubCategory"
          name="sortcategory"
          id="offersSubCategory"
          value={offersSubCategory}
          onChange={(e) => {
            setoffersSubCategory(e.target.value);
            if (e.target.value == "") {
              navigate(`/Offers?cat=${offersCategory}`);
            } else {
              navigate(
                `/Offers?cat=${offersCategory}&Subcat=${e.target.value}`
              );
            }
          }}
        >
          <option value="" selected>
            All Sub-Categories
          </option>
          {subCategories?.map((val) => {
            return val.subCategories?.map((index) => {
              return <option key={val}>{index.subCategoryName}</option>;
            });
          })}
        </select>
        <div className="BOffersSec">
          {offers?.map((val) => {
            return val?.offer?.map((index, i) => {
              return (
                index.length != 0 && (
                  <div className="Boffersimgsec">
                    <Link to={`/OfferDetails/${val.uniqueId}?i=${i}`}>
                      <img
                        className="Boffersimg"
                        src={index.image}
                        alt="No Image"
                      ></img>
                    </Link>
                    <div className="offerDownloadBtnSec">
                      <DownloadButton
                        Id={val.id}
                        Image={index.image}
                        counter={index.offerCounter}
                      />
                    </div>
                  </div>
                )
              );
            });
          })}
        </div>
      </div>
    </>
  );
};

export default connect(({ GetCategoriesR }) => ({
  categories: GetCategoriesR.category,
}))(BestOffer);
