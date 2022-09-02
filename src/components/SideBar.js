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

  // useEffect(() => {
  //   (async () => {

  //   })()
  // }, [cart])

  // const makePageReload = () => {
  //   setForceReload(true)
  //   setEditPage(false)
  // }

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
          <GiHamburgerMenu size="1.5em" color="grey" onClick={handleShow} style={{ marginLeft: ".5em" }} />
        </div>

        <h2 className="user-name">{JSON.parse(localStorage.getItem("userData")) ? `Welcome ${first_name} ${last_name}` : ""}</h2>

        <div className="navbar-icons">
          {JSON.parse(localStorage.getItem("userData")) ? <TbReportMoney size="1.5em" color="grey" style={{ marginRight: ".5em" }} /> : <HiOutlineUser size="1.5em" color="grey" style={{ marginRight: ".5em" }} onClick={() => navigate("/login")} />}
          <BsHandbag size="1.5em" color="grey" style={{ marginRight: ".5em" }} onClick={loadCartItems} />
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

          <Offcanvas.Title onClick={async () => { await userContext.logout(); handleClose() }}>Log out</Offcanvas.Title>
          <div className="separator small left" style={{ backgroundColor: "#494949" }}></div>

          {/* <Link to = "/login"><Offcanvas.Title>Login</Offcanvas.Title></Link>
          <div className="separator small left" style={{backgroundColor: "#494949"}}></div>
          
          <Link to = "/register"><Offcanvas.Title>Register</Offcanvas.Title></Link>
          <div className="separator small left" style={{backgroundColor: "#494949"}}></div> */}
        </Offcanvas.Body>
      </Offcanvas>


      <Offcanvas className="sidebar-offcancvas" show={cartShow} onHide={handleCartClose} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Cart</Offcanvas.Title>
        </Offcanvas.Header>
        <div className="separator small left" style={{ backgroundColor: "#494949" }}></div>
        <Offcanvas.Body className="menu-options">
          <ListGroup variant="flush">
            {
              tracker.current.cartItems ?
                <React.Fragment>
                  {Array.from({ length: tracker.current.cartItems.length }).map((_, idx) => (
                    // <ListGroup.Item >
                    //   <div className="row">
                    //     <div className="col-4 d-flex-column justify-content-center align-items-center">
                    //       <img src={tracker.current.cartItems[idx].variant.model_image} alt="..." className="img-fluid" style={{ aspectRatio: "1/1", objectFit: "cover" }} />
                    //       {tracker.current.cartItems[idx].variant.product.sales ? <Badge bg="secondary" className="mt-3">{tracker.current.cartItems[idx].variant.product.sales}% off</Badge> : ""}
                    //     </div>
                        
                    //     {
                    //       editCartPage ?
                    //         <div className="col-8">
                    //           <div>
                    //             <Form.Group>
                    //               <Form.Label>Update quantity</Form.Label>
                    //               <Form.Control className="mb-2" type="number" name="quantity" min="1" max={tracker.current.cartItems[idx].variant.model_stock}/>
                    //             </Form.Group>
                    //             <a className="btn btn-dark btn-outline-light" size="sm" onClick={makePageReload}>Update</a>
                    //           </div>

                    //         </div> :
                    //         <React.Fragment>
                    //           <div className="col-6">
                    //             <div>
                    //               <div><span style={{ fontSize: "14px" }}>{tracker.current.cartItems[idx].variant.product.title} </span></div>
                    //               <div>
                    //                 <span style={{ fontSize: "12px" }}>
                    //                   {
                    //                     `${tracker.current.cartItems[idx].dimension.dimension_size} / 
                    //                     ${tracker.current.cartItems[idx].variant.model_name} / 
                    //                     ${tracker.current.cartItems[idx].frame.frame_type}`
                    //                   }

                    //                 </span>
                    //               </div>
                    //               <div>
                    //                 <span style={{ fontSize: "12px" }}>${(priceTable.discounted[idx]/100).toFixed(2)}</span>
                    //                 <span style={{ fontSize: "12px" , marginLeft: "1em" }}>Quantity: {tracker.current.cartItems[idx].quantity}</span>
                    //               </div>
                    //             </div>
                    //           </div>
                    //           <div className="col-2 d-flex flex-column justify-content-around align-items-center">
                    //             <TbEdit onClick={() => { setEditPage(true) }} />
                    //             <FaTrashAlt />
                    //           </div>
                    //         </React.Fragment>
                    //     }
                    //   </div>
                    // </ListGroup.Item>

                    <EachCartItem cart = {tracker.current.cartItems[idx]} makeReload = {setForceReload} priceCheck = {priceTable} index = {idx}/>
                  ))}
                </React.Fragment>
                : <h1>Waiting</h1>
            }
          </ListGroup>
          <ListGroup>
            <div className="d-flex">
              <div>Subtotal:</div>
              <div>${(priceTable.total/100).toFixed(2)}</div>
            </div>
          </ListGroup>
        </Offcanvas.Body>
      </Offcanvas>
    </React.Fragment>
  );
}

