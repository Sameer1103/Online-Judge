import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import express from 'express';
import bcrypt from 'bcrypt';
import User from '../models/user.js';
import Problem from '../models/problem.js';
import { addUser } from '../controller/profile-controller.js';
import { generateFile } from '../controller/file-controller.cjs';
import { executeFile } from '../controller/executeFile.cjs';

dotenv.config();
const router = express.Router();

router.post('/authenticate', (req, res) => {
    const token = req.body.token;
    if (token == null) return res.json({ found: false });
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.json({ found: false, error: err });
        return res.json({ found: true, email: user.email });
    });
});

// Your `refreshAccessToken` function implementation is missing.

router.post('/signup', async (req, res) => {
    try {
        const data = req.body;
        const hashedPassword = await bcrypt.hash(data.password, 10);
        const accessToken = jwt.sign({ email: data.email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
        const refreshToken = jwt.sign({ email: data.email }, process.env.REFRESH_TOKEN_SECRET);
        const user = {
            email: data.email,
            password: hashedPassword,
            refreshToken: refreshToken
        };
        addUser(user);
        return res.status(200).json({ accessToken: accessToken, refreshToken: refreshToken });
    } catch (err) {
        return res.status(500).json({ message: 'Internal Server Error', error: err });
    }
});

router.post('/login', async (req, res) => {
    const data = req.body;
    User.findOne({ email: data.email })
        .exec()
        .then(existingUser => {
            if (existingUser) {
                try {
                    if (bcrypt.compareSync(data.password, existingUser.password)) {
                        const user = { email: existingUser.email };
                        const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
                        const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
                        existingUser.refreshTokens.push(refreshToken);
                        return res.json({ accessToken: accessToken, refreshToken: refreshToken, success: true, exists: true });
                    } else {
                        return res.json({ success: true, exists: false });
                    }
                } catch (error) {
                    res.status(500).send('Error in comparing passwords');
                }
            } else {
                return res.json({ success: false });
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
    } catch (error) {
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
    Problem.findOne({ _id: data.id })
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

router.post("/addsolution", async (req, res) => {
    const data = req.body;
    User.findOne({ email: data.email })
        .then(user => {
            if (user) {
                user.solutions.push({
                    problem_id: data.id,
                    solution: data.solution
                });

                user.save()
                    .then(() => {
                        return res.status(200).json({ message: 'Solution added successfully' });
                    })
                    .catch(err => {
                        console.error('Error while saving user:', err);
                        return res.status(500).json({ message: 'Internal Server Error' });
                    });
            } else {
                return res.status(404).json({ message: 'User not found' });
            }
        })
        .catch(err => {
            console.error('Error while finding user from the database:', err);
            res.status(500).json({ message: 'Internal Server Error' });
        });
});

export default router;