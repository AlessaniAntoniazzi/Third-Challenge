import express from 'express';
import { server } from './server/server';
import { connectMongo } from './db/db';
import userRoutes from './routes/routes';


const app = server;
const port = process.env.SERVER_PORT || 3000;


app.use(express.json());
app.use('/', userRoutes);

app.listen(port, () => {
     console.log("server started")
});
connectMongo();

