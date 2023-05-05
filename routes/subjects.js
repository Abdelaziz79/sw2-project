import { Router } from "express";
import { index, create, store, show } from "../controller/subjects.js";

const router = new Router();

router.get('/', index);
router.get('/create', create);
router.post('/', store);

router.get('/:_id', show);

export default router;