import React from 'react';
import { useCart, useDispatchCart } from '../components/ContextReducer'; // Ensure the correct path to ContextReducer
import trash from '../assets/trash.svg'; // Ensure the correct path to trash.svg

export default function Cart() {
    const data = useCart(); // Use the custom hook to get cart data
    const dispatch = useDispatchCart(); // Use the custom hook to get dispatch function

    if (data.length === 0) {
        return (
            <div>
                <div className='m-5 w-100 text-center fs-3'>The Cart is Empty!</div>
            </div>
        );
    }

    const handleCheckOut = async () => {
        const userEmail = localStorage.getItem("userEmail");
        try {
            const response = await fetch("http://localhost:5000/api/orderData", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    order_data: data,
                    email: userEmail,
                    order_date: new Date().toISOString()
                })
            });

            if (response.ok) {
                dispatch({ type: "DROP" });
                alert("Order placed successfully! Your cart is now empty.");
            } else {
                const errorResponse = await response.json();
                console.error("Failed to check out:", errorResponse.error || response.statusText);
                alert(`Failed to place order. Reason: ${errorResponse.error || response.statusText}`);
            }
        } catch (error) {
            console.error("Error during checkout:", error);
            alert("An error occurred. Please try again.");
        }
    };

    const handleRemove = (index) => {
        dispatch({ type: 'REMOVE', index });
    };

    const totalPrice = data.reduce((total, food) => total + food.price, 0);

    return (
        <div>
            <div className='container m-auto mt-5 table-responsive table-responsive-sm table-responsive-md'>
                <table className='table table-hover'>
                    <thead className='text-success'>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Quantity</th>
                            <th scope="col">Option</th>
                            <th scope="col">Amount</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((food, index) => (
                            <tr key={index}>
                                <th scope="row">{index + 1}</th>
                                <td>{food.name}</td>
                                <td>{food.qty}</td>
                                <td>{food.size}</td>
                                <td>{food.price}</td>
                                <td>
                                    <button type='button' className='btn p-0' onClick={() => handleRemove(index)}>
                                        <img 
                                            src={trash} 
                                            alt="delete" 
                                        />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div>
                    <h1 className='fs-2'>Total Price: {totalPrice}/-</h1>
                </div>
                <div>
                    <button className='btn bg-success mt-5' onClick={handleCheckOut}>
                        Check Out
                    </button>
                </div>
            </div>
        </div>
    );
}
