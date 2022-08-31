import React, { useState, useContext } from 'react'
import Offcanvas from 'react-bootstrap/Offcanvas';
import Accordion from 'react-bootstrap/Accordion';
import Form from 'react-bootstrap/Form';
import "../css/navbar.css"
import { Link, useNavigate } from "react-router-dom"
import { GiHamburgerMenu } from "react-icons/gi";
import { BsHandbag } from "react-icons/bs"
import { HiOutlineUser } from "react-icons/hi"
import UserContext from '../contexts/UserContext';
import ProductContext from '../contexts/ProductContext';

export default function NavBar() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const navigate = useNavigate()
  const userContext = useContext(UserContext)
  const productContext = useContext(ProductContext)
  const themes = productContext.getThemes()
  //console.log(themes)

  const searchQuery = productContext.searchQuery
  // console.log("This is title stuff ==> " , titleStuff)
  const updateFormField = (event) => {
    productContext.setSearchQuery({
      ...searchQuery,
      [event.target.name]: event.target.value
    })
  }

  return (
    <React.Fragment>

      <div className="navbar d-flex">
        <GiHamburgerMenu size="1.5em" color="grey" onClick={handleShow} style={{ marginLeft: ".5em" }} />
        <h2>Home</h2>
        <div className="navbar-icons">
          <HiOutlineUser size="1.5em" color="grey" style={{ marginRight: ".5em" }} onClick={() => navigate("/login")} />
          <BsHandbag size="1.5em" color="grey" style={{ marginRight: ".5em" }} />
        </div>
      </div>

      <Offcanvas className="sidebar-offcancvas" show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Menu</Offcanvas.Title>
        </Offcanvas.Header>
        <div className="separator small left" style={{ backgroundColor: "#494949" }}></div>
        <Offcanvas.Body className="menu-options">
          <Link to="/"><Offcanvas.Title>Home</Offcanvas.Title></Link>
          <div className="separator small left" style={{ backgroundColor: "#494949" }}></div>

          <Link to="/products"><Offcanvas.Title>Products</Offcanvas.Title></Link>
          <div className="separator small left" style={{ backgroundColor: "#494949" }}></div>

          <Offcanvas.Title>
            <Accordion defaultActiveKey="1" flush>
              <Accordion.Item eventKey="0">
                <Accordion.Header>Search</Accordion.Header>
                <Accordion.Body>

                  <Form.Group className="mb-3" controlId="formAuthorName">
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text" placeholder="Input keyword" name="title" value={searchQuery.title} onChange={updateFormField} />
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

                    <Accordion.Item eventKey="1">
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

                    <Accordion.Item eventKey="2">
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

                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </Offcanvas.Title>

          <Offcanvas.Title onClick={userContext.logout}>Log out</Offcanvas.Title>
          <div className="separator small left" style={{ backgroundColor: "#494949" }}></div>

          {/* <Link to = "/login"><Offcanvas.Title>Login</Offcanvas.Title></Link>
          <div className="separator small left" style={{backgroundColor: "#494949"}}></div>
          
          <Link to = "/register"><Offcanvas.Title>Register</Offcanvas.Title></Link>
          <div className="separator small left" style={{backgroundColor: "#494949"}}></div> */}
        </Offcanvas.Body>
      </Offcanvas>
    </React.Fragment>
  );
}

