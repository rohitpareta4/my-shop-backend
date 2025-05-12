const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection(process.env.DATABASE_URL);

db.connect((err) => {
    if (err) {
        console.error("❌ Failed to connect to DB:", err.message);
        process.exit(1);
    }
    console.log("✅ Connected to MySQL database.");
});

// Get all reviews
app.get('/reviews', (req, res) => {
    const q = "SELECT * FROM reviews ORDER BY created_at DESC";
    db.query(q, (err, data) => {
        if (err) return res.status(500).json({ error: err.message });
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

    db.query(q, [values], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        return res.json({ message: "Review created successfully" });
    });
});

app.listen(8800, () => {
    console.log("🚀 Backend is running on port 8800");
});
