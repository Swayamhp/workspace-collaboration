import express, { Application } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routers/auth.routes"
import { Request,Response } from "express";
import dotenv from "dotenv";
import userRoutes from "./routers/user.routes"

const app: Application = express();
dotenv.config();

app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//Routes
app.use("/api/test",(req:Request,res:Response)=>{
  res.json({"message":"this is test message"});
})
app.use("/api/auth", authRoutes);  
app.use("/api",userRoutes);

export default app;