import "./App.css";

import Header from "./components/layout/NewHeader/NewHeader"
import Footer from "./components/layout/footer/footer";
import Home from "./components/Pages/home/home";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useRoutes,
} from "react-router-dom";
import About from "./components/Pages/About-us/About-us";
import Contact from "./components/Pages/Contact/Contact";
import StoreList from "./components/Pages/Store-list/Store-list";
import Category from "./components/Pages/Category/Categories";
import BAP from "./components/Pages/BecomeAPartner/BecomeAPartner";
import AWU from "./components/Pages/AdvertiseWithUs/AdvertiseWithUs"
import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import PrivacyPolicy from "./components/Pages/PrivacyPolicy/PrivacyPolicy";
import Terms from "./components/Pages/T&C/T&C";
import LatestBlogs from "./components/Pages/LatestBlogs/LatestBlogs";
import SingleBlog from "./components/Pages/SingleBlog/SingleBlog";
import BestOffer from "./components/Pages/BestOffers/BestOffer";
import VendorDetails from "./components/Pages/VendarDetails/VendorDetails";
import ProtectedRoute from "./Navigation/ProtectedRoute";
import ProfileView from "./components/Pages/ProfileView/ProfileView";
import OfferDetails from "./components/Pages/OfferDetails/OfferDetails";
import AllEvents from "./components/Pages/AllEvents/AllEvents";
import SingleEvent from "./components/Pages/SingleEvent/SingleEvent"
import FiftyOFFOffers from "./components/Pages/50%OFFOffers/50%OFFOffer";
import Auth from "./components/Pages/authTest";



function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        
        <Route path="/" element={<Home />} />
        <Route path="/About" element={<About />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/StoreList" element={<StoreList/>}/>
        <Route path="/Categories" element={<Category />} />
        <Route path="/Events" element={<AllEvents />} />
        <Route path="/SingleEvent" element={<SingleEvent />} />
        <Route path="/Become-A-Partner" element={<BAP />} />
        <Route path="/Advertise-With-Us" element={<AWU />} />
        <Route path="/Privacy-Policy" element={<PrivacyPolicy />} />
        <Route path="/Terms-and-Conditions" element={<Terms />} />
        <Route path="/LatestBlogs" element={<LatestBlogs />} />
        <Route path="/OfferDetails/:_id/*" element={<OfferDetails />} />
        <Route path="/LatestBlogs/:title/*" element={<SingleBlog />} />
        <Route path="/Offers" element={<BestOffer />} />
        <Route path="/DiscountOffers/*" element={<FiftyOFFOffers />} />
        
        <Route path="/vendorDetail/:id" element={<VendorDetails />} />
        
        <Route path="/ProfileView" element={<ProfileView />} />

        <Route path="/Auth" element={<Auth />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
