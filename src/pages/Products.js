import React, { useContext } from 'react'
import ProductContext from "../contexts/ProductContext"
import "../css/products.css"
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function Products() {

    const productContext = useContext(ProductContext)
    //const themes = productContext.getThemes()
    const allProducts = productContext.getProducts()
    const productsByTheme = productContext.getProductsByTheme()
    // for(let eachTheme of themes){
    //     console.log(eachTheme)
    // }

    // const extractProduct = async () => {
    //     let productArr = []
    //     for (let eachTheme of themes) {
    //         let productByTheme = await productContext.getProductsByTheme(eachTheme['0'])
    //         productArr.push(productByTheme['0'])
    //     }
    //     return productArr
    // }
    // let products = extractProduct()

    // themes.map(eachTheme => {
    //     const productByTheme = productContext.getProductsByTheme(eachTheme[0])
    //     return productArr.push(productByTheme)
    // })

    console.log(productsByTheme)

    return (
        <React.Fragment>
            <h1>Products</h1>
            <div className="container d-flex justify-content-around">
                <Row xs={2} md={2} lg={3} className="g-4 container-fluid" >
                    {Array.from({ length: allProducts.length}).map((_, idx) => (
                        <React.Fragment key={allProducts[idx]._id}>
                            <Col className="card-holder">
                                <Card id="listing-card">
                                    <Card.Img variant="top" src={allProducts[idx].image_set}/>
                                    {/* <Card.Body>
                                        <div className="card-info">
                                            <Card.Title>{this.state.data[idx].name}</Card.Title>
                                            <Card.Title><span>{this.state.data[idx].country} - {this.state.data[idx].city}</span></Card.Title>
                                            <Card.Title>Author: <span>{this.state.data[idx].author}</span></Card.Title>
                                            <Card.Title>Type: <span>{this.state.data[idx].type}</span></Card.Title>
                                            <ListGroup variant="flush" className="card-list-group">
                                                <ListGroup.Item>Price: <span>{this.state.data[idx].price !== 0 ? this.state.data[idx].price : "Free"}</span></ListGroup.Item>
                                                <ListGroup.Item>Score: <span>{this.state.data[idx].ratings}/10</span></ListGroup.Item>
                                                <ListGroup.Item>Rated: <span>{Array.from({ length: this.state.data[idx].stars }).map((_, idx) => (
                                                    <RiStarSFill color="#ffbb33" />
                                                ))}</span></ListGroup.Item>

                                            </ListGroup>
                                            <div>
                                                {Array.from(this.state.data[idx].tags_id, item => <Badge bg="warning" className="tags-badge">{item}</Badge>)}
                                            </div>
                                        </div>
                                        <Card.Footer className="card-footer text-muted">Click to see more details</Card.Footer>
                                    </Card.Body> */}
                                </Card>
                            </Col>
                        </React.Fragment>
                    ))}
                </Row>
            </div>
        </React.Fragment>

    )
}