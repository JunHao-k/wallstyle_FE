import axios from 'axios';
import React, { useState } from 'react'
import CartContext from '../contexts/CartContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//  const BASE_URL = "https://8000-junhaok-p3wallstyle-qln0hp2s15f.ws-us63.gitpod.io/api/cart"
const BASE_URL = "https://wall-style.herokuapp.com/api/cart"

// const CHECKOUT_URL = "https://8000-junhaok-p3wallstyle-qln0hp2s15f.ws-us63.gitpod.io/api/checkout"
const CHECKOUT_URL = "https://wall-style.herokuapp.com/api/checkout"

export default function CartProvider(props) {

    const [bodyInfo, setBodyInfo] = useState({
        'frameId': '',
        'dimensionId': '',
        'quantity': 1,
        'variantId': ''
    })

    const cartContext = {
        bodyInfo, setBodyInfo,

        addCartItem: async (bodyInfo) => {
            const tokens = JSON.parse(localStorage.getItem("myTokens"))
            try {
                if (tokens.accessToken) {
                    const response = await axios.post(BASE_URL + `/${bodyInfo.variantId}/add`, {
                        'frameId': bodyInfo.frameId,
                        'dimensionId': bodyInfo.dimensionId,
                        'quantity': bodyInfo.quantity
                    }, {
                        headers: {
                            Authorization: `Bearer ${tokens.accessToken}`
                        }
                    })
                    toast.success('Item added into cart successfully!', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                    return response
                }
            }
            catch (error) {
                toast.error('There is currently no stock for this item', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }

        },
        getCart: async () => {
            const tokens = JSON.parse(localStorage.getItem("myTokens"))
            if (tokens.accessToken) {
                const response = await axios.get(BASE_URL, {
                    headers: {
                        Authorization: `Bearer ${tokens.accessToken}`
                    }
                })
                return response.data
            }
        },
        updateCart: async (updateInfo) => {
            const tokens = JSON.parse(localStorage.getItem("myTokens"))
            try {
                if (tokens.accessToken) {
                    const response = await axios.put(BASE_URL + `/${updateInfo.variantId}/update`, {
                        'frameId': updateInfo.frameId,
                        'dimensionId': updateInfo.dimensionId,
                        'quantity': updateInfo.quantity
                    }, {
                        headers: {
                            Authorization: `Bearer ${tokens.accessToken}`
                        }
                    })
                    toast.success('Item updated successfully!', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                    return response
                }
            }
            catch (error) {
                //console.log(error)
                toast.error('An error occurred while updating the cart, please try again', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
        },
        deleteCartItem: async (deleteInfo) => {
            const tokens = JSON.parse(localStorage.getItem("myTokens"))
            // console.log("This is deleteInfo in backend ==> " , deleteInfo)
            try {
                if (tokens.accessToken) {

                    console.log("This is access token => " , tokens.accessToken)
                    console.log("variantid" , deleteInfo.variantId)
                    console.log("cartId" , typeof(deleteInfo.cartId))
                    
                    const response = await axios.delete(BASE_URL + `/delete/${deleteInfo.cartId}/variant/${deleteInfo.variantId}`, {
                            headers: {
                                Authorization: `Bearer ${tokens.accessToken}`
                            }
                        }
                    )
                    toast.success('Cart Item deleted successfully!', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                    return response
                }
            }
            catch (error) {
                console.log(error)
                toast.error('An error occurred while deleting the cart item, please try again', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
        },

        checkout: async () => {
            console.log("Function checkout is called")
            try{
                const cartItems = await cartContext.getCart()
                const tokens = JSON.parse(localStorage.getItem("myTokens"))
                console.log("These are the cart items (cartItems.cartItems) ==> " , cartItems.cartItems)
                // Empty array is not false, check also in case if array, it must be empty
                if(!cartItems.cartItems || !cartItems.cartItems.length){
                    toast.error('Please make sure your cart is not empty', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                }
                const response = await axios.get(CHECKOUT_URL , {
                    headers: {
                        Authorization: `Bearer ${tokens.accessToken}`
                    }
                })
                console.log('response', response)
                return response.data
            }
            catch(error){
                console.log(error)
                toast.error('An error occurred while checking out. Please try again', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                return false
            }
        }
    }

    return (
        <CartContext.Provider value={cartContext}>
            {props.children}
        </CartContext.Provider>
    )
}