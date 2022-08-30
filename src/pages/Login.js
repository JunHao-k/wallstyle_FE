import React from 'react'
import Form from 'react-bootstrap/Form';
import "../css/login.css"

export default function Login() {
    return (
        <React.Fragment>
            <div className="login-section">
                <div className="title">Login</div>
                <div>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" name="email" />
                    </Form.Group>

                    &nbsp;
                    
                    <Form.Group>
                        <Form.Label htmlFor="inputPassword5">Password</Form.Label>
                        <Form.Control
                            type="password"
                            id="inputPassword5"
                            aria-describedby="passwordHelpBlock"
                        />
                    </Form.Group>
                    

                </div>
            </div>
        </React.Fragment>
    )
}