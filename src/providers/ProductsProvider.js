import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios';

// Contexts
import ProductContext from '../contexts/ProductContext';

const BASE_URL = "https://wall-style.herokuapp.com/api"

export default function ProductsProvider(props) {
    const [products, setProducts] = useState([])
    const [themes, setThemes] = useState([])
    const [productsByTheme, setProductsByTheme] = useState([])
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
            const getProductByTheme = async () => {
                let productByThemeArr = []
                let response = await axios.get(BASE_URL + "/products/theme/" + themes[0])
                console.log(response.data)
                //console.log("Themes => " , themes)
                // for(let t of themes){
                //     let response = await axios.get(BASE_URL + "/products/theme/" + t[0])
                //     productByThemeArr.push(response.data[0]) 
                // }
                // setProductsByTheme(productByThemeArr)
            }
            getProductByTheme()
            // console.log("Themes in set ==> " , themes)
            
        }
    },[themes])

    const productContext = {
        getProducts: () => {
            return products
        },

        getProductsByTheme: async () => {
            return productsByTheme
        },

        // getProductsByTheme: async () => {
        //     console.log("Called function")
        //     let productByTheme = []

        //     console.log('theme data', themes)
        //     for(let t of themes){
        //         let response = await axios.get(BASE_URL + "/products/theme/" + t[0]);
        //         // console.log(t[0])
        //         // console.log('Theme data ', response.data)
        //         productByTheme.push(response.data[0]) 
        //     }
        //     return productByTheme
        // },

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
