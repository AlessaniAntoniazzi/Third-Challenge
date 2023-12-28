import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { server } from './server/server';
import { connectMongo } from './db/db';



const app = server;
const port = process.env.SERVER_PORT || 3000;


app.use(express.json());

app.listen(port, () => {
     console.log("server started")
});
connectMongo();
