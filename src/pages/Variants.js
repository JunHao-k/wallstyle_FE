import React, { useContext, useState, useEffect, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import "../css/products.css"
import "../css/carousell.css"
import axios from 'axios'
import Carousel from 'react-bootstrap/Carousel';
import ProductContext from "../contexts/ProductContext"
import CartContext from '../contexts/CartContext';
import Form from 'react-bootstrap/Form';

export default function Variants() {

  const BASE_URL = "https://wall-style.herokuapp.com/api/products"
  // const BASE_URL = "https://8000-junhaok-p3wallstyle-qln0hp2s15f.ws-us63.gitpod.io/api/products"

  const productContext = useContext(ProductContext)
  const cartContext = useContext(CartContext)
  const { product_id } = useParams();
  const [variants, setVariants] = useState([])
  const [product, setProduct] = useState([])
  const tracker = useRef(true);
  const navigate = useNavigate()

  const setFormState = cartContext.setBodyInfo
  const createCartItem = cartContext.addCartItem

  const updateFormField = (event) => {
    setFormState({
        ...cartContext.bodyInfo, // Duplicate the original form object
        [event.target.name]: event.target.value // Rewrite the key that has changed
    })
  }

  const addToCart = async () => {
    const addCartRes = await createCartItem(cartContext.bodyInfo)
    if(addCartRes){
      navigate("/products")
    }
    else{
      console.log("Item not added into cart properly")
    }
  }


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
      console.log("This is the variant data  ===>  " , variantData)
      console.log("This is variants state ==> " , variants)
      let productData = await getProduct()
      console.log("This is the product data  ===>  ", productData)
    }
    start()
  }, [])

  useEffect(() => {
    if (!tracker.current) {
      tracker.current = variants
      console.log("This is in tracker.current ==> " , tracker.current)
      setFormState({
        ...cartContext.bodyInfo, // Duplicate the original form object
        "frameId": 1,
        "dimensionId": 1,
        //"variantId": tracker.current[0].id
    })
    }
  }, [variants])

  return(
    <div id="variants" className="row d-flex">
      <div className = "col-lg-6">

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
      </div>

      <div className = "col-lg-6">
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
          <Form.Select aria-label="Default select example" name="dimensionId" onChange = {updateFormField}>
            {/* <option>-- Dimensions --</option> */}
            <option value="1">30cm x 40cm</option>
            <option value="2">40cm x 60cm</option>
            <option value="3">50cm x 70cm</option>
            <option value="4">60cm x 80cm</option>
          </Form.Select>

          <Form.Label>Choose a Frame</Form.Label>
          <Form.Select aria-label="Default select example" name="frameId" onChange = {updateFormField}>
            {/* <option>-- Frames --</option> */}
            <option value="1">Canvas Only</option>
            <option value="2">Stretch Frame</option>
            <option value="3">Floater Frame</option>
          </Form.Select>

          <Form.Label>Choose a Model</Form.Label>
          <Form.Select aria-label="Default select example" name="variantId" onChange = {updateFormField}>
            <option>-- Models --</option>
            {Array.from({ length: variants.length }).map((_, idx) => (
              <option value={variants[idx].id}>
                {variants[idx].model_name}
              </option>
            ))}
          </Form.Select>
          
          <a className="btn btn-dark btn-outline-light mt-3" onClick = {addToCart}>Add to cart</a>
          
        </Form.Group>
      </div>
      </div>
    </div>
  );


}