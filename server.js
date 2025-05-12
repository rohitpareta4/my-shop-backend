const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'rohit@1122',
    database: 'review_system'
});

// Get all reviews
app.get('/reviews', (req, res) => {
    const q = "SELECT * FROM reviews ORDER BY created_at DESC";
    db.query(q, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

// Add a new review
app.post('/reviews', (req, res) => {
    const q = "INSERT INTO reviews (user_name, review_text, rating) VALUES (?)";
    const values = [
        req.body.user_name,
        req.body.review_text,
        req.body.rating
    ];
    
    db.query(q, [values], (err, data) => {
        if (err) return res.json(err);
        return res.json("Review has been created successfully");
    });
});

app.listen(8800, () => {
    console.log("Connected to backend!");
});
