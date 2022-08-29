import React, { useContext } from 'react'
import "../css/products.css"
import "../css/carousell.css"
import Carousel from 'react-bootstrap/Carousel';
import Dropdown from "react-bootstrap/Dropdown"
import DropdownButton from "react-bootstrap/DropdownButton"
import ProductContext from "../contexts/ProductContext"

export default function Variants() {

  const BASE_URL = "https://wall-style.herokuapp.com/api/products"
  const productContext = useContext(ProductContext)
  // const themes = productContext.getThemes()
  // console.log("Get all themes in variants ==> ", themes)

  var dropdowns = [
    { title: "SIZE", options: ["30x40c", "30x50c"] },
    { title: "MODEL", options: ["A", "B", "C"] },
    { title: "FRAME", options: ["Canvas Only", "test"] }
  ]

  var dropdownButtons = dropdowns.map(o => {
    return (
      <div className="specification">

        {o.title}
        <br />

        <DropdownButton title={o.options[0]}>

          <Dropdown.Item>30x40c</Dropdown.Item>
          <Dropdown.Item>30x50c</Dropdown.Item>
          <Dropdown.Item>30x60c</Dropdown.Item>

        </DropdownButton>

      </div>
    )
  })

  return (
    <div id="variants">
      <Carousel>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://cdn.shopify.com/s/files/1/0288/3846/1545/products/3FrameSet_51_540x.jpg?v=1633312841"
            alt="First slide"
          />
          <Carousel.Caption>
            <h3>First slide label</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://cdn.shopify.com/s/files/1/0288/3846/1545/products/1_59_540x.jpg?v=1633312840"
            alt="Second slide"
          />

          <Carousel.Caption>
            <h3>Second slide label</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://cdn.shopify.com/s/files/1/0288/3846/1545/products/2-2021-10-04T100023.891_540x.jpg?v=1633312841"
            alt="Third slide"
          />

          <Carousel.Caption>
            <h3>Third slide label</h3>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>

      <div className="landing-section">
        <div className="title">GOLDEN MOUNTAIN CANVAS</div>

        <div className="price">
          <span className="original-price">
            $29.90
          </span>

          &nbsp; &nbsp;

          <span className="discounted-price">
            $17.30
          </span>
        </div>

      </div>

      <div className="specifications">

        {dropdownButtons}

      </div>


    </div>
  );


}