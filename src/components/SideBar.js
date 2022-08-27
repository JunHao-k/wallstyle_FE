import React, { useState } from 'react'
import Offcanvas from 'react-bootstrap/Offcanvas';
// import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom"
import { GiHamburgerMenu } from "react-icons/gi";

export default function NavBar() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <React.Fragment>

      <GiHamburgerMenu size="2em" color="grey" onClick={handleShow}/>
      {/* <Button variant="primary" onClick={handleShow}>
        Launch
      </Button> */}

      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Menu</Offcanvas.Title>
          
        </Offcanvas.Header>
        <Offcanvas.Body>
        <ul>
            <li>
              <Link to = "/">Cart</Link>
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

