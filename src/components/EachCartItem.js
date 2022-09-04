import React, { useState, useContext } from 'react'
import { TbEdit } from "react-icons/tb"
import { FaTrashAlt } from "react-icons/fa"
import Form from 'react-bootstrap/Form';
import Badge from 'react-bootstrap/Badge';
import ListGroup from 'react-bootstrap/ListGroup';
import CartContext from '../contexts/CartContext';

export default function EachCartItem(props) {

    const cartContext = useContext(CartContext)
    const [quantity, setQuantity] = useState(props.cart.quantity)
    const [editPage, setEditPage] = useState(false)
    const [warning, setWarning] = useState(false)

    const updateFormField = (event) => {
        if (event.target.value > props.cart.variant.model_stock) {
            setQuantity(props.cart.variant.model_stock)
            setWarning(true)
        }
        else if (Number(event.target.value) <= 0) {
            setQuantity(1)
            setWarning(true)
        }
        else {
            setQuantity(event.target.value)
        }
    }
    
    

    const updateBtnClicked = async () => {
        let updateRes = await cartContext.updateCart({
            "variantId": props.cart.variant_id,
            "frameId": props.cart.frame_id,
            "dimensionId": props.cart.dimension_id,
            "quantity": quantity
        })
        setEditPage(false)
        props.makeReload(true)
    }

    const deleteBtnClicked = async () => {
        console.log("Props.cart.variantid" , props.cart.variant_id )
        console.log("Props.cart.cartId" , props.cart.id )
        let deleteRes = await cartContext.deleteCartItem({
            "variantId": props.cart.variant_id,
            "cartId": parseInt(props.cart.id)
        })
        console.log("This is response data ==> " , deleteRes.data)
    }

    return (
        <ListGroup.Item >
            <div className="row">
                <div className="col-4 d-flex-column justify-content-center align-items-center">
                    <img src={props.cart.variant.model_image} alt="..." className="img-fluid" style={{ aspectRatio: "1/1", objectFit: "cover" }} />
                    {props.cart.variant.product.sales ? <Badge bg="secondary" className="mt-3">{props.cart.variant.product.sales}% off</Badge> : ""}
                </div>

                {
                    editPage ?
                        <div className="col-8">
                            <div>
                                <Form.Group>
                                    <Form.Label>Update quantity</Form.Label>
                                    <Form.Control className="mb-2" type="number" name="newQuantity" value={quantity} min="1" max={props.cart.variant.model_stock} onChange={updateFormField} />
                                    <div className = "mb-2">{warning ? <span style={{color: "red" , fontSize: "10px"}}>*Only {props.cart.variant.model_stock} available</span> : ""}</div>
                                </Form.Group>
                                <a className="btn btn-dark btn-outline-light" onClick={updateBtnClicked}>Update</a>
                            </div>
                        </div> :
                        <React.Fragment>
                            <div className="col-6">
                                <div>
                                    <div><span style={{ fontSize: "14px" }}>{props.cart.variant.product.title} </span></div>
                                    <div>
                                        <span style={{ fontSize: "12px" }}>
                                            {
                                                `${props.cart.dimension.dimension_size} / 
                                                ${props.cart.variant.model_name} / 
                                                ${props.cart.frame.frame_type}`
                                            }

                                        </span>
                                    </div>
                                    <div>
                                        <span style={{ fontSize: "12px" }}>${(props.priceCheck.discounted[props.index] / 100).toFixed(2)}</span>
                                        <span style={{ fontSize: "12px", marginLeft: "1em" }}>Quantity: {props.cart.quantity}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="col-2 d-flex flex-column justify-content-around align-items-center">
                                <TbEdit className="btn btn-dark btn-outline-light btn-sm" style = {{cursor: "pointer"}} onClick={() => { setEditPage(true) }} />
                                <FaTrashAlt className="btn btn-dark btn-outline-light btn-sm" style = {{cursor: "pointer"}} onClick={deleteBtnClicked}/>
                            </div>
                        </React.Fragment>
                }
            </div>
        </ListGroup.Item>
    )
}


