import express from 'express';
import { addUser } from '../controller/profile-controller.js';
import User from '../models/user.js';

const router = express.Router();

router.post('/signup', (req, res) => {
    const data = req.body;
    User.findOne({ email: data.email, password: data.password })
        .exec()
        .then(existingUser => {
            if (existingUser) {
                return res.status(200).json({ exists: true });
            } else {
                User.findOne({ email: data.email })
                    .exec()
                    .then(existUser => {
                        if (existUser) {
                            return res.status(200).json({ exists: false });
                        } else {
                            addUser(req, res);
                            return res.status(200).json({ exists: true });
                        }
                    })
                    .catch(err => {
                        console.error('Error while querying the database:', err);
                        res.status(500).json({ message: 'Internal Server Error' });
                    });
            }
        })
        .catch(err => {
            console.error('Error while querying the database1:', err);
            res.status(500).json({ message: 'Internal Server Error' });
        });
});

export default router;