import React, { useContext } from 'react'
import { Link } from "react-router-dom"
import ProductContext from "../contexts/ProductContext"
import "../css/products.css"
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
// import axios from 'axios';

export default function Products() {

    // const BASE_URL = "https://wall-style.herokuapp.com/api"

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
    const productContext = useContext(ProductContext)
    // themes = productContext.getThemes()
    // console.log("Get all themes ==> ", themes)

    const allProducts = productContext.getProducts()
    // console.log(allProducts)

    // const isLoaded = productContext.contentLoaded()

    // if (isLoaded) {
    //     products = productContext.getProductsByTheme()
    //     console.log("This is the products  => ", products)
    // }


    return (
        <React.Fragment>
            <h1>Products</h1>
            <div className="container d-flex justify-content-around">
                <Row xs={2} md={3} lg={5} className="g-4 container-fluid" >
                    {allProducts.length ? Array.from({ length: allProducts.length }).map((_, idx) => (
                        <React.Fragment key={allProducts[idx].id}>
                            <Col className="card-holder">
                                <Card id="listing-card" as={Link} to={"/variants"}>
                                    <Card.Img variant="top" src={allProducts[idx].image_set} />
                                </Card>
                            </Col>
                        </React.Fragment>
                    )) : <h1>waiting results</h1>}
                </Row>
            </div>
        </React.Fragment>

    )
}