import express from "express";
import router from './routes/routes.js';
import dbConnection from "./database/db.js";
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/', router);

dbConnection();

app.listen(8000, () => {
    console.log("Server is running on port 8000");
})