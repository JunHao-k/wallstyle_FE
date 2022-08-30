import React, { useState } from 'react'
import UserContext from '../contexts/UserContext';
import axios from 'axios'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function UsersProvider(props){

    const BASE_URL = "https://wall-style.herokuapp.com/api/accounts"

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

    const [myTokens , inputTokens] = useState({})
    const [customer , setCustomer] = useState(null)
    
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
            if(response){
                //console.log("This is response.data ==> " , response.data)
                inputTokens(response.data)
                
                localStorage.setItem('myTokens' , JSON.stringify(response.data))
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
            console.log("From the local storage ==> " , tokenSet)
            await axios.post(BASE_URL + "/logout" , {
                refreshToken: tokenSet.refreshToken
            })
            localStorage.removeItem('myTokens')
            inputTokens(null)
            setCustomer(null)
            console.log("After logging out ==> " , JSON.parse(localStorage.getItem("myTokens")))
        }
        
    }

    return (
        <UserContext.Provider value={userContext}>
            {props.children}
        </UserContext.Provider>
    )
}