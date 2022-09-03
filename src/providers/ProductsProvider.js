import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios';

// Contexts
import ProductContext from '../contexts/ProductContext';

// const BASE_URL = "https://8000-junhaok-p3wallstyle-qln0hp2s15f.ws-us63.gitpod.io/api/products"
const BASE_URL = "https://wall-style.herokuapp.com/api/products"

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
            //console.log('theme data to state===',response.data)
            tracker.current=false;
        }
        getAllProducts()
        getAllThemes()
    }, [])

    // useEffect(()=>{
    //     if(!tracker.current){
    //         const getProductsByTheme = async () => {
    //             let productByThemeArr = []
    //             for(let eachTheme of themes){
    //                 let response = await axios.get(BASE_URL + "/theme/" + eachTheme[0])
    //                 productByThemeArr.push(response.data[0]) 
    //             }
    //             setProductsByTheme(productByThemeArr)
    //             tracker.current = false
    //         }
    //         getProductsByTheme()
    //     }
    // },[themes])

    // useEffect(() => {
    //     if(!tracker.current){
    //         setContentLoaded(true)
    //         console.log("Desired answer ==> " , productsByTheme)
    //     }
    // } , [productsByTheme])


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

    // useEffect(() => {
    //     if(!tracker.current){
    //         console.log("products saved in state => " , products)
    //         setContentLoaded(true)
    //     }
    // } , [products])

    const productContext = {
        searchQuery , setSearchQuery,
        products, 
        getProducts: () => {
            return products
        },

        // contentLoaded: () => {
        //     return contentLoaded
        // },
    
        // getProductsByTheme: () => {
        //     return productsByTheme
        // },

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
