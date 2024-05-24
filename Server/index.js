
const express = require('express');
const mongoose = require('mongoose');
const schedule = require('node-schedule');
const fs = require('fs');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Quotes = require('./Models/Quotes');
const User = require('./Models/Users');
const sendMail = require('./controller/Sendmail');
const app = express();
const path = require('path');
const randomItem = require('./controller/randomItem');
const PORT = 4000;

app.use(express.json());
app.use(cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST"],
    credentials: true
}));
app.use(cookieParser());

// mongoose.connect('mongodb://localhost:27017/Quotes_Generator')
// .then(() => {
//     console.log("Mongoose connected successfully!!");
// }).catch(error => {
//     console.log("Mongoose connection error:", error);
// });

const connectDb = async()=>{
    await mongoose.connect(`mongodb+srv://laxmiray013:Od2VDLZgwHp1SzHo@quote.wmwt8op.mongodb.net/?retryWrites=true&w=majority&appName=Quote`);
    console.log(`this db is connected with ${mongoose.connection.host}`)
  }
  
  connectDb();

async function getPosts() {
    try {
        const dataPath = path.join(__dirname, 'quotes.json');
        const rawData = fs.readFileSync(dataPath);
        const res = JSON.parse(rawData);

        let n = res.length;
        console.log(n);

        for (let i = 0; i < res.length; i++) {
            const quotess = new Quotes({
                id: res[i]["id"],
                quote: res[i]["quote"],
                author: res[i]["author"],
            });
            await quotess.save();
        }
        console.log("Quotes inserted successfully");
    } catch (error) {
        console.log("Error inserting products:", error);
    }
}
getPosts();

app.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already exists" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();
        res.json({ status: "ok" });
    } catch (error) {
        res.status(400).json({ message: 'Alreaady registered' });
    }
});

app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        if (email =="" || password==""){
            return res.status(400).json({ message: 'Please fill in all fields.' });
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'No record exists!' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
            const token = jwt.sign({ email: user.email }, "jwt-123-key", { expiresIn: '1d' });
            res.cookie('token', token, { httpOnly: true });
            return res.json({ status: "success", token });
        } else {
            return res.status(400).json( { message: 'Password is incorrect!' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

app.get("/motivational-quote", async (req, res) => {
    const result = await randomItem();
    if (result) {
        res.json(result);
    } else {
        res.status(404).json({ error: "Motivational quote not found" });
    }
});

app.get('/user', async (req, res) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({ message: 'Authorization header not found' });
        }
        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, 'jwt-123-key');
        const user = await User.findOne({ email: decoded.email });
        if (user) {
            res.json({ name: user.name, email: user.email });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.post('/logout', (req, res) => {
    res.clearCookie('token');
    res.json({ status: "success", message: "Logged out successfully" });
});

// Schedule the job to run daily at 10:29 PM
schedule.scheduleJob('0 9 * * *', async () => {
    try {
        const users = await User.find();
        await sendMail(users);
    } catch (error) {
        console.error('Error sending daily emails:', error);
    }
});

app.listen(PORT, () => {
    console.log(`Server is running at Port ${PORT}`);
});
