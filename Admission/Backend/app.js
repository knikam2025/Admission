import express from "express";
import colors from "colors";
import cors from 'cors';
import connectDB from "./config/db.js";
import User from "./models/Schema.js";

const app = express();
const port = 3000;

app.use(cors());
connectDB();
app.use(express.json());

app.get("/", (req, res) => {
    res.send({ message: "working" });
});

app.get("/Users", async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.post("/User", async (req, res) => {
    try {
        const { name, lastname, email, number } = req.body;
        const newUser = new User({ name, lastname, email, number });
        await newUser.save();
        res.status(201).json({ message: 'User created successfully', user: newUser });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.put("/User/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { name, lastname, email, number } = req.body;
        const updatedUser = await User.findByIdAndUpdate(id, { name, lastname, email, number }, { new: true });
        res.status(200).json({ message: 'User updated successfully', user: updatedUser });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.delete("/User/:id", async (req, res) => {
    try {
        const { id } = req.params;
        await User.findByIdAndDelete(id);
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.listen(port, () => {
    console.log("server is working".bgRed);
});
