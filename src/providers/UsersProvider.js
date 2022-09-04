import React, { useState, useEffect, useRef } from 'react'
import UserContext from '../contexts/UserContext';
import axios from 'axios'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function UsersProvider(props){

    // const BASE_URL = "https://wall-style.herokuapp.com/api/accounts"
    const BASE_URL = "https://8000-junhaok-p3wallstyle-qln0hp2s15f.ws-us63.gitpod.io/api/accounts"

    const OrdersURL = "https://8000-junhaok-p3wallstyle-qln0hp2s15f.ws-us63.gitpod.io/api/orders"

    const [registerInfo, setRegisterInfo] = useState({
        'email': '',
        'password': '',
        'first_name': '',
        'last_name': ''
    })

    const [loginData , setLoginData] = useState({
        'email': '',
        'password': ''
    })

    const [myTokens , inputTokens] = useState(null)
    const [customer , setCustomer] = useState(null)
    const tracker =  useRef(true);
    
    useEffect(() => {
        if(!tracker.current){
            console.log(customer)
        }
    }, [customer])
    
    const userContext = {
        registerInfo, setRegisterInfo, loginData, setLoginData,

        register: async (registerInfo) => {
            console.log("Register info ==> " , registerInfo)
            const response = await axios.post(BASE_URL + "/register" , registerInfo)
            if(response){
                setRegisterInfo({
                    'email': '',
                    'password': '',
                    'first_name': '',
                    'last_name': ''
                })
                toast.success('Account registered successfully!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
            return true
        },

        login: async (loginData) => {
            const response = await axios.post(BASE_URL + "/login" , loginData)
            if(response.data){
                // console.log("This is response.data ==> " , response.data)
                const userData = await axios.get(BASE_URL + "/profile" , {
                    headers: {
                        Authorization: `Bearer ${response.data.accessToken}`
                    }
                })
                inputTokens(response.data)
                localStorage.setItem('myTokens' , JSON.stringify(response.data))
                localStorage.setItem('userData' , JSON.stringify(userData))
                setLoginData({
                    'email': '',
                    'password': ''
                })
                toast.success('Welcome back!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
            return true
        },

        logout: async () => {
            const tokenSet = JSON.parse(localStorage.getItem("myTokens"))
            // console.log("From the local storage ==> " , tokenSet)
            await axios.post(BASE_URL + "/logout" , {
                refreshToken: tokenSet.refreshToken
            })
            localStorage.removeItem('myTokens')
            localStorage.removeItem('userData')
            localStorage.removeItem("cart")
            inputTokens(null)
            setCustomer(null)
            console.log("After logging out ==> " , JSON.parse(localStorage.getItem("myTokens")))
            toast.success('See you soon!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        },

        getUserData: () => {
            return customer
        },
        
    }

    return (
        <UserContext.Provider value={userContext}>
            {props.children}
        </UserContext.Provider>
    )
}