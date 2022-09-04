import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios';

// Contexts
import ProductContext from '../contexts/ProductContext';

const BASE_URL = "https://8000-junhaok-p3wallstyle-qln0hp2s15f.ws-us63.gitpod.io/api/products"
//const BASE_URL = "https://wall-style.herokuapp.com/api/products"

export default function ProductsProvider(props) {
    const [products, setProducts] = useState([])
    const [themes, setThemes] = useState([])
    // const [productsByTheme, setProductsByTheme] = useState([])
    // const [contentLoaded , setContentLoaded] = useState(false)
    const [searchQuery , setSearchQuery] = useState({
        "title": '',
        "on_sales": '',
        "themes": "",
        "combo": ""
    })
    const tracker =  useRef(true);
    
    useEffect(() => {
        const getAllProducts = async () => {
            let response = await axios.get(BASE_URL)
            setProducts(response.data)
        }
        const getAllThemes = async () => {
            let response = await axios.get(BASE_URL + "/themes")
            setThemes(response.data)
            tracker.current=false;
        }
        getAllProducts()
        getAllThemes()
    }, [])

    const getProductsBySearch = async () => {
        //console.log(searchQuery)
        const response = await axios.get(BASE_URL + "/search" , {params: searchQuery})
        //console.log("This is what is passed into backend = " , response.data)
        setProducts(response.data)
        //tracker.current = true
        return response.data
    }

    const resetSearch = async () => {
        setSearchQuery({})
        let response = await axios.get(BASE_URL)
        setProducts(response.data)
        console.log("This is searchQuery after clearing ==> " , searchQuery)
    }

    const productContext = {
        searchQuery , setSearchQuery,
        products, 
        getProducts: () => {
            return products
        },

        getThemes: () => {
            return themes
        },

        setSearchProducts: async () => {
            await getProductsBySearch()
            return products
        },

        triggerResetSearch: async () => {
            await resetSearch()
            return products
        }
    }

    return (
        <ProductContext.Provider value={productContext}>
            {props.children}
        </ProductContext.Provider>
    )
}
