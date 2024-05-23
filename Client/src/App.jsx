import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'

import { Signinpage } from "./Signinpage";
import { Home } from "./Home";
import { Dashboard } from "./Dashboard";

function App() {

  
 

  return (
    <>
      <BrowserRouter>
      
         <Routes>
         <Route path="/" element={<Home/>}></Route>
          <Route path="/Signin" element={<Signinpage/>}>
          </Route>
          <Route path="/dashboard" element={<Dashboard/>}></Route>
         </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
