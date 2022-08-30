import React, { useState } from 'react'
import Offcanvas from 'react-bootstrap/Offcanvas';
import "../css/navbar.css"
import { Link, useNavigate } from "react-router-dom"
import { GiHamburgerMenu } from "react-icons/gi";
import { BsHandbag } from "react-icons/bs"
import { HiOutlineUser } from "react-icons/hi"

export default function NavBar() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const navigate = useNavigate()

  return (
    <React.Fragment>

      <div className="navbar d-flex">
        <GiHamburgerMenu size="1.5em" color="grey" onClick={handleShow} style = {{marginLeft: ".5em"}}/>
        <h2>Home</h2>
        <div className="navbar-icons">
          <HiOutlineUser size = "1.5em" color = "grey" style = {{marginRight: ".5em"}} onClick = {() => navigate("/login")}/>
          <BsHandbag size = "1.5em" color = "grey" style = {{marginRight: ".5em"}}/>
        </div>
      </div>
      
      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Menu</Offcanvas.Title>
        </Offcanvas.Header>
        <div className="separator small left" style={{backgroundColor: "#494949"}}></div>
        <Offcanvas.Body className="menu-options">
          <Link to = "/"><Offcanvas.Title>Home</Offcanvas.Title></Link>
          <div className="separator small left" style={{backgroundColor: "#494949"}}></div>
          
          <Link to = "/products"><Offcanvas.Title>Products</Offcanvas.Title></Link>
          <div className="separator small left" style={{backgroundColor: "#494949"}}></div>
          
          {/* <Link to = "/variants"><Offcanvas.Title>Variants</Offcanvas.Title></Link>
          <div className="separator small left" style={{backgroundColor: "#494949"}}></div>
          
          <Link to = "/login"><Offcanvas.Title>Login</Offcanvas.Title></Link>
          <div className="separator small left" style={{backgroundColor: "#494949"}}></div>
          
          <Link to = "/register"><Offcanvas.Title>Register</Offcanvas.Title></Link>
          <div className="separator small left" style={{backgroundColor: "#494949"}}></div> */}
        </Offcanvas.Body>
      </Offcanvas>
    </React.Fragment>
  );
}

