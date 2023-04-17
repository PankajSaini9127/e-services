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

const GlobleContext = createContext()

function App() {

  const initialState = {
    isAuth : false,
    alert : {open:false,messgae:"",variant:""},
    data:[]
  }

  

  const [loginPopUp,setLogin] = useState(false);
  const [signUpPopUp, setSignUp] = useState(false);

  const [state,dispatch]  = useReducer(reducer,initialState)
  console.log(state)


  return (
    <GlobleContext.Provider value={{state,dispatch}}>
    <CustomAlert/>
    
    <BrowserRouter>
    <Navbar setLogin={setLogin} setSignUp={setSignUp}/>
     <Login  open={loginPopUp} setLogin={setLogin} setSignUp={setSignUp} />
     <SignUp open={signUpPopUp} setSignUp={setSignUp} setLogin={setLogin} />
      <Routes>
        <Route path={"/"} exact element={<Home />} />
        <Route path="/request" exact element={<Request/>} />
        <Route path="/service" exact element={<Services />} />
        <Route path="/contact" exact element={<Contact />} />
        <Route path="/dashboard" exact element={<DashBoard />} />   
        <Route path="/listing" exact element={<Listing />} />
        <Route path="/view-service/:id" exact element={<ViewPage />} />

        
      </Routes>
    </BrowserRouter>
    </GlobleContext.Provider>
  );
}

export {GlobleContext};
export default App;
