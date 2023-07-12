import express from 'express';
import {addUser} from '../controller/profile-controller.js';

const router = express.Router();

router.post('/signup', addUser);

export default router;