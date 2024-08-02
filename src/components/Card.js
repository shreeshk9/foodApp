import React, { useState, useEffect } from 'react';
import { useCart, useDispatchCart } from './ContextReducer'; // Ensure this path is correct

export default function Card({ imgSrc, foodName, options, foodItem }) {
    const dispatch = useDispatchCart();
    const cartItems = useCart(); // Get cart items from context
    const priceOptions = Object.keys(options);

    // Determine default size based on food type
    const defaultSize = foodItem.type === 'pizza' ? 'regular' : 'half';
    const [size, setSize] = useState(defaultSize);
    const [qty, setQty] = useState(1);

    // Ensure size defaults to an existing option
    useEffect(() => {
        if (!priceOptions.includes(size)) {
            setSize(priceOptions[0]); // Fallback to the first available size
        }
    }, [priceOptions, size]);

    const handleAddToCart = () => {
        const finalPrice = options[size] * qty; // Calculate final price

        dispatch({
            type: 'ADD',
            id: foodItem._id,
            name: foodItem.name,
            qty,
            size,
            price: finalPrice,
            img: imgSrc
        });

        console.log('Item added/updated in cart:', { id: foodItem._id, qty, size });
    };

    return (
        <div className="mt-3">
            <div className="card" style={{ width: '18rem', maxHeight: '360px' }}>
                <img src={imgSrc} className="card-img-top" alt={foodName} style={{ height: '120px', objectFit: 'fill' }} />
                <div className="card-body">
                    <h5 className="card-title">{foodName}</h5>
                    <div className="container w-100">
                        <select
                            className="m-2 h-100 bg-success"
                            value={qty}
                            onChange={(e) => setQty(Number(e.target.value))}
                        >
                            {Array.from(Array(6), (e, i) => (
                                <option key={i + 1} value={i + 1}>{i + 1}</option>
                            ))}
                        </select>

                        <select
                            className="m-2 h-100 bg-success rounded"
                            value={size}
                            onChange={(e) => setSize(e.target.value)}
                        >
                            {priceOptions.map((option) => (
                                <option key={option} value={option}>{option}</option>
                            ))}
                        </select>
                        
                        <div className="d-inline h-100 fs-5">
                            ₹{options[size] ? options[size] * qty : options[priceOptions[0]] * qty}
                        </div>
                        
                        <hr />
                        
                        <button className='btn btn-success justify-center ms-2' onClick={handleAddToCart}>
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
