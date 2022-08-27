import React, { useState } from 'react'
import Offcanvas from 'react-bootstrap/Offcanvas';
import "../css/navbar.css"
import { Link } from "react-router-dom"
import { GiHamburgerMenu } from "react-icons/gi";
import { BsSearch } from "react-icons/bs"
import { BsHandbag } from "react-icons/bs"

export default function NavBar() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <React.Fragment>

      <div className="navbar d-flex">
        <GiHamburgerMenu size="1.5em" color="grey" onClick={handleShow} style = {{marginLeft: ".5em"}}/>
        <h2>Home</h2>
        <div className="navbar-icons">
          <BsSearch size = "1.5em" color = "grey" style = {{marginRight: ".5em"}}/>
          <BsHandbag size = "1.5em" color = "grey" style = {{marginRight: ".5em"}}/>
        </div>
        
      </div>
      
      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Menu</Offcanvas.Title>
        </Offcanvas.Header>
        <div className="separator small left" style={{backgroundColor: "#494949"}}></div>
        <Offcanvas.Body>
        <ul>
            <li>
              <Link to = "/">Home</Link>
            </li>
            <li>
              <Link to = "/cart">Cart</Link>
            </li>
            <li>
              <Link to = "/login">Login</Link>
            </li>
            <li>
              <Link to = "/register">Register</Link>
            </li>
          </ul>
        </Offcanvas.Body>
      </Offcanvas>
    </React.Fragment>
  );
}

