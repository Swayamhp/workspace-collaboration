import express, { Application } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routers/auth.routes"
import { Request,Response } from "express";

const app: Application = express();

app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//Routes
app.use("/api/test",(req:Request,res:Response)=>{
  res.json({"message":"this is test message"});
})
app.use("/api/auth", authRoutes);  

export default app;