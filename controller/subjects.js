import subject from "../models/subject.js";
import department from '../models/department.js'

export const index = async (req, res) => {
    const subjects = await subject.find({}, { name: 1 }).lean();
    res.render('subjects/index', { subjects })
};

export const create = async (req, res) => {
    const departments = await department.find().lean();
    res.render('subjects/create', { departments });
};

export const edit = async (req, res) => {
    const { _id } = req.params
    const formSubject = await subject.findById(_id).lean();
    const departments = await department.find().lean();
    res.render('subjects/edit', { departments, subject: formSubject });
};

export const update = async (req, res) => {
    const { name, code, department } = req.body;
    const { _id } = req.params;

    await subject.findByIdAndUpdate(_id, { $set: { name, code, department } });

    res.redirect('/subjects');
};

export const store = async (req, res) => {
    const { name, code, department } = req.body;
    await subject.create({
        name,
        code,
        department,
    });
    res.redirect('/subjects');
};

export const show = async (req, res) => {
    const { _id } = req.params;

    const oneSubject = await subject.findById(_id).populate('department').lean();
    console.log(oneSubject);
    res.render('subjects/show', { oneSubject });
};

export const deleteOne = async (req, res) => {

    const { _id } = req.params;
    await subject.findByIdAndDelete(_id);
    return res.redirect('/subjects');

};