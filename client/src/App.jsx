import { BrowserRouter,Routes,Route } from "react-router-dom";
import Home from "./Pages/Home";
import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";
import About from "./Pages/About";
import Profile from "./Pages/Profile";
import CreateListing from "./Pages/createListing";


import Header from "./components/Header";
import PrivateRoute from "./components/PrivateRoute";
import UpdateListing from "./Pages/UpdateListing";
import Listing from "./Pages/Listing";

export default function App() {

  return (
    
    <BrowserRouter>
    <Header/>
    <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/sign-in" element={<SignIn />}/>
        <Route path="/sign-up" element={<SignUp />}/>
        <Route path="/about" element={<About />}/>
        <Route path="/listing" element={<Listing />}/>
        <Route element={<PrivateRoute/>}>
              <Route path="/profile" element={<Profile />}/>
              <Route path="/create-listing" element={<CreateListing  />}/>
              <Route path="/update-listing/listingId" element={<UpdateListing />}/>
        </Route>

    </Routes>
    
    </BrowserRouter>
  )
}
