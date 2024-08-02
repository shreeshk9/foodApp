import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

export default function MyOrder() {
    const [orderData, setOrderData] = useState({});

    const fetchMyOrder = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/auth/myOrderData", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: localStorage.getItem('userEmail')
                })
            });
            const data = await response.json();
            setOrderData(data);
        } catch (error) {
            console.error("Error fetching order data:", error.message);
        }
    };

    useEffect(() => {
        fetchMyOrder();
    }, []);

    const renderOrders = () => {
        if (!orderData.orderData || !orderData.orderData.order_data) {
            return <div className='m-5 w-100 text-center fs-3'>No Orders Found</div>;
        }

        return orderData.orderData.order_data.slice(0).reverse().map((itemGroup, index) => {
            const [items, orderDate] = itemGroup;
            return (
                <div key={index} className='mt-3'>
                    <div className='m-auto mt-5'>
                        <h4>{new Date(orderDate).toLocaleDateString()}</h4>
                        <hr />
                        <div className='row'>
                            {items.map((item, itemIndex) => (
                                <div key={itemIndex} className='col-12 col-md-6 col-lg-3'>
                                    <div className="card mt-3" style={{ width: "16rem", maxHeight: "360px" }}>
                                        <img src={item.img} className="card-img-top" alt={item.name} style={{ height: "120px", objectFit: "fill" }} />
                                        <div className="card-body">
                                            <h5 className="card-title">{item.name}</h5>
                                            <div className='container w-100 p-0' style={{ height: "38px" }}>
                                                <span className='m-1'>{item.qty}</span>
                                                <span className='m-1'>{item.size}</span>
                                                <div className='d-inline ms-2 h-100 w-20 fs-5'>
                                                    ₹{item.price}/-
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            );
        });
    };

    return (
        <div>
            <Navbar />
            <div className='container'>
                <div className='row'>
                    {renderOrders()}
                </div>
            </div>
            <Footer />
        </div>
    );
}
