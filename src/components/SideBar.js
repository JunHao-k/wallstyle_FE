import React, { useState, useContext } from 'react'
import Offcanvas from 'react-bootstrap/Offcanvas';
import "../css/navbar.css"
import { Link, useNavigate } from "react-router-dom"
import { GiHamburgerMenu } from "react-icons/gi";
import { BsHandbag } from "react-icons/bs"
import { HiOutlineUser } from "react-icons/hi"
import { TbReportMoney } from "react-icons/tb"


import UserContext from '../contexts/UserContext';
//import ProductContext from '../contexts/ProductContext';

export default function NavBar() {

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const navigate = useNavigate()
  const userContext = useContext(UserContext)

  const first_name = JSON.parse(localStorage.getItem("userData")) ? JSON.parse(localStorage.getItem("userData")).data.first_name : null
  const last_name = JSON.parse(localStorage.getItem("userData")) ? JSON.parse(localStorage.getItem("userData")).data.last_name : null

  return (
    <React.Fragment>
      <div className="navbar d-flex">

        <div className="navbar-icons">
          <GiHamburgerMenu size="1.5em" color="grey" onClick={handleShow} style={{ marginLeft: ".5em" }} />
        </div>

        <h2 className = "user-name">{JSON.parse(localStorage.getItem("userData")) ? `Welcome ${first_name} ${last_name}` : ""}</h2>
        
        <div className="navbar-icons">
          {JSON.parse(localStorage.getItem("userData")) ? <TbReportMoney size="1.5em" color="grey" style={{ marginRight: ".5em" }}/> : <HiOutlineUser size="1.5em" color="grey" style={{ marginRight: ".5em" }} onClick={() => navigate("/login")} />}
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

          <Offcanvas.Title onClick={async () => {await userContext.logout() ; handleClose()}}>Log out</Offcanvas.Title>
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

