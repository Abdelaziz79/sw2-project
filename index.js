import express from "express";
import { engine } from 'express-handlebars';
import mongoose from "mongoose";

import subjectsRouter from './routes/subjects.js'

import dotenv from 'dotenv';
dotenv.config();


const mongoConectionUrl = 'mongodb://localhost:27017/project';

mongoose.connect(process.env.mongoConectionUrl)

const app = express();

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

app.use('/subjects',subjectsRouter)


app.listen(process.env.port, () => {
    console.log(`started on http://localhost:${process.env.port}`);
});