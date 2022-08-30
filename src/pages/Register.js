import React, { useContext } from 'react'
import Form from 'react-bootstrap/Form';
import "../css/login.css"
import UserContext from '../contexts/UserContext';
import { useNavigate } from 'react-router-dom'

export default function Register() {

    const userContext = useContext(UserContext)
    const original = userContext.registerInfo
    const setFormState = userContext.setRegisterInfo
    const submitForm = userContext.register
    const navigate = useNavigate()
    
    const updateFormField = (event) => {
        setFormState({
            ...userContext.registerInfo, // Duplicate the original form object
            [event.target.name]: event.target.value // Rewrite the key that has changed
        })
    }

    const registerAccount = async () => {
        const res = await submitForm(userContext.registerInfo)
        if(res){
            navigate("/login")
        }
    }

    return (
        <React.Fragment>
            <div className="login-section">
                <div className="title">CREATE ACCOUNT</div>
                <div className="login-field">

                    <Form.Group className="mb-3" controlId="formAuthorName">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control type="text" placeholder="Input First Name" name="first_name" value={original.first_name} onChange = {updateFormField}/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formAuthorName">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control type="text" placeholder="Input Last Name" name="last_name" value={original.last_name} onChange = {updateFormField}/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" name="email" value={original.email} onChange = {updateFormField}/>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label htmlFor="inputPassword5">Password</Form.Label>
                        <Form.Control
                            type="password"
                            id="inputPassword5"
                            aria-describedby="passwordHelpBlock"
                            name="password"
                            value={original.password}
                            onChange = {updateFormField}
                        />
                    </Form.Group>

                    <a className="btn btn-dark btn-outline-light mt-3" onClick = {registerAccount}>Create</a>
                </div>
            </div>
        </React.Fragment>
    )
}