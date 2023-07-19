import express from 'express';
import { addUser } from '../controller/profile-controller.js';
import User from '../models/user.js';
import { generateFile } from '../controller/file-controller.cjs';
import { executeFile } from '../controller/executeFile.cjs';
import Problem from '../models/problem.js';

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
            console.error('Error while querying the database:', err);
            res.status(500).json({ message: 'Internal Server Error' });
        });
});

router.post("/run", async (req, res) => {
    const { language = 'cpp', code, inputs } = req.body;
    if (code === "") {
        return res.json({ success: false, error: "Empty code body!" });
    }
    try {
        const filePath = await generateFile(language, code);
        const output = await executeFile(filePath, inputs);
        console.log({ filePath, output });
        return res.json({ output: output, success: true });
    }
    catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
});

router.post("/fetchdata", async (req, res) => {
    const data = req.body;
    User.findOne({ email: data.email })
        .exec()
        .then(existingUser => {
            if (existingUser) {
                return res.json(existingUser.solutions);
            } else {
                return res.status(404).json({ message: 'User not found' });
            }

        })
        .catch(err => {
            console.error('Error while fetching data from the database:', err);
            res.status(500).json({ message: 'Internal Server Error' });
        });
});

router.post("/fetchallproblems", async (req, res) => {
    Problem.find()
        .exec()
        .then(problems => {
            if (problems) {
                return res.json(problems);
            } else {
                return res.status(404).json({ message: 'Problems not found' });
            }
        })
        .catch(err => {
            console.error('Error while fetching problems from the database:', err);
            res.status(500).json({ message: 'Internal Server Error' });
        });
});

router.post("/fetchproblem", async (req, res) => {
    const data = req.body;
    Problem.findOne({_id: data.id})
        .exec()
        .then(problem => {
            if (problem) {
                return res.json(problem);
            } else {
                return res.status(404).json({ message: 'Problem not found' });
            }
        })
        .catch(err => {
            console.error('Error while fetching problem from the database:', err);
            res.status(500).json({ message: 'Internal Server Error' });
        });
});

export default router;