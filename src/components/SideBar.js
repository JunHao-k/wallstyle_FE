import React, { useState, useContext, useEffect, useRef } from 'react'
import Offcanvas from 'react-bootstrap/Offcanvas';
import ListGroup from 'react-bootstrap/ListGroup';
import "../css/navbar.css"
import { Link, useNavigate } from "react-router-dom"
import { GiHamburgerMenu } from "react-icons/gi";
import { BsHandbag } from "react-icons/bs"
import { HiOutlineUser } from "react-icons/hi"
import { TbReportMoney } from "react-icons/tb"
import EachCartItem from "./EachCartItem"
import Spinner from './Spinner';



import UserContext from '../contexts/UserContext';
import CartContext from '../contexts/CartContext';
//import ProductContext from '../contexts/ProductContext';

export default function NavBar() {

  const tracker = useRef(true);
  /* ------------------------------------------------ Menu sidebar Offcanvas controls ---------------------------------------------- */

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  /* ------------------------------------------------ Menu sidebar Offcanvas controls ---------------------------------------------- */

  const navigate = useNavigate()
  const userContext = useContext(UserContext)
  const cartContext = useContext(CartContext)

  const first_name = JSON.parse(localStorage.getItem("userData")) ? JSON.parse(localStorage.getItem("userData")).data.first_name : null
  const last_name = JSON.parse(localStorage.getItem("userData")) ? JSON.parse(localStorage.getItem("userData")).data.last_name : null


  const [cartShow, setCartShow] = useState(false)
  const handleCartClose = () => setCartShow(false)
  const handleCartShow = () => setCartShow(true)

  const [cart, setCartItems] = useState([])
  const [cartLoaded, setCartLoaded] = useState(false);
  const [forceReload, setForceReload] = useState(false)

  const [priceTable , setPrices] = useState([])


  

  const calculatePrices = async () => {
    let prices = {
      original: [],
      discounted: [],
      total: 0
    }
    let cart = tracker.current.cartItems
    //console.log("This is tracker from calculate price ==> " , cart)

    for (let item of cart) {
      let originalPrice = (item.dimension.dimension_cost + item.frame.frame_cost) * item.quantity
      let discountedPrice = ((100 - (item.variant.product.sales)) / 100) * originalPrice

      prices.original.push(originalPrice)
      prices.discounted.push(discountedPrice)
      prices.total = prices.total + discountedPrice

    }
    return prices

  }

  const loadCartItems = async () => {
    setCartLoaded(false)
    handleCartShow()
    const loadedCartItems = await cartContext.getCart()
    setCartItems(loadedCartItems)
    tracker.current = loadedCartItems
    //console.log("The tracker current ==> ", tracker.current)
    let allPrices = await calculatePrices()

    setPrices(allPrices)
    setCartLoaded(true)

  }

  const checkout = () => {
    navigate("/checkout")
  }

  const viewOrder = () => {
    navigate("/orders")
  }

  useEffect(() => {
    (async () => {
      if(forceReload) {
        //console.log("Function is run useEffect works")
        
        console.log("cartLoaded ==> " , cartLoaded)
        setCartLoaded(false) //cartLoaded = false
        
        const loadedCartItems = await cartContext.getCart()
        console.log("Loaded cart items in useEffet ==> " ,loadedCartItems)
        setCartItems(loadedCartItems)
        setCartLoaded(true) //cartLoaded = true
        setForceReload(false) // forceReload = false

        
        console.log("This is force reload after the end ==> ", forceReload)
      }
    })()
  }, [forceReload])

  return (
    <React.Fragment>
      <div className="navbar d-flex">
        <div className="navbar-icons">
          <GiHamburgerMenu id="hamburgerMenu" className="nav-icons" color="grey" onClick={handleShow} style={{ marginLeft: ".5em" }} />
        </div>

        {/* <h2 className="user-name">{JSON.parse(localStorage.getItem("userData")) ? `Welcome ${first_name} ${last_name}` : ""}</h2> */}

        <div className="navbar-icons d-flex">
          <h2 className="user-name">{JSON.parse(localStorage.getItem("userData")) ? `${first_name} ${last_name}` : ""}</h2>
          {JSON.parse(localStorage.getItem("userData")) ? <TbReportMoney className="nav-icons" color="grey" style={{ marginRight: ".5em" }} onClick={viewOrder}/> : <HiOutlineUser className="nav-icons" color="grey" style={{ marginRight: ".5em" }} onClick={() => navigate("/login")} />}
          {JSON.parse(localStorage.getItem("userData")) ? <BsHandbag className="nav-icons" color="grey" style={{ marginRight: ".5em" }} onClick={loadCartItems}/> : ""}
        </div>
      </div>

      <Offcanvas id = "menu" className="sidebar-offcancvas" show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Menu</Offcanvas.Title>
        </Offcanvas.Header>
        <div className="separator small left" style={{ backgroundColor: "#494949" }}></div>
        <Offcanvas.Body className="menu-options">
          <Link to="/"><Offcanvas.Title onClick={handleClose}>Home</Offcanvas.Title></Link>
          <div className="separator small left" style={{ backgroundColor: "#494949" }}></div>

          <Link to="/products"><Offcanvas.Title onClick={handleClose}>Products</Offcanvas.Title></Link>
          <div className="separator small left" style={{ backgroundColor: "#494949" }}></div>

          <Offcanvas.Title onClick={async () => { await userContext.logout(); handleClose() }}>Log out</Offcanvas.Title>
          <div className="separator small left" style={{ backgroundColor: "#494949" }}></div>

        </Offcanvas.Body>
      </Offcanvas>


      <Offcanvas className="sidebar-offcancvas" show={cartShow} onHide={handleCartClose} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title><h4>Cart</h4></Offcanvas.Title>
        </Offcanvas.Header>
        <div className="separator small left" style={{ backgroundColor: "#494949" }}></div>
        <Offcanvas.Body className="menu-options">
          <ListGroup variant="flush">
            {
              tracker.current.cartItems ?
                <React.Fragment>
                  {Array.from({ length: tracker.current.cartItems.length }).map((_, idx) => (
                    <EachCartItem cart = {tracker.current.cartItems[idx]} makeReload = {setForceReload} priceCheck = {priceTable} index = {idx}/>
                  ))}
                </React.Fragment>
                : <Spinner/>
            }
          </ListGroup>
          <ListGroup>
            <div className="row d-flex">
              <div className='col-6'><h4>Subtotal:</h4></div>
              <div className='col-6 d-flex justify-content-end'><h4>${(priceTable.total/100).toFixed(2)}</h4></div>
            </div>
            <a className="btn btn-dark btn-outline-light mt-3" onClick = {checkout}>Checkout</a>
          </ListGroup>
        </Offcanvas.Body>
      </Offcanvas>
    </React.Fragment>
  );
}

