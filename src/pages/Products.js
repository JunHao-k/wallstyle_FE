import React, { useContext, useEffect } from 'react'
import { Link, useLocation } from "react-router-dom"
import ProductContext from "../contexts/ProductContext"
import "../css/products.css"
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Accordion from 'react-bootstrap/Accordion';
import Form from 'react-bootstrap/Form';
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

    // let products = []
    // let themes = []

    // const getThemes = async () => {
    //     let response = await axios.get(BASE_URL + '/products/themes')
    //     themes = response.data
    //     return themes
    // }


    // useEffect(() => {
    //     const start = async () => {
    //         let response = await getThemes()
    //         console.log("This is the response  ===>  " , response)
    //     }
    //     start()
    // } , [])


    // themes = productContext.getThemes()
    // console.log("Get all themes ==> ", themes)




    //console.log(productContext.products)



    // console.log(allProducts)



    // if (isLoaded) {
    //     products = productContext.getProductsByTheme()
    //     console.log("This is the products  => ", products)
    // }

    return (
        <React.Fragment>
            {/* <h1>Products</h1> */}
            <div className="container d-flex-column justify-content-around">

                <div>
                    <Accordion className='d-none d-md-block d-lg-block' defaultActiveKey="1" flush>
                        <Accordion.Item eventKey="0">
                            <Accordion.Header id = "accordion-header">Search</Accordion.Header>
                            
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
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                </div>
                <div className="separator small left mb-3 mt-3 d-none d-md-block d-lg-block" style={{ backgroundColor: "#494949" }}></div>
                <div className="mt-3">
                    <Row xs={2} md={3} lg={5} className="g-4 container-fluid " >
                        {allProducts.length ? Array.from({ length: allProducts.length }).map((_, idx) => (
                            <React.Fragment key={allProducts[idx].id}>
                                <Col className="card-holder">
                                    <Card id="listing-card" as={Link} to={`/variants/${allProducts[idx].id}`}>
                                        <Card.Img variant="top" src={allProducts[idx].image_set} />
                                    </Card>
                                </Col>
                            </React.Fragment>
                        )) : <h1>waiting results</h1>}
                    </Row>
                </div>
            </div>
        </React.Fragment>

    )
}