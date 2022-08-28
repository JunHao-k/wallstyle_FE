import React from 'react'
import './App.css'
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Cart from "./pages/Cart"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Home from './pages/Home'
import Products from './pages/Products';
import SideBar from "./components/SideBar"
import Banner from "./components/Banner"

// Providers
import ProductsProvider from './providers/ProductsProvider';

function App() {
  return (
    <React.Fragment>
      <Router>
        <div className="nav">
          <Banner/>
          <SideBar/>
        </div>
    
        <Routes>
            <Route path = "/" element = {<Home/>}/>
            <Route path = "/products" element = {
              <ProductsProvider>
                <Products/>
              </ProductsProvider>
            }/>
            <Route path = "/cart" element = {<Cart/>}/>
            <Route path = "/login" element = {<Login/>}/>
            <Route path = "/register" element = {<Register/>}/>
        </Routes>
      </Router>
    </React.Fragment>
  );
}

export default App;
