const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

//MIDDLEWARE
app.use(cors());
app.use(express.json());

//ROUTES

//create todo
app.post("/todos", async (req, res) => {
    try {
        const { description } = req.body;
        const newTodo = await pool.query(
            "INSERT INTO todo (description) VALUES($1) RETURNING *", 
            [description]
        );

        res.json(newTodo.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
})

app.listen(5000, () => {
    console.log("server has started on port 5000");
})

