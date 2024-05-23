const express = require('express');
const mongoose = require('mongoose');
const schedule = require('node-schedule')
const fs = require('fs');
const cookieParser = require('cookie-parser')
const cors = require('cors');
const bcrypt = require('bcrypt')
const jwt =require('jsonwebtoken')
const Quotes = require('./Models/Quotes')
const User = require('./Models/Users')
const sendMail = require('./controller/Sendmail')


const path = require('path');
const randomItem = require('./controller/randomItem');
const app=express();
const PORT=4000;

app.use(express.json());
app.use(cors({
    origin: ["http://localhost:5173"],
    methods : ["GET" , "POST"],
    credentials : true
}));
app.use(cookieParser())

mongoose.connect('mongodb://localhost:27017/Quotes_Generator')
.then(()=>{
    console.log("Mongoose connected successfully !!")
})

async function getPosts(){
    try{
        const dataPath = path.join(__dirname, 'quotes.json');
        const rawData = fs.readFileSync(dataPath);
        const res = JSON.parse(rawData);

        let n=res.length;
        console.log(n)

        for (let i=0;i<res.length;i++){
            const quotess = new Quotes({
                id: res[i]["id"],
                quote : res[i]["quote"],
                author : res[i]["author"],

            })
            await quotess.save();
        }
        console.log("Quotes inserted successfully ");
    }
    catch(error){
        console.log("Error inserting products :", error)
    }
}

getPosts();




app.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        bcrypt.hash(password, 10)
            .then(hash => {
                User.create({ name, email, password: hash })
                    .then(newUser => {
                        res.json({ status: "ok" });
                        sendMail(newUser.email, newUser.name);

                           
                       
                    })
                    .catch(err => res.json(err));
            });

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json("No record exists!");
        }

        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) {
                return res.status(500).json("Error comparing passwords");
            }

            if (isMatch) {
                const token = jwt.sign({ email: user.email }, "jwt-123-key", { expiresIn: '1d' });
                res.cookie('token', token, { httpOnly: true });
                
                return res.json({ status: "success", token });
                
                
            } else {
                return res.status(400).json("Password is incorrect!");
            }
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});



app.get("/motivational-quote", async (req,res)=>{
    const result =await randomItem();
    if (result) {
        res.json(result); // Send the JSON response if result is not null
    } else {
        res.status(404).json({ error: "Motivational quote not found" }); // Handle case when result is null
    }
});



app.get("/mail",sendMail)

// Ensure you have a way to authenticate and get the current user
app.get('/user', async (req, res) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({ message: 'Authorization header not found' });
        }
        const token = authHeader.split(' ')[1]; // Get token from Authorization header
        const decoded = jwt.verify(token, 'jwt-123-key'); // Use your JWT secret key
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
schedule.scheduleJob('0 9 * * *', async () => {
    try {
        const users = await User.find();
        await sendMail(users);
    } catch (error) {
        console.error('Error sending daily emails:', error);
    }
});
app.post('/logout', (req, res) => {
    res.clearCookie('token');
    res.json({ status: "success", message: "Logged out successfully" });
});



app.listen(PORT,()=>{
    console.log(`Server is running at Port ${PORT}`)
})

