import express from "express";
import { engine } from 'express-handlebars';
import mongoose from "mongoose";
import methodOverride from 'method-override';
import subjectsRouter from './routes/subjects.js'
import authRouter from './routes/auth.js'
import cookieParser from 'cookie-parser'

import { authentication } from './middleware/authentication.js'

import dotenv from 'dotenv';
dotenv.config();

mongoose.connect(process.env.mongoConectionUrl)

const app = express();

app.use(express.urlencoded({ extended: true }));

app.use(methodOverride('_method'));

app.use(cookieParser())

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');


app.use('/', authRouter);
app.use('/subjects', authentication, subjectsRouter);


app.listen(process.env.port, () => {
    console.log(`started on http://localhost:${process.env.port}`);
});