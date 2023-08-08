import React, { useEffect, useState, useRef, Suspense, lazy } from "react";
import { useSelector, connect, useDispatch } from "react-redux";

import { Helmet } from "react-helmet";
import { getUsers } from "../../../Services/UserServices";
import { getCategories } from "../../../Services/CategoriesServices";
import { GetCategoriesA } from "../../../Redux/Action/GetCategoriesA";
import {
  getDiscountWiseOffers,
  getFavouriteVendors,
} from "../../../Services/StoreServices";

import algoliasearch from "algoliasearch/lite";
import {
  InstantSearch,
  SearchBox,
  Hits,
  connectSearchBox,
  Configure,
} from "react-instantsearch-dom";

const HCategory = lazy(() => import("../../layout/HCategory/HCategory"));
const HBestOffer = lazy(() => import("../../layout/HBestOffer/HBestOffer"));
const HLatestBlog = lazy(() => import("../../layout/HLatestBlog/HLatestBlog"));
const HAdvertiseOne = lazy(() =>
  import("../../layout/HAdvertiseOne/HAdvertiseOne")
);
const HFavoriteVendors = lazy(() =>
  import("../../layout/HFavoriteVendors/HFavoriteVendors")
);
const HCategoryOffers = lazy(() =>
  import("../../layout/HCategoryOffers/HCategoryOffers")
);

const Home = (props) => {
  const dispatch = useDispatch();
  var today = new Date();
  var time = today.getHours();

  const [hAllOffers, setHAllOffers] = useState([]);
  const [userData, setUserData] = useState({});
  const [favVendorList, setFavVendorList] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("kube-user"));
    getUsers(user?.phoneNo).then((res) => {
      setUserData(res[0]);
    });
  }, []);

  useEffect(() => {
    userData?.favouriteStores &&
      getFavouriteVendors(userData?.favouriteStores).then((res) => {
        setFavVendorList(res);
      });
  }, [userData?.favouriteStores]);

  useEffect(() => {
    getCategories().then((res) => {
      if (res != null) {
        console.log("cat", res);
        dispatch(GetCategoriesA(res));
      }
    });
  }, []);

  useEffect(() => {
    localStorage.getItem("setLocality") && localStorage.getItem("selectedCity");
    getDiscountWiseOffers(
      localStorage.getItem("selectedCity"),
      localStorage.getItem("setLocality")
    ).then((res) => {
      setHAllOffers(res);
    });
  }, []);

  const findArray = (value, title) => {
    const offer = [];
    hAllOffers?.map((val, index) => {
      val?.offer?.map((res, i) => {
        if (res?.offerdiscount == value) {
          res.storeId = val.uniqueId;
          res.position = i;
          offer.push(res);
        }
      });
    });
    return (
      offer.length != 0 && (
        <HBestOffer
          offers={offer}
          title={title}
          link={"Offers"}
          status="disabled"
        />
      )
    );
  };

  return (
    <>
      <Helmet>
        <title>Kube City | Your Saving Partner | Vendor Directory</title>
        <meta
          name="Description"
          content="We are an Online Information Marketplace, providing you with essential information about shops in your locality and helping you save money on daily purchases."
        />
      </Helmet>

      <Suspense fallback={<div> Loading.. </div>}>
        <HAdvertiseOne />
      </Suspense>

      <Suspense fallback={<div> Loading.. </div>}>
        <HCategoryOffers />
      </Suspense>
      <Suspense fallback={<div> Loading.. </div>}>
        {findArray("50", "50% to 40% OFF")}
      </Suspense>

      <Suspense fallback={<div> Loading.. </div>}>
        <HCategory />
      </Suspense>

      <Suspense fallback={<div> Loading.. </div>}>
        {findArray("Platinum", "Platinum Offers")}
      </Suspense>
      <Suspense fallback={<div> Loading.. </div>}>
        {findArray("40", "40% to 30% OFF")}
      </Suspense>
      <Suspense fallback={<div> Loading.. </div>}>
        {findArray("30", "30% to 20% OFF")}
      </Suspense>
      <Suspense fallback={<div> Loading.. </div>}>
        {findArray("20", "20% to 10% OFF")}
      </Suspense>
      <Suspense fallback={<div> Loading.. </div>}>
        {findArray("10", "Upto 10% OFF")}
      </Suspense>
      <Suspense fallback={<div> Loading.. </div>}>
        {findArray("amazing", "Exciting Offers")}
      </Suspense>
      <Suspense fallback={<div> Loading.. </div>}>
        {localStorage.getItem("isUserVerify") == "true" &&
          favVendorList.length != 0 && (
            <HFavoriteVendors favVendorList={favVendorList} />
          )}
      </Suspense>
      <Suspense fallback={<div> Loading.. </div>}>
        <HLatestBlog />
      </Suspense>
    </>
  );
};

export default Home;
