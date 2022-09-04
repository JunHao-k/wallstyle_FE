import React from 'react'
import { useNavigate } from 'react-router-dom'
import "../css/home.css"
import home from "../images/home.jpg"
import reason1 from "../images/reason1.jpg"
import reason2 from "../images/reason2.jpg"
import reason3 from "../images/reason3.jpg"
import reason4 from "../images/reason4.jpg"
import design1 from "../images/design1.jpg"
import design2 from "../images/design2.jpg"

export default function Home(){

    const navigate = useNavigate()

    return (
        <React.Fragment>    
            <div className='img-container'>
                <img src={home} className="home-image d-lg-none" alt="home pict"/>
            </div>
            <div className="buy-reasons row ">
                <div className = "col-sm-6 d-flex justify-content-center justify-content-lg-end p-3">
                    <img src={reason1} className = "reasons"/>
                    <img src={reason2} className = "reasons"/>
                </div>
                <div className = "col-sm-6 col-lg-4 d-flex justify-content-center justify-content-lg-start p-3">
                    <img src={reason3} className = "reasons"/>
                    <img src={reason4} className = "reasons"/>
                </div>  
            </div>
            <div className="pitch-one row">
                <div className="col-lg-1"></div>
                <div className='col-lg-5 '>
                    <img src={design1} className="design-image" alt="design image"/>
                    <h3 className="p-3">CREATE YOUR OWN ART GALLERY</h3>
                    <h6 className="ps-3">
                        Don't allow walls to just be walls with our collection of wall art canvas. Come get yours now!
                    </h6>
                    <div className="ps-3 mb-4">
                        <a className="btn btn-secondary btn-md btn-outline-light" onClick = {() => {navigate("/products")}}>Shop now</a>
                    </div>
                </div>
                <div className='col-lg-5'>
                    <img src={design2} className="design-image" alt="design image"/>
                    <h3 className="p-3">QUALITY DESIGNS FROM OUR TEAM</h3> 
                    <h6 className="ps-3">Every wall art is handcrafted by experienced designers and quality inspected before shipment.</h6> 
                    <div className="ps-3 mb-4">
                        <a className="btn btn-secondary btn-md btn-outline-light" onClick = {() => {navigate("/products")}}>Shop now</a>
                    </div>
                </div>
                <div className="col-lg-1"></div>
            </div>
        </React.Fragment>
    )
}