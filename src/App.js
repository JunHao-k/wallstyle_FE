import React from 'react'
import './App.css'
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
// import Cart from "./pages/Cart"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Home from './pages/Home'
import Products from './pages/Products';
import Variants from './pages/Variants';
import SideBar from "./components/SideBar"
import Banner from "./components/Banner"
import { ToastContainer } from 'react-toastify';

// Providers
import ProductsProvider from './providers/ProductsProvider';
import UsersProvider from './providers/UsersProvider';

function App() {
  return (
    <React.Fragment>
      <Router>
        <div className="nav">
          <Banner />
          <UsersProvider>
            <ProductsProvider>
              <SideBar/>
            </ProductsProvider>
          </UsersProvider>
        </div>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={
            <ProductsProvider>
              <Products />
            </ProductsProvider>
          } />
          <Route path="/variants/:product_id" element={
            <ProductsProvider>
              <Variants />
            </ProductsProvider>
          } />
          <Route path="/login" element={
            <UsersProvider>
              <Login />
            </UsersProvider>
          } />

          <Route path="/register" element={
            <UsersProvider>
              <Register />
            </UsersProvider>
          } />
        </Routes>
      </Router>
      <ToastContainer />
    </React.Fragment>
  );
}

export default App;
