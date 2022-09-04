import React, { useContext, useState } from 'react'
import { Link } from "react-router-dom"
import ProductContext from "../contexts/ProductContext"
import "../css/products.css"
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Accordion from 'react-bootstrap/Accordion';
import Form from 'react-bootstrap/Form';
import Spinner from '../components/Spinner';


// import axios from 'axios';

export default function Products() {

    const productContext = useContext(ProductContext)
    const themes = productContext.getThemes()

    let allProducts = productContext.getProducts()

    const searchQuery = productContext.searchQuery
    const updateFormField = (event) => {
        productContext.setSearchQuery({
            ...searchQuery,
            [event.target.name]: event.target.value
        })
    }


    return (

        <React.Fragment>
            {/* <h1>Products</h1> */}
            <div className="container-fluid d-flex-column justify-content-around">
                <div>
                    <Accordion defaultActiveKey="1" flush>
                        <Accordion.Item eventKey="0">
                            <Accordion.Header id="accordion-header">Search</Accordion.Header>

                            <Accordion.Body>
                                <Form.Group className="mb-3" controlId="formAuthorName">
                                    <Form.Label>Title search</Form.Label>
                                    <Form.Control type="text" placeholder="Enter title of product" name="title" value={searchQuery.title} onChange={updateFormField} />
                                </Form.Group>

                                <Accordion defaultActiveKey="1" flush>
                                    <Accordion.Item eventKey="0">
                                        <Accordion.Header>Themes</Accordion.Header>
                                        <Accordion.Body>

                                            <Form.Group>
                                                <Form.Select aria-label="Default select example" name="themes" onChange={updateFormField}>
                                                    <option key={0} value="">-- Search by themes --</option>
                                                    {Array.from({ length: themes.length }).map((_, idx) => (
                                                        <option key={themes[idx][0]} value={themes[idx][0]}>
                                                            {themes[idx][1]}
                                                        </option>
                                                    ))}
                                                </Form.Select>
                                            </Form.Group>

                                        </Accordion.Body>
                                    </Accordion.Item>

                                    <Accordion.Item eventKey="2">
                                        <Accordion.Header>Items on discount</Accordion.Header>
                                        <Accordion.Body>
                                            <Form.Group>
                                                <Form.Select aria-label="Default select example" name="on_sales" onChange={updateFormField}>
                                                    <option key={0} value="">-- Items on discount --</option>
                                                    <option key={1} value={1}>Yes</option>
                                                    <option key={2} value={2}>No</option>
                                                </Form.Select>
                                            </Form.Group>

                                        </Accordion.Body>
                                    </Accordion.Item>

                                    <Accordion.Item eventKey="4">
                                        <Accordion.Header>Art pieces in a set</Accordion.Header>
                                        <Accordion.Body>
                                            <Form.Group>
                                                <Form.Select aria-label="Default select example" name="combo" onChange={updateFormField}>
                                                    <option key={0} value="">-- Sets --</option>
                                                    <option key={1} value={1}>1</option>
                                                    <option key={2} value={2}>2</option>
                                                    <option key={3} value={3}>3</option>
                                                </Form.Select>
                                            </Form.Group>

                                        </Accordion.Body>
                                    </Accordion.Item>

                                </Accordion>
                                <a className="btn btn-dark btn-outline-light mt-3" onClick={() => { productContext.setSearchProducts() }}>Search</a>
                                <a className="btn btn-dark btn-outline-light mt-3" onClick={() => { productContext.triggerResetSearch() }}>Reset</a>
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                </div>
                <div className="separator small left mb-3 mt-3" style={{ backgroundColor: "#494949" }}></div>
                <div className="mt-3 g-4 container-fluid">
                    <Row xs={2} md={3} lg={5} className="g-4" >
                        {allProducts.length ? Array.from({ length: allProducts.length }).map((_, idx) => (
                            <React.Fragment key={allProducts[idx].id}>
                                <Col className="card-holder">
                                    <Card id="listing-card" as={Link} to={`/variants/${allProducts[idx].id}`}>
                                        <Card.Img variant="top" src={allProducts[idx].image_set} />
                                    </Card>
                                </Col>
                            </React.Fragment>
                        )) : <Spinner/>}
                    </Row>
                </div>
            </div>
        </React.Fragment>

    )
}