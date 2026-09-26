const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "env") });
const cors = require("cors"); 
const express = require("express");
const morgan = require("morgan");
const dp = require("./database");
const app = express();



//MiddleWare
app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
    res.json({ status: "Success", message: "Restaurant Finder API is running" });
});


// get all restaurants
app.get("/api/v1/restaurants", async (req, res) => {

    try{
        const results = await dp.query("SELECT res.id, res.name, res.location, res.price_range, COUNT(rev.rating), TRUNC(AVG(rev.rating), 1) as average_rating FROM restaurants as res LEFT JOIN reviews as rev ON res.id=rev.restaurant_id GROUP BY res.id ORDER BY res.id");


        res.json({
            status: "Success",
            results: results.rows.length,
            data: {
                restaurants: results.rows
            }
        });
    }
    catch(err){
        console.log(err);
        res.status(503).json({ status: "Error", message: "Database unavailable" });
    }
});



// get an individual restaurant
app.get("/api/v1/restaurants/:id", async (req, res) => {

    try{
        const restaurant = await dp.query("SELECT res.id, res.name, res.location, res.price_range, COUNT(rev.rating), TRUNC(AVG(rev.rating), 1) as average_rating FROM restaurants as res LEFT JOIN reviews as rev ON res.id=rev.restaurant_id WHERE res.id=$1 GROUP BY res.id ORDER BY res.id", [req.params.id]); // more secure. paramaterized query
        const reviews = await dp.query("SELECT * FROM reviews WHERE restaurant_id = $1", [req.params.id]);
        
        res.status(200).json({
            status: "Success",
            data: {
                restaurants: restaurant.rows[0],
                reviews: reviews.rows
            }
        });

    }
    catch(err){
        console.log(err);
        res.status(503).json({ status: "Error", message: "Database unavailable" });
    }
});


// Create a restaurant
app.post("/api/v1/restaurants", async (req, res) => {

    try{
        const results = await dp.query("INSERT INTO restaurants (name, location, price_range) values ($1,$2,$3) RETURNING *", [req.body.name,req.body.location,req.body.price_range]); //we add returning * to return an output to the results

        res.status(201).json({
            status: "Success",
            data: {
                restaurants: results.rows[0]
            }
        });

    }
    catch(err){
        console.log(err);
        res.status(503).json({ status: "Error", message: "Database unavailable" });
    }
});



// Update restaurants
app.put("/api/v1/restaurants/:id", async (req, res) => {

    try{
        const results = await dp.query("UPDATE restaurants SET name=$1,location=$2,price_range=$3 WHERE id=$4 RETURNING *", [req.body.name,req.body.location,req.body.price_range,req.params.id]);

        res.status(200).json({
            status: "Success",
            data: {
                restaurants: results.rows[0]
            }
        });
    }
    catch(err){
        console.log(err);
        res.status(503).json({ status: "Error", message: "Database unavailable" });
    }
});



//Delete a restaurant
app.delete("/api/v1/restaurants/:id", async (req, res) => {
    try{
        const results = await dp.query("DELETE FROM restaurants WHERE id=$1", [req.params.id]);
        res.status(204).json({
            status: "Success"
        });
    }
    catch(err){
        console.log(err);
    }
});

//add a review for a restaurant
app.post("/api/v1/restaurants/:id/addReview", async (req, res) => {
    try{
        const results = await dp.query("INSERT INTO reviews (restaurant_id, name, review, rating) values ($1,$2,$3,$4) RETURNING *", [req.params.id,req.body.name,req.body.review,req.body.rating]); //we add returning * to return an output to the results

        res.status(201).json({
            status: "Success",
            data: {
                reviews: results.rows[0]
            }
        });

    }
    catch(err){
        console.log(err);
    }
});


const port = process.env.PORT || 3000; //so that if PORT undefiend then use port 3000
app.listen(port, () => {
    console.log(`server is up and listening on port ${port}`);
});