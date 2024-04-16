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
app.use(cors({
    origin: '',
    credentials: true // Allow cookies to be sent cross-origin
  }));
  
  app.use(cors({
    origin: ["http://localhost:5173"],
    methods: "any",
    credentials: true
}));

//will not work in production
app.use(morgan("dev"));

app.use("/api/v1", appRouter);


export default app;