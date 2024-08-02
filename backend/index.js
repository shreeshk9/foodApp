const express = require('express');
const app = express();
const port = 5000;
require('dotenv').config();
const mongoDB = require('./db');

// Database connection
mongoDB();

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});

app.use(express.json()); // Ensure this is used to parse JSON bodies

// Import and use routes
app.use('/api', require('./Routes/CreateUser'));
app.use('/api', require('./Routes/DisplayData'));
app.use('/api', require('./Routes/OrderData'));

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
