import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';
import listingRouter from './routes/listing.route.js';
import path from 'path';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());

const port = process.env.PORT;

mongoose.connect(process.env.MONGODB)
    .then(() => {
        console.log("Connected to MongoDB");
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    })
    .catch((err) => {
        console.log("Error connecting to Database:", err);
    }); 

const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, '/client/dist'))); 
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client','dist','index.html'));
});

app.use('/api/user', userRouter); 
app.use('/api/auth', authRouter);
app.use('/api/listing', listingRouter);

// --middleware
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error"; 
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    });
});