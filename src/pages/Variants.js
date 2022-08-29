import React, { useContext, useState, useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom';
import "../css/products.css"
import "../css/carousell.css"
import axios from 'axios'
import Carousel from 'react-bootstrap/Carousel';
import ProductContext from "../contexts/ProductContext"
import Form from 'react-bootstrap/Form';

export default function Variants() {

  const BASE_URL = "https://wall-style.herokuapp.com/api/products"
  const productContext = useContext(ProductContext)
  const { product_id } = useParams();
  const [variants, setVariants] = useState([])
  const [product, setProduct] = useState([])
  const tracker = useRef(true);

  const getVariant = async () => {
    let response = await axios.get(BASE_URL + '/variants/' + product_id)
    setVariants(response.data)
    tracker.current = false;
    return response.data
  }
  const getProduct = async () => {
    let response = await axios.get(BASE_URL + '/get-product/' + product_id)
    setProduct(response.data)
    return response.data
  }

  useEffect(() => {
    const start = async () => {
      let variantData = await getVariant()
      //console.log("This is the variant data  ===>  " , variantData)
      console.log("This is variants state ==> " , variants)
      let productData = await getProduct()
      console.log("This is the product data  ===>  ", productData)
    }
    start()
  }, [])

  useEffect(() => {
    if (!tracker.current) {
      tracker.current = variants
      // for (let i = 0; i < variants.length; i++) {
      //   tracker.current.push(variants[i].model_image)
      // }
    }
  }, [variants])

  return(
    <div id="variants">
      <Carousel>
        {Array.from({ length: tracker.current.length }).map((_, idx) => (
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={tracker.current[idx].model_image}
              alt="Model A"
            />
            <Carousel.Caption style = {{backgroundColor: "rgba(55,57,64,0.2)"}}>
              <h3>Model {tracker.current[idx].model_name}</h3>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
        <Carousel.Item>
            <img
              className="d-block w-100"
              src={product.image_set}
              alt="Model A"
            />
          </Carousel.Item>
      </Carousel>



      <div className="landing-section">
        <div className="title">{product.title}</div>

        <div className="price">
          <span>Base price: </span>
          {/* <span className="original-price">
            $29.90
          </span> */}

          &nbsp;

          <span className="discounted-price">
            $17.30
          </span>
        </div>

        <Form.Text className="text-muted">
          *Set includes canvas of size 30cm x 40cm
          <br/>
          *Any discount is reflected in the cart
        </Form.Text> 
        {/* <Form.Text className="text-muted">
          
        </Form.Text> */}
      </div>

      <div>
        <Form.Group className="mb-3 p-3 d-flex flex-column justify-content-around">

          <Form.Label>Choose a dimension</Form.Label>
          <Form.Select aria-label="Default select example" name="ratings">
            {/* <option>-- Dimensions --</option> */}
            <option value="1">30cm x 40cm</option>
            <option value="2">40cm x 60cm</option>
            <option value="3">50cm x 70cm</option>
            <option value="4">60cm x 80cm</option>
          </Form.Select>

          <Form.Label>Choose a Frame</Form.Label>
          <Form.Select aria-label="Default select example" name="ratings">
            {/* <option>-- Frames --</option> */}
            <option value="1">Canvas Only</option>
            <option value="2">Stretch Frame</option>
            <option value="3">Floater Frame</option>
          </Form.Select>

          <Form.Label>Choose a Model</Form.Label>
          <Form.Select aria-label="Default select example" name="ratings">
            <option>-- Models --</option>
            {Array.from({ length: variants.length }).map((_, idx) => (
              <option value={variants[idx].id}>
                {variants[idx].model_name}
              </option>
            ))}
          </Form.Select>
          <a href="#" class="btn btn-dark btn-outline-light mt-3">Add to cart</a>
        </Form.Group>
        
      </div>
    </div>
  );


}