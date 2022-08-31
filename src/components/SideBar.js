import React, { useState, useContext } from 'react'
import Offcanvas from 'react-bootstrap/Offcanvas';
import Accordion from 'react-bootstrap/Accordion';
import Form from 'react-bootstrap/Form';
import "../css/navbar.css"
import { Link, useNavigate } from "react-router-dom"
import { GiHamburgerMenu } from "react-icons/gi";
import { BsHandbag, BsSearch } from "react-icons/bs"
import { HiOutlineUser } from "react-icons/hi"

import UserContext from '../contexts/UserContext';
import ProductContext from '../contexts/ProductContext';

export default function NavBar() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const navigate = useNavigate()
  const userContext = useContext(UserContext)
  const productContext = useContext(ProductContext)
  const themes = productContext.getThemes()
  //console.log(themes)
  

  const searchQuery = productContext.searchQuery
  const updateFormField = (event) => {
    productContext.setSearchQuery({
      ...searchQuery,
      [event.target.name]: event.target.value
    })
  }

  return (
    <React.Fragment>
      <div className="navbar d-flex">
        <div className="navbar-icons">
          <GiHamburgerMenu size="1.5em" color="grey" onClick={handleShow} style={{ marginLeft: ".5em" }} />
          <BsSearch size="1.5em" color="grey" style={{ marginLeft: ".5em" }} className="d-sm-block d-md-none d-lg-none"/>
        </div>
        <h2>Home</h2>
        <div className="navbar-icons">
          <HiOutlineUser size="1.5em" color="grey" style={{ marginRight: ".5em" }} onClick={() => navigate("/login")} />
          <BsHandbag size="1.5em" color="grey" style={{ marginRight: ".5em" }} />
        </div>
      </div>

      <Offcanvas className="sidebar-offcancvas" show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Menu</Offcanvas.Title>
        </Offcanvas.Header>
        <div className="separator small left" style={{ backgroundColor: "#494949" }}></div>
        <Offcanvas.Body className="menu-options">
          <Link to="/"><Offcanvas.Title onClick={handleClose}>Home</Offcanvas.Title></Link>
          <div className="separator small left" style={{ backgroundColor: "#494949" }}></div>

          <Link to="/products"><Offcanvas.Title onClick={handleClose}>Products</Offcanvas.Title></Link>
          <div className="separator small left" style={{ backgroundColor: "#494949" }}></div>

          <Offcanvas.Title onClick={userContext.logout}>Log out</Offcanvas.Title>
          <div className="separator small left" style={{ backgroundColor: "#494949" }}></div>

          {/* <Link to = "/login"><Offcanvas.Title>Login</Offcanvas.Title></Link>
          <div className="separator small left" style={{backgroundColor: "#494949"}}></div>
          
          <Link to = "/register"><Offcanvas.Title>Register</Offcanvas.Title></Link>
          <div className="separator small left" style={{backgroundColor: "#494949"}}></div> */}
        </Offcanvas.Body>
      </Offcanvas>
    </React.Fragment>
  );
}

