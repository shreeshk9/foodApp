const express = require('express');
const router = express.Router();
const Order = require('../models/Orders');
const Orders = require('../models/Orders');

// Route for saving order data
router.post('/orderData', async (req, res) => {
    const { order_data, order_date, email } = req.body;

    try {
        const existingOrder = await Order.findOne({ email });

        if (!existingOrder) {
            await Order.create({
                email,
                order_data: [{ Order_date: order_date, items: order_data }]
            });
        } else {
            await Order.updateOne(
                { email },
                { $push: { order_data: { Order_date: order_date, items: order_data } } }
            );
        }

        res.json({ success: true });
    } catch (error) {
        console.error("Error saving order:", error.message);
        res.status(500).json({ error: "Server Error", message: error.message });
    }
})

// Route for fetching order data
router.post('/myOrderData', async (req, res) => {
    const { email } = req.body;
    console.log(`Fetching order data for email: ${email}`);

    try {
        let myData = await Orders.findOne({ email }); // Fixed syntax here
        res.json({ orderData: myData }); // Correctly sending JSON response
    } catch (error) {
        console.error("Error fetching order data:", error.message);
        res.status(500).json({ error: "Server Error", message: error.message }); // Correct response format
    }
});

module.exports = router;
