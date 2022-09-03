import React, { useContext } from "react";
import { useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js'

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
            <div>
                <h3>Checkout in process, do not refresh the page</h3>
                {/* Spinner goes here */}
            </div>
        </React.Fragment>
    )
}