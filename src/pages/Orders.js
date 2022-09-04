import React, { useState, useEffect, useRef } from 'react'
import Table from 'react-bootstrap/Table';
import Spinner from '../components/Spinner';
import "../css/orders.css"
import axios from 'axios'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaEye } from "react-icons/fa"

export default function Orders() {
    const BASE_URL = "https://8000-junhaok-p3wallstyle-qln0hp2s15f.ws-us63.gitpod.io/api/orders"

    // const getOrders =  userContext.getOrderHistory
    const [orders, setOrders] = useState([])
    const tracker = useRef(true);

    const getOrders = async () => {
        const tokens = JSON.parse(localStorage.getItem("myTokens"))
        const orderRes = await axios.get(BASE_URL, {
            headers: {
                Authorization: `Bearer ${tokens.accessToken}`
            }
        })
        if (orderRes.data.length == 0) {
            toast.error('No transaction history', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
        else {
            setOrders(orderRes.data)
        }


    }

    useEffect(() => {
        const start = async () => {
            await getOrders()
        }
        start()
    }, [])

    useEffect(() => {
        tracker.current = orders
        console.log("This is orders tracker current", tracker.current)
    }, [orders])

    return (
        tracker.current.length != 0
            ?
            <React.Fragment>
                <div className="container-fluid mt-3 orders-table">
                    <Table striped bordered hover responsive>
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Payment reference</th>
                                <th>Payment type</th>
                                <th>Total Cost</th>
                                <th>Order status</th>
                                <th>Receipt</th>
                                <th>Transaction date</th>
                            </tr>
                        </thead>
                        <tbody>
                            <React.Fragment>
                                {Array.from({ length: tracker.current.length }).map((_, idx) => (
                                    <tr>
                                        <td>{tracker.current[idx].id}</td>
                                        <td>{tracker.current[idx].account.first_name} {tracker.current[idx].account.last_name}</td>
                                        <td>{tracker.current[idx].account.email}</td>
                                        <td>{tracker.current[idx].payment_reference}</td>
                                        <td>{tracker.current[idx].payment_type}</td>
                                        <td>{(tracker.current[idx].total_cost/100).toFixed(2)}</td>
                                        <td>{tracker.current[idx].orderStatus.status}</td>
                                        <td><a href={tracker.current[idx].receipt_url} className="btn btn-dark btn-outline-light btn-sm" target="_blank">
                                            <FaEye/>
                                        </a></td>
                                        <td>{tracker.current[idx].order_date}</td>
                                    </tr>
                                ))}
                            </React.Fragment>
                        </tbody>
                    </Table>
                </div>
            </React.Fragment> : <Spinner/>



    )
}