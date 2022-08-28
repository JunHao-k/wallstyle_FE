import React, { useEffect, useState } from 'react'
import axios from 'axios';

// Contexts
import ProductContext from '../contexts/ProductContext';

const BASE_URL = "https://wall-style.herokuapp.com/api"

export default function ProductsProvider(props){
    const [products , setProducts] = useState([])
    const [themes , setThemes] = useState([])
    // const [productsByTheme , setProductsByTheme] = useState([])
    

    useEffect(() => {
        const getAllProducts = async () => {
          let response = await axios.get(BASE_URL + "/products")
          setProducts(response.data)
        }
        const getAllThemes = async () => {
            let response = await axios.get(BASE_URL + "/products/themes")
            setThemes(response.data)
        }
        getAllProducts()
        getAllThemes()

        // const getProductByTheme = async () => {
        //     let productByThemeArr = []
        //     for(let t of themes){
        //         let response = await axios.get(BASE_URL + "/products/theme/" + t['0'])
        //         productByThemeArr.push(response.data[0]) 
        //     }
        //     setProductsByTheme(productByThemeArr)
        // }
        // getProductByTheme()

    } , [])

    const productContext = {
        getProducts: () => {
          return products
        },

        // getProductsByTheme: async () => {
        //     return productsByTheme
        // },

        getProductsByTheme: async () => {
            let productByTheme = []
            for(let t of themes){
                let response = await axios.get(BASE_URL + "/products/theme/" + t['0'])
                productByTheme.push(response.data[0]) 
            }
            return productByTheme
        },

        getThemes: () => {
            return themes
        }

    }

    return(
        <ProductContext.Provider value = {productContext}>
            {props.children}
        </ProductContext.Provider>
    )
}
