import "./App.css";
import Home from "./Components/Home";

import { Router, Route, Routes, BrowserRouter } from "react-router-dom";
import Login from "./Components/Login";
import SignUp from "./Components/SignUp";
import Services from "./Components/Services";
import Contact from "./Components/Contact";
import Request from "./Components/Request";
import { createContext, useReducer, useState } from "react";
import { reducer } from "./Components/ContextAPI/Reducer";
import CustomAlert from "./Components/Utility/CustomAlert";
import Navbar from "./Components/Navbar";
import DashBoard from "./Components/Admin/DashBoard";
import Listing from "./Components/Admin/Listing";
import ViewPage from "./Components/Admin/ViewPage";
import UserDashBoard from "./Components/UserPanel/UserDashBoard";
import UserListing from "./Components/UserPanel/UserListing";
import Preview from "./Components/Preview";
import ListContactQuery from "./Components/ListContactQuery.jsx";
import Footer from "./Components/Footer";

const GlobleContext = createContext();

function App() {
  const initialState = {
    isAuth: false,
    alert: { open: false, messgae: "", variant: "" },
    data: {},
    preview: {},
  };

  const [loginPopUp, setLogin] = useState(false);

  const [state, dispatch] = useReducer(reducer, initialState);
  console.log(state.isAuth && state.data.role === "Admin" );

  return (
    <GlobleContext.Provider value={{ state, dispatch }}>
      <CustomAlert />

      <BrowserRouter>
        <Navbar setLogin={setLogin} />
        <Login open={loginPopUp} setLogin={setLogin} />

        <Routes>
          <Route path={"/"} exact element={<Home />} />
          <Route path="/request" exact element={<Request />} />
          <Route path="/service" exact element={<Services />} />
          <Route path="/contact" exact element={<Contact />} />
          {/* <Route path="/dashboard" exact element={<DashBoard />} />    */}

          <Route path="/preview-service" exact element={<Preview />} />

          <Route path="/contact-query" element={<ListContactQuery/>}/>

          <Route
            path="/listing"
            exact
            element={
              state.isAuth && state.data.role === "Admin" ? (
                <Listing />
              ) : (
                <Home />
              )
            }
          />
           <Route
            path="/view-service/:id"
            exact
            element={
                <ViewPage />
            }
          />
          <Route
            path="/user-dashboard"
            exact
            element={
              state.isAuth && state.data.role === "User" ? (
                <UserDashBoard />
              ) : (
                <Home />
              )
            }
          />
          <Route
            path="/user-listing"
            exact
            element={
              state.isAuth && state.data.role === "User" ? (
                <UserListing />
              ) : (
                <Home />
              )
            }
          />

          {/* <Route path="/customber-listing" exact element={<CustomberServices />} /> */}

          {/* "/user-dashboard" */}
        </Routes>
        <Footer/>
      </BrowserRouter>
    </GlobleContext.Provider>
  );
}

export { GlobleContext };
export default App;
