import { config } from 'dotenv';
import appRouter from './routes/index.js'
import express from 'express';
import morgan from 'morgan';
import cookieParser from "cookie-parser";
import cors from 'cors';
config();
const app = express();
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(express.json()) 

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'https://ai-chat-app-wmwf.vercel.app');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    next();
  });
//will not work in production
app.use(morgan("dev"));

app.use("/api/v1", appRouter);


export default app;