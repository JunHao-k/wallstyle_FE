import React, { useContext } from "react";
import { useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js'
import Spinner from "../components/Spinner";

// Context
import CartContext from '../contexts/CartContext';

export default function Checkout(){

    const cartContext = useContext(CartContext);
    const navigate = useNavigate();
    (async () => {
        let sessionDetails = {}
        let publishableKey = null
        const stripeInfo = await cartContext.checkout()

        if(!stripeInfo){
            navigate("/products")
            return;
        }
        else{
            sessionDetails = {
                sessionId: stripeInfo.sessionId,
            }
            publishableKey = stripeInfo.publishableKey
        }

        const stripe = await loadStripe(publishableKey)
        stripe.redirectToCheckout(sessionDetails)


    })()
    return (
        <React.Fragment>
            <div className="d-flex flex-column justify-content-center align-items-center mt-3">
                <h3>Checkout in progress, do not refresh the page</h3>
                <Spinner/>
            </div>
        </React.Fragment>
    )
}