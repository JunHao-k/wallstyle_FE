import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios';

// Contexts
import ProductContext from '../contexts/ProductContext';

const BASE_URL = "https://wall-style.herokuapp.com/api"

export default function ProductsProvider(props) {
    const [products, setProducts] = useState([])
    const [themes, setThemes] = useState([])
    const [productsByTheme, setProductsByTheme] = useState([])
    const [contentLoaded , setContentLoaded] = useState(false)
    const tracker =  useRef(true);

    useEffect(() => {
        const getAllProducts = async () => {
            let response = await axios.get(BASE_URL + "/products")
            setProducts(response.data)
        }
        const getAllThemes = async () => {
            let response = await axios.get(BASE_URL + "/products/themes")
            setThemes(response.data)
            console.log('theme data to state===',response.data)
            tracker.current=false;
        }
        getAllProducts()
        getAllThemes()
    }, [])

    useEffect(()=>{
        if(!tracker.current){
            const getProductsByTheme = async () => {
                let productByThemeArr = []
                for(let eachTheme of themes){
                    let response = await axios.get(BASE_URL + "/products/theme/" + eachTheme[0])
                    productByThemeArr.push(response.data[0]) 
                }
                setProductsByTheme(productByThemeArr)
                tracker.current = false
            }
            getProductsByTheme()
        }
    },[themes])

    useEffect(() => {
        if(!tracker.current){
            setContentLoaded(true)
            console.log("Desired answer ==> " , productsByTheme)
        }
    } , [productsByTheme])

    const productContext = {
        getProducts: () => {
            return products
        },

        contentLoaded: () => {
            return contentLoaded
        },
    
        getProductsByTheme: () => {
            return productsByTheme
        },

        getThemes: () => {
            return themes
        }

    }

    return (
        <ProductContext.Provider value={productContext}>
            {props.children}
        </ProductContext.Provider>
    )
}
