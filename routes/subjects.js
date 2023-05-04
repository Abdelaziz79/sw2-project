import { Router } from "express";
import department from "../models/department.js";
import subject from "../models/subject.js";

const router = new Router();

router.get('/', async (req, res) => {
    const subjects = await subject.find().lean();

    console.log(subjects)

    res.render('subjects/all', { subjects })
});


export default router;