import React, { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Cart from "./pages/Cart"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Home from './pages/Home'
import SideBar from "./components/SideBar"
import Banner from "./components/Banner"


function App() {
  const BASE_URL = "https://wall-style.herokuapp.com/api"
  const [products , setProducts] = useState([])
  
  useEffect(() => {
    const getAllProducts = async () => {
      let response = await axios.get("BASE_URL" + "/products")
      setProducts(response.data)
    }
    getAllProducts()
  } , [])

  return (
    <React.Fragment>
      <Router>
        <div className="nav">
          <Banner/>
          <SideBar/>
        </div>
    
        <Routes>
            <Route path = "/" element = {<Home/>}/>
            <Route path = "/cart" element = {<Cart/>}/>
            <Route path = "/login" element = {<Login/>}/>
            <Route path = "/register" element = {<Register/>}/>
        </Routes>
      </Router>
    </React.Fragment>
  );
}

export default App;
