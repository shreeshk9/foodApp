const mongoose = require('mongoose');

const mongoURI = '';

const mongoDB = async () => {
    try {
        await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("Connected to MongoDB");

        const fetched_data = await mongoose.connection.db.collection("food_items").find({}).toArray();
        const foodCategory = await mongoose.connection.db.collection("foodCategory").find({}).toArray();
        
        global.food_items = fetched_data;
        global.foodCatergory = foodCategory;

        console.log(global.food_items, global.foodCatergory);

    } catch (err) {
        console.log("--- Error connecting to MongoDB:", err);
    }
};

module.exports = mongoDB;
