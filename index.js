import express from "express";
import { engine } from 'express-handlebars';
import mongoose from "mongoose";

import subjectsRouter from './routes/subjects.js'

import dotenv from 'dotenv';
dotenv.config();



mongoose.connect(process.env.mongoConectionUrl)

const app = express();

app.use(express.urlencoded({ extended: true }));

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

app.use('/subjects', subjectsRouter)


app.listen(process.env.port, () => {
    console.log(`started on http://localhost:${process.env.port}`);
});