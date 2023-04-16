import "./App.css";
import Home from "./Components/Home";

import { Router, Route, Routes, BrowserRouter } from "react-router-dom";
import Login from "./Components/Login";
import SignUp from "./Components/SignUp";
import Services from "./Components/Services";
import Contact from "./Components/Contact";
import Request from "./Components/Request";
import { createContext, useReducer } from "react";
import { reducer } from "./Components/ContextAPI/Reducer";
import CustomAlert from "./Components/Utility/CustomAlert";
import Navbar from "./Components/Navbar";

const GlobleContext = createContext()

function App() {

  const initialState = {
    isAuth : false,
    alert : {open:false,messgae:"",variant:""},
    data:[]
  }

  const [state,dispatch]  = useReducer(reducer,initialState)


  return (
    <GlobleContext.Provider value={{state,dispatch}}>
    <CustomAlert/>
    
    <BrowserRouter>
    <Navbar />
      <Routes>
        <Route path={"/"} exact element={<Home />} />
        <Route path="/request" exact element={<Request/>} />
        <Route path="/service" exact element={<Services />} />
        <Route path="/contact" exact element={<Contact />} />
      </Routes>
    </BrowserRouter>
    </GlobleContext.Provider>
  );
}

export {GlobleContext};
export default App;
